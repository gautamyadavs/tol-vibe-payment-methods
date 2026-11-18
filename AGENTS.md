# AGENTS.md — Pedagogical & Technical Steering Specification

**Project:** Smart Spending: Payment Trade-Offs & Cash Liquidity (`tol-vibe-payment-methods`)  
**Course:** CMU 05-840 — Tools for Online Learning (Spring 2027, Tool Task 3 Demo #1)  
**Track:** Track A — Adaptive Mastery, Graduated Scaffolding, & Fading  
**Baseline Exemplar Replicated & Extended:** [*Smart Spending: Comparing Payment Methods for First-Year College Students*](https://miinakoyama.github.io/articulate/#/lessons/cml18wm70002i3b7heipi6l99) by Miina Koyama (Articulate Rise 360, Spring 2026 TA Showcase)

---

## 1. Domain Context, Learner Profile, & Carried-Over Learning Objectives

### Target Learner Profile
First-year undergraduate students managing an independent bank checking account, a starter student credit card, and peer-to-peer (P2P) mobile payment apps (Venmo, Cash App, Zelle) for the first time. Learners typically understand surface mechanics ("debit uses my own money; credit borrows money") but hold brittle heuristics—especially the overgeneralized rule that *"using a debit card is always safer than credit"*—that break down when scheduled auto-debits, fuel-pump pre-authorization holds, unverified online merchants, or group bill splits collide.

### Exact Carried-Over Learning Objectives
Every interactive task, hint, remediation micro-task, and mastery check MUST align directly to these four carried-over objectives from the Spring 2026 Articulate Rise 360 baseline:

- **LO1:** Compare debit cards, credit cards, and mobile payment apps in real-life college scenarios.
- **LO2:** Evaluate payment methods across four trade-off dimensions: cost/fees, convenience, security/fraud protection, and budgeting/liquidity control.
- **LO3:** Recognize how psychological factors (pain of paying, deferred payment illusion, reward-point chasing) influence spending choices.
- **LO4:** Apply multi-step payment decision strategies to protect cash liquidity and avoid overdraft fees.

### Target Misconception Taxonomy
All diagnostic evaluations across Stages 1–3 classify suboptimal decisions into one or more tracked misconception counters:

1. **`liquidity_blindness` ("Debit Is Always Safer" Overgeneralization):** Assuming immediate checking deduction is inherently prudent while ignoring pending automated clearing house (ACH) bills, merchant pre-authorization holds, or short-term timing gaps before guaranteed income—resulting in preventable `$35` overdraft fees (`LO2`, `LO4`).
2. **`fraud_exposure` (Dispute Liability & Cash-Freeze Asymmetric Risk):** Treating authorized P2P transfers to strangers as reversible purchases, or ignoring that debit card disputes under Regulation E leave actual checking funds frozen during bank investigation whereas credit card disputes under the Fair Credit Billing Act (FCBA) withhold the issuer's funds (`LO1`, `LO2`).
3. **`reward_chasing` (Deferred Payment Illusion & Points-Math Trap):** Rationalizing unbudgeted impulse add-ons or floating uncollected group tabs on a credit card to earn `1.5%–3%` reward points, dulling the psychological *pain of paying* (Prelec & Loewenstein, 1998) and exposing the learner to IOU defaults or `24%+` APR interest (`LO2`, `LO3`).

---

## 2. Learning Science & Instructional Design Rules

### 2.1 Active Relational Practice Over Passive Reading ("Doer Effect")
- Keep reference exposition concise and collapsible; prioritize interactive decision-making (Koedinger et al., 2015).
- **Stage 1 (Scenario Trade-Off Classifier)** replaces Rise 360's single-bucket Sorting Block with **joint two-part classification**: for 4 realistic college scenarios, learners select **both** the optimal payment method (`Debit Card`, `Credit Card`, `Mobile P2P App`) **and** the primary trade-off mechanism justifying it (`Fraud Protection`, `Cash Liquidity Buffer`, `Split Convenience`, or `Pain-of-Paying Budget Control`, presented as 3 diagnostic choices per item following Haladyna & Rodriguez, 2013).
- Selecting the right payment method for the wrong reason MUST be caught and diagnosed rather than scored correct.

### 2.2 Diagnostic Feedback Contract (Zero Attempt-1 Giveaways)
- **Never** return binary `"Correct!"` or `"Incorrect, try again"` labels.
- **Never** disclose the correct option on Attempt 1 (Shute, 2008; Hattie & Timperley, 2007).
- Every check MUST explain the *causal financial or psychological consequence* of the learner's exact choice combination (e.g., how Regulation E bank freezes affect pending bills, why P2P transfers lack chargeback rights, or how `$125` fuel-pump holds interact with overnight auto-debits) and prompt deliberate revision.

### 2.3 3-Level Contingent Graduated Hints
Every decision step MUST expose a `Request Hint (0/3)` control delivering three cumulative, non-giveaway levels (Wood, Bruner, & Ross, 1976):
1. **Level 1 — Metacognitive Prompt:** Directs self-monitoring toward the hidden constraint in the scenario (who bears risk, when cash leaves checking, or whether spending friction helps or hurts).
2. **Level 2 — Conceptual Trade-Off Cue:** Connects the situation to the specific trade-off dimension (`LO2`/`LO3`) comparing how the three methods behave under that constraint.
3. **Level 3 — Concrete Liquidity / Protection Check:** Walks through the exact arithmetic or liability rule (e.g., subtracting pending auto-debits + pump holds from checking) while still requiring the learner to select and submit the decision.

### 2.4 Adaptive Mastery & Targeted Remediation Rule
- Maintain persistent misconception counters (`liquidity_blindness`, `fraud_exposure`, `reward_chasing`) across Stages 1 and 2.
- **Trigger Condition:** If a learner accumulates `>= 2` errors across Stages 1–2 OR triggers a Checking overdraft / projected 6:00 AM auto-debit overdraft / elevated-or-severe fraud exposure in Stage 2, automatically unlock and route them through a **Targeted Remediation Micro-Task** aligned to their dominant misconception before they revise and advance.
- Each Remediation Micro-Task MUST pair (a) a compact **Worked Financial Contrast** comparing naive vs. strategic timelines with (b) a **3-option Transfer Verification Item** that must be solved to unlock step revision.
- Allow instructors to launch and inspect all three Remediation Micro-Tasks on demand from `Learning Engineer View`.

### 2.5 Structural Scaffolding & Fading for Transfer (Stage 3)
- **Stages 1 & 2 (Scaffolded):** Provide explicit **Channeling Scaffolds** (context-signal badges highlighting merchant verification, split structure, or auto-pay windows) and **Focusing Scaffolds** (in Stage 2's ledger, pre-subtracting the `$120` 6:00 AM auto-debit into a visible `Net Safe Checking Buffer` row and displaying an explicit auto-debit alert).
- **Stage 3 ("Campus Move-In Week" — Faded Transfer):** Once Stages 1 and 2 are mastered, strip all channeling badges, remove pre-computed safe-balance subtraction rows from the bank view, collapse the reference matrix, and remove pre-highlighted auto-pay alert banners (Pea, 2004; Puntambekar & Hübscher, 2005). Learners must manage Maya's `$210` Checking balance across 3 move-in transactions while independently accounting for a `$130` 11:59 PM electric utility auto-draft mentioned in the prose brief.

### 2.6 Cognitive Load & Anti-Gamification Guardrails
- **Forbidden:** Countdown timers, streak counters, XP points, leaderboards, sound effects, or confetti animations (Sweller, 1988; Mayer, 2009). Motivation comes from authentic financial consequence visibility and mastery clarity.

---

## 3. Technical Architecture, State Schema, & Simulation Rules

### 3.1 Stack Boundaries
- Pure static Vanilla HTML5 (`index.html`), Vanilla CSS (`styles.css`), and Vanilla ES6+ JavaScript (`app.js`), plus `.nojekyll`, `AGENTS.md`, and `README.md`.
- Zero external JavaScript libraries or frameworks, zero build step, zero client-side API keys, zero network telemetry.

### 3.2 Canonical Application State (`app.js`)
```js
state = {
  activeStage: 1,                  // 1 | 2 | 3
  learningEngineerView: false,     // Toggled via topbar [aria-pressed] button
  primerOpen: false,               // Collapsible 4-dimension reference matrix
  misconceptions: {
    liquidity_blindness: 0,
    fraud_exposure: 0,
    reward_chasing: 0
  },
  totalErrors: 0,
  remediatedTypes: {},             // Tracks completed micro-tasks per misconception key
  activeRemediation: null,         // { type, reason, triggerSource, selectedOption, verified }
  stage1: { items: { ... }, mastered: false },
  stage2: { steps: { ... }, settled: false, mastered: false },
  stage3: { steps: { ... }, settled: false, mastered: false, hintsUsed: 0, errorsCount: 0 }
}
```

### 3.3 Deterministic Multi-Step Ledger Arithmetic
- **Stage 2 — Carlos's Spring Break Simulation:**
  - Initial accounts: `Checking Cash = $240`, `Credit Balance = $0`, `Pending Auto-Debit Hold = $120` (annual streaming renewal at 6:00 AM tomorrow).
  - **Step 2.1 (`$200` Unfamiliar Hotel Site Deposit):** Debit (`-$200` Checking -> `$40`, Elevated Reg E freeze risk, projected 6:00 AM overdraft `-$80` + `$35` fee); Credit (`+$200` Credit, Checking stays `$240`, FCBA Protected — *Optimal*); P2P (`-$200` Checking -> `$40`, Severe irreversible fraud exposure + projected overdraft).
  - **Step 2.2 (`$100` Group Dinner; Carlos's share `$25`):** Credit whole `$100` for `2%` points (`+$100` Credit floating `$75` uncollected IOUs — `reward_chasing`); Debit whole `$100` (`-$100` Checking — `liquidity_blindness`); Pay `$25` share + instant table P2P split (`-$25` Checking -> `$215` — *Optimal*).
  - **Step 2.3 (`$80` Late-Night Automated Fuel Pump after `$120` 6:00 AM Auto-Debit Alert):** Outdoor pump places a temporary `$125` Debit pre-authorization hold (`$215 - $125 = $90` available at 6:00 AM -> `$120` auto-debit triggers `-$30` overdraft + `$35` fee + pump skimmer risk); Credit tap-to-pay `$80` only (`+$80` Credit -> `$280`, Checking stays `$215`, 6:00 AM `$120` auto-debit clears leaving `$95` Checking & `$0` fees — *Optimal*); Credit `$80` fuel + `$35` impulse snacks to hit `$300` weekend promo for `$10` bonus points (`+$115` Credit, `-$25` net overspend — `reward_chasing`).
- **Stage 3 — Maya's Campus Move-In Week (Faded Transfer):**
  - Initial accounts: `Checking Cash = $210`, `Credit Balance = $0`, prose brief notes `$130` city electric utility setup draft pulling automatically from Checking at 11:59 PM tonight (not pre-subtracted on raw bank view).
  - **Step 3.1 (`$95` Mini-Fridge on Unverified Classifieds Site):** Credit (`+$95` Credit, Checking `$210`, FCBA Protected — *Optimal*) vs. Debit or P2P (`-$95` Checking -> `$115`, setting up 11:59 PM overdraft + fraud risk).
  - **Step 3.2 (`$60` Suite Cleaning Supplies; Maya's share `$20`):** Instant `$20` P2P split at register (`-$20` Checking -> `$190` — *Optimal*) vs. Credit `$60` waiving immediate repayment for `1.5%` cashback (`reward_chasing`) or Debit `$60` (`-$60` Checking -> `$150`, leaving razor-thin `$20` margin).
  - **Step 3.3 (`$75` Required Chemistry Lab Kit at 7:30 PM before Friday's `$400` Aid Refund):** Credit `$75` (`+$75` Credit -> `$170` paid Friday for `$0` interest, Checking stays `$190` so 11:59 PM `$130` utility draft clears leaving `$60` Checking & `$0` fees — *Optimal*) vs. Debit or Bank-Linked Campus P2P (`-$75` Checking -> `$115`, causing 11:59 PM `$130` utility draft to overdraft by `-$15` + `$35` fee).

### 3.4 `Learning Engineer View` Contract
Toggling `#btn-toggle-lxd` (`aria-pressed="true" | "false"`) reveals inline LXD callout panels across the module documenting:
1. Exact `LO1–LO4` alignment for that component,
2. Specific authoring limitations of Articulate Rise 360 overcome by custom stateful code, and
3. How `AGENTS.md` rules and live JS state variables govern adaptive scaffolding, remediation routing, and Stage 3 fading (including live misconception telemetry and one-click preview triggers for remediation paths and stages).

---

## 4. UI/Visual Guardrails, Accessibility, & Verification Checklist

### 4.1 Academic-Editorial Design System (Anti-"Shiny UI")
- **Surfaces & Ink:** `#FAF9F6` warm paper canvas, `#FFFFFF` elevated cards with uniform `1px solid #E5E5E0` borders and restrained soft shadow, `#18181B` primary ink, `#52525B` secondary ink.
- **Semantic Accents:** Deep slate/navy `#1E3A5F` primary interactive accent; muted forest `#166534` (`#F0FDF4` tint, `#BBF7D0` 1px border) for verified mastery; warm amber `#92400E` (`#FFFBEB` tint, `#FDE68A` 1px border) for diagnostic prompts and hints; brick `#991B1B` (`#FEF2F2` tint, `#FECACA` 1px border) for overdraft/fraud alerts.
- **Typography:** `Newsreader` (editorial headings), `Inter` (clean UI & instructional prose), and `JetBrains Mono` (`font-variant-numeric: tabular-nums` for all dollar amounts, ledger balances, and state telemetry).
- **Strict Visual Prohibitions:** NO purple-on-dark themes, NO colored `border-left` accent stripes on any callout or card, NO CSS gradient text, NO pulsing status pills above headlines, NO icon-stuffed bento grids, NO over-nested cards.

### 4.2 Semantic HTML & Accessibility Requirements
- Exactly **one `<h1>`** per document with logical `<h2>` / `<h3>` hierarchy; descriptive `<title>` and `<meta name="description">`.
- Unique, deterministic `id` attribute on **every** interactive element (`button`, `a`, selectable controls).
- `aria-pressed` on toggle buttons, `aria-live="polite"` on diagnostic feedback and live ledger balance updates, visible `:focus-visible` outlines, and fluid responsiveness from `360px` mobile viewports to `1440px` desktop screens.

### 4.3 Pre-Commit Verification Protocol
1. Run `node --check app.js` to confirm zero JavaScript syntax errors.
2. Verify single `<h1>`, non-empty `<title>` and `<meta name="description">`, zero duplicate `id` attributes across both static HTML and dynamically rendered templates, and zero `border-left` accent rules in `styles.css`.
3. Verify Stage 1 (`4/4`), Stage 2 (`3/3` + 6:00 AM settlement + remediation trigger), Stage 3 (`3/3` + 11:59 PM settlement with faded scaffolds), and `Learning Engineer View` state telemetry operate cleanly with zero runtime errors.
