/* ==========================================================================
   Smart Spending: Comparing Payment Methods for First-Year College Students
   Authentic Rise 360 UI + Mayer's Multimedia Principles + CMU 05-840 Track A
   Pure Vanilla ES6+ JavaScript · Zero external libraries
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'tol_smart_spending_rise_v2';

  /* ------------------------------------------------------------------------
     1. Course Content & Pedagogical Data (Miina Koyama Peer Voice)
     ------------------------------------------------------------------------ */

  const LESSONS_META = [
    { id: 1, navTitle: '1. How Payment Choices Work', headerTitle: 'Making Smart Choices: Comparing Payment Methods' },
    { id: 2, navTitle: '2. Match Payment to Scenario', headerTitle: 'Match Payment to Scenario' },
    { id: 3, navTitle: '3. Spring Break Money Moves', headerTitle: 'Spring Break Money Moves' },
    { id: 4, navTitle: '4. Solo Challenge: Move-In Week', headerTitle: 'Solo Challenge: Move-In Week' }
  ];

  const LESSON1_GOALS = [
    'Compare debit cards, credit cards, and mobile payment apps in everyday college life.',
    'Weigh four key trade-offs—cost & fees, convenience, security, and budgeting control—before you pay.',
    'Spot how spending psychology (pain of paying, delayed bills, and reward points) nudges your wallet.',
    'Plan multi-step payment moves so automatic bills never trigger a surprise $35 overdraft fee.'
  ];

  const TRADE_OFF_TABS = [
    {
      key: 'cost',
      label: 'Cost & Fees',
      badge: '💳 Watch Overdrafts & APR',
      image: 'assets/cafe-payment-methods.jpg',
      imageAlt: 'College students paying with phone and card at a campus cafe counter',
      title: 'Cost & Fees: Free Until Timing Goes Wrong',
      body: 'Debit cards and bank-linked payment apps cost $0 per swipe—unless an unexpected bill pushes your checking balance below zero and triggers a $35 overdraft fee. Credit cards charge $0 interest when you pay your statement in full each month, but carrying an unpaid balance adds steep 20%+ interest.',
      example: 'Campus Example: A $15 debit lunch turns into a $50 lunch if an overnight auto-pay bill drops your checking account below $0.'
    },
    {
      key: 'convenience',
      label: 'Convenience',
      badge: '📱 Fast Splits vs. Universal Checkout',
      image: 'assets/student-options.jpg',
      imageAlt: 'Student holding phone and payment card at a checkout counter',
      title: 'Convenience: Peer Splits vs. Store Checkouts',
      body: 'Mobile apps like Venmo or Zelle make splitting exact dollar shares with friends effortless in seconds. Credit and debit cards work at virtually every store register, travel website, and campus checkout without needing anyone’s phone handle.',
      example: 'Campus Example: Venmo lets four roommates split a $48 airport rideshare into exact $12 shares before stepping out of the car.'
    },
    {
      key: 'security',
      label: 'Security',
      badge: '🛡️ Whose Cash Is on the Line?',
      image: 'assets/hero-student-card.jpg',
      imageAlt: 'College student checking a payment card carefully at a laptop',
      title: 'Security: Protecting Your Real Checking Cash',
      body: 'Credit cards give you the strongest shield online—if an unfamiliar seller scams you, the card issuer’s money is disputed while your checking cash stays safe. Debit disputes can leave your own bank money tied up during investigation, and P2P apps like Zelle or Venmo offer almost zero refund protection with strangers.',
      example: 'Campus Example: Sending Zelle to a stranger for concert tickets is like handing cash through a window—once sent, banks rarely pull it back.'
    },
    {
      key: 'budgeting',
      label: 'Budgeting Control',
      badge: '📊 Real-Time Balance vs. Float',
      image: 'assets/cafe-payment-methods.jpg',
      imageAlt: 'Students studying and buying coffee at a sunny campus cafe',
      title: 'Budgeting Control: Instant Honesty vs. Short-Term Breathing Room',
      body: 'Debit pulls money from checking right away, making it easy to see your true grocery or coffee budget in real time. Credit cards bundle purchases onto next month’s bill—helpful for bridging a two-day gap before payday, as long as you track what you owe.',
      example: 'Campus Example: Swiping debit for weekly groceries keeps snack spending honest when that food cash is already set aside.'
    }
  ];

  const PSYCHOLOGY_CARDS = [
    {
      key: 'pain',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF631E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      title: 'Pain of Paying',
      teaser: 'Why watching cash leave checking right now changes what you toss in your cart.',
      explanation: 'Seeing $65 leave your checking balance right away creates a healthy mental pause before impulse buys. When you already have cash set aside for essentials like groceries, that immediate feedback helps you stick to your budget.'
    },
    {
      key: 'deferred',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF631E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      title: 'Deferred Payment',
      teaser: 'How “pay next month” can protect your bill cushion—or quietly snowball.',
      explanation: 'Credit cards separate buying today from paying on your statement date, which can protect checking cash right before an automatic bill hits. Because your bank balance does not drop right away, though, small impulse swipes can sneak up fast.'
    },
    {
      key: 'awareness',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF631E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      title: 'Spending Awareness',
      teaser: 'Why chasing 2% cashback points on group tabs often backfires.',
      explanation: 'Putting a whole $100 group dinner on credit just to earn $2 in reward points blurs what you actually spent. If even one busy friend forgets to Venmo you back $25, you lose way more than the points were worth.'
    }
  ];

  const BUCKET_OPTIONS = [
    {
      key: 'debit',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF631E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>',
      title: 'Debit Card',
      sub: 'Pulls from checking now'
    },
    {
      key: 'credit',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF631E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><path d="M7 15h3"/></svg>',
      title: 'Credit Card',
      sub: 'Billed later · Fraud shield'
    },
    {
      key: 'mobile',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF631E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><path d="M9 9h6M13 7l2 2-2 2"/></svg>',
      title: 'Mobile Payment',
      sub: 'Instant P2P app split'
    }
  ];

  const SORTING_SCENARIOS = [
    {
      id: 's1',
      signal: '🔍 Unfamiliar Online Travel Site',
      prompt: 'You’re booking a $200 Spring Break hotel deposit on an unfamiliar travel website you found through a search ad.',
      optimal: 'credit',
      hints: [
        'Ask yourself: Do I fully trust this website yet, and whose money gets tied up if the listing turns out to be sketchy?',
        'Peer-to-peer apps offer almost zero buyer protection, and debit disputes leave your real checking cash missing while your bank investigates.',
        'Compare which option lets you dispute an unfamiliar online charge without pulling $200 out of your bank checking balance today.'
      ],
      feedback: {
        credit: {
          ok: true,
          head: 'Smart move — your checking cash stays protected!',
          body: 'On an unfamiliar travel site, a Credit Card keeps your real bank balance untouched. If the listing turns out to be fake or double-charges you, Fair Credit Billing Act (FCBA) protection lets you dispute the charge on the issuer’s line instead of freezing $200 of your bill money.'
        },
        debit: {
          ok: false,
          misconception: 'fraud_exposure',
          head: 'Watch what happens to your real bank cash',
          body: 'Swiping a Debit Card pulls $200 straight out of checking immediately. If an unfamiliar travel site double-charges you or disappears, that $200 stays missing from your bank account while your bank investigates—which can bounce upcoming bills. Which option shields your actual checking cash during a dispute?'
        },
        mobile: {
          ok: false,
          misconception: 'fraud_exposure',
          head: 'Careful — P2P transfers act like digital cash',
          body: 'Sending $200 through a peer-to-peer Mobile Payment app to an unverified travel host has almost zero chargeback protection once you tap Send. Think about which payment method gives you strong dispute rights while keeping checking cash untouched.'
        }
      }
    },
    {
      id: 's2',
      signal: '👥 3 Trusted Friends · Exact $12 Split',
      prompt: 'You and 3 college friends just shared a $48 rideshare to the airport and want to settle everyone’s exact $12 share before walking into the terminal.',
      optimal: 'mobile',
      hints: [
        'Notice two clues here: you know and trust all three friends, and your real share of the ride is $12—not $48.',
        'Unlike paying strangers online, peer-to-peer apps shine when splitting small exact amounts with friends right away so nobody carries unpaid IOUs.',
        'Pick the option built for instant $0-fee peer splits so everyone settles their $12 share on the spot.'
      ],
      feedback: {
        mobile: {
          ok: true,
          head: 'Spot on — clean $12 split with zero awkward IOUs!',
          body: 'With friends you actually know and trust, a Mobile Payment app like Venmo or Zelle settles each person’s exact $12 share in seconds—no floating $36 for three other people and $0 fee when linked to your bank.'
        },
        credit: {
          ok: false,
          misconception: 'reward_chasing',
          head: 'Watch the group-tab IOU trap',
          body: 'Putting all $48 on your Credit Card without splitting on the spot means floating $36 for three friends. Even with 2% points (less than $1), one forgotten $12 payback wipes out your reward twelve times over. Which tool settles exact shares among trusted friends instantly?'
        },
        debit: {
          ok: false,
          misconception: 'liquidity_blindness',
          head: 'That drains $48 from one checking account',
          body: 'Paying the whole $48 on one Debit Card pulls $36 of your friends’ fares straight out of your checking cash right before a trip. Look for the payment method designed to split exact $12 shares with friends immediately.'
        }
      }
    },
    {
      id: 's3',
      signal: '🛒 Trusted Supermarket · Strict Food Budget',
      prompt: 'You’re buying $65 of weekly groceries at your neighborhood supermarket. You already have $65 set aside for food in checking (with no upcoming bills at risk) and want to avoid impulse snack creep.',
      optimal: 'debit',
      hints: [
        'Check the setup: the store is a trusted supermarket, your $65 grocery cash is safely set aside, and your goal is curbing impulse extras.',
        'Remember Pain of Paying from Lesson 1: seeing money leave checking immediately reinforces a weekly food limit.',
        'Choose the everyday card that deducts $65 straight from your set-aside grocery cash right now with zero interest risk.'
      ],
      feedback: {
        debit: {
          ok: true,
          head: 'Great call — healthy spending awareness in action!',
          body: 'At a trusted grocery store when your food money is already earmarked and no bills are at risk, a Debit Card uses immediate feedback (pain of paying) to keep your weekly grocery budget honest with zero chance of carrying a balance.'
        },
        credit: {
          ok: false,
          misconception: 'reward_chasing',
          head: 'Check your personal budgeting goal here',
          body: 'While a Credit Card works at checkout, delayed billing softens the pain of paying—making it much easier to turn a strict $65 grocery run into $85 of extra snacks. Since your $65 food cash is already set aside safely, which card keeps your budget honest in real time?'
        },
        mobile: {
          ok: false,
          misconception: 'liquidity_blindness',
          head: 'Peer-to-peer apps aren’t built for supermarket lanes',
          body: 'Standard grocery checkouts don’t take peer-to-peer Venmo/Zelle transfers like friend splits, and scattering cash across app balances makes tracking a weekly food budget harder. Which standard bank card pulls directly from your dedicated grocery funds?'
        }
      }
    },
    {
      id: 's4',
      signal: '⏰ Tuesday Emergency · $95 Auto-Pay Thursday',
      prompt: 'Your laptop charger dies on Tuesday before midterms and a replacement at the campus store costs $180. You have $210 in checking, a $95 utility auto-pay hits Thursday morning, and your $300 campus paycheck lands Friday.',
      optimal: 'credit',
      hints: [
        'Do the Tuesday-to-Friday math: what happens to your $210 checking balance on Thursday if $180 leaves checking today?',
        '$210 minus $180 leaves only $30 in checking—so Thursday’s $95 utility auto-pay would bounce (-$65) and trigger a $35 overdraft fee!',
        'Compare which method covers Tuesday’s $180 charger without touching checking cash until Friday’s $300 paycheck arrives.'
      ],
      feedback: {
        credit: {
          ok: true,
          head: 'Exactly right — you just dodged a $35 overdraft fee!',
          body: 'Swiping debit on Tuesday would drop checking from $210 to $30, causing Thursday’s $95 utility auto-pay to bounce just one day before payday! Putting $180 on a Credit Card keeps $210 in checking for Thursday, and paying the card off Friday costs $0 in interest or fees.'
        },
        debit: {
          ok: false,
          misconception: 'liquidity_blindness',
          head: 'Check Thursday morning’s auto-pay math!',
          body: 'Paying $180 with Debit today drops your $210 checking balance down to $30. When Thursday’s $95 utility auto-pay pulls (24 hours before Friday’s paycheck), your account goes -$65 negative and gets hit with a $35 overdraft fee! How can you bridge Tuesday to Friday safely?'
        },
        mobile: {
          ok: false,
          misconception: 'liquidity_blindness',
          head: 'Bank-linked apps still drain checking before Thursday',
          body: 'Using a bank-linked Mobile Payment option still pulls $180 from your $210 checking account right away, leaving only $30 when Thursday’s $95 utility auto-pay hits—triggering a $35 overdraft fee! Look for the option with a short grace-period buffer until Friday.'
        }
      }
    },
    {
      id: 's5',
      signal: '🚩 Stranger Social-Media DM · Concert Tickets',
      prompt: 'A stranger DMs you on social media offering two sold-out concert tickets for $110 if you send Zelle or Venmo right now to “hold them,” or lets you buy through a verified fan-resale card checkout link.',
      optimal: 'credit',
      hints: [
        'Why do ticket scammers in social-media DMs push buyers to send Zelle or Venmo instead of using a checkout page?',
        'Peer-to-peer transfers to strangers have virtually zero fraud refund protection, and debit disputes tie up your own checking cash.',
        'Pick the payment method you should use on the verified resale checkout so the card issuer’s line backs the ticket guarantee.'
      ],
      feedback: {
        credit: {
          ok: true,
          head: 'Crisis averted — scammer playbook blocked!',
          body: 'Scammers love Zelle and Venmo DMs because voluntary peer transfers have almost zero chargeback rights. Paying via the verified resale checkout with a Credit Card gives you full dispute protection while keeping your checking cash safe.'
        },
        mobile: {
          ok: false,
          misconception: 'fraud_exposure',
          head: 'Classic campus ticket scam trap!',
          body: 'Zelle and Venmo treat transfers you authorize yourself like handing cash to a friend—once you pay a stranger in DMs and they block you, banks almost never refund that $110. Skip the DM transfer and think about which card best protects you on the verified checkout!'
        },
        debit: {
          ok: false,
          misconception: 'fraud_exposure',
          head: 'Good call skipping the DM—now protect your checking cash',
          body: 'Avoiding Zelle/Venmo saved you from an instant scam loss! Still, using a Debit Card for resale tickets pulls $110 straight out of checking today, tying up your real cash if the seller never transfers the tickets. Which card shields your bank cash completely?'
        }
      }
    }
  ];

  /* Section 3: Carlos's 3 Connected Spring Break Scenes */
  const CARLOS_SCENES = [
    {
      id: 'c1',
      stepLabel: 'Scene 1 of 3 · The Hotel Deposit',
      bgUnresolved: 'assets/scene-dorm.jpg',
      bgSolved: 'assets/scene-hotel.jpg',
      poseUnresolved: 'assets/carlos-asking.png',
      poseSolved: 'assets/carlos-happy.png',
      baseChecking: 240,
      baseCredit: 0,
      quote: '“Spring Break starts tomorrow! I found a beach hotel with one room left on a booking site I’ve never used before. They want a $200 deposit right now—or the host says I can Venmo them directly. With $240 in checking and my $120 streaming auto-pay hitting at 6:00 AM tomorrow, how should I pay?”',
      solvedQuote: '“Booked! Putting the $200 deposit on my Credit Card kept all $240 safe in checking for tomorrow’s auto-pay—and if anything’s weird with the hotel listing, I’ve got full fraud protection.”',
      optimal: 'credit',
      hints: [
        'Glance up at Carlos’s Wallet Bar: he has $240 in checking right now, and a $120 auto-pay hits tomorrow at 6:00 AM.',
        'Pulling $200 out of $240 checking leaves only $40—$80 short of tomorrow’s $120 auto-pay—and this booking site is unfamiliar!',
        'Choose the option that keeps Checking Cash at $240 tonight while giving Carlos chargeback protection on the $200 deposit.'
      ],
      choices: [
        {
          key: 'debit',
          label: 'Debit Card',
          sub: 'Swipe Debit for the $200 deposit now',
          pose: 'assets/carlos-worried.png',
          previewWallet: { checking: 40, credit: 0, fee: 35, alertChecking: true },
          misconception: 'fraud_exposure',
          remediationType: 'fraud_exposure',
          triggersRemediation: true,
          head: 'Uh-oh! Checking drops to $40 & cash is exposed!',
          body: 'Paying $200 on Debit pulls real cash out of checking immediately—leaving just $40 against tomorrow’s $120 6:00 AM auto-pay (setting up a $35 overdraft fee!) AND leaving Carlos’s bank cash exposed if this unfamiliar booking site is sketchy.'
        },
        {
          key: 'credit',
          label: 'Credit Card',
          sub: 'Put $200 deposit on Credit Card',
          pose: 'assets/carlos-happy.png',
          nextWallet: { checking: 240, credit: 200, fee: 0 },
          head: 'Smart move! $240 checking stays untouched & fraud-shielded.',
          body: 'Credit Card protection (FCBA) shields Carlos if the unfamiliar hotel site has issues, and all $240 stays safely in checking to cover tomorrow morning’s $120 auto-pay!'
        },
        {
          key: 'mobile',
          label: 'Mobile Payment / Venmo',
          sub: 'Venmo $200 directly to the host’s handle',
          pose: 'assets/carlos-alarmed.png',
          previewWallet: { checking: 40, credit: 0, fee: 35, alertChecking: true },
          misconception: 'fraud_exposure',
          remediationType: 'fraud_exposure',
          triggersRemediation: true,
          head: 'Danger! Zero scam protection + $40 left for auto-pay!',
          body: 'Venmoing $200 to a stranger’s listing works like handing over cash with zero chargeback shield if the room doesn’t exist—plus draining $200 drops checking to $40, guaranteeing a $35 overdraft at 6:00 AM!'
        }
      ]
    },
    {
      id: 'c2',
      stepLabel: 'Scene 2 of 3 · The Group Dinner',
      bgUnresolved: 'assets/scene-restaurant.jpg',
      bgSolved: 'assets/scene-restaurant.jpg',
      poseUnresolved: 'assets/carlos-asking.png',
      poseSolved: 'assets/carlos-confident.png',
      baseChecking: 240,
      baseCredit: 200,
      quote: '“Dinner with my three friends at The Global Table came to $100 total—my share is $25. My roommate grins and says, ‘Put all $100 on your card for 2% cashback points and we’ll pay you back next week!’ What’s my smartest move?”',
      solvedQuote: '“Clean and simple! Splitting right at the table via Venmo meant only my $25 share left checking ($240 → $215). Zero awkward IOUs to chase next week, and I still have $95 above tomorrow’s $120 auto-pay!”',
      optimal: 'mobile',
      hints: [
        'Compare Carlos’s true dinner cost ($25) against the full group bill ($100), and check what happens if friends forget to pay back $75 next week.',
        'Chasing 2% points on $100 earns just $2—one forgotten $25 payback loses 12x more! Meanwhile, putting all $100 on Debit drains $75 of cash needed tonight.',
        'Pick the option that splits the bill instantly among trusted friends so Carlos only pays his exact $25 share ($240 → $215 Checking).'
      ],
      choices: [
        {
          key: 'debit',
          label: 'Debit Card ($100 Full Tab)',
          sub: 'Swipe Debit for all $100 & wait for paybacks',
          pose: 'assets/carlos-stressed.png',
          previewWallet: { checking: 140, credit: 200, fee: 0, alertChecking: true },
          misconception: 'liquidity_blindness',
          remediationType: 'liquidity_blindness',
          triggersRemediation: false,
          head: 'Whoa — $100 leaves checking for food other people ate!',
          body: 'Putting the whole $100 table bill on Debit drops Carlos’s checking from $240 to $140—leaving only a tiny $20 cushion above tomorrow’s $120 auto-pay before he even buys gas tonight!'
        },
        {
          key: 'credit',
          label: 'Credit Card ($100 for 2% Points)',
          sub: 'Float all $100 on Credit for $2 cashback',
          pose: 'assets/carlos-worried.png',
          previewWallet: { checking: 240, credit: 300, fee: 0, alertChecking: false },
          misconception: 'reward_chasing',
          remediationType: 'reward_chasing',
          triggersRemediation: true,
          head: 'Classic 2% points trap — floating $75 in IOUs!',
          body: 'Charging all $100 just to earn $2 in reward points inflates Carlos’s Credit balance to $300 and leaves him chasing three busy college friends next week. If just one friend forgets their $25 share, Carlos loses $23 net!'
        },
        {
          key: 'mobile',
          label: 'Mobile Payment / Venmo ($25 Share)',
          sub: 'Split instantly at the table — pay only my $25 share',
          pose: 'assets/carlos-confident.png',
          nextWallet: { checking: 215, credit: 200, fee: 0 },
          head: 'Nailed it! Exact $25 share settled on the spot.',
          body: 'Everyone settles their exact $25 share right at the table. Carlos’s Checking moves cleanly from $240 to $215—zero unpaid IOUs, clear spending awareness, and $95 of breathing room above tomorrow’s $120 auto-pay!'
        }
      ]
    },
    {
      id: 'c3',
      stepLabel: 'Scene 3 of 3 · 6 AM Alert & Evening Gas Stop',
      bgUnresolved: 'assets/scene-night-alert.jpg',
      bgSolved: 'assets/scene-beach-success.jpg',
      poseUnresolved: 'assets/carlos-alarmed.png',
      poseSolved: 'assets/carlos-happy.png',
      baseChecking: 215,
      baseCredit: 200,
      quote: '“Hold up—my phone just buzzed! My $120 annual streaming subscription definitely auto-renews from checking at 6:00 AM tomorrow, and we need $60 of gas tonight! Heads-up: this automated highway pump places a temporary $125 hold on Debit cards overnight. How do I pay for gas?”',
      solvedQuote: '“We made it to the beach with $0 in overdraft fees! Putting the $60 gas stop on Credit kept $215 in checking overnight—so my 6:00 AM $120 auto-pay cleared smoothly and left $95 in cash to spare!”',
      optimal: 'credit',
      hints: [
        'Check Carlos’s Wallet Bar right above: Checking Cash is $215, and $120 pulls automatically at 6:00 AM ($215 − $120 = $95 max safe spend!).',
        'An automated gas pump places a temporary $125 hold on Debit ($215 − $125 = $90 available at 6:00 AM!), and spending $100 via a bank-linked app leaves $115—both bounce the $120 bill!',
        'Put the $60 fuel charge on Credit so the pump hold touches the credit line instead of checking, letting the 6:00 AM $120 auto-pay clear cleanly ($215 − $120 = $95 left).'
      ],
      choices: [
        {
          key: 'debit',
          label: 'Debit Card at Pump',
          sub: 'Swipe Debit for $60 gas ($125 temporary pump hold)',
          pose: 'assets/carlos-alarmed.png',
          previewWallet: { checking: -30, credit: 200, fee: 35, alertChecking: true },
          misconception: 'liquidity_blindness',
          remediationType: 'liquidity_blindness',
          triggersRemediation: true,
          head: 'Overdraft Alert! $125 pump hold bounces 6 AM auto-pay!',
          body: 'Even though gas is $60, the automated pump locks a $125 hold on Debit overnight ($215 − $125 = $90 available). At 6:00 AM, the $120 auto-pay crashes checking to -$30 and slaps Carlos with a $35 overdraft fee!'
        },
        {
          key: 'credit',
          label: 'Credit Card',
          sub: 'Tap Credit Card for $60 gas & protect checking for 6 AM',
          pose: 'assets/carlos-happy.png',
          nextWallet: { checking: 95, credit: 260, fee: 0, settled6AM: true },
          head: '6:00 AM Auto-Pay Cleared — $95 Checking Left, $0 Fees!',
          body: 'Tapping Credit puts the $60 fuel purchase (and any temporary pump hold) on the card line instead of checking—with bonus skimmer protection! At 6:00 AM, the $120 streaming auto-pay clears $215 checking cleanly, leaving $95 cash and $0 fees!'
        },
        {
          key: 'mobile',
          label: 'Mobile Payment + Road Snacks',
          sub: 'Use bank-linked Mobile Pay inside for $60 gas + $40 snacks',
          pose: 'assets/carlos-stressed.png',
          previewWallet: { checking: -5, credit: 200, fee: 35, alertChecking: true },
          misconception: 'liquidity_blindness',
          remediationType: 'liquidity_blindness',
          triggersRemediation: true,
          head: 'Overdraft Alert! Checking drops to $115 before 6 AM!',
          body: 'Pulling $100 from a bank-linked Mobile Wallet drops checking from $215 to $115—just $5 short when the $120 6:00 AM auto-pay hits (-$5 balance + $35 overdraft fee)!'
        }
      ]
    }
  ];

  /* Track A Adaptive Remediation Quick-Fixes (Inside Carlos Stage with carlos-thinking.png) */
  const REMEDIATION_QUICK_FIXES = {
    liquidity_blindness: {
      type: 'liquidity_blindness',
      title: 'Quick-Fix: Protecting Your Auto-Pay Cash Cushion',
      naiveLabel: '❌ Naive Debit / Bank Pull',
      naiveText: '$215 Checking − $125 pump hold = $90 available → 6 AM $120 auto-pay bounces → $35 Overdraft Fee.',
      smartLabel: '✅ Strategic Buffer Move',
      smartText: '$60 gas on Credit → Checking stays $215 → 6 AM $120 auto-pay clears → $95 Cash Left & $0 Fees.',
      question: 'Quick Check: You have $150 in checking Wednesday night, a $110 electric auto-pay Thursday morning, and a required $60 textbook needed tonight before Friday’s paycheck. What prevents a $35 overdraft?',
      options: [
        {
          key: 'a',
          label: 'Swipe Debit tonight ($150 → $90) so you never borrow money.',
          ok: false,
          nudge: 'Check the math: $90 left in checking won’t cover Thursday morning’s $110 auto-pay!'
        },
        {
          key: 'b',
          label: 'Put the $60 textbook on Credit tonight so $150 covers Thursday’s $110 auto-pay, then pay off Credit Friday.',
          ok: true,
          nudge: 'Spot on! Your $150 checking covers the $110 auto-pay ($40 left), and Friday’s paycheck pays the $60 card charge for $0 interest or fees.'
        },
        {
          key: 'c',
          label: 'Pay $60 with a bank-linked Venmo card tonight.',
          ok: false,
          nudge: 'A bank-linked P2P card still pulls $60 from checking before Thursday morning!'
        }
      ]
    },
    fraud_exposure: {
      type: 'fraud_exposure',
      title: 'Quick-Fix: Shielding Bank Cash from Unverified Sellers',
      naiveLabel: '❌ Venmo / Debit to Unverified Site',
      naiveText: '$200 leaves your real checking account today → zero P2P recall (or cash frozen during bank dispute) → bills bounce.',
      smartLabel: '✅ Credit Card Shield (FCBA)',
      smartText: '$200 sits on the card issuer’s line → your $240 checking cash stays untouched even if you dispute a fake listing.',
      question: 'Quick Check: An unfamiliar website lists a $140 dorm mini-fridge via Zelle or card checkout. How do you keep your checking cash safe?',
      options: [
        {
          key: 'a',
          label: 'Send Zelle fast so nobody else grabs the deal.',
          ok: false,
          nudge: 'Zelle transfers to strangers work like irreversible cash—banks almost never refund scams!'
        },
        {
          key: 'b',
          label: 'Use a Credit Card on checkout so you have chargeback rights and your checking cash stays untouched.',
          ok: true,
          nudge: 'Exactly! FCBA protection lets you dispute bad charges without freezing a single dollar of checking cash.'
        },
        {
          key: 'c',
          label: 'Swipe Debit so the money comes out cleanly right now.',
          ok: false,
          nudge: 'Even with Debit dispute rules, your real $140 stays missing from checking while the bank investigates!'
        }
      ]
    },
    reward_chasing: {
      type: 'reward_chasing',
      title: 'Quick-Fix: Why 2% Points Lose to One Unpaid Split',
      naiveLabel: '❌ Chasing Points on Group Tabs',
      naiveText: 'Float $100 group dinner on Credit for 2% (+$2 points) → one friend forgets their $25 payback → -$23 Net Loss.',
      smartLabel: '✅ Instant Table Split',
      smartText: 'Everyone settles their exact $25 share via Venmo at the table → $0 unpaid IOUs & honest budget tracking.',
      question: 'Quick Check: Three friends owe $30 each on a $90 takeout order. Why is floating all $90 on your credit card for 2% ($1.80) points risky?',
      options: [
        {
          key: 'a',
          label: 'Credit cards charge a $35 swipe fee at restaurants.',
          ok: false,
          nudge: 'Regular restaurant swipes don’t charge $35—compare the $1.80 reward against an unpaid $30 friend share!'
        },
        {
          key: 'b',
          label: 'One forgotten $30 payback wipes out 16x the $1.80 points and inflates your monthly bill.',
          ok: true,
          nudge: 'Right on! Settling splits immediately protects both your friendships and your budget.'
        },
        {
          key: 'c',
          label: 'Cashback points expire at midnight.',
          ok: false,
          nudge: 'Points don’t vanish at midnight—the real danger is carrying $60 of unpaid friend IOUs for pennies!'
        }
      ]
    }
  };

  /* Section 4: Solo Challenge — Maya's Move-In Week (Faded Scaffolds!) */
  const MAYA_MOVES = [
    {
      id: 'm1',
      stepLabel: 'Move 1 of 3 · Online Classifieds Mini-Fridge',
      baseChecking: 210,
      baseCredit: 0,
      prompt: 'Maya finds a $95 mini-fridge from an unverified seller on a local classifieds site. She can pay through the platform’s card checkout or send a direct peer transfer.',
      optimal: 'credit',
      hints: [
        'Check two details from Maya’s planner note: is this seller verified, and how much checking cash must stay untouched for tonight?',
        'Maya needs $130 in checking at 11:59 PM for the electric utility draft ($210 − $95 = $115 would fall short!), plus the seller is unverified.',
        'Use the option that keeps Checking at $210 while protecting the $95 purchase against seller non-delivery.'
      ],
      feedback: {
        credit: {
          ok: true,
          nextWallet: { checking: 210, credit: 95, fee: 0 },
          head: 'Move 1 locked in — $210 checking intact & purchase protected.',
          body: 'Putting $95 on Credit keeps Maya’s $210 checking balance untouched for tonight’s commitments and protects her if the unverified seller never delivers.'
        },
        debit: {
          ok: false,
          misconception: 'liquidity_blindness',
          previewWallet: { checking: 115, credit: 0, fee: 35, alert: true },
          head: 'Check Maya’s planner note for 11:59 PM tonight!',
          body: 'Pulling $95 from Debit drops Maya’s checking from $210 to $115—leaving her short of tonight’s $130 electric auto-draft (-$15 + $35 overdraft fee) while tying up bank cash with an unverified seller.'
        },
        mobile: {
          ok: false,
          misconception: 'fraud_exposure',
          previewWallet: { checking: 115, credit: 0, fee: 35, alert: true },
          head: 'Double risk: zero buyer recall + 11:59 PM shortfall!',
          body: 'Sending $95 via P2P to an unverified classifieds seller has virtually no scam protection AND drops checking to $115—short of tonight’s $130 electric utility draft!'
        }
      }
    },
    {
      id: 'm2',
      stepLabel: 'Move 2 of 3 · Suite Cleaning Supplies ($60 Total, $20 Share)',
      baseChecking: 210,
      baseCredit: 95,
      prompt: 'At Target, Maya and two trusted suitemates buy $60 of shared cleaning supplies ($20 each). Everyone has their phones out at the register.',
      optimal: 'mobile',
      hints: [
        'Maya trusts her suitemates, her real share is $20, and check how much remains in checking after $20 vs. $60.',
        '$210 minus $20 leaves $190 in checking (plenty above tonight’s $130 draft), without floating $40 of suitemate IOUs.',
        'Settle Maya’s exact $20 share right at checkout via instant peer split.'
      ],
      feedback: {
        mobile: {
          ok: true,
          nextWallet: { checking: 190, credit: 95, fee: 0 },
          head: 'Move 2 complete — clean $20 split ($190 left in checking).',
          body: 'Settling exact $20 shares on the spot via Mobile Payment avoids suitemate IOUs and leaves $190 in checking—still $60 safely above tonight’s $130 electric utility draft.'
        },
        credit: {
          ok: false,
          misconception: 'reward_chasing',
          previewWallet: { checking: 210, credit: 155, fee: 0, alert: false },
          head: 'Don’t float $40 of suitemate IOUs for 90¢ in points',
          body: 'Charging all $60 on Credit to chase 1.5% cashback earns less than $1 while leaving Maya waiting on $40 of move-in-week paybacks. Which option settles her exact $20 share right now?'
        },
        debit: {
          ok: false,
          misconception: 'liquidity_blindness',
          previewWallet: { checking: 150, credit: 95, fee: 0, alert: true },
          head: 'Paying all $60 from checking squeezes tonight’s buffer',
          body: 'Swiping Debit for everyone’s $60 pulls $40 of suitemates’ supplies out of Maya’s checking ($210 → $150), shrinking her safety margin right before evening errands and tonight’s utility draft.'
        }
      }
    },
    {
      id: 'm3',
      stepLabel: 'Move 3 of 3 · 8:00 PM Required Chemistry Lab Kit ($75)',
      baseChecking: 190,
      baseCredit: 95,
      prompt: 'At 8:00 PM, Maya needs to buy a required $75 chemistry lab kit at the campus bookstore for 9:00 AM lab tomorrow (her $400 campus job direct deposit arrives tomorrow morning).',
      optimal: 'credit',
      hints: [
        'Subtract $75 from Maya’s $190 checking balance and compare what’s left against her 11:59 PM planner note.',
        '$190 − $75 leaves $115 in checking—so tonight’s 11:59 PM $130 electric auto-draft would bounce (-$15) and trigger a $35 overdraft fee!',
        'Bridge tonight’s $75 bookstore charge on Credit so $190 covers the $130 11:59 PM electric draft ($60 left), then pay off Credit tomorrow morning when the $400 deposit lands.'
      ],
      feedback: {
        credit: {
          ok: true,
          nextWallet: { checking: 60, credit: 170, fee: 0, settledNight: true },
          head: '11:59 PM Electric Draft ($130) Cleared — $60 Cash Left, $0 Fees!',
          body: 'Independent transfer mastered! Putting the $75 lab kit on Credit kept $190 in checking so the 11:59 PM $130 electric utility draft cleared smoothly ($60 remaining, $0 fees)—and tomorrow morning’s $400 deposit pays off the $170 credit balance in full for $0 interest!'
        },
        debit: {
          ok: false,
          misconception: 'liquidity_blindness',
          previewWallet: { checking: -15, credit: 95, fee: 35, alert: true },
          head: '11:59 PM Overdraft! $190 − $75 leaves only $115!',
          body: 'Swiping Debit at 8:00 PM drops checking to $115. Four hours later at 11:59 PM, the $130 city electric auto-draft pulls checking to -$15 and triggers a $35 overdraft fee just hours before Friday’s paycheck!'
        },
        mobile: {
          ok: false,
          misconception: 'liquidity_blindness',
          previewWallet: { checking: -15, credit: 95, fee: 35, alert: true },
          head: 'Bank-linked Mobile Pay still drains checking before 11:59 PM!',
          body: 'Paying $75 via a bank-linked campus P2P app still deducts $75 from checking tonight ($190 → $115), causing the 11:59 PM $130 electric utility draft to bounce (-$15 + $35 overdraft fee)!'
        }
      }
    }
  ];

  /* ------------------------------------------------------------------------
     2. Application State Initialization & Persistence
     ------------------------------------------------------------------------ */

  function createFreshState() {
    return {
      activeSection: 1,
      attempts: 0,
      hintsUsed: 0,
      misconceptions: {
        liquidity_blindness: 0,
        fraud_exposure: 0,
        reward_chasing: 0
      },
      remediationsCompleted: {
        liquidity_blindness: false,
        fraud_exposure: false,
        reward_chasing: false
      },
      section1: {
        activeTab: 'cost',
        visitedTabs: { cost: false, convenience: false, security: false, budgeting: false },
        chunk2Revealed: false,
        flippedCards: { pain: false, deferred: false, awareness: false },
        visitedCards: { pain: false, deferred: false, awareness: false },
        completed: false
      },
      section2: {
        currentIndex: 0,
        cards: {
          s1: { selected: null, solved: false, hintLevel: 0 },
          s2: { selected: null, solved: false, hintLevel: 0 },
          s3: { selected: null, solved: false, hintLevel: 0 },
          s4: { selected: null, solved: false, hintLevel: 0 },
          s5: { selected: null, solved: false, hintLevel: 0 }
        },
        completed: false
      },
      section3: {
        sceneIndex: 0,
        scenes: {
          c1: { selected: null, solved: false, hintLevel: 0 },
          c2: { selected: null, solved: false, hintLevel: 0 },
          c3: { selected: null, solved: false, hintLevel: 0 }
        },
        activeRemediation: null, // { type, selectedOpt, solved }
        completed: false
      },
      section4: {
        moveIndex: 0,
        moves: {
          m1: { selected: null, solved: false, hintLevel: 0 },
          m2: { selected: null, solved: false, hintLevel: 0 },
          m3: { selected: null, solved: false, hintLevel: 0 }
        },
        fadedHintsUsed: 0,
        completed: false
      }
    };
  }

  let state = loadState();
  let mobileMenuOpen = false;
  let lxdDrawerOpen = false;

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return createFreshState();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.activeSection !== 'number') return createFreshState();
      return Object.assign(createFreshState(), parsed);
    } catch (_) {
      return createFreshState();
    }
  }

  function saveState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      /* Ignore storage quota / private mode restrictions */
    }
  }

  /* ------------------------------------------------------------------------
     3. Progress Calculation & SVG Ring Helper
     ------------------------------------------------------------------------ */

  function getLessonProgress(lessonId) {
    if (lessonId === 1) {
      if (state.section1.completed) return 1;
      const tabsCount = Object.values(state.section1.visitedTabs).filter(Boolean).length;
      const cardsCount = Object.values(state.section1.visitedCards).filter(Boolean).length;
      const raw = (tabsCount / 4) * 0.45 + (state.section1.chunk2Revealed ? 0.15 : 0) + (cardsCount / 3) * 0.4;
      return Math.min(0.95, raw);
    }
    if (lessonId === 2) {
      if (state.section2.completed) return 1;
      const solved = Object.values(state.section2.cards).filter((c) => c.solved).length;
      return solved / SORTING_SCENARIOS.length;
    }
    if (lessonId === 3) {
      if (state.section3.completed) return 1;
      const solved = Object.values(state.section3.scenes).filter((s) => s.solved).length;
      return solved / CARLOS_SCENES.length;
    }
    if (lessonId === 4) {
      if (state.section4.completed) return 1;
      const solved = Object.values(state.section4.moves).filter((m) => m.solved).length;
      return solved / MAYA_MOVES.length;
    }
    return 0;
  }

  function getOverallPercent() {
    const sum =
      getLessonProgress(1) +
      getLessonProgress(2) +
      getLessonProgress(3) +
      getLessonProgress(4);
    return Math.round((sum / 4) * 100);
  }

  function renderProgressRingSVG(progress) {
    if (progress >= 0.999) {
      return `
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="9" r="8.5" fill="#FF631E"></circle>
          <path d="M5.2 9.3L7.8 11.8L13 6.5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `;
    }
    const radius = 7.2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(1, progress));
    const dashOffset = circumference * (1 - clamped);
    return `
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="9" cy="9" r="${radius}" fill="none" stroke="#D5DAE0" stroke-width="2"></circle>
        ${
          clamped > 0.02
            ? `<circle cx="9" cy="9" r="${radius}" fill="none" stroke="#FF631E" stroke-width="2.2"
                stroke-dasharray="${circumference.toFixed(2)}"
                stroke-dashoffset="${dashOffset.toFixed(2)}"
                transform="rotate(-90 9 9)" stroke-linecap="round"></circle>`
            : ''
        }
      </svg>
    `;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatSignedDollar(amount) {
    if (amount < 0) return `-$${Math.abs(amount)}`;
    return `$${amount}`;
  }

  /* ------------------------------------------------------------------------
     4. Shell Rendering (Sidebar, Progress, LXD Telemetry)
     ------------------------------------------------------------------------ */

  function renderSidebarAndChrome() {
    const pct = getOverallPercent();
    const fillEl = document.getElementById('sidebar-progress-fill');
    const barEl = document.getElementById('sidebar-progress-bar');
    const textEl = document.getElementById('sidebar-progress-text');
    const mobileBadge = document.getElementById('mobile-progress-badge');

    if (fillEl) fillEl.style.width = `${pct}%`;
    if (barEl) barEl.setAttribute('aria-valuenow', String(pct));
    if (textEl) textEl.textContent = `${pct}% COMPLETE`;
    if (mobileBadge) mobileBadge.textContent = `${pct}%`;

    const navEl = document.getElementById('sidebar-nav');
    if (navEl) {
      navEl.innerHTML = LESSONS_META.map((lesson) => {
        const prog = getLessonProgress(lesson.id);
        const activeClass = state.activeSection === lesson.id ? ' is-active' : '';
        const statusText = prog >= 0.999 ? 'Completed' : prog > 0.02 ? 'In progress' : 'Not started';
        return `
          <button
            type="button"
            id="nav-lesson-${lesson.id}"
            class="sidebar-lesson-btn${activeClass}"
            data-nav-lesson="${lesson.id}"
            aria-current="${state.activeSection === lesson.id ? 'page' : 'false'}"
            aria-label="${escapeHtml(lesson.navTitle)} (${statusText})"
          >
            <span class="sidebar-lesson-ring">${renderProgressRingSVG(prog)}</span>
            <span class="sidebar-lesson-text">${escapeHtml(lesson.navTitle)}</span>
          </button>
        `;
      }).join('');
    }

    renderLxdTelemetry(pct);
  }

  function renderLxdTelemetry(pct) {
    const panel = document.getElementById('lxd-telemetry-panel');
    if (!panel) return;
    const scaffoldsFaded = state.activeSection === 4;
    const remDoneCount = Object.values(state.remediationsCompleted).filter(Boolean).length;
    panel.innerHTML = `
      <div class="telemetry-stat">
        <span>Active Section</span>
        <strong>Lesson ${state.activeSection} of 4 (${pct}%)</strong>
      </div>
      <div class="telemetry-stat">
        <span>Scaffolds Faded</span>
        <strong>${scaffoldsFaded ? 'true (Raw Bank)' : 'false (Guided)'}</strong>
      </div>
      <div class="telemetry-stat">
        <span>Total Attempts</span>
        <strong>${state.attempts}</strong>
      </div>
      <div class="telemetry-stat">
        <span>Hints Requested</span>
        <strong>${state.hintsUsed} (Solo: ${state.section4.fadedHintsUsed})</strong>
      </div>
      <div class="telemetry-stat">
        <span>Liquidity Blindness</span>
        <strong>${state.misconceptions.liquidity_blindness}</strong>
      </div>
      <div class="telemetry-stat">
        <span>Fraud Exposure</span>
        <strong>${state.misconceptions.fraud_exposure}</strong>
      </div>
      <div class="telemetry-stat">
        <span>Reward Chasing</span>
        <strong>${state.misconceptions.reward_chasing}</strong>
      </div>
      <div class="telemetry-stat">
        <span>Quick-Fixes Solved</span>
        <strong>${remDoneCount} / 3</strong>
      </div>
    `;
  }

  /* ------------------------------------------------------------------------
     5. Section Renderers (1, 2, 3, 4)
     ------------------------------------------------------------------------ */

  function renderActiveSection() {
    const container = document.getElementById('lesson-container');
    if (!container) return;

    const isCompact = state.activeSection >= 2;
    container.className = isCompact ? 'lesson-column is-compact-lesson' : 'lesson-column';

    if (state.activeSection === 1) {
      container.innerHTML = buildSection1Html();
    } else if (state.activeSection === 2) {
      container.innerHTML = buildSection2Html();
    } else if (state.activeSection === 3) {
      container.innerHTML = buildSection3Html();
    } else {
      container.innerHTML = buildSection4Html();
    }

    renderSidebarAndChrome();
  }

  /* --- SECTION 1: How Payment Choices Work (Pre-Training + Multimedia + Segmenting) --- */
  function buildSection1Html() {
    const activeTabObj = TRADE_OFF_TABS.find((t) => t.key === state.section1.activeTab) || TRADE_OFF_TABS[0];

    const goalsHtml = LESSON1_GOALS.map(
      (goal, idx) => `
        <li class="goals-item">
          <span class="goal-circle" aria-hidden="true">${idx + 1}</span>
          <span>${escapeHtml(goal)}</span>
        </li>
      `
    ).join('');

    const tabsBarHtml = TRADE_OFF_TABS.map((t) => {
      const isActive = t.key === activeTabObj.key;
      const visited = Boolean(state.section1.visitedTabs[t.key]);
      return `
        <button
          type="button"
          id="btn-tab-${t.key}"
          class="rise-tab-btn${isActive ? ' is-active' : ''}"
          role="tab"
          aria-selected="${isActive ? 'true' : 'false'}"
          aria-controls="panel-tab-${t.key}"
          data-tab-key="${t.key}"
        >
          <span>${escapeHtml(t.label)}</span>
          ${visited ? '<span class="tab-visited-dot" aria-hidden="true">✓</span>' : ''}
        </button>
      `;
    }).join('');

    const cardsHtml = PSYCHOLOGY_CARDS.map((card) => {
      const flipped = Boolean(state.section1.flippedCards[card.key]);
      return `
        <button
          type="button"
          id="btn-flip-${card.key}"
          class="flip-card-btn${flipped ? ' is-flipped' : ''}"
          aria-pressed="${flipped ? 'true' : 'false'}"
          data-flip-key="${card.key}"
        >
          <span class="flip-card-inner">
            <span class="flip-face flip-front">
              <span>
                <span class="flip-icon-circle" aria-hidden="true">${card.icon}</span>
                <span class="flip-title" style="display:block;">${escapeHtml(card.title)}</span>
                <span class="flip-teaser" style="display:block;">${escapeHtml(card.teaser)}</span>
              </span>
              <span class="flip-cue">Click to flip ↻</span>
            </span>
            <span class="flip-face flip-back">
              <span>
                <span class="flip-back-title" style="display:block;">${escapeHtml(card.title)}</span>
                <span class="flip-back-copy" style="display:block;">${escapeHtml(card.explanation)}</span>
              </span>
              <span class="flip-cue">Flip back ↺</span>
            </span>
          </span>
        </button>
      `;
    }).join('');

    return `
      <header class="lesson-header">
        <p class="lesson-step-count">Lesson 1 of 4</p>
        <h1 id="lesson-title" class="lesson-title">Making Smart Choices: Comparing Payment Methods</h1>
        <div class="lesson-accent-rule" aria-hidden="true"></div>
        <div class="author-row">
          <img src="assets/author-avatar.png" alt="MK avatar for Miina Koyama" class="author-avatar" width="34" height="34">
          <span class="author-name">Miina Koyama</span>
        </div>
      </header>

      <div class="hero-banner-wrap">
        <img src="assets/hero-student-card.jpg" alt="First-year college student comparing payment options with card, phone, and laptop at a cafe table" class="hero-banner-img">
      </div>

      <p class="prose-p">
        Starting college means juggling campus coffee runs, group rideshares, and online orders on your own for the first time. Choosing between a debit card, a credit card, and mobile apps like Venmo isn&rsquo;t just about convenience&mdash;it determines how safe your checking cash stays when surprise bills or sketchy listings pop up.
      </p>

      <div class="goals-card">
        <h2 class="goals-heading">What You&rsquo;ll Practice in This Course</h2>
        <ol class="goals-list">${goalsHtml}</ol>
      </div>

      <!-- Progressive Chunk 1: 4-Factor Interactive Tabs -->
      <section class="rise-block" aria-labelledby="heading-tradeoffs">
        <h2 id="heading-tradeoffs" class="block-heading">Four Trade-Offs Behind Every Swipe or Tap</h2>
        <p class="block-sub">Click each tab to compare how debit cards, credit cards, and mobile payment apps handle everyday campus situations.</p>

        <div class="tabs-shell">
          <div class="tabs-bar" role="tablist" aria-label="Four payment trade-off factors">
            ${tabsBarHtml}
          </div>
          <div id="panel-tab-${activeTabObj.key}" class="tab-panel" role="tabpanel" aria-labelledby="btn-tab-${activeTabObj.key}">
            <div class="tab-visual-frame">
              <img src="${activeTabObj.image}" alt="${escapeHtml(activeTabObj.imageAlt)}" class="tab-visual-img">
              <span class="tab-badge-overlay">${escapeHtml(activeTabObj.badge)}</span>
            </div>
            <div>
              <h3 class="tab-panel-title">${escapeHtml(activeTabObj.title)}</h3>
              <p class="tab-panel-body">${escapeHtml(activeTabObj.body)}</p>
              <div class="tab-example-pill">${escapeHtml(activeTabObj.example)}</div>
            </div>
          </div>
        </div>

        ${
          !state.section1.chunk2Revealed
            ? `
              <div class="rise-continue-wrap">
                <button type="button" id="btn-reveal-chunk2" class="rise-continue-btn">
                  Continue &middot; Spending Psychology
                </button>
              </div>
            `
            : ''
        }
      </section>

      ${
        state.section1.chunk2Revealed
          ? `
            <!-- Progressive Chunk 2: 3 Psychology Flip Cards -->
            <section id="section1-chunk2" class="rise-block" aria-labelledby="heading-psychology">
              <h2 id="heading-psychology" class="block-heading">How Payment Psychology Nudges Your Wallet</h2>
              <p class="block-sub">Flip each card to see why the exact same $65 purchase feels completely different depending on how you pay.</p>

              <div class="flip-grid">
                ${cardsHtml}
              </div>

              <div class="rise-continue-wrap">
                <button type="button" id="btn-continue-to-s2" class="rise-continue-btn">
                  Continue to Lesson 2: Match Payment to Scenario &rarr;
                </button>
              </div>
            </section>
          `
          : ''
      }
    `;
  }

  /* --- SECTION 2: Match Payment to Scenario (1 Card at a Time + Spatial Contiguity) --- */
  function buildSection2Html() {
    const idx = state.section2.currentIndex;
    const scenario = SORTING_SCENARIOS[idx];
    const cardState = state.section2.cards[scenario.id];
    const solvedCount = Object.values(state.section2.cards).filter((c) => c.solved).length;
    const allSolved = solvedCount === SORTING_SCENARIOS.length;

    const dotsHtml = SORTING_SCENARIOS.map((s, i) => {
      const cState = state.section2.cards[s.id];
      const cls = [
        'deck-dot-btn',
        i === idx ? 'is-current' : '',
        cState.solved ? 'is-done' : ''
      ]
        .filter(Boolean)
        .join(' ');
      return `
        <button
          type="button"
          id="btn-s2-dot-${i + 1}"
          class="${cls}"
          data-s2-jump="${i}"
          aria-label="Scenario card ${i + 1} of ${SORTING_SCENARIOS.length}${cState.solved ? ' (completed)' : ''}"
        >
          ${cState.solved ? '✓' : i + 1}
        </button>
      `;
    }).join('');

    const bucketsHtml = BUCKET_OPTIONS.map((b) => {
      const isSelected = cardState.selected === b.key;
      const fb = isSelected ? scenario.feedback[b.key] : null;
      const stateCls = isSelected ? (fb && fb.ok ? ' is-selected-ok' : ' is-selected-try') : '';
      return `
        <button
          type="button"
          id="btn-s2-bucket-${b.key}"
          class="bucket-btn${stateCls}"
          data-s2-bucket="${b.key}"
          aria-pressed="${isSelected ? 'true' : 'false'}"
        >
          <span class="bucket-icon" aria-hidden="true">${b.icon}</span>
          <span class="bucket-title">${escapeHtml(b.title)}</span>
          <span class="bucket-sub">${escapeHtml(b.sub)}</span>
        </button>
      `;
    }).join('');

    let feedbackHtml = '';
    if (cardState.selected) {
      const fb = scenario.feedback[cardState.selected];
      feedbackHtml = `
        <div class="inline-feedback-box ${fb.ok ? 'is-ok' : 'is-warn'}" role="status" aria-live="polite">
          <p class="feedback-head">${escapeHtml(fb.head)}</p>
          <p class="feedback-body">${escapeHtml(fb.body)}</p>
        </div>
      `;
    }

    const hintsShown = scenario.hints.slice(0, cardState.hintLevel);
    const hintsHtml =
      hintsShown.length > 0
        ? `
          <div class="hint-stack" aria-live="polite">
            ${hintsShown
              .map(
                (h, hIdx) => `
                  <div class="hint-item">
                    <span class="hint-level-tag">Hint ${hIdx + 1}/3:</span>
                    <span>${escapeHtml(h)}</span>
                  </div>
                `
              )
              .join('')}
          </div>
        `
        : '';

    const canAdvanceCard = cardState.solved && idx < SORTING_SCENARIOS.length - 1;

    return `
      <header class="lesson-header">
        <p class="lesson-step-count">Lesson 2 of 4</p>
        <h1 id="lesson-title" class="lesson-title">Match Payment to Scenario</h1>
        <div class="lesson-accent-rule" aria-hidden="true"></div>
      </header>

      <div class="compact-intro-row">
        <img src="assets/student-options.jpg" alt="Student choosing between phone and card at checkout" class="compact-intro-thumb">
        <p class="compact-intro-copy">
          Sort each real college money moment into the smartest payment bucket below. You&rsquo;ll get instant feedback right inside the card&mdash;and can grab a hint anytime.
        </p>
      </div>

      <div class="deck-progress-bar">
        <span class="deck-counter-label">Scenario Card ${idx + 1} of ${SORTING_SCENARIOS.length} &middot; ${solvedCount}/${SORTING_SCENARIOS.length} Matched</span>
        <div class="deck-dots">${dotsHtml}</div>
      </div>

      <section class="sorting-stage-card" aria-labelledby="s2-active-prompt">
        <div class="scenario-signal-pill">${escapeHtml(scenario.signal)}</div>
        <p id="s2-active-prompt" class="scenario-card-prompt">${escapeHtml(scenario.prompt)}</p>

        <p class="bucket-prompt-label">Select the best payment method for this moment:</p>
        <div class="buckets-grid">
          ${bucketsHtml}
        </div>

        ${feedbackHtml}
        ${hintsHtml}

        <div class="card-actions-row">
          <button
            type="button"
            id="btn-s2-hint"
            class="hint-btn"
            ${cardState.hintLevel >= 3 || cardState.solved ? 'disabled' : ''}
          >
            Need a Hint? (${cardState.hintLevel}/3)
          </button>

          ${
            canAdvanceCard
              ? `
                <button type="button" id="btn-s2-next-card" class="next-card-btn">
                  Next Scenario (${idx + 2} of ${SORTING_SCENARIOS.length}) &rarr;
                </button>
              `
              : ''
          }
        </div>
      </section>

      ${
        allSolved
          ? `
            <div class="rise-continue-wrap">
              <button type="button" id="btn-continue-to-s3" class="rise-continue-btn">
                Continue to Lesson 3: Spring Break Money Moves &rarr;
              </button>
            </div>
          `
          : ''
      }
    `;
  }

  /* --- SECTION 3: Spring Break Money Moves (Carlos Stage + Live Wallet + Track A Remediation) --- */
  function buildSection3Html() {
    const idx = state.section3.sceneIndex;
    const scene = CARLOS_SCENES[idx];
    const sceneState = state.section3.scenes[scene.id];
    const rem = state.section3.activeRemediation;
    const solvedCount = Object.values(state.section3.scenes).filter((s) => s.solved).length;
    const allSolved = solvedCount === CARLOS_SCENES.length;

    const chosenObj = sceneState.selected
      ? scene.choices.find((c) => c.key === sceneState.selected)
      : null;

    // Determine live wallet display values
    let checkingVal = scene.baseChecking;
    let creditVal = scene.baseCredit;
    let feeVal = 0;
    let checkingAlert = false;
    let autoPayLabel = '⚠️ Tomorrow 6 AM Auto-Pay';
    let autoPayValue = '$120';

    if (sceneState.solved && chosenObj && chosenObj.nextWallet) {
      checkingVal = chosenObj.nextWallet.checking;
      creditVal = chosenObj.nextWallet.credit;
      feeVal = chosenObj.nextWallet.fee;
      if (chosenObj.nextWallet.settled6AM) {
        autoPayLabel = '✅ 6 AM Auto-Pay Settled';
        autoPayValue = 'Paid (-$120)';
      }
    } else if (chosenObj && chosenObj.previewWallet) {
      checkingVal = chosenObj.previewWallet.checking;
      creditVal = chosenObj.previewWallet.credit;
      feeVal = chosenObj.previewWallet.fee;
      checkingAlert = Boolean(chosenObj.previewWallet.alertChecking);
    }

    // Determine background & Carlos pose
    const bgImage = sceneState.solved ? scene.bgSolved : scene.bgUnresolved;
    let carlosPose = sceneState.solved ? scene.poseSolved : scene.poseUnresolved;
    if (rem) {
      carlosPose = 'assets/carlos-thinking.png';
    } else if (!sceneState.solved && chosenObj && chosenObj.pose) {
      carlosPose = chosenObj.pose;
    }

    const dotsHtml = CARLOS_SCENES.map((sc, i) => {
      const st = state.section3.scenes[sc.id];
      const cls = [
        'deck-dot-btn',
        i === idx ? 'is-current' : '',
        st.solved ? 'is-done' : ''
      ]
        .filter(Boolean)
        .join(' ');
      return `
        <button
          type="button"
          id="btn-s3-scene-${i + 1}"
          class="${cls}"
          data-s3-jump="${i}"
          aria-label="Carlos scene ${i + 1} of ${CARLOS_SCENES.length}${st.solved ? ' (completed)' : ''}"
        >
          ${st.solved ? '✓' : i + 1}
        </button>
      `;
    }).join('');

    // Build right-side stage dialogue or Track A Remediation Quick-Fix
    let rightCardContent = '';
    if (rem) {
      const qf = REMEDIATION_QUICK_FIXES[rem.type];
      const chosenDiagnostic = chosenObj && !sceneState.solved
        ? `
          <div class="inline-feedback-box is-danger" style="margin-top:0; margin-bottom:12px;" role="status" aria-live="polite">
            <p class="feedback-head">${escapeHtml(chosenObj.head)}</p>
            <p class="feedback-body">${escapeHtml(chosenObj.body)}</p>
          </div>
        `
        : '';

      const remOptsHtml = qf.options
        .map((opt) => {
          const isPicked = rem.selectedOpt === opt.key;
          const cls = isPicked ? (opt.ok ? ' is-selected-ok' : ' is-selected-bad') : '';
          return `
            <button
              type="button"
              id="btn-rem-opt-${opt.key}"
              class="stage-choice-btn${cls}"
              data-rem-opt="${opt.key}"
            >
              <span class="stage-choice-main">${escapeHtml(opt.label)}</span>
            </button>
          `;
        })
        .join('');

      const pickedOptObj = rem.selectedOpt ? qf.options.find((o) => o.key === rem.selectedOpt) : null;

      rightCardContent = `
        <div class="speech-card">
          ${chosenDiagnostic}
          <div class="remediation-card">
            <p class="remediation-kicker">Pause &amp; Fix With Carlos</p>
            <h2 class="remediation-title">${escapeHtml(qf.title)}</h2>
            <div class="contrast-grid">
              <div class="contrast-box is-naive">
                <strong>${escapeHtml(qf.naiveLabel)}</strong><br>
                ${escapeHtml(qf.naiveText)}
              </div>
              <div class="contrast-box is-smart">
                <strong>${escapeHtml(qf.smartLabel)}</strong><br>
                ${escapeHtml(qf.smartText)}
              </div>
            </div>
            <p class="remediation-q">${escapeHtml(qf.question)}</p>
            <div class="stage-choices-stack">
              ${remOptsHtml}
            </div>
            ${
              pickedOptObj
                ? `
                  <div class="inline-feedback-box ${pickedOptObj.ok ? 'is-ok' : 'is-warn'}" role="status" aria-live="polite">
                    <p class="feedback-body">${escapeHtml(pickedOptObj.nudge)}</p>
                  </div>
                `
                : ''
            }
            ${
              rem.solved
                ? `
                  <div class="card-actions-row" style="justify-content:flex-end;">
                    <button type="button" id="btn-rem-return" class="next-card-btn">
                      Revise Carlos&rsquo;s Choice &rarr;
                    </button>
                  </div>
                `
                : ''
            }
          </div>
        </div>
      `;
    } else {
      const choicesHtml = scene.choices
        .map((ch) => {
          const isSelected = sceneState.selected === ch.key;
          const isOptimal = ch.key === scene.optimal;
          const cls = isSelected ? (isOptimal ? ' is-selected-ok' : ' is-selected-bad') : '';
          return `
            <button
              type="button"
              id="btn-s3-choice-${ch.key}"
              class="stage-choice-btn${cls}"
              data-s3-choice="${ch.key}"
              aria-pressed="${isSelected ? 'true' : 'false'}"
            >
              <span class="stage-choice-main">${escapeHtml(ch.label)} &mdash; <span style="font-weight:400; color:#495057;">${escapeHtml(ch.sub)}</span></span>
              <span class="stage-choice-tag">${isSelected && isOptimal ? '✓ Chosen' : 'Select'}</span>
            </button>
          `;
        })
        .join('');

      const feedbackHtml = chosenObj
        ? `
          <div class="inline-feedback-box ${sceneState.solved ? 'is-ok' : 'is-danger'}" role="status" aria-live="polite">
            <p class="feedback-head">${escapeHtml(chosenObj.head)}</p>
            <p class="feedback-body">${escapeHtml(chosenObj.body)}</p>
          </div>
        `
        : '';

      const hintsShown = scene.hints.slice(0, sceneState.hintLevel);
      const hintsHtml =
        hintsShown.length > 0
          ? `
            <div class="hint-stack" aria-live="polite">
              ${hintsShown
                .map(
                  (h, hIdx) => `
                    <div class="hint-item">
                      <span class="hint-level-tag">Hint ${hIdx + 1}/3:</span>
                      <span>${escapeHtml(h)}</span>
                    </div>
                  `
                )
                .join('')}
            </div>
          `
          : '';

      const canNextScene = sceneState.solved && idx < CARLOS_SCENES.length - 1;

      rightCardContent = `
        <div class="speech-card">
          <span class="scene-step-pill">${escapeHtml(scene.stepLabel)}</span>
          <p class="carlos-quote">${escapeHtml(sceneState.solved ? scene.solvedQuote : scene.quote)}</p>

          <div class="stage-choices-stack">
            ${choicesHtml}
          </div>

          ${feedbackHtml}
          ${hintsHtml}

          <div class="card-actions-row">
            <button
              type="button"
              id="btn-s3-hint"
              class="hint-btn"
              ${sceneState.hintLevel >= 3 || sceneState.solved ? 'disabled' : ''}
            >
              Need a Hint? (${sceneState.hintLevel}/3)
            </button>

            ${
              canNextScene
                ? `
                  <button type="button" id="btn-s3-next-scene" class="next-card-btn">
                    Next Scene (${idx + 2} of ${CARLOS_SCENES.length}) &rarr;
                  </button>
                `
                : ''
            }
          </div>
        </div>
      `;
    }

    return `
      <header class="lesson-header">
        <p class="lesson-step-count">Lesson 3 of 4</p>
        <h1 id="lesson-title" class="lesson-title">Spring Break Money Moves</h1>
        <div class="lesson-accent-rule" aria-hidden="true"></div>
      </header>

      <div class="deck-progress-bar">
        <span class="deck-counter-label">Carlos&rsquo;s Trip &middot; ${solvedCount}/${CARLOS_SCENES.length} Scenes Solved</span>
        <div class="deck-dots">${dotsHtml}</div>
      </div>

      <!-- Authentic Rise 360 Scenario Stage with Pinned Top Wallet Bar -->
      <section class="scenario-stage-shell" aria-label="Carlos Spring Break interactive scenario">
        <div class="wallet-topbar" aria-live="polite">
          <div class="wallet-metric${checkingAlert ? ' is-alert' : ''}">
            <span class="wallet-label">Checking Cash</span>
            <span class="wallet-value">${formatSignedDollar(checkingVal)}</span>
          </div>
          <div class="wallet-metric">
            <span class="wallet-label">Credit Card Balance</span>
            <span class="wallet-value">$${creditVal}</span>
          </div>
          <div class="wallet-metric is-autopay-signal">
            <span class="wallet-label">${escapeHtml(autoPayLabel)}</span>
            <span class="wallet-value">${escapeHtml(autoPayValue)}</span>
          </div>
          <div class="wallet-metric${feeVal > 0 ? ' is-alert' : ''}">
            <span class="wallet-label">Overdraft Fees</span>
            <span class="wallet-value">$${feeVal}</span>
          </div>
        </div>

        <div class="stage-visual-body" style="background-image: url('${bgImage}');">
          <div class="stage-visual-scrim" aria-hidden="true"></div>
          <div class="carlos-figure-wrap">
            <img src="${carlosPose}" alt="Carlos college student character reacting to payment decision" class="carlos-img">
          </div>
          <div class="stage-dialogue-col">
            ${rightCardContent}
          </div>
        </div>
      </section>

      ${
        allSolved
          ? `
            <div class="rise-continue-wrap">
              <button type="button" id="btn-continue-to-s4" class="rise-continue-btn">
                Continue to Lesson 4: Solo Challenge (Move-In Week) &rarr;
              </button>
            </div>
          `
          : ''
      }
    `;
  }

  /* --- SECTION 4: Solo Challenge: Move-In Week (Track A Faded Transfer) --- */
  function buildSection4Html() {
    const idx = state.section4.moveIndex;
    const move = MAYA_MOVES[idx];
    const moveState = state.section4.moves[move.id];
    const solvedCount = Object.values(state.section4.moves).filter((m) => m.solved).length;
    const allSolved = solvedCount === MAYA_MOVES.length;

    const chosenFb = moveState.selected ? move.feedback[moveState.selected] : null;

    let checkingVal = move.baseChecking;
    let creditVal = move.baseCredit;
    let feeVal = 0;
    let alertState = false;

    if (moveState.solved && chosenFb && chosenFb.nextWallet) {
      checkingVal = chosenFb.nextWallet.checking;
      creditVal = chosenFb.nextWallet.credit;
      feeVal = chosenFb.nextWallet.fee;
    } else if (chosenFb && chosenFb.previewWallet) {
      checkingVal = chosenFb.previewWallet.checking;
      creditVal = chosenFb.previewWallet.credit;
      feeVal = chosenFb.previewWallet.fee;
      alertState = Boolean(chosenFb.previewWallet.alert);
    }

    const dotsHtml = MAYA_MOVES.map((m, i) => {
      const mSt = state.section4.moves[m.id];
      const cls = [
        'deck-dot-btn',
        i === idx ? 'is-current' : '',
        mSt.solved ? 'is-done' : ''
      ]
        .filter(Boolean)
        .join(' ');
      return `
        <button
          type="button"
          id="btn-s4-move-${i + 1}"
          class="${cls}"
          data-s4-jump="${i}"
          aria-label="Move ${i + 1} of ${MAYA_MOVES.length}${mSt.solved ? ' (completed)' : ''}"
        >
          ${mSt.solved ? '✓' : i + 1}
        </button>
      `;
    }).join('');

    const bucketsHtml = BUCKET_OPTIONS.map((b) => {
      const isSelected = moveState.selected === b.key;
      const fb = isSelected ? move.feedback[b.key] : null;
      const cls = isSelected ? (fb && fb.ok ? ' is-selected-ok' : ' is-selected-try') : '';
      return `
        <button
          type="button"
          id="btn-s4-bucket-${b.key}"
          class="bucket-btn${cls}"
          data-s4-bucket="${b.key}"
          aria-pressed="${isSelected ? 'true' : 'false'}"
        >
          <span class="bucket-icon" aria-hidden="true">${b.icon}</span>
          <span class="bucket-title">${escapeHtml(b.title)}</span>
          <span class="bucket-sub">${escapeHtml(b.sub)}</span>
        </button>
      `;
    }).join('');

    const feedbackHtml = chosenFb
      ? `
        <div class="inline-feedback-box ${chosenFb.ok ? 'is-ok' : 'is-danger'}" role="status" aria-live="polite">
          <p class="feedback-head">${escapeHtml(chosenFb.head)}</p>
          <p class="feedback-body">${escapeHtml(chosenFb.body)}</p>
        </div>
      `
      : '';

    const hintsShown = move.hints.slice(0, moveState.hintLevel);
    const hintsHtml =
      hintsShown.length > 0
        ? `
          <div class="hint-stack" aria-live="polite">
            ${hintsShown
              .map(
                (h, hIdx) => `
                  <div class="hint-item">
                    <span class="hint-level-tag">Hint ${hIdx + 1}/3:</span>
                    <span>${escapeHtml(h)}</span>
                  </div>
                `
              )
              .join('')}
          </div>
        `
        : '';

    const canNextMove = moveState.solved && idx < MAYA_MOVES.length - 1;

    return `
      <header class="lesson-header">
        <p class="lesson-step-count">Lesson 4 of 4</p>
        <h1 id="lesson-title" class="lesson-title">Solo Challenge: Move-In Week</h1>
        <div class="lesson-accent-rule" aria-hidden="true"></div>
      </header>

      <!-- Maya's Planner Note (No pre-highlighted warning pill — Faded Transfer!) -->
      <div class="planner-note-card">
        <strong>Maya&rsquo;s Move-In Planner Note:</strong> Maya starts move-in evening with <strong>$210</strong> in checking and <strong>$0</strong> on her credit card. Her city electric setup fee of <strong>$130</strong> drafts automatically from checking tonight at <strong>11:59 PM</strong>, right before her <strong>$400</strong> campus job direct deposit arrives tomorrow morning.
      </div>

      <!-- Raw Bank View (Auto-Pay Warning Pill Faded Out!) -->
      <div class="wallet-topbar is-raw-bank" aria-live="polite">
        <div class="wallet-metric${alertState ? ' is-alert' : ''}">
          <span class="wallet-label">Checking Balance</span>
          <span class="wallet-value">${formatSignedDollar(checkingVal)}</span>
        </div>
        <div class="wallet-metric">
          <span class="wallet-label">Credit Card Balance</span>
          <span class="wallet-value">$${creditVal}</span>
        </div>
        <div class="wallet-metric${feeVal > 0 ? ' is-alert' : ''}">
          <span class="wallet-label">Overdraft Fees</span>
          <span class="wallet-value">$${feeVal}</span>
        </div>
      </div>

      <div class="deck-progress-bar">
        <span class="deck-counter-label">${escapeHtml(move.stepLabel)} &middot; ${solvedCount}/${MAYA_MOVES.length} Completed</span>
        <div class="deck-dots">${dotsHtml}</div>
      </div>

      <section class="sorting-stage-card" aria-labelledby="s4-active-prompt">
        <p id="s4-active-prompt" class="scenario-card-prompt">${escapeHtml(move.prompt)}</p>

        <p class="bucket-prompt-label">Choose Maya&rsquo;s payment method:</p>
        <div class="buckets-grid">
          ${bucketsHtml}
        </div>

        ${feedbackHtml}
        ${hintsHtml}

        <div class="card-actions-row">
          <button
            type="button"
            id="btn-s4-hint"
            class="hint-btn is-faded-link"
            ${moveState.hintLevel >= 3 || moveState.solved ? 'disabled' : ''}
          >
            Request optional hint (${moveState.hintLevel}/3)
          </button>

          ${
            canNextMove
              ? `
                <button type="button" id="btn-s4-next-move" class="next-card-btn">
                  Next Move (${idx + 2} of ${MAYA_MOVES.length}) &rarr;
                </button>
              `
              : ''
          }
        </div>
      </section>

      ${
        allSolved
          ? `
            <section class="completion-summary-card" aria-labelledby="course-complete-heading">
              <h2 id="course-complete-heading" class="completion-title">🎉 100% Complete &mdash; Smart Spending Mastered!</h2>
              <p class="prose-p" style="margin-bottom:8px; font-size:15px;">
                You guided both Carlos and Maya through tricky websites, group splits, and overnight auto-pay bills with <strong>$0 in overdraft fees</strong>${state.section4.fadedHintsUsed === 0 ? ' and zero solo hints needed' : ''}.
              </p>
              <ul class="completion-list">
                <li><strong>Credit Card:</strong> Best for unfamiliar online checkouts (FCBA fraud shield) and short timing buffers before payday when paid in full.</li>
                <li><strong>Mobile Payment (Venmo/Zelle):</strong> Best for instant exact splits with trusted friends—never for strangers in DMs.</li>
                <li><strong>Debit Card:</strong> Great for everyday budgeted spending like groceries once upcoming auto-pay bills are safely covered.</li>
              </ul>
              <button type="button" id="btn-review-lesson1" class="hint-btn">
                &larr; Back to Lesson 1 Overview
              </button>
            </section>
          `
          : ''
      }
    `;
  }

  /* ------------------------------------------------------------------------
     6. Interaction Handlers & Event Delegation
     ------------------------------------------------------------------------ */

  function goToSection(sectionNum, scrollTop = true) {
    state.activeSection = sectionNum;
    closeMobileSidebar();
    saveState();
    renderActiveSection();
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function openMobileSidebar() {
    mobileMenuOpen = true;
    const sidebar = document.getElementById('course-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const btn = document.getElementById('btn-mobile-menu');
    if (sidebar) sidebar.classList.add('is-mobile-open');
    if (backdrop) backdrop.hidden = false;
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileSidebar() {
    mobileMenuOpen = false;
    const sidebar = document.getElementById('course-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const btn = document.getElementById('btn-mobile-menu');
    if (sidebar) sidebar.classList.remove('is-mobile-open');
    if (backdrop) backdrop.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function openLxdDrawer() {
    lxdDrawerOpen = true;
    const drawer = document.getElementById('lxd-drawer');
    const backdrop = document.getElementById('lxd-backdrop');
    const btn = document.getElementById('btn-open-lxd');
    if (drawer) {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
    }
    if (backdrop) backdrop.hidden = false;
    if (btn) btn.setAttribute('aria-expanded', 'true');
    renderLxdTelemetry(getOverallPercent());
  }

  function closeLxdDrawer() {
    lxdDrawerOpen = false;
    const drawer = document.getElementById('lxd-drawer');
    const backdrop = document.getElementById('lxd-backdrop');
    const btn = document.getElementById('btn-open-lxd');
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) backdrop.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function handleSection2Bucket(bucketKey) {
    const scenario = SORTING_SCENARIOS[state.section2.currentIndex];
    const cardState = state.section2.cards[scenario.id];
    const fb = scenario.feedback[bucketKey];
    if (!fb) return;

    state.attempts += 1;
    cardState.selected = bucketKey;

    if (fb.ok) {
      cardState.solved = true;
      const allDone = Object.values(state.section2.cards).every((c) => c.solved);
      if (allDone) state.section2.completed = true;
    } else if (fb.misconception) {
      state.misconceptions[fb.misconception] += 1;
    }

    saveState();
    renderActiveSection();
  }

  function handleSection3Choice(choiceKey) {
    const scene = CARLOS_SCENES[state.section3.sceneIndex];
    const sceneState = state.section3.scenes[scene.id];
    const choiceObj = scene.choices.find((c) => c.key === choiceKey);
    if (!choiceObj) return;

    state.attempts += 1;
    sceneState.selected = choiceKey;

    if (choiceKey === scene.optimal) {
      sceneState.solved = true;
      state.section3.activeRemediation = null;
      const allDone = Object.values(state.section3.scenes).every((s) => s.solved);
      if (allDone) state.section3.completed = true;
    } else {
      const mType = choiceObj.misconception;
      if (mType) {
        state.misconceptions[mType] += 1;
      }
      const remType = choiceObj.remediationType || mType;
      const hitCumulativeThreshold = remType && state.misconceptions[remType] >= 2;
      const shouldRemediate =
        remType &&
        (choiceObj.triggersRemediation || hitCumulativeThreshold) &&
        !state.remediationsCompleted[remType];

      if (shouldRemediate) {
        state.section3.activeRemediation = {
          type: remType,
          selectedOpt: null,
          solved: false
        };
      }
    }

    saveState();
    renderActiveSection();
  }

  function handleRemediationOption(optKey) {
    const rem = state.section3.activeRemediation;
    if (!rem) return;
    const qf = REMEDIATION_QUICK_FIXES[rem.type];
    const optObj = qf.options.find((o) => o.key === optKey);
    if (!optObj) return;

    state.attempts += 1;
    rem.selectedOpt = optKey;
    if (optObj.ok) {
      rem.solved = true;
      state.remediationsCompleted[rem.type] = true;
    }
    saveState();
    renderActiveSection();
  }

  function handleSection4Bucket(bucketKey) {
    const move = MAYA_MOVES[state.section4.moveIndex];
    const moveState = state.section4.moves[move.id];
    const fb = move.feedback[bucketKey];
    if (!fb) return;

    state.attempts += 1;
    moveState.selected = bucketKey;

    if (fb.ok) {
      moveState.solved = true;
      const allDone = Object.values(state.section4.moves).every((m) => m.solved);
      if (allDone) state.section4.completed = true;
    } else if (fb.misconception) {
      state.misconceptions[fb.misconception] += 1;
    }

    saveState();
    renderActiveSection();
  }

  function previewRemediationFromDrawer(remType) {
    closeLxdDrawer();
    state.activeSection = 3;
    if (remType === 'fraud_exposure') {
      state.section3.sceneIndex = 0;
      state.section3.scenes.c1.selected = 'mobile';
      state.section3.scenes.c1.solved = false;
    } else if (remType === 'reward_chasing') {
      state.section3.sceneIndex = 1;
      state.section3.scenes.c2.selected = 'credit';
      state.section3.scenes.c2.solved = false;
    } else {
      state.section3.sceneIndex = 2;
      state.section3.scenes.c3.selected = 'debit';
      state.section3.scenes.c3.solved = false;
    }
    state.section3.activeRemediation = {
      type: remType,
      selectedOpt: null,
      solved: false
    };
    saveState();
    renderActiveSection();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function bindEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      // Mobile menu controls
      if (target.closest('#btn-mobile-menu')) {
        if (mobileMenuOpen) closeMobileSidebar();
        else openMobileSidebar();
        return;
      }
      if (target.closest('#btn-close-sidebar') || target.closest('#sidebar-backdrop')) {
        closeMobileSidebar();
        return;
      }

      // LXD Drawer controls
      if (target.closest('#btn-open-lxd')) {
        if (lxdDrawerOpen) closeLxdDrawer();
        else openLxdDrawer();
        return;
      }
      if (target.closest('#btn-close-lxd') || target.closest('#lxd-backdrop')) {
        closeLxdDrawer();
        return;
      }

      // Sidebar lesson navigation
      const navBtn = target.closest('[data-nav-lesson]');
      if (navBtn) {
        const lessonNum = Number(navBtn.getAttribute('data-nav-lesson'));
        if (lessonNum >= 1 && lessonNum <= 4) {
          goToSection(lessonNum, true);
        }
        return;
      }

      // LXD Quick Jump & Preview buttons
      if (target.closest('#btn-jump-1')) { closeLxdDrawer(); goToSection(1); return; }
      if (target.closest('#btn-jump-2')) { closeLxdDrawer(); goToSection(2); return; }
      if (target.closest('#btn-jump-3')) { closeLxdDrawer(); goToSection(3); return; }
      if (target.closest('#btn-jump-4')) { closeLxdDrawer(); goToSection(4); return; }

      if (target.closest('#btn-preview-rem-liquidity')) {
        previewRemediationFromDrawer('liquidity_blindness');
        return;
      }
      if (target.closest('#btn-preview-rem-fraud')) {
        previewRemediationFromDrawer('fraud_exposure');
        return;
      }
      if (target.closest('#btn-preview-rem-reward')) {
        previewRemediationFromDrawer('reward_chasing');
        return;
      }
      if (target.closest('#btn-reset-course')) {
        state = createFreshState();
        saveState();
        closeLxdDrawer();
        renderActiveSection();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Section 1 interactions
      const tabBtn = target.closest('[data-tab-key]');
      if (tabBtn) {
        const key = tabBtn.getAttribute('data-tab-key');
        state.section1.activeTab = key;
        state.section1.visitedTabs[key] = true;
        saveState();
        renderActiveSection();
        return;
      }

      if (target.closest('#btn-reveal-chunk2')) {
        state.section1.visitedTabs[state.section1.activeTab] = true;
        state.section1.chunk2Revealed = true;
        saveState();
        renderActiveSection();
        const chunk2 = document.getElementById('section1-chunk2');
        if (chunk2) chunk2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      const flipBtn = target.closest('[data-flip-key]');
      if (flipBtn) {
        const key = flipBtn.getAttribute('data-flip-key');
        state.section1.flippedCards[key] = !state.section1.flippedCards[key];
        state.section1.visitedCards[key] = true;
        saveState();
        renderActiveSection();
        return;
      }

      if (target.closest('#btn-continue-to-s2')) {
        state.section1.completed = true;
        goToSection(2, true);
        return;
      }

      // Section 2 interactions
      const s2Dot = target.closest('[data-s2-jump]');
      if (s2Dot) {
        state.section2.currentIndex = Number(s2Dot.getAttribute('data-s2-jump'));
        saveState();
        renderActiveSection();
        return;
      }

      const s2Bucket = target.closest('[data-s2-bucket]');
      if (s2Bucket) {
        handleSection2Bucket(s2Bucket.getAttribute('data-s2-bucket'));
        return;
      }

      if (target.closest('#btn-s2-hint')) {
        const sc = SORTING_SCENARIOS[state.section2.currentIndex];
        const cState = state.section2.cards[sc.id];
        if (cState.hintLevel < 3) {
          cState.hintLevel += 1;
          state.hintsUsed += 1;
          saveState();
          renderActiveSection();
        }
        return;
      }

      if (target.closest('#btn-s2-next-card')) {
        if (state.section2.currentIndex < SORTING_SCENARIOS.length - 1) {
          state.section2.currentIndex += 1;
          saveState();
          renderActiveSection();
        }
        return;
      }

      if (target.closest('#btn-continue-to-s3')) {
        state.section2.completed = true;
        goToSection(3, true);
        return;
      }

      // Section 3 interactions
      const s3Dot = target.closest('[data-s3-jump]');
      if (s3Dot) {
        state.section3.sceneIndex = Number(s3Dot.getAttribute('data-s3-jump'));
        state.section3.activeRemediation = null;
        saveState();
        renderActiveSection();
        return;
      }

      const s3Choice = target.closest('[data-s3-choice]');
      if (s3Choice) {
        handleSection3Choice(s3Choice.getAttribute('data-s3-choice'));
        return;
      }

      const remOpt = target.closest('[data-rem-opt]');
      if (remOpt) {
        handleRemediationOption(remOpt.getAttribute('data-rem-opt'));
        return;
      }

      if (target.closest('#btn-rem-return')) {
        const sc = CARLOS_SCENES[state.section3.sceneIndex];
        state.section3.scenes[sc.id].selected = null;
        state.section3.activeRemediation = null;
        saveState();
        renderActiveSection();
        return;
      }

      if (target.closest('#btn-s3-hint')) {
        const sc = CARLOS_SCENES[state.section3.sceneIndex];
        const sState = state.section3.scenes[sc.id];
        if (sState.hintLevel < 3) {
          sState.hintLevel += 1;
          state.hintsUsed += 1;
          saveState();
          renderActiveSection();
        }
        return;
      }

      if (target.closest('#btn-s3-next-scene')) {
        if (state.section3.sceneIndex < CARLOS_SCENES.length - 1) {
          state.section3.sceneIndex += 1;
          state.section3.activeRemediation = null;
          saveState();
          renderActiveSection();
        }
        return;
      }

      if (target.closest('#btn-continue-to-s4')) {
        state.section3.completed = true;
        goToSection(4, true);
        return;
      }

      // Section 4 interactions
      const s4Dot = target.closest('[data-s4-jump]');
      if (s4Dot) {
        state.section4.moveIndex = Number(s4Dot.getAttribute('data-s4-jump'));
        saveState();
        renderActiveSection();
        return;
      }

      const s4Bucket = target.closest('[data-s4-bucket]');
      if (s4Bucket) {
        handleSection4Bucket(s4Bucket.getAttribute('data-s4-bucket'));
        return;
      }

      if (target.closest('#btn-s4-hint')) {
        const mv = MAYA_MOVES[state.section4.moveIndex];
        const mState = state.section4.moves[mv.id];
        if (mState.hintLevel < 3) {
          mState.hintLevel += 1;
          state.hintsUsed += 1;
          state.section4.fadedHintsUsed += 1;
          saveState();
          renderActiveSection();
        }
        return;
      }

      if (target.closest('#btn-s4-next-move')) {
        if (state.section4.moveIndex < MAYA_MOVES.length - 1) {
          state.section4.moveIndex += 1;
          saveState();
          renderActiveSection();
        }
        return;
      }

      if (target.closest('#btn-review-lesson1')) {
        goToSection(1, true);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (lxdDrawerOpen) closeLxdDrawer();
        if (mobileMenuOpen) closeMobileSidebar();
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. Bootstrap
     ------------------------------------------------------------------------ */

  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    renderActiveSection();
  });
})();
