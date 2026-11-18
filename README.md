# Smart Spending: Payment Trade-Offs & Cash Liquidity

**Course:** CMU 05-840 — Tools for Online Learning (Spring 2027, Tool Task 3 Demo #1)  
**Track:** Track A — Adaptive Mastery, Graduated Scaffolding, & Fading  
**Live Demo URL:** [https://gautamyadavs.github.io/tol-vibe-payment-methods/](https://gautamyadavs.github.io/tol-vibe-payment-methods/)  
**Baseline S26 Articulate Rise 360 Exemplar:** [*Smart Spending: Comparing Payment Methods for First-Year College Students*](https://miinakoyama.github.io/articulate/#/lessons/cml18wm70002i3b7heipi6l99) by Miina Koyama (Spring 2026 TA Showcase)

---

## Overview

First-year college students frequently enter campus life with a single brittle rule of thumb—*"debit is always safer because it spends money I already have."* That heuristic breaks down as soon as scheduled automated clearing house (ACH) bills, automated fuel-pump pre-authorization holds, unverified online resale checkouts, or group dining splits collide.

This static web application replicates the domain content and exact four learning objectives of Miina Koyama's Spring 2026 Articulate Rise 360 course and extends them through **Track A (Adaptive Mastery, Graduated Scaffolding, & Fading)**. Using pure Vanilla HTML5, CSS3, and ES6+ JavaScript governed by [`AGENTS.md`](./AGENTS.md), it replaces Rise 360's stateless sorting cards and static branching slides with a shared misconception state machine, a live multi-step numerical account ledger, contingent 3-level hints, targeted remediation micro-tasks, and explicit Stage 3 scaffold fading.

---

## Carried-Over Learning Objectives

- **LO1:** Compare debit cards, credit cards, and mobile payment apps in real-life college scenarios.
- **LO2:** Evaluate payment methods across four trade-off dimensions: cost/fees, convenience, security/fraud protection, and budgeting/liquidity control.
- **LO3:** Recognize how psychological factors (pain of paying, deferred payment illusion, reward-point chasing) influence spending choices.
- **LO4:** Apply multi-step payment decision strategies to protect cash liquidity and avoid overdraft fees.

---

## Overcoming Articulate Rise 360 Constraints (Track A Architecture)

| Pedagogical Dimension | Baseline S26 Rise 360 Authoring Constraint | Custom Vibe-Coded Track A Implementation |
| :--- | :--- | :--- |
| **Relational Trade-Off Classification (`LO1`–`LO3`)** | **Sorting Blocks** only snap a card into a single bucket with binary right/wrong bounce-back; cannot verify *why* a student picked a payment method. | **Stage 1: Scenario Trade-Off Classifier** requires joint selection of *Payment Method × Primary Trade-Off Factor* across 4 scenarios, diagnosing right-tool/wrong-reason guesses without revealing the answer on Attempt 1. |
| **Multi-Step Cash Liquidity (`LO4`)** | **Scenario Blocks** branch between pre-written text slides with zero numeric state memory across decisions. | **Stage 2: Spring Break Liquidity Simulation** binds Carlos's 3 sequential choices (`$200` hotel site, `$100` group dinner, `$80` highway gas pump with `$125` debit hold) to a live **Account & Risk Ledger** (`$240` Checking, `$120` 6:00 AM auto-debit, `$35` overdraft rule). |
| **Contingent Hints & Misconception Repair** | Knowledge checks return static feedback per item; errors never accumulate across blocks to trigger targeted instruction. | Every step offers **3-Level Graduated Hints** (Metacognitive → Conceptual → Concrete Check). Tracking `liquidity_blindness`, `fraud_exposure`, and `reward_chasing` across Stages 1–2 routes learners with `>= 2` errors or a Stage 2 overdraft/fraud event into a **Targeted Remediation Micro-Task**. |
| **Graduated Fading for Transfer** | Blocks look visually identical from top to bottom of a lesson, creating prompt dependency (*the assistance dilemma*). | **Stage 3: Faded Transfer ("Campus Move-In Week")** strips *channeling* context badges, *focusing* `Net Safe Checking` subtraction rows, and pre-highlighted auto-pay banners so learners manage Maya's `$210` Checking & `$130` 11:59 PM utility draft on a realistic raw bank view. |
| **Instructional Transparency** | Pedagogical rationale lives outside the deployed artifact in separate design docs. | Top-bar **`Learning Engineer View`** toggle (`aria-pressed`) reveals inline LXD callouts, live state telemetry, and one-click previews for all 3 Remediation Micro-Tasks and locked stages. |

---

## Corrective Prompt Iteration Log (Steering Naive AI Output Toward Learning Science)

| Iteration | Naive AI Output / Failure Mode | Corrective Prompt & `AGENTS.md` Constraint Applied | Learning Science Rationale |
| :--- | :--- | :--- | :--- |
| **1. Diagnostic Assessment vs. Answer Giveaways** | Initial AI generation produced standard 4-option multiple-choice items with binary `"Incorrect! The right answer is Credit Card"` banners on Attempt 1, plus gamified streak badges and confetti bursts. | Enforced 3-option joint selection (*Method + Primary Trade-Off*) per Haladyna & Rodriguez (2013), banned Attempt-1 answer disclosure, stripped streak/confetti chrome, and mapped all wrong pairs to causal misconception diagnostics (`liquidity_blindness`, `fraud_exposure`, `reward_chasing`). | Immediate answer giveaways convert active retrieval into passive reading and invite shallow clicking (Shute, 2008); seductive gamified details add extraneous cognitive load (Mayer, 2009). |
| **2. Stateful Ledger & Remediation Gate vs. Isolated Slides** | Early simulation drafts treated Carlos's hotel, dinner, and gas stops as independent quiz screens where an earlier `$200` debit drain disappeared on the next step, and let learners brute-force retry buttons immediately. | Bound Steps 2.1–2.3 to a persistent `Account & Risk Ledger` (incorporating `$120` 6:00 AM auto-debit + `$125` automated pump debit hold) and added an adaptive mastery gate launching a worked-contrast **Targeted Remediation Micro-Task** whenever `totalErrors >= 2` or an overdraft/fraud risk occurs. | Liquidity management (`LO4`) is inherently cumulative; pairing worked financial contrasts with verification checks repairs the underlying *"debit is always safer"* schema before revision (Corbett & Anderson, 1995). |
| **3. Explicit Scaffold Fading & Editorial Restraint** | AI kept identical `[Context Signal]` badges, pre-subtracted `Safe Spendable Checking` ledger rows, and bold auto-pay warning banners through the final challenge, styled with dark-mode gradients and colored left-border stripes. | Created Stage 3 (*Campus Move-In Week*: `$210` Checking, `$130` 11:59 PM utility draft) to remove *channeling* tags, *focusing* buffer math, and warning banners once Stages 1–2 are mastered, and refactored CSS to a `#FAF9F6` warm-paper editorial sheet with uniform `1px` borders. | Fading channeling and focusing scaffolds (Pea, 2004; Puntambekar & Hübscher, 2005) prevents prompt dependency and tests ecologically valid transfer against real mobile bank statements that omit pending overnight ACH bills. |

---

## Repository Structure & Zero-Build Local Usage

```text
tol-vibe-payment-methods/
├── .nojekyll      # Disables Jekyll processing for clean GitHub Pages static serving
├── AGENTS.md      # 4-section pedagogical & technical steering specification
├── README.md      # Project documentation, Rise 360 comparison, & prompt iteration log
├── index.html     # Semantic HTML5 shell (single <h1>, ARIA live regions, LXD callouts)
├── styles.css     # Warm academic-editorial design system (#FAF9F6 / #1E3A5F, zero tropes)
└── app.js         # Pure Vanilla ES6+ stateful engine, ledger math, hints, & remediation
```

### Running Locally
No `npm install`, bundler, or API key is required. Serve the directory with any static HTTP server or open `index.html` directly:

```bash
python3 -m http.server 8000
# Open http://localhost:8000 in any modern desktop or mobile browser
```
