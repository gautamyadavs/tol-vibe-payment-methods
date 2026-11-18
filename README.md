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

## Repository Structure & Local Usage

```text
tol-vibe-payment-methods/
├── .nojekyll      # Bypasses Jekyll processing on GitHub Pages
├── AGENTS.md      # Pedagogical, Mayer multimedia, & technical specification
├── README.md      # Course overview, Rise 360 comparison, & Mayer iteration log
├── assets/        # Authentic campus photos, 5 scene backdrops, & 8 Carlos poses
├── index.html     # Rise 360 two-column HTML5 shell + discreet LXD drawer
├── styles.css     # Authentic Rise 360 (#FF631E, Lato + Merriweather) stylesheet
└── app.js         # Vanilla ES6+ stateful course engine, wallets, hints, & Quick-Fixes
```

### Running Locally
No build step, package install, or API key is required:

```bash
python3 -m http.server 8000
# Open http://localhost:8000 in any modern desktop or mobile browser
```
