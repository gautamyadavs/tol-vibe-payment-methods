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

### 3.2 Stack & Canonical State (`app.js`)
- Pure static Vanilla HTML5 (`index.html`), CSS3 (`styles.css`), and ES6+ JavaScript (`app.js`), plus `.nojekyll` and `assets/`. Zero external JS libraries, zero build step, zero API keys.
- Persistent state in `localStorage` (`tol_smart_spending_rise_v2`) tracking `activeSection`, `attempts`, `hintsUsed`, `misconceptions`, `remediationsCompleted`, and per-lesson progress across Sections 1–4.

### 3.3 Verification Protocol
1. Run `node --check app.js` (zero syntax errors).
2. Verify single `<h1>` across every rendered view, unique `id` on every button/link, zero `border-left` rules in `styles.css`, and zero broken `assets/` images.
3. Verify headless `/usr/bin/chromium` execution across all 4 lessons, Track A Quick-Fix remediation, and the `⚙️ LXD & Mayer Notes` drawer with zero console errors and zero horizontal overflow at `1440x900` and `390x844`.
