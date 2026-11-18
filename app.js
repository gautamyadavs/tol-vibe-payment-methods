/* ==========================================================================
   Smart Spending: Payment Trade-Offs & Cash Liquidity (app.js)
   CMU 05-840 — Spring 2027, Tool Task 3 Demo #1 (Track A)
   Pure Vanilla ES6+ Stateful Engine · Zero External Dependencies
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Pedagogical Content & Diagnostic Matrices
     ------------------------------------------------------------------------ */

  const PAYMENT_METHODS = [
    { id: "debit", label: "Debit Card", sub: "Direct Checking Pull" },
    { id: "credit", label: "Credit Card", sub: "Statement Cycle / FCBA" },
    { id: "p2p", label: "Mobile P2P App", sub: "Venmo / Cash App / Zelle" }
  ];

  const STAGE_1_ITEMS = [
    {
      id: "1",
      stepLabel: "Scenario 1.1 · $145 Purchase",
      scaffoldTag: "Context Signal: Unverified Online Resale Site",
      title: "Concert Floor Tickets on an Unfamiliar Resale Website ($145)",
      narrative:
        "You find two last-minute concert tickets for $145 on an independent third-party resale site you have never used before. Checkout accepts a Debit Card, a Credit Card, or a direct Mobile P2P transfer to @IndieTixDrop.",
      factors: [
        { id: "fraud", label: "Fraud Protection", sub: "Dispute rights & cash shield" },
        { id: "split", label: "Split Convenience", sub: "Instant peer settlement" },
        { id: "pain", label: "Pain-of-Paying Control", sub: "Immediate spend friction" }
      ],
      correctMethod: "credit",
      correctFactor: "fraud",
      hints: [
        "Metacognitive Prompt: Ask yourself—if this unfamiliar seller never delivers valid ticket barcodes, whose money is missing while you dispute the charge?",
        "Conceptual Trade-Off Cue (LO2): Compare how Regulation E (Debit), the Fair Credit Billing Act (Credit), and authorized push rules (Mobile P2P) treat non-delivery by an unknown merchant.",
        "Concrete Protection Check: P2P transfers to strangers act like irreversible cash, and Debit disputes can freeze $145 of your actual Checking cash for up to 10 business days. Which method shields your bank cash while preserving chargeback rights?"
      ],
      diagnose(method, factor) {
        if (method === "credit" && factor === "fraud") {
          return {
            ok: true,
            tone: "mastery",
            title: "Verified Pairing · FCBA Chargeback & Cash Isolation",
            body: "With an unverified online vendor, a Credit Card isolates your bank Checking balance: under the Fair Credit Billing Act (FCBA), the card issuer's funds—not your rent or grocery cash—remain on hold if you must dispute undelivered tickets."
          };
        }
        if (method === "p2p") {
          return {
            ok: false,
            misconceptions: ["fraud_exposure"],
            tone: "alert",
            title: "Diagnostic · Irreversible Authorized Push Risk",
            body: "When you voluntarily tap 'Send' in a Mobile P2P App to an unknown seller, networks treat it like handing over physical bills—standard chargeback rights do not cover non-delivery scams. Consider which payment rail gives statutory merchant dispute protection without draining Checking."
          };
        }
        if (method === "debit") {
          return {
            ok: false,
            misconceptions: ["liquidity_blindness", "fraud_exposure"],
            tone: "caution",
            title: "Diagnostic · Bank Cash Freeze During Dispute",
            body: "Even when a bank eventually reimburses unauthorized or disputed Debit claims under Regulation E, $145 of your real Checking cash is immediately deducted and can remain frozen for up to 10 business days during investigation. Re-evaluate how to insulate your Checking cash against an unfamiliar seller."
          };
        }
        // Correct method (credit), wrong factor
        return {
          ok: false,
          misconceptions: [],
          tone: "caution",
          title: "Diagnostic · Right Tool, Mismatched Trade-Off Mechanism",
          body:
            factor === "pain"
              ? "A Credit Card actually lowers the immediate psychological 'pain of paying' rather than increasing budget friction. Look closely at the core risk of buying from an unfamiliar website—what specific protection is the card providing here?"
              : "Paying a merchant checkout does not split a peer tab. Identify the exact legal and financial risk created by an unverified resale website."
        };
      }
    },
    {
      id: "2",
      stepLabel: "Scenario 1.2 · $48 Group Split ($12 Share)",
      scaffoldTag: "Context Signal: Trusted Classmate Settlement",
      title: "Splitting a $48 Campus Airport Rideshare with 3 Classmates",
      narrative:
        "You and three classmates share a $48 late-night rideshare back to your dorm ($12 each). Your friend's rideshare account already billed the trip, and everyone wants to settle their exact $12 share in the back seat without ATM fees or month-long IOUs.",
      factors: [
        { id: "fraud", label: "Fraud Protection", sub: "Chargeback & liability cap" },
        { id: "split", label: "Split Convenience", sub: "Exact fee-free peer transfer" },
        { id: "liquidity", label: "Cash Liquidity Buffer", sub: "Short-term statement float" }
      ],
      correctMethod: "p2p",
      correctFactor: "split",
      hints: [
        "Metacognitive Prompt: Notice two features of this moment—you are paying a trusted classmate sitting beside you (not a store register), and the exact amount is $12.",
        "Conceptual Trade-Off Cue (LO1/LO2): Merchant cards cannot swipe directly into a friend's checking account without fees, while ATMs dispense $20 bills and often charge out-of-network fees.",
        "Concrete Cost & Friction Check: Linking a Mobile P2P App to your bank/balance transfers an exact $12 to a trusted peer for $0 fee in seconds. Pair that tool with the trade-off dimension that justifies using it here."
      ],
      diagnose(method, factor) {
        if (method === "p2p" && factor === "split") {
          return {
            ok: true,
            tone: "mastery",
            title: "Verified Pairing · Fee-Free Peer Settlement",
            body: "Because you know and trust the classmate sitting next to you, seller fraud risk is negligible; a bank-linked Mobile P2P transfer settles the exact $12 share instantly at $0 fee without ATM runs or forgotten IOUs."
          };
        }
        if (method === "credit") {
          return {
            ok: false,
            misconceptions: ["reward_chasing"],
            tone: "caution",
            title: "Diagnostic · P2P Credit Fee & Tab-Swapping Trap",
            body: "Funding a peer transfer with a Credit Card typically triggers a ~3% fee (wiping out any 1%–2% points), and offering to 'just put the next dinner on my card for points' creates fuzzy IOUs that distort both budgets. Which tool settles an exact $12 peer share cleanly?"
          };
        }
        if (method === "debit") {
          return {
            ok: false,
            misconceptions: [],
            tone: "caution",
            title: "Diagnostic · Merchant Rail vs. Peer Rail Friction",
            body: "A physical Debit Card swipes at merchant terminals or pulls $20 bills from an ATM (often with $3+ out-of-network fees and awkward change for $12). Consider the payment rail built specifically for instant person-to-person transfers."
          };
        }
        // P2P with wrong factor
        return {
          ok: false,
          misconceptions: factor === "fraud" ? ["fraud_exposure"] : ["liquidity_blindness"],
          tone: "caution",
          title: "Diagnostic · Misidentified P2P Strength",
          body:
            factor === "fraud"
              ? "Careful—Mobile P2P apps actually offer weak fraud reversal! They are appropriate here only because you personally trust your classmate. Select the trade-off dimension where P2P genuinely excels."
              : "A bank-linked P2P payment pulls $12 from Checking rather than creating a statement liquidity float. Re-check why P2P fits a 4-way rideshare settlement."
        };
      }
    },
    {
      id: "3",
      stepLabel: "Scenario 1.3 · $65 Weekly Cap",
      scaffoldTag: "Context Signal: Impulse Drift & Dedicated Spend Cap",
      title: "Weekly Groceries & Snacks on a Strict $65 Spending Account",
      narrative:
        "Mid-semester, you realize small café pastries and extra snack aisle grabs quietly inflated your monthly credit bill by 30%. This week you loaded $65 into a dedicated spending checking sub-account (with zero auto-pays attached) and want an immediate, visceral boundary at the supermarket register.",
      factors: [
        { id: "pain", label: "Pain-of-Paying Control", sub: "Immediate balance salience" },
        { id: "liquidity", label: "Cash Liquidity Buffer", sub: "Grace-period float" },
        { id: "split", label: "Split Convenience", sub: "Group expense sharing" }
      ],
      correctMethod: "debit",
      correctFactor: "pain",
      hints: [
        "Metacognitive Prompt: No auto-pays are at risk in this dedicated sub-account, and the supermarket is a trusted store—instead, the problem you are solving is psychological overspending.",
        "Conceptual Trade-Off Cue (LO3): Behavioral economics research (Prelec & Loewenstein, 1998) shows that decoupling consumption from payment creates a 'deferred payment illusion' that dulls spending awareness.",
        "Concrete Psychological Check: Which method deducts from the $65 balance in real time at the checkout lane, restoring healthy 'pain of paying' and enforcing a hard ceiling?"
      ],
      diagnose(method, factor) {
        if (method === "debit" && factor === "pain") {
          return {
            ok: true,
            tone: "mastery",
            title: "Verified Pairing · Salient Pain-of-Paying Boundary",
            body: "In a dedicated spending account with no competing auto-debits, a Debit Card makes every item immediately visible against your $65 ceiling—counteracting the deferred payment illusion that fueled earlier impulse drift."
          };
        }
        if (method === "credit") {
          return {
            ok: false,
            misconceptions: ["reward_chasing"],
            tone: "caution",
            title: "Diagnostic · Deferred Payment Illusion",
            body: "Putting groceries back on a Credit Card delays the cash outflow until next month's statement, dulling the psychological 'pain of paying'—and chasing 2% grocery rewards ($1.30) loses money whenever low friction nudges $15 of impulse snacks into the cart."
          };
        }
        if (method === "p2p") {
          return {
            ok: false,
            misconceptions: [],
            tone: "caution",
            title: "Diagnostic · POS Acceptance & Fragmented Balances",
            body: "Standard supermarket checkout lanes run card networks rather than peer-to-peer handles, and parking cash across P2P balances fragments budget visibility. Which card directly reflects your $65 spending sub-account at checkout?"
          };
        }
        return {
          ok: false,
          misconceptions: factor === "liquidity" ? ["liquidity_blindness"] : [],
          tone: "caution",
          title: "Diagnostic · Right Card, Reversed Mechanism",
          body:
            factor === "liquidity"
              ? "A Debit Card consumes liquid cash immediately rather than providing a liquidity buffer. Its advantage in this dedicated grocery sub-account is behavioral—look at how immediate deduction changes your spending awareness."
              : "Buying solo weekly groceries does not involve splitting a bill with peers. Select the behavioral budgeting mechanism that curbs impulse drift."
        };
      }
    },
    {
      id: "4",
      stepLabel: "Scenario 1.4 · $180 Urgent Repair",
      scaffoldTag: "Context Signal: Scheduled Auto-Draft vs. Paycheck Gap",
      title: "Urgent $180 Laptop Power Repair Before Friday's Paycheck",
      narrative:
        "Tuesday morning: your laptop charging port fails 48 hours before midterm code submissions. The official campus tech store charges $180. You have $210 in Checking, a $95 utility auto-draft hitting Checking on Thursday, and a confirmed $320 work-study direct deposit arriving Friday morning.",
      factors: [
        { id: "pain", label: "Pain-of-Paying Control", sub: "Immediate spend ceiling" },
        { id: "liquidity", label: "Cash Liquidity Buffer", sub: "Protect Checking for auto-pay" },
        { id: "split", label: "Split Convenience", sub: "Peer transfer speed" }
      ],
      correctMethod: "credit",
      correctFactor: "liquidity",
      hints: [
        "Metacognitive Prompt: Map the timeline from Tuesday to Friday instead of looking only at today's $210 Checking number.",
        "Conceptual Trade-Off Cue (LO4): Is 'never put an expense on credit' actually safe when an unavoidable expense collides with a scheduled Checking auto-draft two days before guaranteed income?",
        "Concrete Liquidity Math: $210 Checking minus $180 today leaves $30—causing Thursday's $95 utility auto-draft to bounce into -$65 plus a $35 overdraft fee. Which method bridges the 72-hour gap at $0 interest when paid in full Friday?"
      ],
      diagnose(method, factor) {
        if (method === "credit" && factor === "liquidity") {
          return {
            ok: true,
            tone: "mastery",
            title: "Verified Pairing · Strategic Grace-Period Liquidity Buffer",
            body: "Paying the $180 campus repair on Credit keeps $210 in Checking so Thursday's $95 utility auto-draft clears cleanly ($115 remaining), and paying the $180 statement charge in full when Friday's $320 paycheck lands incurs $0 interest and $0 overdraft fees."
          };
        }
        if (method === "debit") {
          return {
            ok: false,
            misconceptions: ["liquidity_blindness"],
            tone: "alert",
            title: "Diagnostic · 'Debit Is Always Safer' Overdraft Trap",
            body: "Trace the 48-hour Checking math: $210 today minus $180 on Debit leaves just $30 in Checking. When Thursday's $95 utility auto-draft runs before Friday's paycheck, Checking plunges to -$65 and triggers a $35 overdraft fee (an instant 19% penalty!). Consider how to bridge Tuesday-to-Friday cleanly."
          };
        }
        if (method === "p2p") {
          return {
            ok: false,
            misconceptions: ["liquidity_blindness"],
            tone: "alert",
            title: "Diagnostic · Same Checking Drain Before Thursday's Auto-Draft",
            body: "Even if the campus repair desk accepted a bank-linked P2P payment, it still pulls $180 out of your $210 Checking balance before Thursday's $95 utility auto-draft—leaving you $65 short and triggering overdraft/returned-item fees."
          };
        }
        return {
          ok: false,
          misconceptions: [],
          tone: "caution",
          title: "Diagnostic · Right Tool, Mismatched Rationale",
          body: "You selected the right payment method to survive Thursday's $95 utility draft, but check your trade-off reason: you are not trying to split a group tab or increase immediate deduction pain—you are protecting Checking cash across a 3-day timing gap."
        };
      }
    }
  ];

  /* ------------------------------------------------------------------------
     2. Stage 2: Spring Break Liquidity Simulation (Carlos)
     ------------------------------------------------------------------------ */

  const STAGE_2_CONFIG = {
    initialChecking: 240,
    initialCredit: 0,
    pendingAutoDebit: 120,
    overdraftFeeAmount: 35,
    steps: [
      {
        id: "1",
        stepCode: "Step 2.1 · 2:15 PM",
        scaffoldTag: "Channeling Cue: Unverified Lodging Checkout + $120 Hold Window",
        title: "Beachfront Condo Deposit on an Unfamiliar Regional Site ($200)",
        narrative:
          "Carlos and his friends find a last-minute Spring Break rental on an unfamiliar website (SunCoastDirectStays.biz) requiring a $200 reservation deposit right now to hold the keys.",
        autopayAlert: null,
        hints: [
          "Metacognitive Prompt: Check both sides of the ledger before paying $200—(1) do you know this regional booking site is legitimate, and (2) how much Checking cash must remain untouched for 6:00 AM tomorrow?",
          "Conceptual Trade-Off Cue (LO2 & LO4):Carlos has $240 in Checking, but $120 is spoken for at 6:00 AM ($120 Net Safe Checking Buffer). Pulling $200 from Checking breaches that buffer AND exposes cash to a stranger.",
          "Concrete Ledger Check: Putting $200 on Debit or P2P drops Checking to $40 (creating a -$80 deficit at 6:00 AM) and sacrifices FCBA chargeback protection. Choose the rail that shields both dispute liability and Checking cash."
        ],
        options: [
          {
            id: "debit",
            label: "Pay $200 with Carlos's Debit Card",
            sub: "Deducts $200 immediately from Checking ($240 → $40)",
            checkingDelta: -200,
            creditDelta: 0,
            fraudRisk: "Elevated ($200 Bank Cash Exposed / Reg E Freeze)",
            fraudSeverity: "elevated",
            optimal: false,
            misconceptions: ["liquidity_blindness", "fraud_exposure"],
            tapeLabel: "2.1 Hotel Deposit (Debit)",
            tapeAmount: "-$200 Checking",
            feedbackTitle: "Ledger Alert · Checking Starved Below 6:00 AM Auto-Debit + Cash Freeze Risk",
            feedbackTone: "alert",
            feedbackBody:
              "Inspect the Account & Risk Ledger: pulling $200 via Debit drops Checking Cash from $240 to $40. Because tomorrow's 6:00 AM $120 streaming auto-debit requires at least $120 in Checking, Carlos is now on track for a -$80 balance and a $35 overdraft fee—plus if SunCoastDirectStays.biz is fraudulent, his bank cash stays frozen during Reg E review."
          },
          {
            id: "credit",
            label: "Pay $200 with Carlos's Credit Card",
            sub: "Posts $200 to Credit statement; keeps Checking at $240",
            checkingDelta: 0,
            creditDelta: 200,
            fraudRisk: "Protected (FCBA Chargeback Shield)",
            fraudSeverity: "low",
            optimal: true,
            misconceptions: [],
            tapeLabel: "2.1 Hotel Deposit (Credit)",
            tapeAmount: "+$200 Credit",
            feedbackTitle: "Step 2.1 Mastered · FCBA Dispute Shield & $240 Checking Preserved",
            feedbackTone: "mastery",
            feedbackBody:
              "Carlos isolates the unfamiliar lodging site onto his Credit Card under Fair Credit Billing Act protection (planned for payoff with Monday's paycheck) while keeping all $240 in Checking—preserving his $120 Net Safe Checking Buffer ahead of 6:00 AM."
          },
          {
            id: "p2p",
            label: "Send $200 via Mobile P2P App to @SunCoastHost",
            sub: "Instant bank-linked push transfer ($240 → $40 Checking)",
            checkingDelta: -200,
            creditDelta: 0,
            fraudRisk: "Severe ($200 Irreversible Cash Push)",
            fraudSeverity: "severe",
            optimal: false,
            misconceptions: ["fraud_exposure", "liquidity_blindness"],
            tapeLabel: "2.1 Hotel Deposit (P2P Push)",
            tapeAmount: "-$200 Checking",
            feedbackTitle: "Ledger Alert · Severe Fraud Exposure + Projected 6:00 AM Overdraft",
            feedbackTone: "alert",
            feedbackBody:
              "Double hazard on the ledger: an authorized P2P push to a stranger carries zero buyer protection if the rental listing is fake, AND the bank-linked transfer drains Checking to $40—guaranteeing a -$80 overdraft (+$35 fee) when the $120 auto-debit runs at 6:00 AM."
          }
        ]
      },
      {
        id: "2",
        stepCode: "Step 2.2 · 7:30 PM",
        scaffoldTag: "Channeling Cue: Group Tab Split + 2% Points Temptation",
        title: "Group Seafood Dinner ($100 Total Bill; Carlos's Share Is $25)",
        narrative:
          "Four friends finish a $100 dinner ($25 each). Two friends casually say, 'Put the whole $100 on your card—you'll get 2% dining points, and we'll pay you back sometime next month!' Another friend already has Venmo open to settle up right at the table.",
        autopayAlert: null,
        hints: [
          "Metacognitive Prompt: Separate Carlos's true meal cost ($25) from the $75 of classmates' meals—how much is 2% dining rewards actually worth on $75?",
          "Conceptual Trade-Off Cue (LO3): 2% points on $75 equals just $1.50, yet floating $75 in vague 'next month' IOUs risks carrying an unpaid balance at 24% APR or draining liquid Checking cash.",
          "Concrete Split & Liquidity Check: If everyone settles their $25 share immediately via Venmo split so Carlos only pays his $25 net share from Checking, Checking moves from $240 to $215—still comfortably above tomorrow's $120 auto-debit."
        ],
        options: [
          {
            id: "credit_all_points",
            label: "Put the entire $100 tab on Credit to chase 2% dining points (accepting 'next month' IOUs)",
            sub: "Adds $100 to Credit ($75 uncollected peer IOUs for $1.50 extra points)",
            checkingDelta: 0,
            creditDelta: 100,
            fraudRisk: "Protected (FCBA)",
            fraudSeverity: "low",
            optimal: false,
            misconceptions: ["reward_chasing"],
            tapeLabel: "2.2 Dinner Full Tab (Points Chase)",
            tapeAmount: "+$100 Credit ($75 IOUs)",
            feedbackTitle: "Diagnostic · Reward-Point Chasing & Unbudgeted IOU Float",
            feedbackTone: "caution",
            feedbackBody:
              "Look at the asymmetric math (LO3): chasing 2% points on $75 of friends' food earns just $1.50, while Carlos absorbs $75 of unbudgeted credit debt beyond Monday's paycheck plan. If even one friend forgets until next billing cycle, 24% APR interest wipes out those points immediately."
          },
          {
            id: "debit_all",
            label: "Swipe Carlos's Debit Card for the whole $100 bill and collect cash later",
            sub: "Deducts $100 immediately from Checking ($240 → $140)",
            checkingDelta: -100,
            creditDelta: 0,
            fraudRisk: "Low (Known Restaurant)",
            fraudSeverity: "low",
            optimal: false,
            misconceptions: ["liquidity_blindness"],
            tapeLabel: "2.2 Dinner Full Tab (Debit)",
            tapeAmount: "-$100 Checking",
            feedbackTitle: "Diagnostic · Liquid Checking Cushion Eroded for Peers' Meals",
            feedbackTone: "caution",
            feedbackBody:
              "Paying $100 from Checking slashes Carlos's Checking Cash to $140—leaving only $20 of Net Safe Checking Buffer above tomorrow's $120 auto-debit before the group has even bought gas for the drive!"
          },
          {
            id: "split_share",
            label: "Pay only Carlos's $25 net share via instant table Venmo split",
            sub: "Each friend settles $25 on the spot; Carlos's Checking drops by just $25 ($240 → $215)",
            checkingDelta: -25,
            creditDelta: 0,
            fraudRisk: "Low (Trusted Friends)",
            fraudSeverity: "low",
            optimal: true,
            misconceptions: [],
            tapeLabel: "2.2 Dinner Share + Instant P2P Split",
            tapeAmount: "-$25 Checking",
            feedbackTitle: "Step 2.2 Mastered · Exact $25 Share Settled Without IOU Drift",
            feedbackTone: "mastery",
            feedbackBody:
              "Settling at the table keeps Carlos's outflow strictly to his $25 meal: Checking stands at $215 ($95 Net Safe Checking Buffer above the 6:00 AM $120 auto-debit) with zero uncollected classmate IOUs."
          }
        ]
      },
      {
        id: "3",
        stepCode: "Step 2.3 · 10:45 PM",
        scaffoldTag: "Channeling Cue: Pump Pre-Auth Hold + 6:00 AM Auto-Debit Collision",
        title: "Unattended Highway Gas Pump ($80 Fill-Up) Right After Bank Auto-Pay Alert",
        narrative:
          "Carlos pulls into a highway gas station needing $80 of fuel. A decal on the automated outdoor pump states: 'Debit Cards: Automated fuel pumps place a temporary $125 pre-authorization hold on Checking for 24–48 hours until final fuel total settles.' Meanwhile, Carlos's card app flashes a weekend promo: 'Reach $300 in weekend Credit spend to earn $10 bonus points!'",
        autopayAlert:
          "Focusing Scaffold — Bank Push Alert (10:44 PM): Reminder! Your $120 Annual Streaming Auto-Debit will pull from Checking at 6:00 AM (7 hours from now).",
        hints: [
          "Metacognitive Prompt: Why is looking only at the '$80 fuel price' deceptive at an automated outdoor gas pump when a 6:00 AM Checking auto-debit is 7 hours away?",
          "Conceptual Trade-Off Cue (LO2, LO3, LO4): Compare (a) what a $125 Debit pump hold leaves in Checking at 6:00 AM, (b) outdoor pump card-skimmer risk, and (c) whether spending extra money in the convenience store to unlock '$10 bonus points' actually saves money.",
          "Concrete Arithmetic Check: Checking is $215. Swiping Debit locks $125 ($215 - $125 = $90 available), so the 6:00 AM $120 auto-debit overdrafts Checking to -$30 (+$35 fee!). Meanwhile, buying $35 of unneeded snacks to earn $10 points loses $25 net."
        ],
        options: [
          {
            id: "debit_pump",
            label: "Insert Carlos's Debit Card at the outdoor pump ($80 fuel; $125 temporary Checking hold)",
            sub: "Places $125 pump hold on $215 Checking ($90 available when 6:00 AM $120 auto-debit hits)",
            checkingDelta: -125,
            creditDelta: 0,
            isPumpHold: true,
            fraudRisk: "Elevated (Outdoor Pump Skimmer Risk)",
            fraudSeverity: "elevated",
            optimal: false,
            misconceptions: ["liquidity_blindness", "fraud_exposure"],
            tapeLabel: "2.3 Gas Pump Debit ($125 Hold)",
            tapeAmount: "-$125 Hold",
            feedbackTitle: "Ledger Overdraft Triggered · $125 Debit Pump Hold Collides with 6:00 AM Auto-Debit",
            feedbackTone: "alert",
            feedbackBody:
              "Crucial real-world trap: although the fuel costs $80, the automated pump locks $125 of Checking cash overnight ($215 − $125 = $90 available). At 6:00 AM, the $120 streaming auto-debit hits $90 available Checking—triggering a -$30 overdraft and a $35 Overdraft Fee, while also exposing Debit to outdoor pump skimmers."
          },
          {
            id: "credit_fuel_only",
            label: "Tap Credit Card (contactless) for the $80 fill-up only",
            sub: "Posts $80 to Credit ($280 total); keeps all $215 Checking cash untouched for 6:00 AM",
            checkingDelta: 0,
            creditDelta: 80,
            fraudRisk: "Protected (Contactless Token + FCBA)",
            fraudSeverity: "low",
            optimal: true,
            misconceptions: [],
            tapeLabel: "2.3 Highway Fuel (Credit Tap)",
            tapeAmount: "+$80 Credit",
            feedbackTitle: "Step 2.3 Mastered · Pump Hold Absorbed on Credit & 6:00 AM Auto-Debit Cleared!",
            feedbackTone: "mastery",
            feedbackBody:
              "Tapping Credit absorbs any fuel-pump pre-authorization hold harmlessly on the credit line, blocks magnetic-stripe skimmers via contactless tokenization, and preserves $215 in Checking—so the 6:00 AM $120 auto-debit clears cleanly with $95 Checking Cash left and $0 fees!"
          },
          {
            id: "credit_promo_chase",
            label: "Put $80 fuel + $35 of unbudgeted snacks/gear on Credit to hit the $300 promo for $10 bonus points",
            sub: "Adds $115 to Credit ($315 total) — spending $35 extra to unlock $10 in points",
            checkingDelta: 0,
            creditDelta: 115,
            fraudRisk: "Protected (FCBA)",
            fraudSeverity: "low",
            optimal: false,
            misconceptions: ["reward_chasing"],
            tapeLabel: "2.3 Fuel + $35 Promo Chase",
            tapeAmount: "+$115 Credit",
            feedbackTitle: "Diagnostic · Gamified Spend-Threshold Trap (-$25 Net Loss)",
            feedbackTone: "caution",
            feedbackBody:
              "Carlos avoided the Checking overdraft, but fell into a classic reward-threshold trap (LO3): buying $35 of unbudgeted convenience-store items solely to unlock $10 in bonus points leaves him $25 poorer and pushes his Credit statement past his planned Monday paycheck payoff."
          }
        ]
      }
    ]
  };

  /* ------------------------------------------------------------------------
     3. Stage 3: Faded Transfer Challenge — Maya's Move-In Week
        (All Channeling Tags, Pre-Subtracted Safe Buffers, & Auto-Pay Banners Faded)
     ------------------------------------------------------------------------ */

  const STAGE_3_CONFIG = {
    initialChecking: 210,
    initialCredit: 0,
    scheduledUtilityDraft: 130, // Mentioned ONLY in Maya's prose brief — NOT pre-subtracted on raw ledger!
    overdraftFeeAmount: 35,
    steps: [
      {
        id: "1",
        stepCode: "Transaction 3.1 · 1:20 PM",
        title: "Used Mini-Fridge Reservation on an Unverified Student Listing Site ($95)",
        narrative:
          "Maya finds a clean dorm mini-fridge listed for $95 on an independent off-campus classifieds webpage (DormDealLiquidators.org) that requires payment online before 5:00 PM curb pickup via Debit Card, Credit Card, or Mobile P2P transfer (@CampusLiquidator).",
        hints: [
          "Metacognitive Self-Check: Without context tags, identify (1) whether this seller is verified and (2) what scheduled obligation from Maya's Move-In brief hits Checking tonight.",
          "Conceptual Cue: Remember how statutory dispute protection (FCBA vs. Reg E vs. P2P push) interacts with tonight's scheduled Checking outflow.",
          "Concrete Verification: Maya has $210 in Checking with a $130 utility draft tonight at 11:59 PM ($80 true spendable Checking margin). Pulling $95 from Checking already breaches tonight's $130 draft AND exposes her to an unverified web listing."
        ],
        options: [
          {
            id: "debit",
            label: "Enter Maya's Debit Card on DormDealLiquidators.org ($95)",
            sub: "Deducts $95 from Checking ($210 → $115 displayed)",
            checkingDelta: -95,
            creditDelta: 0,
            fraudRisk: "Elevated (Unverified Site / Bank Cash Exposed)",
            fraudSeverity: "elevated",
            optimal: false,
            misconceptions: ["liquidity_blindness", "fraud_exposure"],
            tapeLabel: "3.1 Mini-Fridge (Debit)",
            tapeAmount: "-$95 Checking",
            feedbackTitle: "Diagnostic · Hidden Tonight Deficit + Unverified Merchant Exposure",
            feedbackTone: "alert",
            feedbackBody:
              "Although the raw bank screen still shows $115 in Checking, recall the Move-In brief: a $130 electric utility setup draft runs at 11:59 PM tonight ($115 − $130 = -$15 overdraft + $35 fee), and paying an unverified classifieds site by Debit puts Maya's actual bank cash at risk."
          },
          {
            id: "credit",
            label: "Checkout with Maya's Credit Card ($95)",
            sub: "Posts $95 to Credit (covered by Friday's $400 refund); Checking stays $210",
            checkingDelta: 0,
            creditDelta: 95,
            fraudRisk: "Low (FCBA Chargeback Shield)",
            fraudSeverity: "low",
            optimal: true,
            misconceptions: [],
            tapeLabel: "3.1 Mini-Fridge (Credit)",
            tapeAmount: "+$95 Credit",
            feedbackTitle: "Transaction 3.1 Verified · Unverified Seller Shielded & Checking Intact",
            feedbackTone: "mastery",
            feedbackBody:
              "Maya protects herself under FCBA dispute rules in case the classifieds listing fails to deliver, while keeping all $210 in Checking ahead of tonight's scheduled outflows."
          },
          {
            id: "p2p",
            label: "Send $95 via Mobile P2P App to @CampusLiquidator",
            sub: "Instant Checking-linked push ($210 → $115 displayed)",
            checkingDelta: -95,
            creditDelta: 0,
            fraudRisk: "Severe ($95 Irreversible Cash Push)",
            fraudSeverity: "severe",
            optimal: false,
            misconceptions: ["fraud_exposure", "liquidity_blindness"],
            tapeLabel: "3.1 Mini-Fridge (P2P Push)",
            tapeAmount: "-$95 Checking",
            feedbackTitle: "Diagnostic · Irreversible Stranger Transfer + Tonight's Utility Deficit",
            feedbackTone: "alert",
            feedbackBody:
              "Dorm classified scams frequently request P2P pushes because authorized transfers have virtually zero scam recovery—and draining $95 from Checking leaves $115, which cannot cover tonight's $130 11:59 PM electric utility draft."
          }
        ]
      },
      {
        id: "2",
        stepCode: "Transaction 3.2 · 4:10 PM",
        title: "Shared Suite Cleaning Supplies ($60 Total Across 3 Suitemates; Maya's Share Is $20)",
        narrative:
          "At the campus hardware store, Maya and her two new suitemates buy $60 of shared trash cans and cleaning spray ($20 each). Both suitemates have Venmo open at the register to settle immediately, while Maya notices her Credit Card offers 1.5% cashback ($0.90 total) if she charges all $60 and tells them, 'No rush—just grab paper towels sometime next month.'",
        hints: [
          "Metacognitive Self-Check: Evaluate what Maya actually owes ($20) versus the hidden cost of waving away immediate peer settlement on Move-In Day.",
          "Conceptual Cue: Compare 1.5% cashback on $40 of roommates' items ($0.60) against uncollected roommate IOUs or draining $60 from Checking.",
          "Concrete Verification: Settling Maya's exact $20 share immediately via P2P split leaves $190 in Checking ($60 safely above tonight's $130 utility draft) with zero lingering suitemate IOUs."
        ],
        options: [
          {
            id: "credit_wave_iou",
            label: "Put all $60 on Maya's Credit Card and waive immediate repayment to earn $0.90 cashback",
            sub: "Adds $60 to Credit ($40 uncollected suitemate IOUs for $0.60 extra cashback)",
            checkingDelta: 0,
            creditDelta: 60,
            fraudRisk: "Low (Campus Store)",
            fraudSeverity: "low",
            optimal: false,
            misconceptions: ["reward_chasing"],
            tapeLabel: "3.2 Suite Supplies ($60 Points Chase)",
            tapeAmount: "+$60 Credit",
            feedbackTitle: "Diagnostic · $0.60 Cashback Rationalization for $40 Uncollected IOUs",
            feedbackTone: "caution",
            feedbackBody:
              "Waving off two suitemates who already had their apps open to pay $20 each trades $40 of concrete cash repayment for $0.60 in extra rewards—turning an even split into unbudgeted credit creep."
          },
          {
            id: "debit_full_60",
            label: "Put all $60 on Maya's Debit Card and let suitemates pay cash whenever they visit an ATM",
            sub: "Deducts $60 immediately from Checking ($210 → $150 displayed)",
            checkingDelta: -60,
            creditDelta: 0,
            fraudRisk: "Low (Campus Store)",
            fraudSeverity: "low",
            optimal: false,
            misconceptions: ["liquidity_blindness"],
            tapeLabel: "3.2 Suite Supplies (Full Debit)",
            tapeAmount: "-$60 Checking",
            feedbackTitle: "Diagnostic · Unnecessary $40 Checking Drain Before Evening Expenses",
            feedbackTone: "caution",
            feedbackBody:
              "Fronting $40 of suitemates' supplies out of Checking drops Maya's balance to $150—leaving only $20 of breathing room above tonight's $130 electric utility draft before evening textbook/lab purchases."
          },
          {
            id: "instant_p2p_20",
            label: "Settle Maya's exact $20 share on the spot via instant P2P split at checkout",
            sub: "Deducts only Maya's $20 share from Checking ($210 → $190 displayed)",
            checkingDelta: -20,
            creditDelta: 0,
            fraudRisk: "Low (Trusted Suitemates Present)",
            fraudSeverity: "low",
            optimal: true,
            misconceptions: [],
            tapeLabel: "3.2 Suite Share (Instant $20 Split)",
            tapeAmount: "-$20 Checking",
            feedbackTitle: "Transaction 3.2 Verified · Clean $20 Settlement & $190 Checking Maintained",
            feedbackTone: "mastery",
            feedbackBody:
              "Settling right at the register locks in Maya's true $20 cost cleanly while preserving $190 in Checking."
          }
        ]
      },
      {
        id: "3",
        stepCode: "Transaction 3.3 · 7:30 PM",
        title: "Required Chemistry Lab Kit & Access Code at University Bookstore ($75)",
        narrative:
          "Maya stops at the official university bookstore for a mandatory $75 chemistry lab kit and digital code needed at 8:00 AM tomorrow. Her raw mobile banking app shows $190 in Checking, and her $400 financial-aid refund posts Friday morning.",
        hints: [
          "Metacognitive Self-Check: Why does the raw mobile bank balance of '$190 Available Checking' NOT mean Maya can safely pull $75 from Checking at 7:30 PM?",
          "Conceptual Cue: Recall from Maya's Move-In brief what happens at 11:59 PM tonight—real bank apps do not pre-subtract scheduled overnight ACH drafts.",
          "Concrete Verification: $190 Checking minus $75 leaves $115, which fails tonight's $130 11:59 PM electric utility draft (-$15 overdraft + $35 fee). Bridging the 4-day gap until Friday's $400 refund requires keeping Checking >= $130 tonight."
        ],
        options: [
          {
            id: "debit_75",
            label: "Pay $75 with Maya's Debit Card since Checking displays $190",
            sub: "Deducts $75 from Checking ($190 → $115 before 11:59 PM batch)",
            checkingDelta: -75,
            creditDelta: 0,
            fraudRisk: "Low (University Bookstore)",
            fraudSeverity: "low",
            optimal: false,
            misconceptions: ["liquidity_blindness"],
            tapeLabel: "3.3 Chem Lab Kit (Debit)",
            tapeAmount: "-$75 Checking",
            feedbackTitle: "Overdraft Triggered at 11:59 PM · Unlisted $130 Utility Draft Collides with $115 Checking",
            feedbackTone: "alert",
            feedbackBody:
              "This is the #1 real-world student overdraft pattern: $190 looked sufficient for $75, reducing Checking to $115—and at 11:59 PM tonight, the $130 electric utility setup draft pulled Checking down to -$15 plus a $35 Overdraft Fee (-$50!). Revise to protect tonight's liquidity."
          },
          {
            id: "credit_75",
            label: "Pay $75 with Maya's Credit Card and schedule full payoff for Friday's $400 refund",
            sub: "Posts $75 to Credit ($170 total); preserves $190 Checking for 11:59 PM",
            checkingDelta: 0,
            creditDelta: 75,
            fraudRisk: "Low (University Bookstore + FCBA)",
            fraudSeverity: "low",
            optimal: true,
            misconceptions: [],
            tapeLabel: "3.3 Chem Lab Kit (Credit Float)",
            tapeAmount: "+$75 Credit",
            feedbackTitle: "Transaction 3.3 & Stage 3 Mastered · 11:59 PM $130 Utility Draft Cleared Safely!",
            feedbackTone: "mastery",
            feedbackBody:
              "Without any warning banners or pre-computed buffer rows, you independently protected Maya's Checking balance! At 11:59 PM, the $130 electric utility draft cleared $190 Checking cleanly—leaving $60 Cash, $0 overdraft fees, and a $170 Credit statement fully covered by Friday's $400 refund at $0 interest."
          },
          {
            id: "campus_p2p_75",
            label: "Pay $75 via Bank-Linked Campus P2P / ACH Checkout",
            sub: "Initiates $75 Checking pull ($190 → $115 before 11:59 PM batch)",
            checkingDelta: -75,
            creditDelta: 0,
            fraudRisk: "Low (University Bookstore)",
            fraudSeverity: "low",
            optimal: false,
            misconceptions: ["liquidity_blindness"],
            tapeLabel: "3.3 Chem Lab Kit (Bank P2P)",
            tapeAmount: "-$75 Checking",
            feedbackTitle: "Overdraft Triggered at 11:59 PM · Bank-Linked App Still Drains Checking to $115",
            feedbackTone: "alert",
            feedbackBody:
              "Switching the interface from a plastic Debit card to a bank-linked payment app still pulls $75 from the same $190 Checking pool—leaving $115 when tonight's $130 electric utility draft runs and triggering a -$15 overdraft + $35 fee."
          }
        ]
      }
    ]
  };

  /* ------------------------------------------------------------------------
     4. Targeted Remediation Micro-Tasks (3 Dominant Misconception Paths)
     ------------------------------------------------------------------------ */

  const REMEDIATION_TASKS = {
    liquidity_blindness: {
      key: "liquidity_blindness",
      badge: "Targeted Remediation · Cash Liquidity & Auto-Pay Timing (LO4)",
      heading: "Repairing the 'Debit Is Always Safer' Overgeneralization",
      whyTriggered:
        "Your recent decisions treated immediate Checking deduction as safer even when scheduled auto-debits or fuel-pump holds were about to pull from the same Checking balance.",
      trapTitle: "Naive Rule: 'Always Swipe Debit'",
      trapBody:
        "Starting Checking: $210 with a $120 scheduled auto-debit tonight. Paying an urgent $150 expense on Debit drops Checking to $60 → tonight's $120 auto-debit hits → -$60 balance + $35 Overdraft Fee (an immediate 23% fee penalty).",
      soundTitle: "Strategic Rule: 'Buffer Pending Auto-Debits'",
      soundBody:
        "Reserve $120 in Checking first ($210 − $120 = $90 true safe Checking). Put the $150 urgent expense on Credit within the grace period, let tonight's $120 auto-debit clear ($90 left), and pay $150 in full on payday → $0 fees, $0 interest.",
      question:
        "Verification Check: You have $190 in Checking, a $110 electric bill auto-drafting tonight, and $95 in required lab materials needed today before tomorrow's confirmed $260 paycheck. Which move protects liquidity at $0 fee cost?",
      options: [
        {
          id: "a",
          label: "Swipe Debit for $95 today so you never borrow ($190 → $95 Checking before tonight's $110 draft)",
          correct: false,
          feedback:
            "Check tonight's subtraction: $95 remaining minus tonight's $110 electric auto-draft leaves -$15 and triggers a $35 overdraft fee."
        },
        {
          id: "b",
          label: "Put $95 on Credit today, let tonight's $110 electric auto-draft clear Checking ($80 left), and pay the $95 Credit charge in full tomorrow",
          correct: true,
          feedback:
            "Verified! Preserving Checking above $110 prevents tonight's $35 overdraft fee, and paying the $95 statement charge within the grace period tomorrow incurs $0 interest."
        },
        {
          id: "c",
          label: "Pay $95 via bank-linked P2P so it routes through an app instead of your plastic Debit card",
          correct: false,
          feedback:
            "A bank-linked P2P pull drains the exact same $95 from Checking, still causing tonight's $110 electric auto-draft to bounce by -$15."
        }
      ]
    },
    fraud_exposure: {
      key: "fraud_exposure",
      badge: "Targeted Remediation · Statutory Fraud Shield & Cash Isolation (LO2)",
      heading: "Separating P2P Cash Pushes, Reg E Freezes, and FCBA Chargebacks",
      whyTriggered:
        "Your recent choices exposed direct Checking funds or irreversible P2P transfers to unverified sellers or high-skimmer terminals.",
      trapTitle: "Exposed Path: P2P to Strangers or Debit Online",
      trapBody:
        "Sending $200 via P2P to an unknown seller counts as an authorized push—if they vanish, recovery is $0. Paying $200 via Debit gives Reg E rights, yet $200 of your real Checking cash stays missing for up to 10 business days during bank investigation.",
      soundTitle: "Insulated Path: Credit FCBA Shield for Unknown Vendors",
      soundBody:
        "Under the Fair Credit Billing Act (FCBA), disputing an undelivered or fraudulent Credit charge withholds the card issuer's money—leaving 100% of your Checking cash intact to cover rent and utilities.",
      question:
        "Verification Check: An unfamiliar off-campus seller sends a checkout link asking for a $130 deposit to hold a used desk before Saturday pickup. Which choice protects both dispute rights and Checking liquidity?",
      options: [
        {
          id: "a",
          label: "Send $130 on Venmo/Zelle and type 'Desk Deposit — Refundable' in the memo line",
          correct: false,
          feedback:
            "Memo notes on peer-to-peer transfers carry zero legal chargeback protection; authorized P2P sends to strangers cannot be reversed for non-delivery."
        },
        {
          id: "b",
          label: "Enter your Debit Card number so the $130 clears directly from Checking right away",
          correct: false,
          feedback:
            "If the seller disappears or skims the card, $130+ of your actual Checking cash is tied up while the bank investigates."
        },
        {
          id: "c",
          label: "Pay only via Credit Card merchant checkout (or decline the deal if they demand P2P), keeping Checking untouched",
          correct: true,
          feedback:
            "Verified! Credit checkout provides FCBA non-delivery chargeback protection while keeping your liquid Checking cash completely insulated."
        }
      ]
    },
    reward_chasing: {
      key: "reward_chasing",
      badge: "Targeted Remediation · Spending Psychology & Points Arithmetic (LO3)",
      heading: "Seeing Through Deferred Payment Illusion & 2% Reward Rationalization",
      whyTriggered:
        "Your recent choices chased small percentage rewards or Spend-Bonus thresholds by absorbing unbudgeted impulse items or uncollected peer IOUs.",
      trapTitle: "Psychological Trap: Chasing 2%–3% Points",
      trapBody:
        "Floating $90 of acquaintances' brunch tabs for 3% dining points earns $2.70—yet one uncollected $30 share loses 11x the reward, and carrying $90 for two months at 24% APR costs $3.60 in interest.",
      soundTitle: "Disciplined Rule: Budget First, Never Spend Extra for Points",
      soundBody:
        "Treat credit rewards strictly as a passive rebate on already-budgeted solo expenses paid in full; use instant P2P splits at the table for group tabs and Debit caps when curbing impulse drift.",
      question:
        "Verification Check: At a $120 group brunch (your meal is $30), two acquaintances say, 'Put all $120 on your Credit Card for the 3% dining cashback and we'll pay you back next month.' What is the sound financial decision?",
      options: [
        {
          id: "a",
          label: "Swipe your Credit Card for $120 and wait until next month—$2.70 extra cashback is guaranteed profit",
          correct: false,
          feedback:
            "Risking $90 of uncollected debt and next-cycle 24% APR interest to chase $2.70 has strongly negative expected value."
        },
        {
          id: "b",
          label: "Pay only your $30 share (or require instant P2P transfers to clear before swiping) rather than floating $90 for $2.70 in points",
          correct: true,
          feedback:
            "Verified! Refusing uncollected IOU float prevents reward-point rationalization from inflating your credit statement beyond your monthly budget."
        },
        {
          id: "c",
          label: "Put all $120 on your Debit Card instead so you avoid credit card points temptation while floating the $90",
          correct: false,
          feedback:
            "Putting $120 on Debit still fronts $90 of other people's meals—draining your liquid Checking cash immediately!"
        }
      ]
    }
  };

  /* ------------------------------------------------------------------------
     5. Canonical Application State
     ------------------------------------------------------------------------ */

  function createInitialState() {
    const s1Items = {};
    STAGE_1_ITEMS.forEach((item) => {
      s1Items[item.id] = {
        selectedMethod: null,
        selectedFactor: null,
        hintLevel: 0,
        attempts: 0,
        mastered: false,
        lastCheckedKey: null,
        feedback: null
      };
    });

    const s2Steps = {};
    STAGE_2_CONFIG.steps.forEach((step) => {
      s2Steps[step.id] = {
        selectedOption: null,
        committedOption: null,
        hintLevel: 0,
        attempts: 0,
        mastered: false,
        feedback: null
      };
    });

    const s3Steps = {};
    STAGE_3_CONFIG.steps.forEach((step) => {
      s3Steps[step.id] = {
        selectedOption: null,
        committedOption: null,
        hintLevel: 0,
        attempts: 0,
        mastered: false,
        feedback: null
      };
    });

    return {
      activeStage: 1,
      learningEngineerView: false,
      instructorUnlockedAll: false,
      primerOpen: false,
      lockNotice: null,
      misconceptions: {
        liquidity_blindness: 0,
        fraud_exposure: 0,
        reward_chasing: 0
      },
      totalErrors: 0,
      remediatedTypes: {
        liquidity_blindness: false,
        fraud_exposure: false,
        reward_chasing: false
      },
      activeRemediation: null,
      stage1: {
        items: s1Items,
        mastered: false
      },
      stage2: {
        steps: s2Steps,
        mastered: false
      },
      stage3: {
        steps: s3Steps,
        mastered: false,
        hintsUsed: 0,
        errorsCount: 0
      }
    };
  }

  let state = createInitialState();

  /* ------------------------------------------------------------------------
     6. Pure Ledger & Mastery Calculations
     ------------------------------------------------------------------------ */

  function isStageUnlocked(stageNum) {
    if (stageNum === 1) return true;
    if (state.instructorUnlockedAll) return true;
    if (stageNum === 2) return state.stage1.mastered;
    if (stageNum === 3) return state.stage1.mastered && state.stage2.mastered;
    return false;
  }

  function countMasteredStages() {
    return (
      (state.stage1.mastered ? 1 : 0) +
      (state.stage2.mastered ? 1 : 0) +
      (state.stage3.mastered ? 1 : 0)
    );
  }

  function computeStage2Ledger() {
    let checking = STAGE_2_CONFIG.initialChecking;
    let credit = STAGE_2_CONFIG.initialCredit;
    let fraudRisk = "Low (Baseline)";
    let fraudSeverity = "low";
    let overdraftFees = 0;
    const tape = [
      { label: "Opening Balance", amount: "$240 Checking / $0 Credit" }
    ];

    STAGE_2_CONFIG.steps.forEach((stepCfg) => {
      const st = state.stage2.steps[stepCfg.id];
      if (!st.committedOption) return;
      const opt = stepCfg.options.find((o) => o.id === st.committedOption);
      if (!opt) return;

      checking += opt.checkingDelta;
      credit += opt.creditDelta;
      tape.push({ label: opt.tapeLabel, amount: opt.tapeAmount });

      if (opt.fraudSeverity === "severe") {
        fraudSeverity = "severe";
        fraudRisk = opt.fraudRisk;
      } else if (opt.fraudSeverity === "elevated" && fraudSeverity !== "severe") {
        fraudSeverity = "elevated";
        fraudRisk = opt.fraudRisk;
      } else if (fraudSeverity === "low") {
        fraudRisk = opt.fraudRisk;
      }
    });

    const allMastered = STAGE_2_CONFIG.steps.every(
      (s) => state.stage2.steps[s.id].mastered
    );

    let pendingHold = STAGE_2_CONFIG.pendingAutoDebit;
    let netSafeBuffer = checking - pendingHold;
    let projectedOverdraft = false;

    if (allMastered) {
      // Settle 6:00 AM $120 Auto-Debit cleanly!
      checking -= STAGE_2_CONFIG.pendingAutoDebit;
      pendingHold = 0;
      netSafeBuffer = checking;
      tape.push({
        label: "6:00 AM Streaming Auto-Debit Settled",
        amount: "-$120 Checking"
      });
    } else {
      if (checking < 0) {
        overdraftFees = STAGE_2_CONFIG.overdraftFeeAmount;
      } else if (checking - pendingHold < 0) {
        projectedOverdraft = true;
        overdraftFees = STAGE_2_CONFIG.overdraftFeeAmount;
      }
    }

    return {
      checking,
      credit,
      pendingHold,
      netSafeBuffer,
      fraudRisk,
      fraudSeverity,
      overdraftFees,
      projectedOverdraft,
      settled: allMastered,
      tape
    };
  }

  function computeStage3Ledger() {
    let checking = STAGE_3_CONFIG.initialChecking;
    let credit = STAGE_3_CONFIG.initialCredit;
    let fraudRisk = "Low (Baseline)";
    let fraudSeverity = "low";
    let overdraftFees = 0;
    let settled = false;
    const tape = [
      { label: "Move-In Opening Balance", amount: "$210 Checking / $0 Credit" }
    ];

    STAGE_3_CONFIG.steps.forEach((stepCfg) => {
      const st = state.stage3.steps[stepCfg.id];
      if (!st.committedOption) return;
      const opt = stepCfg.options.find((o) => o.id === st.committedOption);
      if (!opt) return;

      checking += opt.checkingDelta;
      credit += opt.creditDelta;
      tape.push({ label: opt.tapeLabel, amount: opt.tapeAmount });

      if (opt.fraudSeverity === "severe") {
        fraudSeverity = "severe";
        fraudRisk = opt.fraudRisk;
      } else if (opt.fraudSeverity === "elevated" && fraudSeverity !== "severe") {
        fraudSeverity = "elevated";
        fraudRisk = opt.fraudRisk;
      } else if (fraudSeverity === "low") {
        fraudRisk = opt.fraudRisk;
      }
    });

    const step3Committed = state.stage3.steps["3"].committedOption;
    const allMastered = STAGE_3_CONFIG.steps.every(
      (s) => state.stage3.steps[s.id].mastered
    );

    // Settle 11:59 PM $130 Utility Draft once Transaction 3.3 is committed so consequence is real!
    if (step3Committed || allMastered) {
      settled = true;
      checking -= STAGE_3_CONFIG.scheduledUtilityDraft;
      tape.push({
        label: "11:59 PM Electric Utility Draft",
        amount: "-$130 Checking"
      });
      if (checking < 0) {
        overdraftFees = STAGE_3_CONFIG.overdraftFeeAmount;
        checking -= overdraftFees;
        tape.push({
          label: "Bank Overdraft Fee Assessed",
          amount: "-$35 Fee"
        });
      }
    } else if (checking - STAGE_3_CONFIG.scheduledUtilityDraft < 0 && state.stage3.steps["1"].committedOption) {
      // Note: On raw bank app view before 11:59 PM, bank does NOT pre-subtract $130 until midnight batch!
      // Only actual < $0 triggers immediate fee prior to 11:59 PM.
      if (checking < 0) {
        overdraftFees = STAGE_3_CONFIG.overdraftFeeAmount;
      }
    }

    return {
      checking,
      credit,
      fraudRisk,
      fraudSeverity,
      overdraftFees,
      settled,
      tape
    };
  }

  function formatDollar(num) {
    const abs = Math.abs(num);
    return (num < 0 ? "-$" : "$") + abs;
  }

  /* ------------------------------------------------------------------------
     7. Misconception Tracking & Adaptive Remediation Routing
     ------------------------------------------------------------------------ */

  function recordMisconceptions(tags) {
    state.totalErrors += 1;
    if (Array.isArray(tags) && tags.length > 0) {
      tags.forEach((t) => {
        if (Object.prototype.hasOwnProperty.call(state.misconceptions, t)) {
          state.misconceptions[t] += 1;
        }
      });
    }
  }

  function pickDominantMisconception(preferredTags) {
    const keys = ["liquidity_blindness", "fraud_exposure", "reward_chasing"];
    // First prefer an un-remediated tag from the current error's tags if tied or urgent
    if (Array.isArray(preferredTags)) {
      for (const t of preferredTags) {
        if (!state.remediatedTypes[t]) {
          return t;
        }
      }
    }
    // Otherwise pick the un-remediated misconception with highest count > 0
    let bestKey = null;
    let bestCount = 0;
    keys.forEach((k) => {
      if (!state.remediatedTypes[k] && state.misconceptions[k] > bestCount) {
        bestCount = state.misconceptions[k];
        bestKey = k;
      }
    });
    return bestKey;
  }

  function maybeTriggerRemediation(options) {
    const { preferredTags = [], stage2SevereEvent = false } = options || {};
    if (state.activeRemediation && !state.activeRemediation.isPreview) {
      return;
    }

    const shouldCheck = state.totalErrors >= 2 || stage2SevereEvent;
    if (!shouldCheck) return;

    const targetKey = pickDominantMisconception(preferredTags);
    if (!targetKey) return;

    state.activeRemediation = {
      type: targetKey,
      isPreview: false,
      selectedOption: null,
      verified: false,
      feedback: null
    };

    renderAll();
    const shell = document.getElementById("remediation-shell");
    if (shell) {
      shell.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function openRemediationPreview(typeKey) {
    if (!REMEDIATION_TASKS[typeKey]) return;
    state.activeRemediation = {
      type: typeKey,
      isPreview: true,
      selectedOption: null,
      verified: false,
      feedback: null
    };
    renderAll();
    const shell = document.getElementById("remediation-shell");
    if (shell) {
      shell.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  /* ------------------------------------------------------------------------
     8. Event Handlers & Actions
     ------------------------------------------------------------------------ */

  function setStage(stageNum) {
    if (!isStageUnlocked(stageNum)) {
      const prereq = stageNum === 2 ? "Stage 1 (4/4 scenarios)" : "Stages 1 and 2";
      state.lockNotice = `Complete ${prereq} first to unlock Stage ${stageNum} mastery progression—or toggle "Learning Engineer View" in the top bar and click "Unlock All Stages (Inspect)" to preview directly.`;
      renderAll();
      return;
    }
    state.lockNotice = null;
    state.activeStage = stageNum;

    // Fading rule: collapse Reference Matrix automatically upon entering Stage 3
    if (stageNum === 3) {
      state.primerOpen = false;
    }
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleStage1Check(itemId) {
    const itemCfg = STAGE_1_ITEMS.find((i) => i.id === itemId);
    const itemState = state.stage1.items[itemId];
    if (!itemCfg || !itemState || itemState.mastered) return;
    if (!itemState.selectedMethod || !itemState.selectedFactor) return;

    const pairKey = `${itemState.selectedMethod}:${itemState.selectedFactor}`;
    const result = itemCfg.diagnose(itemState.selectedMethod, itemState.selectedFactor);

    if (result.ok) {
      itemState.attempts += 1;
      itemState.mastered = true;
      itemState.lastCheckedKey = pairKey;
      itemState.feedback = result;

      state.stage1.mastered = STAGE_1_ITEMS.every(
        (i) => state.stage1.items[i.id].mastered
      );
      renderAll();
      return;
    }

    // Avoid double-incrementing counters if user clicks Check repeatedly without changing selection
    const isNewAttemptPair = itemState.lastCheckedKey !== pairKey;
    itemState.lastCheckedKey = pairKey;
    if (isNewAttemptPair) {
      itemState.attempts += 1;
      recordMisconceptions(result.misconceptions || []);
    }

    let bodyText = result.body;
    if (itemState.attempts >= 2) {
      bodyText +=
        " (Tip: Open the next Hint level below if you want a concrete check before revising your pairing.)";
    }

    itemState.feedback = {
      ok: false,
      tone: result.tone,
      title: `${result.title} · Attempt ${itemState.attempts}`,
      body: bodyText
    };

    renderAll();
    if (isNewAttemptPair) {
      maybeTriggerRemediation({
        preferredTags: result.misconceptions || [],
        stage2SevereEvent: false
      });
    }
  }

  function handleStage2Commit(stepId) {
    const stepCfg = STAGE_2_CONFIG.steps.find((s) => s.id === stepId);
    const stepState = state.stage2.steps[stepId];
    if (!stepCfg || !stepState || stepState.mastered || !stepState.selectedOption) return;

    const opt = stepCfg.options.find((o) => o.id === stepState.selectedOption);
    if (!opt) return;

    stepState.committedOption = opt.id;
    stepState.attempts += 1;

    if (opt.optimal) {
      stepState.mastered = true;
      stepState.feedback = {
        ok: true,
        tone: opt.feedbackTone,
        title: opt.feedbackTitle,
        body: opt.feedbackBody
      };
      state.stage2.mastered = STAGE_2_CONFIG.steps.every(
        (s) => state.stage2.steps[s.id].mastered
      );
      renderAll();
      return;
    }

    stepState.mastered = false;
    stepState.feedback = {
      ok: false,
      tone: opt.feedbackTone,
      title: `${opt.feedbackTitle} · Attempt ${stepState.attempts}`,
      body: opt.feedbackBody
    };

    recordMisconceptions(opt.misconceptions || []);
    const ledgerAfter = computeStage2Ledger();
    const severeTrigger =
      ledgerAfter.overdraftFees > 0 ||
      ledgerAfter.projectedOverdraft ||
      opt.fraudSeverity === "elevated" ||
      opt.fraudSeverity === "severe";

    renderAll();
    maybeTriggerRemediation({
      preferredTags: opt.misconceptions || [],
      stage2SevereEvent: severeTrigger
    });
  }

  function handleStage2Revise(stepId) {
    if (state.activeRemediation && !state.activeRemediation.isPreview && !state.activeRemediation.verified) {
      const shell = document.getElementById("remediation-shell");
      if (shell) shell.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    const stepState = state.stage2.steps[stepId];
    if (!stepState) return;
    stepState.committedOption = null;
    stepState.selectedOption = null;
    stepState.feedback = null;
    renderAll();
  }

  function handleStage3Commit(stepId) {
    const stepCfg = STAGE_3_CONFIG.steps.find((s) => s.id === stepId);
    const stepState = state.stage3.steps[stepId];
    if (!stepCfg || !stepState || stepState.mastered || !stepState.selectedOption) return;

    const opt = stepCfg.options.find((o) => o.id === stepState.selectedOption);
    if (!opt) return;

    stepState.committedOption = opt.id;
    stepState.attempts += 1;

    if (opt.optimal) {
      stepState.mastered = true;
      stepState.feedback = {
        ok: true,
        tone: opt.feedbackTone,
        title: opt.feedbackTitle,
        body: opt.feedbackBody
      };
      state.stage3.mastered = STAGE_3_CONFIG.steps.every(
        (s) => state.stage3.steps[s.id].mastered
      );
      renderAll();
      return;
    }

    state.stage3.errorsCount += 1;
    recordMisconceptions(opt.misconceptions || []);
    stepState.mastered = false;
    stepState.feedback = {
      ok: false,
      tone: opt.feedbackTone,
      title: `${opt.feedbackTitle} · Attempt ${stepState.attempts}`,
      body: opt.feedbackBody
    };
    renderAll();
  }

  function handleStage3Revise(stepId) {
    const stepState = state.stage3.steps[stepId];
    if (!stepState) return;
    stepState.committedOption = null;
    stepState.selectedOption = null;
    stepState.feedback = null;
    renderAll();
  }

  /* ------------------------------------------------------------------------
     9. DOM Rendering Functions (Clean Deterministic Templates & Unique IDs)
     ------------------------------------------------------------------------ */

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderHeaderAndNav() {
    const masteredCount = countMasteredStages();
    const readout = document.getElementById("mastery-readout");
    if (readout) {
      readout.textContent = `Mastery: ${masteredCount} / 3 Stages`;
    }

    const lxdBtn = document.getElementById("btn-toggle-lxd");
    if (lxdBtn) {
      lxdBtn.setAttribute("aria-pressed", state.learningEngineerView ? "true" : "false");
    }
    document.body.classList.toggle("lxd-active", state.learningEngineerView);

    // Primer state
    const primerBtn = document.getElementById("btn-toggle-primer");
    const primerLabel = document.getElementById("primer-btn-label");
    const primerDrawer = document.getElementById("primer-drawer");
    const fadedNote = document.getElementById("primer-faded-note");

    if (primerBtn && primerLabel && primerDrawer) {
      primerBtn.setAttribute("aria-expanded", state.primerOpen ? "true" : "false");
      primerLabel.textContent = state.primerOpen
        ? "Hide 4-Dimension Payment Reference Matrix"
        : "Show 4-Dimension Payment Reference Matrix";
      primerDrawer.hidden = !state.primerOpen;
    }
    if (fadedNote) {
      fadedNote.hidden = !(state.activeStage === 3 && !state.primerOpen);
    }

    // LXD Live Telemetry Chips
    const chipsEl = document.getElementById("lxd-telemetry-chips");
    if (chipsEl) {
      const scaffoldMode =
        state.activeStage === 3
          ? "faded"
          : state.activeStage === 2
          ? "guided_ledger"
          : "channeling_full";
      chipsEl.innerHTML = `
        <span class="telemetry-chip">liquidity_blindness: ${state.misconceptions.liquidity_blindness}</span>
        <span class="telemetry-chip">fraud_exposure: ${state.misconceptions.fraud_exposure}</span>
        <span class="telemetry-chip">reward_chasing: ${state.misconceptions.reward_chasing}</span>
        <span class="telemetry-chip">totalErrors: ${state.totalErrors}</span>
        <span class="telemetry-chip">scaffoldMode: "${scaffoldMode}"</span>
      `;
    }

    // Stage Tabs
    const s1MasteredItems = STAGE_1_ITEMS.filter(
      (i) => state.stage1.items[i.id].mastered
    ).length;
    const s2MasteredSteps = STAGE_2_CONFIG.steps.filter(
      (s) => state.stage2.steps[s.id].mastered
    ).length;
    const s3MasteredSteps = STAGE_3_CONFIG.steps.filter(
      (s) => state.stage3.steps[s.id].mastered
    ).length;

    const tabConfigs = [
      {
        num: 1,
        tabId: "tab-stage-1",
        badgeId: "badge-stage-1",
        mastered: state.stage1.mastered,
        badgeText: state.stage1.mastered ? "Mastered" : `${s1MasteredItems} / 4 Mastered`
      },
      {
        num: 2,
        tabId: "tab-stage-2",
        badgeId: "badge-stage-2",
        mastered: state.stage2.mastered,
        badgeText: state.stage2.mastered
          ? "Mastered"
          : isStageUnlocked(2)
          ? `${s2MasteredSteps} / 3 Steps`
          : "Locked"
      },
      {
        num: 3,
        tabId: "tab-stage-3",
        badgeId: "badge-stage-3",
        mastered: state.stage3.mastered,
        badgeText: state.stage3.mastered
          ? "Mastered"
          : isStageUnlocked(3)
          ? `${s3MasteredSteps} / 3 Steps`
          : "Locked"
      }
    ];

    tabConfigs.forEach((cfg) => {
      const tab = document.getElementById(cfg.tabId);
      const badge = document.getElementById(cfg.badgeId);
      const unlocked = isStageUnlocked(cfg.num);
      if (tab) {
        tab.classList.toggle("is-active", state.activeStage === cfg.num);
        tab.classList.toggle("is-locked", !unlocked);
        if (state.activeStage === cfg.num) {
          tab.setAttribute("aria-current", "step");
        } else {
          tab.removeAttribute("aria-current");
        }
      }
      if (badge) {
        badge.textContent = cfg.badgeText;
        badge.classList.toggle("is-mastered", cfg.mastered);
      }
    });

    // Lock Notice
    const lockEl = document.getElementById("stage-lock-notice");
    if (lockEl) {
      if (state.lockNotice) {
        lockEl.textContent = state.lockNotice;
        lockEl.hidden = false;
      } else {
        lockEl.hidden = true;
      }
    }

    // Active Stage Panel visibility
    document.getElementById("stage-1-panel").hidden = state.activeStage !== 1;
    document.getElementById("stage-2-panel").hidden = state.activeStage !== 2;
    document.getElementById("stage-3-panel").hidden = state.activeStage !== 3;
  }

  function renderRemediation() {
    const shell = document.getElementById("remediation-shell");
    if (!shell) return;

    if (!state.activeRemediation) {
      shell.hidden = true;
      shell.innerHTML = "";
      return;
    }

    const rem = state.activeRemediation;
    const task = REMEDIATION_TASKS[rem.type];
    if (!task) {
      shell.hidden = true;
      return;
    }

    shell.hidden = false;
    const optionsHtml = task.options
      .map((opt) => {
        const selected = rem.selectedOption === opt.id;
        return `
          <button
            id="btn-rem-opt-${opt.id}"
            type="button"
            class="option-btn ${selected ? "is-selected" : ""}"
            data-rem-opt="${opt.id}"
            ${rem.verified ? "disabled" : ""}
          >
            <span class="option-radio-dot" aria-hidden="true"></span>
            <span><span class="option-label-main">${escapeHtml(opt.label)}</span></span>
          </button>
        `;
      })
      .join("");

    const feedbackHtml = rem.feedback
      ? `
        <div class="diagnostic-box ${rem.feedback.ok ? "is-mastery" : "is-caution"}">
          <span class="diagnostic-title">${rem.feedback.ok ? "Remediation Check Verified" : "Diagnostic Check — Re-examine the Numbers"}</span>
          <p>${escapeHtml(rem.feedback.text)}</p>
        </div>
      `
      : "";

    shell.innerHTML = `
      <div class="remediation-card">
        <div class="remediation-banner">
          <span class="remediation-eyebrow">${escapeHtml(task.badge)}${rem.isPreview ? " · Instructor Preview" : ""}</span>
          ${
            rem.isPreview
              ? `<button id="btn-rem-close-preview" type="button" class="btn-secondary">Close Preview</button>`
              : `<span class="mono-num">Adaptive Mastery Gate</span>`
          }
        </div>
        <h3>${escapeHtml(task.heading)}</h3>
        <p class="card-narrative">${escapeHtml(task.whyTriggered)}</p>

        <div class="remediation-contrast-grid">
          <div class="contrast-box is-trap">
            <span class="contrast-label">${escapeHtml(task.trapTitle)}</span>
            <p>${escapeHtml(task.trapBody)}</p>
          </div>
          <div class="contrast-box is-sound">
            <span class="contrast-label">${escapeHtml(task.soundTitle)}</span>
            <p>${escapeHtml(task.soundBody)}</p>
          </div>
        </div>

        <fieldset class="choice-fieldset">
          <legend class="choice-legend">${escapeHtml(task.question)}</legend>
          <div class="choice-stack">
            ${optionsHtml}
          </div>
        </fieldset>

        ${feedbackHtml}

        <div class="card-actions">
          <div class="card-actions-left">
            ${
              !rem.verified
                ? `<button id="btn-rem-verify" type="button" class="btn-primary" ${!rem.selectedOption ? "disabled" : ""}>Verify Micro-Task Answer</button>`
                : `<button id="btn-rem-return" type="button" class="btn-primary">${rem.isPreview ? "Done Inspecting Micro-Task" : "Return & Apply Repaired Strategy →"}</button>`
            }
          </div>
        </div>
      </div>
    `;

    // Bind Remediation Listeners
    shell.querySelectorAll("[data-rem-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.activeRemediation.verified) return;
        state.activeRemediation.selectedOption = btn.getAttribute("data-rem-opt");
        renderRemediation();
      });
    });

    const verifyBtn = document.getElementById("btn-rem-verify");
    if (verifyBtn) {
      verifyBtn.addEventListener("click", () => {
        const chosen = task.options.find((o) => o.id === rem.selectedOption);
        if (!chosen) return;
        if (chosen.correct) {
          rem.verified = true;
          if (!rem.isPreview) {
            state.remediatedTypes[rem.type] = true;
          }
          rem.feedback = { ok: true, text: chosen.feedback };
        } else {
          rem.feedback = { ok: false, text: chosen.feedback };
        }
        renderRemediation();
      });
    }

    const returnBtn = document.getElementById("btn-rem-return");
    if (returnBtn) {
      returnBtn.addEventListener("click", () => {
        state.activeRemediation = null;
        renderAll();
      });
    }

    const closePreviewBtn = document.getElementById("btn-rem-close-preview");
    if (closePreviewBtn) {
      closePreviewBtn.addEventListener("click", () => {
        state.activeRemediation = null;
        renderAll();
      });
    }
  }

  function renderHintsStack(hints, unlockedCount) {
    if (!unlockedCount || unlockedCount <= 0) return "";
    const labels = [
      "Hint Level 1 / 3 · Metacognitive Prompt",
      "Hint Level 2 / 3 · Conceptual Trade-Off Cue",
      "Hint Level 3 / 3 · Concrete Protection & Liquidity Check"
    ];
    const items = [];
    for (let i = 0; i < unlockedCount && i < hints.length; i += 1) {
      items.push(`
        <div class="hint-box">
          <span class="hint-level-label">${labels[i]}</span>
          <p>${escapeHtml(hints[i])}</p>
        </div>
      `);
    }
    return `<div class="hint-stack">${items.join("")}</div>`;
  }

  function renderDiagnosticBox(feedback) {
    if (!feedback) return "";
    const toneClass =
      feedback.tone === "mastery"
        ? "is-mastery"
        : feedback.tone === "alert"
        ? "is-alert"
        : "is-caution";
    return `
      <div class="diagnostic-box ${toneClass}" role="status" aria-live="polite">
        <span class="diagnostic-title">${escapeHtml(feedback.title)}</span>
        <p>${escapeHtml(feedback.body)}</p>
      </div>
    `;
  }

  function renderStage1() {
    const mount = document.getElementById("stage-1-cards");
    if (!mount) return;

    mount.innerHTML = STAGE_1_ITEMS.map((item) => {
      const st = state.stage1.items[item.id];
      const statusClass = st.mastered
        ? "status-mastered"
        : st.attempts > 0
        ? "status-revise"
        : "";
      const statusText = st.mastered
        ? "Mastered"
        : st.attempts > 0
        ? `Attempt ${st.attempts} · Revise Pairing`
        : "Unchecked";

      const methodBtns = PAYMENT_METHODS.map((m) => {
        const selected = st.selectedMethod === m.id;
        return `
          <button
            id="btn-s1-${item.id}-method-${m.id}"
            type="button"
            class="option-btn ${selected ? "is-selected" : ""}"
            data-s1-item="${item.id}"
            data-s1-method="${m.id}"
            ${st.mastered ? "disabled" : ""}
          >
            <span class="option-radio-dot" aria-hidden="true"></span>
            <span>
              <span class="option-label-main">${escapeHtml(m.label)}</span>
              <span class="option-label-sub">${escapeHtml(m.sub)}</span>
            </span>
          </button>
        `;
      }).join("");

      const factorBtns = item.factors
        .map((f) => {
          const selected = st.selectedFactor === f.id;
          return `
            <button
              id="btn-s1-${item.id}-factor-${f.id}"
              type="button"
              class="option-btn ${selected ? "is-selected" : ""}"
              data-s1-item="${item.id}"
              data-s1-factor="${f.id}"
              ${st.mastered ? "disabled" : ""}
            >
              <span class="option-radio-dot" aria-hidden="true"></span>
              <span>
                <span class="option-label-main">${escapeHtml(f.label)}</span>
                <span class="option-label-sub">${escapeHtml(f.sub)}</span>
              </span>
            </button>
          `;
        })
        .join("");

      const canCheck = Boolean(st.selectedMethod && st.selectedFactor && !st.mastered);

      return `
        <article class="decision-card ${st.mastered ? "is-mastered" : ""}">
          <div class="card-top-row">
            <div class="card-step-meta">
              <span class="step-id-tag">${escapeHtml(item.stepLabel)}</span>
              <span class="scaffold-tag">${escapeHtml(item.scaffoldTag)}</span>
            </div>
            <span class="status-tag ${statusClass}">${escapeHtml(statusText)}</span>
          </div>

          <h3>${escapeHtml(item.title)}</h3>
          <p class="card-narrative">${escapeHtml(item.narrative)}</p>

          <fieldset class="choice-fieldset">
            <legend class="choice-legend">1. Select Best Payment Method</legend>
            <div class="choice-grid-3">${methodBtns}</div>
          </fieldset>

          <fieldset class="choice-fieldset">
            <legend class="choice-legend">2. Select Primary Trade-Off Factor</legend>
            <div class="choice-grid-3">${factorBtns}</div>
          </fieldset>

          <div class="card-actions">
            <div class="card-actions-left">
              <button
                id="btn-check-s1-${item.id}"
                type="button"
                class="btn-primary"
                data-s1-check="${item.id}"
                ${canCheck ? "" : "disabled"}
              >${st.mastered ? "Pairing Mastered" : "Check Method + Trade-Off"}</button>
              <button
                id="btn-hint-s1-${item.id}"
                type="button"
                class="btn-secondary"
                data-s1-hint="${item.id}"
                ${st.hintLevel >= 3 || st.mastered ? "disabled" : ""}
              >Request Hint (${st.hintLevel}/3)</button>
            </div>
          </div>

          ${renderHintsStack(item.hints, st.hintLevel)}
          ${renderDiagnosticBox(st.feedback)}
        </article>
      `;
    }).join("");

    // Bind Stage 1 events
    mount.querySelectorAll("[data-s1-method]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-s1-item");
        const m = btn.getAttribute("data-s1-method");
        if (state.stage1.items[id].mastered) return;
        state.stage1.items[id].selectedMethod = m;
        renderStage1();
      });
    });

    mount.querySelectorAll("[data-s1-factor]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-s1-item");
        const f = btn.getAttribute("data-s1-factor");
        if (state.stage1.items[id].mastered) return;
        state.stage1.items[id].selectedFactor = f;
        renderStage1();
      });
    });

    mount.querySelectorAll("[data-s1-check]").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleStage1Check(btn.getAttribute("data-s1-check"));
      });
    });

    mount.querySelectorAll("[data-s1-hint]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-s1-hint");
        const st = state.stage1.items[id];
        if (st.hintLevel < 3) {
          st.hintLevel += 1;
          renderStage1();
        }
      });
    });

    const completeEl = document.getElementById("stage-1-complete");
    if (completeEl) {
      completeEl.hidden = !state.stage1.mastered;
    }
  }

  function renderStage2() {
    const stepsMount = document.getElementById("stage-2-steps");
    const ledgerMount = document.getElementById("stage-2-ledger");
    if (!stepsMount || !ledgerMount) return;

    const ledger = computeStage2Ledger();

    // Determine sequential unlock inside Stage 2
    stepsMount.innerHTML = STAGE_2_CONFIG.steps
      .map((step, idx) => {
        const st = state.stage2.steps[step.id];
        const prevMastered =
          idx === 0 ? true : state.stage2.steps[STAGE_2_CONFIG.steps[idx - 1].id].mastered;
        const lockedStep = !prevMastered;
        const hasSuboptimalCommit = Boolean(st.committedOption && !st.mastered);
        const remBlocking = Boolean(
          state.activeRemediation &&
            !state.activeRemediation.isPreview &&
            !state.activeRemediation.verified
        );

        let statusText = "Queued";
        let statusClass = "";
        if (st.mastered) {
          statusText = "Mastered";
          statusClass = "status-mastered";
        } else if (hasSuboptimalCommit) {
          statusText = "Ledger Risk Triggered · Revise";
          statusClass = "status-revise";
        } else if (!lockedStep) {
          statusText = "Active Step";
        }

        const optionsHtml = step.options
          .map((opt) => {
            const selected = st.selectedOption === opt.id;
            const disabled = lockedStep || Boolean(st.committedOption);
            return `
              <button
                id="btn-s2-${step.id}-opt-${opt.id}"
                type="button"
                class="option-btn ${selected ? "is-selected" : ""}"
                data-s2-step="${step.id}"
                data-s2-opt="${opt.id}"
                ${disabled ? "disabled" : ""}
              >
                <span class="option-radio-dot" aria-hidden="true"></span>
                <span>
                  <span class="option-label-main">${escapeHtml(opt.label)}</span>
                  <span class="option-label-sub">${escapeHtml(opt.sub)}</span>
                </span>
              </button>
            `;
          })
          .join("");

        let primaryActionBtn = "";
        if (!st.committedOption) {
          primaryActionBtn = `
            <button
              id="btn-commit-s2-${step.id}"
              type="button"
              class="btn-primary"
              data-s2-commit="${step.id}"
              ${lockedStep || !st.selectedOption ? "disabled" : ""}
            >Commit Decision to Ledger</button>
          `;
        } else if (hasSuboptimalCommit) {
          primaryActionBtn = remBlocking
            ? `
              <button
                id="btn-focus-rem-s2-${step.id}"
                type="button"
                class="btn-primary"
                data-s2-focus-rem="${step.id}"
              >Complete Remediation Micro-Task Above to Revise ↑</button>
            `
            : `
              <button
                id="btn-revise-s2-${step.id}"
                type="button"
                class="btn-primary"
                data-s2-revise="${step.id}"
              >Rewind &amp; Revise Step 2.${step.id}</button>
            `;
        } else {
          primaryActionBtn = `
            <button
              id="btn-commit-s2-${step.id}"
              type="button"
              class="btn-primary"
              disabled
            >Committed &amp; Verified</button>
          `;
        }

        return `
          <article class="decision-card ${st.mastered ? "is-mastered" : ""} ${lockedStep ? "is-locked-step" : ""}">
            <div class="card-top-row">
              <div class="card-step-meta">
                <span class="step-id-tag">${escapeHtml(step.stepCode)}</span>
                <span class="scaffold-tag">${escapeHtml(step.scaffoldTag)}</span>
              </div>
              <span class="status-tag ${statusClass}">${escapeHtml(statusText)}</span>
            </div>

            <h3>${escapeHtml(step.title)}</h3>
            <p class="card-narrative">${escapeHtml(step.narrative)}</p>
            ${
              step.autopayAlert
                ? `<div class="autopay-scaffold-alert"><strong>${escapeHtml(step.autopayAlert)}</strong></div>`
                : ""
            }

            <fieldset class="choice-fieldset">
              <legend class="choice-legend">Choose Carlos's Payment Action</legend>
              <div class="choice-stack">${optionsHtml}</div>
            </fieldset>

            <div class="card-actions">
              <div class="card-actions-left">
                ${primaryActionBtn}
                <button
                  id="btn-hint-s2-${step.id}"
                  type="button"
                  class="btn-secondary"
                  data-s2-hint="${step.id}"
                  ${lockedStep || st.hintLevel >= 3 || st.mastered ? "disabled" : ""}
                >Request Hint (${st.hintLevel}/3)</button>
              </div>
            </div>

            ${renderHintsStack(step.hints, st.hintLevel)}
            ${renderDiagnosticBox(st.feedback)}
          </article>
        `;
      })
      .join("");

    // Bind Stage 2 step listeners
    stepsMount.querySelectorAll("[data-s2-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const stepId = btn.getAttribute("data-s2-step");
        const optId = btn.getAttribute("data-s2-opt");
        if (state.stage2.steps[stepId].committedOption) return;
        state.stage2.steps[stepId].selectedOption = optId;
        renderStage2();
      });
    });

    stepsMount.querySelectorAll("[data-s2-commit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleStage2Commit(btn.getAttribute("data-s2-commit"));
      });
    });

    stepsMount.querySelectorAll("[data-s2-revise]").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleStage2Revise(btn.getAttribute("data-s2-revise"));
      });
    });

    stepsMount.querySelectorAll("[data-s2-focus-rem]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const shell = document.getElementById("remediation-shell");
        if (shell) shell.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });

    stepsMount.querySelectorAll("[data-s2-hint]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-s2-hint");
        const st = state.stage2.steps[id];
        if (st.hintLevel < 3) {
          st.hintLevel += 1;
          renderStage2();
        }
      });
    });

    // Render Stage 2 Live Account & Risk Ledger (With Focusing Scaffold!)
    const checkingDanger = ledger.checking < 0 || ledger.netSafeBuffer < 0;
    const fraudDanger = ledger.fraudSeverity !== "low";
    const feeDanger = ledger.overdraftFees > 0;

    const tapeHtml = ledger.tape
      .map(
        (entry) => `
        <li class="tape-entry">
          <span>${escapeHtml(entry.label)}</span>
          <span>${escapeHtml(entry.amount)}</span>
        </li>
      `
      )
      .join("");

    ledgerMount.innerHTML = `
      <div class="ledger-header">
        <div>
          <span class="section-label">Carlos · Live Account &amp; Risk Ledger</span>
          <h3>Guided Stateful Balance</h3>
        </div>
        <span class="scaffold-tag">Scaffolded</span>
      </div>

      <div class="ledger-rows">
        <div class="ledger-row ${checkingDanger ? "is-danger" : ledger.settled ? "is-safe" : ""}">
          <span class="ledger-key">Checking Cash</span>
          <span class="ledger-val">${formatDollar(ledger.checking)}</span>
        </div>

        <div class="ledger-row">
          <span class="ledger-key">Credit Balance</span>
          <span class="ledger-val">${formatDollar(ledger.credit)}</span>
        </div>

        <div class="ledger-row">
          <span class="ledger-key">Pending Auto-Debit Hold</span>
          <span class="ledger-val">${ledger.settled ? "$0 (Settled 6:00 AM)" : "-$120 (6:00 AM)"}</span>
        </div>

        <div class="ledger-row is-scaffold-row ${ledger.netSafeBuffer < 0 ? "is-danger" : ""}">
          <span class="ledger-key">Focusing Cue · Net Safe Checking</span>
          <span class="ledger-val">${formatDollar(ledger.netSafeBuffer)}</span>
        </div>

        <div class="ledger-row ${fraudDanger ? "is-danger" : "is-safe"}">
          <span class="ledger-key">Fraud Liability Risk</span>
          <span class="ledger-val">${escapeHtml(ledger.fraudRisk)}</span>
        </div>

        <div class="ledger-row ${feeDanger ? "is-danger" : "is-safe"}">
          <span class="ledger-key">Overdraft Fees ($35 if &lt; $0)</span>
          <span class="ledger-val">${
            ledger.overdraftFees > 0
              ? ledger.projectedOverdraft
                ? "$35 (Projected 6:00 AM)"
                : "$35"
              : "$0"
          }</span>
        </div>
      </div>

      <div class="ledger-tape">
        <span class="section-label">Transaction Tape</span>
        <ul class="tape-list">${tapeHtml}</ul>
      </div>
    `;

    const completeEl = document.getElementById("stage-2-complete");
    if (completeEl) {
      completeEl.hidden = !state.stage2.mastered;
    }
  }

  function renderStage3() {
    const stepsMount = document.getElementById("stage-3-steps");
    const ledgerMount = document.getElementById("stage-3-ledger");
    if (!stepsMount || !ledgerMount) return;

    const ledger = computeStage3Ledger();

    // Notice: ZERO channeling tags and ZERO pre-highlighted auto-pay alert banners!
    stepsMount.innerHTML = STAGE_3_CONFIG.steps
      .map((step, idx) => {
        const st = state.stage3.steps[step.id];
        const prevMastered =
          idx === 0 ? true : state.stage3.steps[STAGE_3_CONFIG.steps[idx - 1].id].mastered;
        const lockedStep = !prevMastered;
        const hasSuboptimalCommit = Boolean(st.committedOption && !st.mastered);

        let statusText = "Queued";
        let statusClass = "";
        if (st.mastered) {
          statusText = "Verified";
          statusClass = "status-mastered";
        } else if (hasSuboptimalCommit) {
          statusText = "Revise Decision";
          statusClass = "status-revise";
        } else if (!lockedStep) {
          statusText = "Active Transaction";
        }

        const optionsHtml = step.options
          .map((opt) => {
            const selected = st.selectedOption === opt.id;
            const disabled = lockedStep || Boolean(st.committedOption);
            return `
              <button
                id="btn-s3-${step.id}-opt-${opt.id}"
                type="button"
                class="option-btn ${selected ? "is-selected" : ""}"
                data-s3-step="${step.id}"
                data-s3-opt="${opt.id}"
                ${disabled ? "disabled" : ""}
              >
                <span class="option-radio-dot" aria-hidden="true"></span>
                <span>
                  <span class="option-label-main">${escapeHtml(opt.label)}</span>
                  <span class="option-label-sub">${escapeHtml(opt.sub)}</span>
                </span>
              </button>
            `;
          })
          .join("");

        let primaryBtn = "";
        if (!st.committedOption) {
          primaryBtn = `
            <button
              id="btn-commit-s3-${step.id}"
              type="button"
              class="btn-primary"
              data-s3-commit="${step.id}"
              ${lockedStep || !st.selectedOption ? "disabled" : ""}
            >Commit Move-In Decision</button>
          `;
        } else if (hasSuboptimalCommit) {
          primaryBtn = `
            <button
              id="btn-revise-s3-${step.id}"
              type="button"
              class="btn-primary"
              data-s3-revise="${step.id}"
            >Rewind &amp; Revise Transaction 3.${step.id}</button>
          `;
        } else {
          primaryBtn = `
            <button
              id="btn-commit-s3-${step.id}"
              type="button"
              class="btn-primary"
              disabled
            >Transaction Verified</button>
          `;
        }

        return `
          <article class="decision-card ${st.mastered ? "is-mastered" : ""} ${lockedStep ? "is-locked-step" : ""}">
            <div class="card-top-row">
              <div class="card-step-meta">
                <span class="step-id-tag">${escapeHtml(step.stepCode)}</span>
              </div>
              <span class="status-tag ${statusClass}">${escapeHtml(statusText)}</span>
            </div>

            <h3>${escapeHtml(step.title)}</h3>
            <p class="card-narrative">${escapeHtml(step.narrative)}</p>

            <fieldset class="choice-fieldset">
              <legend class="choice-legend">Select Maya's Payment Action</legend>
              <div class="choice-stack">${optionsHtml}</div>
            </fieldset>

            <div class="card-actions">
              <div class="card-actions-left">
                ${primaryBtn}
                <button
                  id="btn-hint-s3-${step.id}"
                  type="button"
                  class="btn-secondary"
                  data-s3-hint="${step.id}"
                  ${lockedStep || st.hintLevel >= 3 || st.mastered ? "disabled" : ""}
                >Request Hint (${st.hintLevel}/3)</button>
              </div>
            </div>

            ${renderHintsStack(step.hints, st.hintLevel)}
            ${renderDiagnosticBox(st.feedback)}
          </article>
        `;
      })
      .join("");

    // Bind Stage 3 events
    stepsMount.querySelectorAll("[data-s3-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const stepId = btn.getAttribute("data-s3-step");
        const optId = btn.getAttribute("data-s3-opt");
        if (state.stage3.steps[stepId].committedOption) return;
        state.stage3.steps[stepId].selectedOption = optId;
        renderStage3();
      });
    });

    stepsMount.querySelectorAll("[data-s3-commit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleStage3Commit(btn.getAttribute("data-s3-commit"));
      });
    });

    stepsMount.querySelectorAll("[data-s3-revise]").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleStage3Revise(btn.getAttribute("data-s3-revise"));
      });
    });

    stepsMount.querySelectorAll("[data-s3-hint]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-s3-hint");
        const st = state.stage3.steps[id];
        if (st.hintLevel < 3) {
          st.hintLevel += 1;
          state.stage3.hintsUsed += 1;
          renderStage3();
        }
      });
    });

    // Render Stage 3 Raw Bank View (Faded Ledger — NO Net Safe Checking row!)
    const checkingDanger = ledger.checking < 0;
    const fraudDanger = ledger.fraudSeverity !== "low";
    const feeDanger = ledger.overdraftFees > 0;

    const tapeHtml = ledger.tape
      .map(
        (entry) => `
        <li class="tape-entry">
          <span>${escapeHtml(entry.label)}</span>
          <span>${escapeHtml(entry.amount)}</span>
        </li>
      `
      )
      .join("");

    ledgerMount.innerHTML = `
      <div class="ledger-header">
        <div>
          <span class="section-label">Maya · Raw Mobile Bank View</span>
          <h3>Unscaffolded Account Statement</h3>
        </div>
        <span class="status-tag">Faded</span>
      </div>

      <div class="ledger-rows">
        <div class="ledger-row ${checkingDanger ? "is-danger" : state.stage3.mastered ? "is-safe" : ""}">
          <span class="ledger-key">Displayed Checking Balance</span>
          <span class="ledger-val">${formatDollar(ledger.checking)}</span>
        </div>

        <div class="ledger-row">
          <span class="ledger-key">Credit Card Statement</span>
          <span class="ledger-val">${formatDollar(ledger.credit)}</span>
        </div>

        <div class="ledger-row">
          <span class="ledger-key">Scheduled ACH Auto-Drafts</span>
          <span class="ledger-val">${ledger.settled ? "Settled at 11:59 PM" : "Not Pre-Subtracted"}</span>
        </div>

        <div class="ledger-row ${fraudDanger ? "is-danger" : "is-safe"}">
          <span class="ledger-key">Fraud Liability Exposure</span>
          <span class="ledger-val">${escapeHtml(ledger.fraudRisk)}</span>
        </div>

        <div class="ledger-row ${feeDanger ? "is-danger" : "is-safe"}">
          <span class="ledger-key">Overdraft Fees ($35 if &lt; $0)</span>
          <span class="ledger-val">${formatDollar(ledger.overdraftFees)}</span>
        </div>
      </div>

      <div class="ledger-tape">
        <span class="section-label">Statement Activity</span>
        <ul class="tape-list">${tapeHtml}</ul>
      </div>
    `;
  }

  function renderSynthesis() {
    const panel = document.getElementById("synthesis-panel");
    const lead = document.getElementById("synthesis-lead");
    const grid = document.getElementById("synthesis-grid");
    if (!panel || !lead || !grid) return;

    const allThreeMastered =
      state.stage1.mastered && state.stage2.mastered && state.stage3.mastered;
    if (!allThreeMastered) {
      panel.hidden = true;
      return;
    }

    panel.hidden = false;
    const unassistedTransfer =
      state.stage3.hintsUsed === 0 && state.stage3.errorsCount === 0;

    lead.textContent = unassistedTransfer
      ? "You completed Stage 3 (Campus Move-In Week) with zero hints and zero errors after all channeling and focusing scaffolds were removed—demonstrating full self-regulated transfer across LO1–LO4."
      : `You mastered all three stages and resolved Maya's Campus Move-In Week accounts safely ($60 Checking remaining after the 11:59 PM $130 utility draft, $0 overdraft fees) using ${state.stage3.hintsUsed} contingency hint(s).`;

    const m = state.misconceptions;
    const totalM = m.liquidity_blindness + m.fraud_exposure + m.reward_chasing;
    const profileText =
      totalM === 0
        ? "Zero misconception triggers across all three stages—you consistently protected Checking buffers, isolated unverified merchants onto FCBA-protected credit, and rejected point-chasing float."
        : `Session telemetry logged ${m.liquidity_blindness} liquidity-timing check(s), ${m.fraud_exposure} dispute-exposure check(s), and ${m.reward_chasing} reward-psychology check(s)—all repaired and verified in Stage 3 transfer.`;

    grid.innerHTML = `
      <div class="synthesis-box">
        <span class="section-label">Transfer Telemetry</span>
        <h3>${unassistedTransfer ? "Unassisted Independent Transfer" : "Verified Mastery with Contingency Support"}</h3>
        <p class="card-narrative">${escapeHtml(profileText)}</p>
      </div>
      <div class="synthesis-box">
        <span class="section-label">4-Rule Campus Payment Checklist (LO1–LO4)</span>
        <h3>Takeaway Rules for Real Accounts</h3>
        <p class="card-narrative">
          1. Subtract upcoming ACH auto-pays &amp; fuel holds from Checking before swiping Debit.<br>
          2. Never send Mobile P2P pushes to unverified sellers; use Credit FCBA protection.<br>
          3. Settle exact peer shares on the spot via bank-linked P2P rather than floating IOUs for 2% points.<br>
          4. Use dedicated Debit sub-accounts when curbing everyday impulse drift.
        </p>
      </div>
    `;
  }

  function renderAll() {
    renderHeaderAndNav();
    renderRemediation();
    renderStage1();
    renderStage2();
    renderStage3();
    renderSynthesis();
  }

  /* ------------------------------------------------------------------------
     10. Static Control Bindings & Initialization
     ------------------------------------------------------------------------ */

  function bindStaticControls() {
    const lxdBtn = document.getElementById("btn-toggle-lxd");
    if (lxdBtn) {
      lxdBtn.addEventListener("click", () => {
        state.learningEngineerView = !state.learningEngineerView;
        renderAll();
      });
    }

    const primerBtn = document.getElementById("btn-toggle-primer");
    if (primerBtn) {
      primerBtn.addEventListener("click", () => {
        state.primerOpen = !state.primerOpen;
        renderHeaderAndNav();
      });
    }

    document.getElementById("tab-stage-1").addEventListener("click", () => setStage(1));
    document.getElementById("tab-stage-2").addEventListener("click", () => setStage(2));
    document.getElementById("tab-stage-3").addEventListener("click", () => setStage(3));

    document.getElementById("btn-goto-stage-2").addEventListener("click", () => setStage(2));
    document.getElementById("btn-goto-stage-3").addEventListener("click", () => setStage(3));

    // LXD Inspector Controls
    document
      .getElementById("btn-preview-rem-liquidity")
      .addEventListener("click", () => openRemediationPreview("liquidity_blindness"));
    document
      .getElementById("btn-preview-rem-fraud")
      .addEventListener("click", () => openRemediationPreview("fraud_exposure"));
    document
      .getElementById("btn-preview-rem-rewards")
      .addEventListener("click", () => openRemediationPreview("reward_chasing"));

    document.getElementById("btn-lxd-unlock-stages").addEventListener("click", () => {
      state.instructorUnlockedAll = true;
      state.lockNotice = null;
      renderAll();
    });

    const resetHandler = () => {
      const keepLxd = state.learningEngineerView;
      state = createInitialState();
      state.learningEngineerView = keepLxd;
      renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    document.getElementById("btn-reset-all").addEventListener("click", resetHandler);
    document.getElementById("btn-reset-synthesis").addEventListener("click", resetHandler);
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindStaticControls();
    renderAll();
  });
})();
