-- ============================================================================
-- CMU 05-840: Tools for Online Learning (Spring 2027)
-- Canonical Interaction Telemetry Schema for GitHub Pages + Supabase Free Tier
-- Instructions: Open Supabase -> SQL Editor -> Paste & Click "Run"
-- ============================================================================

create table if not exists public.interaction_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_timestamp timestamptz not null,
  anon_student_id text not null,
  session_id text not null,
  tool_name text not null,
  message_type text not null check (
    message_type in ('context_message', 'tool_message', 'tutor_message')
  ),
  transaction_id text,
  problem_id text not null,
  step_id text,
  selection text,
  action text,
  input text,
  outcome text check (
    outcome is null or outcome in ('CORRECT', 'INCORRECT', 'HINT', 'PARTIAL')
  ),
  attempt_num integer,
  hint_level integer not null default 0,
  kc_id text,
  feedback_or_bug_tag text,
  step_duration_ms integer,
  context_json jsonb
);

create index if not exists idx_interaction_logs_tool_session
  on public.interaction_logs (tool_name, session_id, client_timestamp);

alter table public.interaction_logs enable row level security;

-- Row-Level Security (RLS): Static GitHub Pages visitors (anon key) can INSERT
-- telemetry rows automatically, while SELECT / UPDATE / DELETE remain blocked
-- so only the project owner can view and export peer logs in Table Editor.
drop policy if exists "Allow anonymous telemetry inserts only" on public.interaction_logs;
create policy "Allow anonymous telemetry inserts only"
  on public.interaction_logs
  for insert
  to anon
  with check (true);
