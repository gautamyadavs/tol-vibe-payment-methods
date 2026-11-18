# AGENTS.md — Pedagogical, Multimedia, & Technical Steering Specification

**Project:** Smart Spending: Comparing Payment Methods for First-Year College Students (`tol-vibe-payment-methods`)  
**Course:** CMU 05-840 — Tools for Online Learning (Spring 2027, Tool Task 3 Demo #1)  
**Track:** Track A — Adaptive Mastery, Graduated Scaffolding, & Fading  
**Baseline Exemplar Replicated & Extended:** [*Smart Spending: Comparing Payment Methods for First-Year College Students*](https://miinakoyama.github.io/articulate/#/lessons/cml18wm70002i3b7heipi6l99) by Miina Koyama (Articulate Rise 360, Spring 2026 TA Showcase)

---

## 1. Domain Context, Learner Profile, & Carried-Over Learning Objectives

### Target Learner Profile
First-year undergraduate students managing an independent bank checking account, a starter student credit card, and peer-to-peer (P2P) mobile payment apps (Venmo, Zelle, Cash App) for the first time. Learners typically understand surface mechanics (*"debit spends my money now; credit bills me next month"*) but rely on brittle rules of thumb—especially *"debit is always safer than credit"*—that fail when overnight auto-pay bills, automated gas-pump holds, unfamiliar online checkouts, or group dinner splits collide.

### Exact Carried-Over Learning Objectives (`LO1`–`LO4`)
1. **LO1:** Compare debit cards, credit cards, and mobile payment apps in everyday college scenarios.
2. **LO2:** Evaluate payment methods across four trade-off dimensions: cost & fees, convenience, security/fraud protection, and budgeting/liquidity control.
3. **LO3:** Recognize how psychological factors (*pain of paying*, deferred payment, and reward-point chasing) influence spending choices.
4. **LO4:** Apply multi-step payment decision strategies to protect checking cash liquidity and avoid `$35` overdraft fees.

### Tracked Misconception Taxonomy
- **`liquidity_blindness` ("Debit Is Always Safer" Overgeneralization):** Draining checking cash right before scheduled automatic bills or ignoring temporary `$125` automated fuel-pump debit holds, resulting in preventable `$35` overdraft fees (`LO2`, `LO4`).
- **`fraud_exposure` (Unverified Seller & Cash-Freeze Risk):** Sending irreversible P2P transfers (Venmo/Zelle) to strangers in DMs/listings, or pulling real checking cash via Debit on unfamiliar websites instead of using Fair Credit Billing Act (FCBA) credit card protection (`LO1`, `LO2`).
- **`reward_chasing` (`2%` Points & Group-Tab IOU Trap):** Floating an entire group bill on Credit to earn `1.5%–2%` cashback points (risking unpaid friend shares that wipe out rewards `12x` over) or letting deferred billing dull spending awareness (`LO2`, `LO3`).

---

## 2. Mayer's Multimedia Learning Principles & Track A Design Rules

### 2.1 Strict Adherence to Mayer's Multimedia Principles (v2 Rebuild Guardrails)
1. **Coherence Principle (Zero Learner Meta-Clutter):** The learner canvas MUST contain **0%** CMU course headers, Track A taxonomy jargon, or telemetry chrome. All instructor notes, baseline links, state telemetry, and demo jump controls live exclusively inside a discreet slide-over drawer (`⚙️ LXD & Mayer Notes` in the bottom-right corner, closed by default).
2. **Pre-Training Principle (Lesson 1):** Introduce the four trade-off dimensions (*4-Factor Interactive Tabs*) and three psychological mechanisms (*3 Interactive Flip Flashcards*) in bite-sized conversational prose before asking learners to classify complex multi-constraint scenarios.
3. **Segmenting Principle:** Use full-width Rise `CONTINUE` dividers in Lesson 1 and render sorting/wallet challenges **strictly one card at a time** (never stack multiple scenario forms vertically on a single scrolling page).
4. **Multimedia & Embodiment Principles:** Pair concepts with Miina Koyama's authentic campus photography (`hero-student-card.jpg`, `cafe-payment-methods.jpg`, `student-options.jpg`) and anchor Lesson 3's scenario stage with Carlos's 8 expressive waist-up character poses (`carlos-*.png`) across 5 contextual backgrounds (`scene-dorm.jpg` → `scene-hotel.jpg` → `scene-restaurant.jpg` → `scene-night-alert.jpg` → `scene-beach-success.jpg`).
5. **Spatial Contiguity & Signaling Principles:**
   - In Lesson 2 & Lesson 4, place the 3 payment buckets directly underneath the active scenario prompt and render conversational feedback + hints right inside the same card within a single desktop viewport.
   - In Lesson 3, pin Carlos's **Live Wallet Bar** (`Checking Cash`, `Credit Card Balance`, `⚠️ Tomorrow 6 AM Auto-Pay: $120`, `Overdraft Fees`) directly inside the top of the Scenario Stage above Carlos and his choices.
6. **Personalization Principle:** Write all prompts, hints, and feedback in Miina Koyama's warm, peer-to-peer college voice rather than cold academic prose.

### 2.2 Track A Adaptive Scaffolding, Remediation, & Fading
- **Diagnostic Non-Giveaway Feedback:** Wrong choices immediately explain *why* that choice hurts checking cash, fraud safety, or budget awareness in conversational language without giving away which other bucket is optimal on Attempt 1.
- **3-Level Contingent Hints (`Need a Hint? (0/3)`):**
  - *Hint 1:* What clue or calendar constraint to check.
  - *Hint 2:* The key trade-off rule connecting the clue to payment behavior.
  - *Hint 3:* Concrete comparison/math check while leaving the final click to the learner.
- **In-Stage Worked Contrast Quick-Fix (Lesson 3 Adaptive Remediation):** Whenever a choice in Carlos's Spring Break scenario triggers a `$35` overdraft, exposes bank cash to an unverified seller, or reaches `>= 2` cumulative errors in a misconception category, Carlos switches to `carlos-thinking.png` right inside the stage with a side-by-side **Worked Contrast (`❌ Naive` vs. `✅ Strategic`) + 1-Question Quick Check** before unlocking choice revision.
- **Scaffold Fading in Lesson 4 (`Solo Challenge: Move-In Week`):** Maya's 3-step transfer challenge (`$210` Checking, `$130` 11:59 PM electric utility draft noted once in her planner brief) removes context-signaling pills and fades the `⚠️ Auto-Pay` warning pill out of the wallet bar, leaving a realistic raw bank view solvable in `< 90 seconds`.

---

## 3. UI Aesthetic & Technical Architecture

### 3.1 Authentic Articulate Rise 360 Classic (`#FF631E`) Visual System
- **Two-Column Shell:** Fixed `272px` left sidebar (collapsible via mobile hamburger menu `< 960px`) with vibrant `#FF631E` header block, progress bar (`X% COMPLETE`), and 4 lesson buttons featuring `18px` SVG circular progress rings + completion checkmarks; `#FFFFFF` main lesson canvas (`max-width: 780px`).
- **Typography:** Google Fonts **`Lato` (`400, 700, 900`)** for headings, tabs, wallet figures (`font-variant-numeric: tabular-nums`), and Rise `CONTINUE` buttons + **`Merriweather` (`400, 700`)** for narrative prose (`16.5px`, `line-height: 1.7`, `#313537`). Never use `JetBrains Mono` eyebrows or `border-left` accent stripes.

### 3.2 Stack & Canonical State (`app.js` + `tol-telemetry.js`)
- Pure static Vanilla HTML5 (`index.html`), CSS3 (`styles.css`, `tol-telemetry.css`), ES6+ JavaScript (`tol-telemetry.js`, `app.js`), Supabase Postgres schema (`setup_telemetry.sql`), `.nojekyll`, and `assets/`. Zero external JS libraries, zero build step.
- Persistent learner state in `localStorage` (`tol_smart_spending_rise_v2`) tracking `activeSection`, `attempts`, `hintsUsed`, `misconceptions`, `remediationsCompleted`, and per-lesson progress across Sections 1–4, paired with session-scoped PSLC DataShop interaction rows in `sessionStorage` (`tol_telemetry_tol-vibe-payment-methods_*`).

### 3.3 Verification Protocol
1. Run `node --check app.js` and `node --check tol-telemetry.js` (zero syntax errors).
2. Verify single `<h1>` across every rendered view, unique `id` on every button/link, zero `border-left` rules in `styles.css`, and zero broken `assets/` images.
3. Verify headless `/usr/bin/chromium` execution across all 4 lessons, Track A Quick-Fix remediation, the `⚙️ LXD & Mayer Notes` drawer, and the `#tol-telemetry-drawer` Live Telemetry Inspector (`TOLTelemetry.getRows()` + `toCSVString()`) with zero console errors and zero horizontal overflow at `1440x900` and `390x844`.

---

## Data Instrumentation & Supabase Telemetry Spec (Tool Task 6 Exemplar)

This repository implements CMU 05-840's canonical **PSLC DataShop-aligned three-message interaction schema** (`context_message`, `tool_message`, `tutor_message`) via `window.TOLTelemetry` (`tol-telemetry.js` + `tol-telemetry.css`), mounted closed-by-default inside `#instructor-controls-dock` right beside `⚙️ LXD & Mayer Notes` (`toolName: 'tol-vibe-payment-methods'`) to preserve 100% Mayer Coherence on the learner canvas.

### KC–Step–SAI & Misconception Tag Mapping

| Section / Stage | `problem_id` | `step_id` | `selection` | `action` | `input` (SAI) | `kc_id` | `feedback_or_bug_tag` (`CORRECT` / `INCORRECT` / `HINT`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Lesson 2: Card 1** *(Unfamiliar Hotel Site)* | `s2_match_s1` | `s1_payment_bucket` | `s1_payment_bucket` | `select_payment_method` | `Credit` / `Debit` / `Mobile_P2P` | `KC_classify_payment_mechanics` | `affirm_fcba_credit_shield` · `bug_debit_checking_cash_freeze_on_dispute` · `bug_p2p_unverified_seller_no_chargeback` |
| **Lesson 2: Card 2** *($48 Friend Rideshare Split)* | `s2_match_s2` | `s2_payment_bucket` | `s2_payment_bucket` | `select_payment_method` | `Mobile_P2P` / `Credit` / `Debit` | `KC_compare_interest_and_fees` | `affirm_zero_fee_p2p_peer_split` · `bug_reward_points_group_iou_trap` · `bug_debit_full_group_tab_cash_drain` |
| **Lesson 2: Card 3** *($65 Grocery Budget)* | `s2_match_s3` | `s3_payment_bucket` | `s3_payment_bucket` | `select_payment_method` | `Debit` / `Credit` / `Mobile_P2P` | `KC_classify_payment_mechanics` | `affirm_debit_pain_of_paying_budget` · `bug_deferred_billing_impulse_creep` · `bug_p2p_retail_lane_mismatch` |
| **Lesson 2: Card 4** *($180 Charger vs. Thu Auto-Pay)* | `s2_match_s4` | `s4_payment_bucket` | `s4_payment_bucket` | `select_payment_method` | `Credit` / `Debit` / `Mobile_P2P` | `KC_compare_interest_and_fees` | `affirm_credit_grace_period_avoids_overdraft` · `bug_debit_overdraft_before_autopay` · `bug_bank_linked_p2p_overdraft_before_autopay` |
| **Lesson 2: Card 5** *(Stranger DM Concert Tickets)* | `s2_match_s5` | `s5_payment_bucket` | `s5_payment_bucket` | `select_payment_method` | `Credit` / `Mobile_P2P` / `Debit` | `KC_classify_payment_mechanics` | `affirm_verified_checkout_fcba_shield` · `bug_p2p_stranger_dm_scam_irreversible` · `bug_debit_checking_cash_freeze_on_dispute` |
| **Lesson 3: Carlos Scene 1** *($200 Hotel Deposit · $240 Checking)* | `s3_carlos_c1` | `c1_wallet_decision` | `c1_wallet_decision` | `select_payment_method` | `Credit` / `Debit` / `Mobile_P2P` | `KC_evaluate_situational_payment_risk` | `affirm_fcba_shield_and_autopay_buffer` · `bug_debit_overdraft_and_unverified_seller_exposure` · `bug_p2p_unverified_host_and_overdraft` |
| **Lesson 3: Carlos Scene 2** *($100 Group Dinner · 2% Points)* | `s3_carlos_c2` | `c2_wallet_decision` | `c2_wallet_decision` | `select_payment_method` | `Mobile_P2P` / `Debit` / `Credit` | `KC_evaluate_situational_payment_risk` | `affirm_instant_p2p_table_split` · `bug_debit_full_group_tab_liquidity_squeeze` · `bug_reward_chasing_2pct_group_iou_trap` |
| **Lesson 3: Carlos Scene 3** *(6 AM Auto-Pay & $125 Pump Hold)* | `s3_carlos_c3` | `c3_wallet_decision` | `c3_wallet_decision` | `select_payment_method` | `Credit` / `Debit` / `Mobile_P2P` | `KC_evaluate_situational_payment_risk` | `affirm_credit_avoids_pump_hold_overdraft` · `bug_debit_overdraft_or_deposit_hold` · `bug_bank_linked_p2p_overdraft_before_6am_autopay` |
| **Lesson 3: Worked-Contrast Quick-Fix** *(Liquidity / Fraud / Rewards)* | `s3_carlos_<c1\|c2\|c3>` | `<c1\|c2\|c3>_quickfix_remediation` | `<c1\|c2\|c3>_quickfix_remediation` | `select_quickfix_option` | `A_*` / `B_*` / `C_*` | `KC_remediate_payment_contrast` | `affirm_quickfix_*_mastered` · `bug_quickfix_*` |
| **Lesson 4: Maya Move 1** *(Faded · Classifieds Mini-Fridge)* | `s4_maya_m1` | `m1_faded_transfer` | `m1_faded_transfer` | `select_payment_method` | `Credit` / `Debit` / `Mobile_P2P` | `KC_transfer_autonomous_payment_choice` | `affirm_transfer_fcba_and_draft_buffer` · `bug_debit_overdraft_or_deposit_hold` · `bug_p2p_unverified_classifieds_and_overdraft` |
| **Lesson 4: Maya Move 2** *(Faded · Suitemate Supplies Split)* | `s4_maya_m2` | `m2_faded_transfer` | `m2_faded_transfer` | `select_payment_method` | `Mobile_P2P` / `Credit` / `Debit` | `KC_transfer_autonomous_payment_choice` | `affirm_transfer_instant_p2p_suitemate_split` · `bug_reward_chasing_suitemate_iou_trap` · `bug_debit_full_group_tab_liquidity_squeeze` |
| **Lesson 4: Maya Move 3** *(Faded · 8 PM Lab Kit vs. 11:59 PM Draft)* | `s4_maya_m3` | `m3_faded_transfer` | `m3_faded_transfer` | `select_payment_method` | `Credit` / `Debit` / `Mobile_P2P` | `KC_transfer_autonomous_payment_choice` | `affirm_transfer_grace_period_bridges_payday` · `bug_debit_overdraft_before_1159pm_draft` · `bug_bank_linked_p2p_overdraft_before_1159pm_draft` |
| **Contingent & Faded Hints** *(Lessons 2, 3, & 4)* | Active `problem_id` | Active `step_id` | `<id>_hint_button` / `<id>_faded_hint_button` | `request_hint` | `hint_level_1..3` | Step's active `kc_id` | `scaffold_graduated_hint_L1..L3` · `scaffold_faded_optional_hint_L1..L3` (`outcome: 'HINT'`) |

### Commit Boundary Rules
1. **Context Messages Only on Assessment Stage Entry / Remediation Open:** `TOLTelemetry.logContext` fires strictly once whenever an interactive assessment card/scene/move loads (`s2_match_*`, `s3_carlos_*` including starting `checking_cash` / `credit_balance` / `autopay_6am_due_usd`, `s4_maya_*` with `scaffolds_faded: true`) or when an inline Worked-Contrast Quick-Fix remediation card opens (`event: 'quickfix_remediation_opened'`).
2. **Transactions Strictly on Graded Commits & Explicit Hint Requests:** `TOLTelemetry.logTransaction` emits paired `tool_message` + `tutor_message` rows (sharing `transaction_id`, `step_duration_ms`, `attempt_num`, `hint_level`, `kc_id`, and `feedback_or_bug_tag`) **only** when the learner commits a payment bucket/choice, answers a Quick-Fix check, or clicks a hint button.
3. **Zero Passive Noise:** Passive Lesson 1 Pre-Training tab switches, flashcard flips, `CONTINUE` clicks, sidebar/dot navigation, scrolling, and `⚙️ LXD & Mayer Notes` drawer toggles **never** emit `tool_message` or `tutor_message` rows, and duplicate clicks on an already-solved identical selection are ignored.

### 3-Step Supabase Free Tier + GitHub Pages Setup
1. **Provision Table & INSERT-Only RLS:** Create a free Supabase project, open **SQL Editor**, paste [`setup_telemetry.sql`](./setup_telemetry.sql), and click **Run** to create `public.interaction_logs` with anonymous `INSERT`-only Row-Level Security (`SELECT`/`UPDATE`/`DELETE` blocked for `anon`).
2. **Connect Live Demo or Share Peer Links:** Open the deployed GitHub Pages site (optionally appending `?peer=peer_01` to tag anonymous peer-test sessions), click the **`Telemetry`** pill in the bottom-right dock, expand **Supabase Cloud Sink**, and paste your Project URL + Publishable `anon` Key to click **Connect & Sync**.
3. **Export Clean PSLC DataShop Logs:** Query or export rows directly from Supabase **Table Editor** (`public.interaction_logs`)—or offline at any time via **Export CSV** / **Export JSON** inside the Telemetry Inspector drawer.

