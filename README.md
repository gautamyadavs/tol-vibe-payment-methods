# Smart Spending: Comparing Payment Methods for First-Year College Students

**Course:** CMU 05-840 — Tools for Online Learning (Spring 2027, Tool Task 3 Demo #1)  
**Track:** Track A — Adaptive Mastery, Graduated Scaffolding, & Fading  
**Live Demo URL:** [https://gautamyadavs.github.io/tol-vibe-payment-methods/](https://gautamyadavs.github.io/tol-vibe-payment-methods/)  
**Baseline S26 Articulate Rise 360 Exemplar:** [*Smart Spending: Comparing Payment Methods for First-Year College Students*](https://miinakoyama.github.io/articulate/#/lessons/cml18wm70002i3b7heipi6l99) by Miina Koyama (Spring 2026 TA Showcase)

---

## Overview

First-year college students frequently enter campus life relying on one overgeneralized rule of thumb—*"debit is always safer because it spends money I already have."* That rule breaks down when overnight automatic bills, `$125` automated gas-pump debit holds, unverified online listings, or group restaurant splits collide.

This static web application faithfully recreates the **Articulate Rise 360 Classic (`#FF631E`)** visual shell, friendly peer voice, campus photography, and Carlos scenario cast of **Miina Koyama's Spring 2026 course**, while extending its instructional engine through **Track A (Adaptive Mastery, Graduated Scaffolding, & Fading)** and **Mayer's Multimedia Learning Principles**. Built with zero-dependency Vanilla HTML5, CSS3, and ES6+ JavaScript governed by [`AGENTS.md`](./AGENTS.md), it upgrades Rise 360's stateless sorting cards and branching slides with live cash-flow wallets, diagnostic non-giveaway feedback, 3-level graduated hints, in-stage Worked Contrast Quick-Fixes, and Lesson 4 scaffold fading.

---

## Carried-Over Learning Objectives (`LO1`–`LO4`)

1. **LO1:** Compare debit cards, credit cards, and mobile payment apps in everyday college scenarios.
2. **LO2:** Evaluate payment methods across four trade-off dimensions: cost & fees, convenience, security/fraud protection, and budgeting/liquidity control.
3. **LO3:** Recognize how psychological factors (*pain of paying*, deferred payment, and reward-point chasing) influence spending choices.
4. **LO4:** Apply multi-step payment decision strategies to protect checking cash liquidity and avoid `$35` overdraft fees.

---

## Overcoming Articulate Rise 360 Authoring Constraints (Track A + Mayer Alignment)

| Lesson & Mayer Principle | S26 Rise 360 Baseline Limitation | Custom Track A Implementation |
| :--- | :--- | :--- |
| **1. How Payment Choices Work** *(Pre-Training, Multimedia, Segmenting)* | Static tabs and flip cards do not connect cleanly into downstream scenario state. | Preserves Miina's **4-Factor Tabs** + **3 Psychology Flip Flashcards** behind progressive Rise `CONTINUE` dividers (`Lato` + `Merriweather`) with concise 2-sentence explanations paired with campus photography. |
| **2. Match Payment to Scenario** *(Segmenting, Spatial Contiguity, Signaling)* | Rise Sorting Blocks bounce cards back with binary right/wrong motion and cannot diagnose *why* a student picked a bucket or offer graduated hints. | Presents Miina's **5 sorting scenarios one card at a time** inside a single desktop viewport above 3 target buckets (`Debit Card`, `Credit Card`, `Mobile Payment`), delivering immediate non-giveaway misconception feedback + `Need a Hint? (0/3)`. |
| **3. Spring Break Money Moves** *(Embodiment, Spatial Contiguity, Adaptive Remediation)* | Rise Scenario Blocks branch between static text slides with zero live numeric memory across Carlos's decisions. | Pins Carlos's **Live Wallet Bar** (`Checking Cash: $240`, `Credit: $0`, `⚠️ Tomorrow 6 AM Auto-Pay: $120`, `Overdraft Fees: $0`) directly inside the top of the visual stage alongside Carlos's 8 character poses (`carlos-*.png`) and 5 scene photos (`scene-*.jpg`). Any `$35` overdraft, unverified-seller cash exposure, or repeated misconception pauses Carlos (`carlos-thinking.png`) for a **1-question Worked Contrast Quick-Fix** before step revision. |
| **4. Solo Challenge: Move-In Week** *(Track A Structural Fading)* | Rise blocks maintain identical visual cues from start to finish, risking prompt dependency. | Maya's 3-step transfer challenge (`$210` Checking, `$130` 11:59 PM electric utility draft noted once in her planner brief) **fades out** the `⚠️ Auto-Pay` wallet warning pill and context-signal badges into a realistic raw bank view solvable in `< 90 seconds`. |
| **Coherence Principle (`0%` Learner Meta-Clutter)** | Academic/demo prototypes often clutter the learner screen with course rubrics and state debuggers. | Moves 100% of CMU 05-840 notes, Mayer audit documentation, live misconception telemetry, and grading jump/preview buttons into a discreet slide-over **`⚙️ LXD & Mayer Notes`** drawer. |

---

## Corrective Prompt Iteration Log (Including Mayer's Multimedia Audit Rebuild)

| Iteration | Failure Mode Diagnosed | Corrective Engineering & `AGENTS.md` Guardrail | Learning Science Rationale |
| :--- | :--- | :--- | :--- |
| **1. Diagnostic Feedback vs. Attempt-1 Giveaways** | Early AI drafts used standard multiple-choice items with binary `"Incorrect! Choose Credit Card"` banners on Attempt 1 plus gamified streak chrome. | Enforced non-giveaway causal explanations on Attempt 1, mapped suboptimal choices to `liquidity_blindness`, `fraud_exposure`, and `reward_chasing`, and added 3-level graduated hints. | Answer giveaways turn retrieval practice into passive reading (Shute, 2008); contingent hints scaffold self-monitoring (Wood, Bruner, & Ross, 1976). |
| **2. Stateful Wallet & Worked Contrast Remediation** | Treating hotel, dinner, and gas stops as isolated questions hid how early debit drains or `$125` fuel-pump holds collide with overnight auto-pay bills. | Connected Carlos's 3 scenes to a live wallet ledger (`$240` Checking, `$120` 6:00 AM auto-pay, `$125` pump hold) and added in-stage **Worked Contrast Quick-Fixes** before revision. | Cash-flow management (`LO4`) is cumulative; side-by-side naive vs. strategic contrasts repair brittle *"debit is always safer"* schemas. |
| **3. Mayer's Multimedia Principles & Authentic Rise 360 Rebuild (v1 → v2)** | **v1 Audit Failures:** (1) Generic AI dashboard look (`#FAF9F6` cream + `JetBrains Mono` all-caps eyebrows); (2) **Coherence** violation from CMU/LXD meta-headers on the learner screen; (3) **Multimedia/Embodiment** violation with zero photos or character art; (4) **Segmenting/Spatial Contiguity** violation from stacking 4 dual-matrix forms (`24` radios) on one scrolling page; (5) **Personalization** violation from cold academic jargon. | Rebuilt the UI in Miina Koyama's authentic **Rise 360 (`#FF631E`)** two-column shell (`Lato` + `Merriweather`), integrated all 17 authentic campus/scene/Carlos assets in `assets/`, enforced strict 1-card-at-a-time single-viewport cards, pinned the wallet bar inside Carlos's stage, rewrote copy in warm peer voice, and isolated all instructor/CMU telemetry into the discreet `⚙️ LXD & Mayer Notes` drawer. | Eliminates extraneous cognitive load (**Coherence** & **Segmenting**), pairs verbal and visual channels (**Multimedia** & **Embodiment**), aligns related state & choices visually (**Spatial Contiguity**), and increases learner engagement through conversational tone (**Personalization**, Mayer, 2009). |

---

## Data Instrumentation & Supabase Telemetry Spec (Tool Task 6 Exemplar)

To support empirical learning-curve analysis and misconception diagnosis without adding learner-facing clutter, this app integrates CMU 05-840's canonical **PSLC DataShop-aligned telemetry engine** (`tol-telemetry.js` + `tol-telemetry.css` + `setup_telemetry.sql`). A discreet, closed-by-default **`Telemetry`** pill sits beside **`⚙️ LXD & Mayer Notes`** in the bottom-right dock (`toolName: 'tol-vibe-payment-methods'`).

### KC–Step–SAI & Misconception Tag Mapping

| Section / Stage | `problem_id` | `step_id` | `selection` | `action` | `input` (SAI) | `kc_id` | `feedback_or_bug_tag` (`CORRECT` / `INCORRECT` / `HINT`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Lesson 2: Card 1** *(Unfamiliar Hotel Site)* | `s2_match_s1` | `s1_payment_bucket` | `s1_payment_bucket` | `select_payment_method` | `Credit` / `Debit` / `Mobile_P2P` | `KC_classify_payment_mechanics` | `affirm_fcba_credit_shield` · `bug_debit_checking_cash_freeze_on_dispute` · `bug_p2p_unverified_seller_no_chargeback` |
| **Lesson 2: Card 2** *($48 Rideshare Split)* | `s2_match_s2` | `s2_payment_bucket` | `s2_payment_bucket` | `select_payment_method` | `Mobile_P2P` / `Credit` / `Debit` | `KC_compare_interest_and_fees` | `affirm_zero_fee_p2p_peer_split` · `bug_reward_points_group_iou_trap` · `bug_debit_full_group_tab_cash_drain` |
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
- **`context_message` on Stage Load & Quick-Fix Open:** Logged strictly once when an assessment scenario loads (`s2_match_*`, `s3_carlos_*` with Carlos's starting checking/credit/auto-pay wallet state, `s4_maya_*` with `scaffolds_faded: true`) or when an inline Worked-Contrast Quick-Fix remediation card opens.
- **Paired `tool_message` (SAI) + `tutor_message` Only on Graded Commits & Hints:** Emitted with shared `transaction_id`, `attempt_num`, `hint_level`, `kc_id`, `feedback_or_bug_tag`, and `step_duration_ms` exclusively on payment-method submissions, Quick-Fix answers, and hint requests.
- **Zero Passive UI Noise:** Lesson 1 Pre-Training tab switches, flashcard flips, `CONTINUE` clicks, scrolling, lesson navigation, and `⚙️ LXD & Mayer Notes` drawer toggles never emit `tool_message` or `tutor_message` transactions.

### 3-Step Supabase Free Tier + GitHub Pages Setup
1. **Run [`setup_telemetry.sql`](./setup_telemetry.sql) in Supabase:** Open your Supabase project's **SQL Editor**, paste `setup_telemetry.sql`, and click **Run** to create `public.interaction_logs` with anonymous `INSERT`-only Row-Level Security (`anon` can insert telemetry rows from GitHub Pages, while `SELECT`/`UPDATE`/`DELETE` remain restricted to the project owner).
2. **Connect Cloud Sink or Run Local-First:** Open the GitHub Pages URL (use `?peer=peer_01` to assign clean anonymous peer IDs), click **`Telemetry`** in the bottom-right dock, expand **Supabase Cloud Sink**, and enter your Supabase Project URL + Publishable `anon` Key to click **Connect & Sync**.
3. **Download CSV / JSON Anytime:** Click **Export CSV** or **Export JSON** in the Live Interaction Telemetry drawer—or export `public.interaction_logs` from Supabase **Table Editor**—for immediate PSLC DataShop / Python / R learning-curve analysis.

---

## Repository Structure & Local Usage

```text
tol-vibe-payment-methods/
├── .nojekyll           # Bypasses Jekyll processing on GitHub Pages
├── AGENTS.md           # Pedagogical, Mayer multimedia, & telemetry specification
├── README.md           # Course overview, Rise 360 comparison, & telemetry guide
├── setup_telemetry.sql # Supabase Postgres + INSERT-only RLS telemetry schema
├── assets/             # Authentic campus photos, 5 scene backdrops, & 8 Carlos poses
├── index.html          # Rise 360 two-column HTML5 shell + discreet LXD & Telemetry dock
├── styles.css          # Authentic Rise 360 (#FF631E, Lato + Merriweather) stylesheet
├── tol-telemetry.css   # Closed-by-default Live Interaction Telemetry Inspector styles
├── tol-telemetry.js    # Canonical PSLC DataShop telemetry engine + CSV/Supabase sync
└── app.js              # Vanilla ES6+ stateful course engine, wallets, hints, & Quick-Fixes
```

### Running Locally
No build step, package install, or API key is required:

```bash
python3 -m http.server 8000
# Open http://localhost:8000 in any modern desktop or mobile browser
```
