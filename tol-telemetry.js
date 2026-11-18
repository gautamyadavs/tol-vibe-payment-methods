/**
 * CMU 05-840 Tools for Online Learning — Canonical Interaction Telemetry Engine
 * Implements PSLC DataShop-aligned context_message, tool_message (SAI), and tutor_message
 * with native GitHub Pages -> Supabase Free Tier REST streaming (INSERT-only RLS)
 * and a Mayer-safe, closed-by-default Live Telemetry Inspector drawer.
 */
(function () {
  'use strict';

  const CSV_COLUMNS = [
    'client_timestamp',
    'anon_student_id',
    'session_id',
    'tool_name',
    'message_type',
    'transaction_id',
    'problem_id',
    'step_id',
    'selection',
    'action',
    'input',
    'outcome',
    'attempt_num',
    'hint_level',
    'kc_id',
    'feedback_or_bug_tag',
    'step_duration_ms',
    'context_json'
  ];

  function randomHex(len) {
    const arr = new Uint8Array(Math.ceil(len / 2));
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(arr);
    } else {
      for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('').slice(0, len);
  }

  function sanitizePeerId(raw) {
    if (!raw) return '';
    // Strip anything resembling an email or full name with spaces; keep safe opaque token
    const trimmed = String(raw).trim();
    if (trimmed.includes('@')) return 'peer_' + randomHex(4);
    const cleaned = trimmed.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 24);
    return cleaned || '';
  }

  function csvEscape(val) {
    if (val === null || val === undefined) return '';
    const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    if (/[",\n\r]/.test(str)) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  const state = {
    initialized: false,
    toolName: 'tol-vibe-app',
    supabaseUrl: '',
    supabaseAnonKey: '',
    anonStudentId: '',
    sessionId: '',
    txnCounter: 0,
    lastStepTimestamp: Date.now(),
    attemptCounts: {}, // key: `${problemId}::${stepId}` -> integer
    rows: [],
    pendingQueue: [],
    syncStatus: 'local', // 'local' | 'syncing' | 'synced' | 'error'
    lastSyncError: '',
    drawerOpen: false,
    els: {}
  };

  function storageKey(suffix) {
    return `tol_telemetry_${state.toolName}_${suffix}`;
  }

  function resolveIds() {
    const params = new URLSearchParams(window.location.search);
    const urlPeer = sanitizePeerId(params.get('peer') || params.get('tester'));
    const savedStudent = localStorage.getItem('tol_anon_student_id');
    if (urlPeer) {
      state.anonStudentId = urlPeer;
      localStorage.setItem('tol_anon_student_id', urlPeer);
    } else if (savedStudent) {
      state.anonStudentId = savedStudent;
    } else {
      state.anonStudentId = 'peer_' + randomHex(4);
      localStorage.setItem('tol_anon_student_id', state.anonStudentId);
    }

    const savedSession = sessionStorage.getItem(storageKey('session_id'));
    if (savedSession) {
      state.sessionId = savedSession;
    } else {
      const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      state.sessionId = `sess_${day}_${randomHex(4)}`;
      sessionStorage.setItem(storageKey('session_id'), state.sessionId);
    }

    try {
      const existingRows = JSON.parse(sessionStorage.getItem(storageKey('rows')) || '[]');
      if (Array.isArray(existingRows)) {
        state.rows = existingRows;
      }
      const savedAttempts = JSON.parse(sessionStorage.getItem(storageKey('attempts')) || '{}');
      if (savedAttempts && typeof savedAttempts === 'object') {
        state.attemptCounts = savedAttempts;
      }
      state.txnCounter = Number(sessionStorage.getItem(storageKey('txn_counter')) || '0') || 0;
    } catch (_) {
      state.rows = [];
    }
  }

  function persistSessionState() {
    try {
      sessionStorage.setItem(storageKey('rows'), JSON.stringify(state.rows));
      sessionStorage.setItem(storageKey('attempts'), JSON.stringify(state.attemptCounts));
      sessionStorage.setItem(storageKey('txn_counter'), String(state.txnCounter));
    } catch (_) {
      // Ignore quota errors on very long sessions
    }
  }

  function hasCloudConfig() {
    return Boolean(
      state.supabaseUrl &&
        state.supabaseAnonKey &&
        /^https?:\/\//.test(state.supabaseUrl) &&
        !state.supabaseUrl.includes('YOUR_PROJECT_REF')
    );
  }

  async function flushToSupabase(newRows) {
    if (!hasCloudConfig() || !newRows || !newRows.length) {
      state.syncStatus = hasCloudConfig() ? state.syncStatus : 'local';
      updateInspectorUI();
      return;
    }
    state.syncStatus = 'syncing';
    updateInspectorUI();

    const endpoint = state.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/interaction_logs';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          apikey: state.supabaseAnonKey,
          Authorization: 'Bearer ' + state.supabaseAnonKey,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        keepalive: true,
        body: JSON.stringify(newRows)
      });
      if (!res.ok) {
        const errTxt = await res.text().catch(() => res.statusText);
        throw new Error(`HTTP ${res.status}: ${errTxt.slice(0, 120)}`);
      }
      state.syncStatus = 'synced';
      state.lastSyncError = '';
    } catch (err) {
      state.syncStatus = 'error';
      state.lastSyncError = err && err.message ? err.message : 'Network error';
    }
    updateInspectorUI();
  }

  function appendRows(newRows) {
    for (const r of newRows) {
      state.rows.push(r);
    }
    persistSessionState();
    updateInspectorUI();
    flushToSupabase(newRows);
  }

  function logContext(opts) {
    if (!state.initialized) init({});
    const problemId = String((opts && opts.problemId) || 'problem_default');
    const contextObj = (opts && opts.context) || {};
    state.lastStepTimestamp = Date.now();

    const row = {
      client_timestamp: new Date().toISOString(),
      anon_student_id: state.anonStudentId,
      session_id: state.sessionId,
      tool_name: state.toolName,
      message_type: 'context_message',
      transaction_id: null,
      problem_id: problemId,
      step_id: opts && opts.stepId ? String(opts.stepId) : null,
      selection: null,
      action: null,
      input: null,
      outcome: null,
      attempt_num: null,
      hint_level: 0,
      kc_id: null,
      feedback_or_bug_tag: null,
      step_duration_ms: null,
      context_json: contextObj
    };
    appendRows([row]);
    return row;
  }

  function logTransaction(opts) {
    if (!state.initialized) init({});
    const now = Date.now();
    const nowIso = new Date(now).toISOString();
    const durationMs = Math.max(0, now - (state.lastStepTimestamp || now));
    state.lastStepTimestamp = now;

    state.txnCounter += 1;
    const txnId = `txn_${String(state.txnCounter).padStart(3, '0')}`;

    const problemId = String(opts.problemId || 'problem_default');
    const stepId = String(opts.stepId || 'step_default');
    const outcome = String(opts.outcome || 'INCORRECT').toUpperCase();
    const isHint = Boolean(opts.isHint || outcome === 'HINT');
    const attemptKey = `${problemId}::${stepId}`;

    let attemptNum = null;
    if (!isHint) {
      state.attemptCounts[attemptKey] = (state.attemptCounts[attemptKey] || 0) + 1;
      attemptNum = state.attemptCounts[attemptKey];
    }

    const toolRow = {
      client_timestamp: nowIso,
      anon_student_id: state.anonStudentId,
      session_id: state.sessionId,
      tool_name: state.toolName,
      message_type: 'tool_message',
      transaction_id: txnId,
      problem_id: problemId,
      step_id: stepId,
      selection: String(opts.selection || stepId),
      action: String(opts.action || 'submit'),
      input: opts.input === undefined || opts.input === null ? '' : String(opts.input),
      outcome: null,
      attempt_num: null,
      hint_level: 0,
      kc_id: null,
      feedback_or_bug_tag: null,
      step_duration_ms: null,
      context_json: null
    };

    const tutorRow = {
      client_timestamp: nowIso,
      anon_student_id: state.anonStudentId,
      session_id: state.sessionId,
      tool_name: state.toolName,
      message_type: 'tutor_message',
      transaction_id: txnId,
      problem_id: problemId,
      step_id: stepId,
      selection: null,
      action: null,
      input: null,
      outcome: outcome,
      attempt_num: attemptNum,
      hint_level: isHint ? Number(opts.hintLevel || 1) : Number(opts.hintLevel || 0),
      kc_id: opts.kcId ? String(opts.kcId) : null,
      feedback_or_bug_tag: opts.feedbackOrBugTag ? String(opts.feedbackOrBugTag) : null,
      step_duration_ms: durationMs,
      context_json: null
    };

    appendRows([toolRow, tutorRow]);
    return { transactionId: txnId, toolRow, tutorRow };
  }

  function toCSVString() {
    const header = CSV_COLUMNS.join(',');
    const lines = state.rows.map((r) => CSV_COLUMNS.map((col) => csvEscape(r[col])).join(','));
    return [header, ...lines].join('\n');
  }

  function triggerDownload(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 150);
  }

  function exportCSV() {
    const fname = `${state.toolName}_${state.anonStudentId}_${state.sessionId}.csv`;
    triggerDownload(fname, toCSVString(), 'text/csv;charset=utf-8;');
  }

  function exportJSON() {
    const fname = `${state.toolName}_${state.anonStudentId}_${state.sessionId}.json`;
    triggerDownload(fname, JSON.stringify(state.rows, null, 2), 'application/json;charset=utf-8;');
  }

  function resetSession() {
    state.rows = [];
    state.attemptCounts = {};
    state.txnCounter = 0;
    const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    state.sessionId = `sess_${day}_${randomHex(4)}`;
    sessionStorage.setItem(storageKey('session_id'), state.sessionId);
    persistSessionState();
    updateInspectorUI();
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildInspectorDOM(mountConfig) {
    if (document.getElementById('tol-telemetry-drawer')) return;

    // 1. Trigger button: mount inside provided container or floating top-right pill
    const triggerBtn = document.createElement('button');
    triggerBtn.type = 'button';
    triggerBtn.id = 'tol-telemetry-trigger';
    triggerBtn.className = 'tol-tel-trigger ' + ((mountConfig && mountConfig.triggerClass) || '');
    triggerBtn.setAttribute('aria-expanded', 'false');
    triggerBtn.setAttribute('aria-controls', 'tol-telemetry-drawer');
    triggerBtn.innerHTML =
      '<span class="tol-tel-dot" aria-hidden="true"></span>' +
      '<span>Telemetry</span>' +
      '<span class="tol-tel-count" id="tol-tel-count">0</span>';

    const targetContainer =
      mountConfig && mountConfig.mountInto
        ? document.querySelector(mountConfig.mountInto)
        : null;
    if (targetContainer) {
      if (mountConfig.insertBeforeSelector) {
        const ref = targetContainer.querySelector(mountConfig.insertBeforeSelector);
        targetContainer.insertBefore(triggerBtn, ref || targetContainer.firstChild);
      } else {
        targetContainer.appendChild(triggerBtn);
      }
    } else {
      triggerBtn.classList.add('tol-tel-trigger-floating');
      document.body.appendChild(triggerBtn);
    }

    // 2. Backdrop + Drawer (closed by default so learning viewport stays 100% Mayer-clean)
    const backdrop = document.createElement('div');
    backdrop.id = 'tol-telemetry-backdrop';
    backdrop.className = 'tol-tel-backdrop';
    backdrop.hidden = true;

    const drawer = document.createElement('aside');
    drawer.id = 'tol-telemetry-drawer';
    drawer.className = 'tol-tel-drawer';
    drawer.setAttribute('aria-label', 'Live Tutor & Tool Telemetry Inspector');
    drawer.hidden = true;

    drawer.innerHTML = `
      <div class="tol-tel-header">
        <div>
          <div class="tol-tel-eyebrow">05-840 Data Instrumentation · PSLC DataShop Schema</div>
          <h2 class="tol-tel-title">Live Interaction Telemetry</h2>
        </div>
        <button type="button" class="tol-tel-close" id="tol-tel-close" aria-label="Close Telemetry Inspector">&times;</button>
      </div>

      <div class="tol-tel-meta-bar">
        <div class="tol-tel-chip"><strong>Learner:</strong> <code id="tol-tel-student"></code></div>
        <div class="tol-tel-chip"><strong>Session:</strong> <code id="tol-tel-session"></code></div>
        <div class="tol-tel-chip" id="tol-tel-sync-badge"></div>
      </div>

      <details class="tol-tel-cloud-box">
        <summary>Supabase Cloud Sink (GitHub Pages &rarr; RLS Table)</summary>
        <div class="tol-tel-cloud-body">
          <p class="tol-tel-cloud-help">
            Streams <code>context_message</code>, <code>tool_message</code> (SAI), and <code>tutor_message</code> rows directly to <code>public.interaction_logs</code> via INSERT-only Row-Level Security.
          </p>
          <div class="tol-tel-cloud-inputs">
            <input type="url" id="tol-tel-sb-url" placeholder="https://your-project.supabase.co" autocomplete="off" />
            <input type="text" id="tol-tel-sb-key" placeholder="Supabase publishable / anon key" autocomplete="off" />
            <button type="button" id="tol-tel-sb-save" class="tol-tel-btn tol-tel-btn-primary">Connect &amp; Sync</button>
          </div>
        </div>
      </details>

      <div class="tol-tel-actions">
        <button type="button" id="tol-tel-export-csv" class="tol-tel-btn tol-tel-btn-primary">Export CSV</button>
        <button type="button" id="tol-tel-export-json" class="tol-tel-btn">Export JSON</button>
        <button type="button" id="tol-tel-peer-switch" class="tol-tel-btn" title="Simulate a new peer session ID">New Peer Session</button>
      </div>

      <div class="tol-tel-legend">
        <span class="tol-tel-pill tol-tel-pill-context">CONTEXT</span> Stage / Persona
        <span class="tol-tel-pill tol-tel-pill-tool">TOOL (SAI)</span> Learner Action
        <span class="tol-tel-pill tol-tel-pill-tutor">TUTOR</span> Evaluation + KC
      </div>

      <div class="tol-tel-stream" id="tol-tel-stream" role="log" aria-live="polite"></div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    state.els = {
      triggerBtn,
      backdrop,
      drawer,
      count: drawer.ownerDocument.getElementById('tol-tel-count'),
      student: drawer.querySelector('#tol-tel-student'),
      session: drawer.querySelector('#tol-tel-session'),
      syncBadge: drawer.querySelector('#tol-tel-sync-badge'),
      sbUrl: drawer.querySelector('#tol-tel-sb-url'),
      sbKey: drawer.querySelector('#tol-tel-sb-key'),
      sbSave: drawer.querySelector('#tol-tel-sb-save'),
      stream: drawer.querySelector('#tol-tel-stream')
    };

    state.els.sbUrl.value = state.supabaseUrl || '';
    state.els.sbKey.value = state.supabaseAnonKey || '';

    function setDrawerOpen(open) {
      state.drawerOpen = open;
      backdrop.hidden = !open;
      drawer.hidden = !open;
      triggerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) updateInspectorUI();
    }

    triggerBtn.addEventListener('click', () => setDrawerOpen(!state.drawerOpen));
    backdrop.addEventListener('click', () => setDrawerOpen(false));
    drawer.querySelector('#tol-tel-close').addEventListener('click', () => setDrawerOpen(false));
    drawer.querySelector('#tol-tel-export-csv').addEventListener('click', exportCSV);
    drawer.querySelector('#tol-tel-export-json').addEventListener('click', exportJSON);
    drawer.querySelector('#tol-tel-peer-switch').addEventListener('click', () => {
      state.anonStudentId = 'peer_' + randomHex(4);
      localStorage.setItem('tol_anon_student_id', state.anonStudentId);
      resetSession();
      if (typeof state.onNewPeerSession === 'function') {
        state.onNewPeerSession(state.anonStudentId, state.sessionId);
      }
    });

    state.els.sbSave.addEventListener('click', () => {
      state.supabaseUrl = state.els.sbUrl.value.trim();
      state.supabaseAnonKey = state.els.sbKey.value.trim();
      localStorage.setItem(storageKey('sb_url'), state.supabaseUrl);
      localStorage.setItem(storageKey('sb_key'), state.supabaseAnonKey);
      if (hasCloudConfig() && state.rows.length > 0) {
        flushToSupabase(state.rows);
      } else {
        updateInspectorUI();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.drawerOpen) setDrawerOpen(false);
    });
  }

  function updateInspectorUI() {
    if (!state.els.count) return;
    state.els.count.textContent = String(state.rows.length);
    state.els.student.textContent = state.anonStudentId;
    state.els.session.textContent = state.sessionId;

    if (!hasCloudConfig()) {
      state.els.syncBadge.innerHTML = '<span class="tol-tel-status tol-tel-status-local">Local + CSV Ready</span>';
    } else if (state.syncStatus === 'syncing') {
      state.els.syncBadge.innerHTML = '<span class="tol-tel-status tol-tel-status-sync">Syncing Supabase...</span>';
    } else if (state.syncStatus === 'synced') {
      state.els.syncBadge.innerHTML = '<span class="tol-tel-status tol-tel-status-ok">Supabase Synced</span>';
    } else if (state.syncStatus === 'error') {
      state.els.syncBadge.innerHTML =
        '<span class="tol-tel-status tol-tel-status-err" title="' +
        escapeHtml(state.lastSyncError) +
        '">Sync Error</span>';
    } else {
      state.els.syncBadge.innerHTML = '<span class="tol-tel-status tol-tel-status-ok">Supabase Ready</span>';
    }

    if (!state.drawerOpen) return;

    if (state.rows.length === 0) {
      state.els.stream.innerHTML =
        '<div class="tol-tel-empty">Interact with the assessment (submit an answer, test a misconception, or click a hint) to inspect live <code>context_message</code>, <code>tool_message</code>, and <code>tutor_message</code> rows.</div>';
      return;
    }

    const html = state.rows
      .slice()
      .reverse()
      .map((r) => {
        const time = r.client_timestamp ? r.client_timestamp.slice(11, 23) : '';
        if (r.message_type === 'context_message') {
          return `
            <div class="tol-tel-row tol-tel-row-context">
              <div class="tol-tel-row-top">
                <span class="tol-tel-pill tol-tel-pill-context">CONTEXT</span>
                <code>${escapeHtml(r.problem_id)}</code>
                <span class="tol-tel-time">${escapeHtml(time)}</span>
              </div>
              <div class="tol-tel-row-body">
                <code>${escapeHtml(JSON.stringify(r.context_json || {}))}</code>
              </div>
            </div>
          `;
        }
        if (r.message_type === 'tool_message') {
          return `
            <div class="tol-tel-row tol-tel-row-tool">
              <div class="tol-tel-row-top">
                <span class="tol-tel-pill tol-tel-pill-tool">TOOL</span>
                <code>${escapeHtml(r.transaction_id)}</code>
                <span class="tol-tel-step">${escapeHtml(r.problem_id)} / ${escapeHtml(r.step_id)}</span>
                <span class="tol-tel-time">${escapeHtml(time)}</span>
              </div>
              <div class="tol-tel-row-body">
                <strong>S:</strong> <code>${escapeHtml(r.selection)}</code> &middot;
                <strong>A:</strong> <code>${escapeHtml(r.action)}</code> &middot;
                <strong>I:</strong> <code>${escapeHtml(r.input)}</code>
              </div>
            </div>
          `;
        }
        const outClass =
          r.outcome === 'CORRECT'
            ? 'tol-tel-out-correct'
            : r.outcome === 'HINT'
            ? 'tol-tel-out-hint'
            : 'tol-tel-out-incorrect';
        return `
          <div class="tol-tel-row tol-tel-row-tutor">
            <div class="tol-tel-row-top">
              <span class="tol-tel-pill tol-tel-pill-tutor">TUTOR</span>
              <code>${escapeHtml(r.transaction_id)}</code>
              <span class="tol-tel-outcome ${outClass}">${escapeHtml(r.outcome)}</span>
              ${r.attempt_num ? `<span class="tol-tel-meta">Attempt #${r.attempt_num}</span>` : ''}
              ${r.hint_level ? `<span class="tol-tel-meta">Hint L${r.hint_level}</span>` : ''}
              <span class="tol-tel-time">${r.step_duration_ms != null ? r.step_duration_ms + ' ms' : ''}</span>
            </div>
            <div class="tol-tel-row-body">
              <strong>KC:</strong> <code>${escapeHtml(r.kc_id || '-')}</code>
              ${r.feedback_or_bug_tag ? ` &middot; <strong>Tag:</strong> <code>${escapeHtml(r.feedback_or_bug_tag)}</code>` : ''}
            </div>
          </div>
        `;
      })
      .join('');

    state.els.stream.innerHTML = html;
  }

  function init(config) {
    const cfg = config || {};
    state.toolName = cfg.toolName || state.toolName;
    const savedUrl = localStorage.getItem(storageKey('sb_url')) || '';
    const savedKey = localStorage.getItem(storageKey('sb_key')) || '';
    state.supabaseUrl = cfg.supabaseUrl || savedUrl || '';
    state.supabaseAnonKey = cfg.supabaseAnonKey || savedKey || '';
    state.onNewPeerSession = cfg.onNewPeerSession || null;

    resolveIds();
    state.initialized = true;

    const mountReady = () => {
      buildInspectorDOM(cfg);
      updateInspectorUI();
      if (new URLSearchParams(window.location.search).get('telemetry') === '1') {
        state.drawerOpen = true;
        if (state.els.drawer) {
          state.els.backdrop.hidden = false;
          state.els.drawer.hidden = false;
        }
        updateInspectorUI();
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountReady, { once: true });
    } else {
      mountReady();
    }

    return window.TOLTelemetry;
  }

  window.TOLTelemetry = {
    init,
    logContext,
    logTransaction,
    exportCSV,
    exportJSON,
    toCSVString,
    resetSession,
    getRows: () => state.rows.slice(),
    getSessionMeta: () => ({
      toolName: state.toolName,
      anonStudentId: state.anonStudentId,
      sessionId: state.sessionId,
      rowCount: state.rows.length
    })
  };
})();
