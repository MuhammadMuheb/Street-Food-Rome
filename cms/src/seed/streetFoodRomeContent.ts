/**
 * cms/src/seed/streetFoodRomeContent.ts — pure content for the
 * streetfoodrome.com hero: theme tokens, author bio, and all 12 Pages'
 * copy/FAQs plus the 4 Tours' first-hand verdicts.
 *
 * Deliberately has zero side effects (no getPayload, no DB call) so it can
 * be imported by both seedStreetFoodRome.ts (creates rows once) and
 * updatePageContent.ts (a one-off script that pushes edits here onto an
 * already-seeded database) without either one accidentally re-running the
 * other's side effects just by importing this file for its data.
 *
 * Body copy is original editorial writing, not researched/fact-checked
 * marketing copy — but it's written to doc 05 §6's actual bar ("first-hand
 * detail in the first 100 words", a FAQ block with several quotable
 * one-sentence answers, not one), not as a content skeleton. Tour data
 * (affiliate URLs, partner id) is fabricated for local demo purposes, not a
 * real GetYourGuide account.
 */
export const SITE_DOMAIN = 'streetfoodrome.com';

export const THEME_TOKENS = {
  colorPrimary: '#0a0a0a',
  colorAccent: '#dc2626',
  colorBackground: '#fafaf9',
  colorForeground: '#0a0a0a',
  fontHeading: 'Fraunces, Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.25rem',
  heroStyle: 'editorial',
};

export const AUTHOR = {
  name: 'Marco Ferretti',
  bio: "Rome resident of 12 years, eats at every place before recommending it. Started as a private guide taking friends-of-friends through Testaccio market on Saturday mornings; this site is the same list, written down properly. No restaurant on it pays for the placement, and none of them know they're on it.",
};

export interface PageFaq {
  question: string;
  answer: string;
}

interface PageSeed {
  slug: string;
  title: string;
  type: 'money' | 'support' | 'about' | 'legal';
  primaryKeyword: string;
  metaDesc: string;
  bodyParagraphs: string[];
  faqs: PageFaq[];
  tourSlugs?: string[];
}

export const PAGES: PageSeed[] = [
  {
    slug: 'home',
    title: "Rome's Street Food, Mapped by Someone Who Actually Eats It",
    type: 'support',
    primaryKeyword: 'rome street food guide',
    metaDesc:
      'A first-hand guide to eating well in Rome from a 12-year resident — the markets, the neighbourhoods, and the five food tours actually worth your evening.',
    bodyParagraphs: [
      "Most Rome food guides are written by someone who visited for four days, ate at whatever ranked first on a review site, and called it research. This one isn't that. I've lived two blocks off Piazza Testaccio since 2013, I still do the Saturday market run out of habit rather than content, and every tour, market stall, and gelateria mentioned on this site is somewhere I've personally eaten in the last year — most of them dozens of times.",
      "That distinction matters more than it sounds like it should, because Rome's food scene has a real fault line running through it: there's the city that markets itself to tourists, and the city that feeds itself. The first has laminated menus in five languages, photos of the food out front, and a host who waves you in from the street. The second has a handwritten specials board in Italian only, plastic stools, and a till that still runs on paper receipts. Almost everything worth eating in this city is on the second side of that line, and almost everything on this site is a way of getting you there without wasting an evening finding out the hard way.",
      "This site covers five specific tours — Trastevere, Testaccio market, an evening food-and-wine pairing, an aperitivo crawl, and a general Rome street food walk that's a decent flagship if you only have one evening — plus honest guides to the neighbourhoods, markets, gelato, and coffee culture that make up the rest of eating here well. Each money page ends with an actual verdict from me, not a recycled star rating: whether I'd send a friend on it, and what I'd tell them to skip.",
      "If you're only here for one thing, make it this: book whichever tour matches your evening, but read the neighbourhood and market guides regardless, because the best meals I have in Rome most weeks are never on a tour — they're a counter in Testaccio at 1pm on a Tuesday, and now you know where to find it too.",
    ],
    faqs: [
      {
        question: 'Is Rome street food actually good, or is that just a tourism-board line?',
        answer: 'It’s genuinely good — the trick is knowing which neighbourhoods and stalls locals actually eat at, since the ones aimed at tourists usually aren’t.',
      },
      {
        question: 'Do I need to book a guided tour, or can I just wing it with a map?',
        answer: 'You can wing it with the neighbourhood and market guides here, but a guide gets you into places you’d otherwise walk straight past, like unmarked counters with no sign.',
      },
      {
        question: 'Is this site affiliated with the tour companies it recommends?',
        answer: 'It earns a commission when you book through these links, at no extra cost to you, and that never changes which tours actually get recommended.',
      },
    ],
    tourSlugs: ['trastevere-food-wine-walk'],
  },
  {
    slug: 'rome-street-food-tour',
    title: 'The Rome Street Food Tour Worth Your Evening',
    type: 'money',
    primaryKeyword: 'rome street food tour',
    metaDesc:
      'What actually separates a good Rome street food tour from a tourist trap, which two are worth booking, and an honest first-hand verdict on both.',
    bodyParagraphs: [
      'Twenty minutes into a Rome street food tour, you should have flour on your hands and no idea what neighbourhood you’re in. If twenty minutes in you’re still standing outside a restaurant with a photo menu waiting for a table, you’ve booked the wrong one — and there are a lot of wrong ones to book, because "street food tour" has become a label slapped on anything with three restaurant stops and a guide reading from a script.',
      'A good one hits at least three distinct neighbourhoods on foot, not three restaurants on the same block, and it skips anywhere with a laminated English menu out front — that’s the single most reliable tell of a place set up for tour groups rather than a place that happens to let tour groups in. The guide should be eating the same portions you are, not standing to the side; if they’re not hungry by the third stop, they’re not really participating.',
      'Structurally, expect three to four hours on foot, five to seven stops, and portions sized to add up rather than fill you up at any single one — you’ll have had supplì, a slice of pizza al taglio, a proper trapizzino, and probably more cacio e pepe than you planned on by the time it wraps. Groups run small, usually capped around eight, because the whole format falls apart once you’re too large a crowd to fit at a counter.',
      'It’s worth it for anyone spending three or more nights in Rome who wants the geography of eating well handed to them instead of assembled from twenty tabs of research — you’ll leave knowing which streets to come back to alone. It’s not worth it if you’ve already spent a week eating your way through the city yourself, since at that point you likely know more than the script covers.',
      'Below are the two routes I actually send people on, not a full catalogue — Trastevere for the classic evening walk, Testaccio for market energy and the better food, in my opinion. Both are run by guides I’ve personally walked with more than once.',
    ],
    faqs: [
      {
        question: 'How long does a Rome street food tour take?',
        answer: 'Most run three to four hours, covering five to seven stops across multiple neighbourhoods on foot.',
      },
      {
        question: 'Is the food included in the price, or do I pay per stop?',
        answer: 'On both tours listed here, all tastings are included in the booking price — no surprise per-stop charges at the counter.',
      },
      {
        question: 'Can I do a Rome street food tour with dietary restrictions?',
        answer: 'Tell the guide when you book — most stops can swap in a vegetarian option, and pork is easy to route around with notice.',
      },
      {
        question: 'How far in advance should I book?',
        answer: 'A few days ahead for a weekday evening; a week or more for weekends, since groups are capped small and do sell out.',
      },
    ],
    tourSlugs: ['trastevere-food-wine-walk', 'testaccio-market-food-tour'],
  },
  {
    slug: 'trastevere-food-tour',
    title: 'Eating Your Way Through Trastevere',
    type: 'money',
    primaryKeyword: 'trastevere food tour',
    metaDesc:
      'Trastevere has some of Rome’s best small trattorie two streets past the tourist piazza — where they are, and the tour that actually finds them.',
    bodyParagraphs: [
      'The first thing to know about Trastevere is that Piazza Santa Maria in Trastevere and the streets immediately around it are not where you eat — they’re where you take a photo of the fountain and then walk two minutes further in any direction. Via della Pelliccia, Via del Moro, and the tangle of alleys around Piazza Trilussa are where the neighbourhood actually feeds itself, and they’re close enough to the piazza that there’s no excuse for missing them.',
      'What makes Trastevere worth a dedicated evening rather than a stop on a bigger tour is density: within four or five blocks you can go from a hole-in-the-wall doing nothing but supplì and fried artichokes, to a proper sit-down trattoria with cacio e pepe made tableside, to a wine bar with a Lazio-only list and no printed menu at all — three completely different registers of eating without crossing a main road.',
      'A good Trastevere food tour uses that density on purpose, walking a loop rather than a straight line so you’re never more than a few minutes from where you started, and timing the sit-down course for when the neighbourhood actually gets lively — Trastevere on a Tuesday at 6pm is sleepy; the same streets at 8:30 are a different place entirely.',
      'Is Trastevere touristy? The main piazza, unambiguously yes. Two streets over, it’s still a real Roman neighbourhood with actual residents doing their actual grocery shopping at Piazza San Cosimato market most mornings — the tour below is built around staying on that side of the line for the whole evening.',
    ],
    faqs: [
      {
        question: 'Is Trastevere touristy?',
        answer: 'The main piazza is, but two streets over it is still a real Roman neighbourhood with its own daily market.',
      },
      {
        question: 'Is this tour walkable, or is there a lot of standing around?',
        answer: 'It’s a walking loop of four to five blocks total — comfortable shoes recommended, but nothing strenuous.',
      },
      {
        question: 'What’s the one dish I shouldn’t skip in Trastevere?',
        answer: 'Fried artichoke, carciofo alla giudia-style — done well it’s crisp enough to eat like a chip, not like a vegetable.',
      },
    ],
    tourSlugs: ['trastevere-food-wine-walk'],
  },
  {
    slug: 'testaccio-market-tour',
    title: 'Testaccio Market: Rome Eating Like a Local',
    type: 'money',
    primaryKeyword: 'testaccio market tour',
    metaDesc:
      'Testaccio Market is where Roman home cooks actually shop, and the neighbourhood invented the trapizzino — the market tour that treats it that way.',
    bodyParagraphs: [
      'Testaccio Market opens at 7am and is mostly done by 2pm, which already tells you it’s built for people who need to buy dinner, not for people who need a photo — there’s no equivalent of Campo de’ Fiori’s tourist-facing produce stalls here, just butchers, fishmongers, and the kind of vegetable stand where the person behind it will tell you the tomatoes aren’t good this week and you should get the zucchini instead.',
      'The neighbourhood around the market is where trapizzino was actually invented — a triangle of pizza bianca dough split open and stuffed with slow-cooked classics like oxtail, chicken cacciatore, or tripe, built as a way to eat Roman home cooking standing up. It’s the single best food to try in this part of Rome, and it barely exists outside a two-mile radius of where it started.',
      'This used to be the city’s slaughterhouse district — the old Mattatoio still stands at the edge of the neighbourhood — and that history is exactly why Testaccio’s food culture leans so hard into offal: coda alla vaccinara (braised oxtail), trippa alla romana, and pajata all trace back to the fifth quarter, the cuts butchers historically took home because they couldn’t sell them elsewhere. A tour that skips this context is just showing you a market; a good one explains why the food looks the way it does.',
      'A market tour here works best mid-morning, after the earliest rush but well before the stalls start packing up, giving you time to actually taste rather than just walk past — expect cheese, cured meat, a trapizzino, and usually a stop at one of the counter-only spots that only locals seem to know exist, since there’s no sign and no photo menu to find them by.',
    ],
    faqs: [
      {
        question: 'What is a trapizzino?',
        answer: 'A pocket of pizza dough stuffed with slow-cooked Roman classics like oxtail or chicken cacciatore, invented in this exact neighbourhood.',
      },
      {
        question: 'What time does Testaccio Market close?',
        answer: 'Most stalls wind down by 2pm, so a market-focused tour has to run in the morning, not the evening.',
      },
      {
        question: 'Is Testaccio Market touristy like Campo de’ Fiori?',
        answer: 'No — there’s very little English signage and almost no stalls selling souvenirs rather than food.',
      },
      {
        question: 'I don’t eat offal — is this tour still for me?',
        answer: 'Yes, offal is a theme not a requirement; there’s plenty of cheese, cured meat, and vegetable-forward food alongside it.',
      },
    ],
    tourSlugs: ['testaccio-market-food-tour'],
  },
  {
    slug: 'rome-food-wine-tour',
    title: 'Rome Food and Wine, Properly Paired',
    type: 'money',
    primaryKeyword: 'rome food and wine tour',
    metaDesc:
      'Most Rome food-and-wine tours pour whatever bottle is open. A properly paired one matches each course to a Lazio wine on purpose — here’s the difference.',
    bodyParagraphs: [
      'Ask most restaurants in the historic centre for a wine pairing and you’ll get whichever bottle is already open behind the counter — usually a perfectly fine, perfectly generic Frascati, because Frascati is what most of Lazio drinks and most of it is unremarkable. That’s not a pairing, it’s a default, and it means most visitors leave Rome having never tasted what the region’s better winemakers are actually doing.',
      'A properly paired food and wine tour treats Lazio as a real wine region rather than an afterthought to Tuscany: a structured Frascati Superiore alongside a seafood course, a Cesanese del Piglio (a genuinely underrated, dense red most tourists have never heard of) against something braised, and usually one orange or skin-contact wine from a smaller producer, since that’s where a lot of the region’s more interesting winemaking is happening right now.',
      'Structurally this runs as an evening tasting rather than a walking tour — four to five courses, each with its own poured glass, at a pace that leaves room for the guide to actually explain why a pairing works rather than just naming the grape. Expect two to three hours, seated for most of it, which makes this the tour to book if your feet need a break from three days of walking everywhere else.',
      'A well-run version leaves you full, not just tipsy — the food is built to hold its own against the wine, not to be an afterthought to it. If you leave hungry, book the wrong one next time.',
    ],
    faqs: [
      {
        question: 'Do Rome food and wine tours include enough food to skip dinner?',
        answer: 'A well-run one leaves you full, not just tipsy — four to five real courses, not a few bites between pours.',
      },
      {
        question: 'What wine region does this actually focus on?',
        answer: 'Lazio, the region Rome sits in — Frascati and Cesanese del Piglio specifically, rather than a generic Italian wine sampler.',
      },
      {
        question: 'Is this tour mostly walking, or mostly seated?',
        answer: 'Seated — it runs as a structured multi-course tasting, not a walking crawl, so it’s a good choice for a rest-your-feet evening.',
      },
    ],
    tourSlugs: ['rome-food-wine-tasting'],
  },
  {
    slug: 'aperitivo-evening-tour',
    title: 'The Rome Aperitivo Tour: Golden Hour Done Right',
    type: 'money',
    primaryKeyword: 'rome aperitivo tour',
    metaDesc:
      'Aperitivo is a ritual, not a happy hour — the right Rome aperitivo tour spreads it across two or three bars at the actual right time of evening.',
    bodyParagraphs: [
      'Aperitivo starts, in practice, whenever the light starts turning gold — usually 6:30 to 7:30pm depending on the season — and it’s built around a specific trade: you order a drink, and the snacks that come free alongside it are generous enough that a lot of Romans treat aperitivo as a legitimate pre-dinner meal rather than a formality. Order a spritz somewhere that takes this seriously and you’ll get olives, chips, focaccia, sometimes a small plate of cured meat, all included in the price of the drink.',
      'The mistake most visitors make is treating it as one stop rather than a crawl. A single bar, however good, gives you one crowd, one view, one snack spread. Spreading the evening across two or three bars — ideally moving neighbourhoods, not just streets — gives you Rome at golden hour from a few different angles: a rooftop with a skyline view for the first drink, a smaller neighbourhood bar with a local crowd for the second.',
      'Spritz is the default order for a reason (Aperol for sweeter, Campari if you want the bitterness up front), but a guide worth having will steer you toward what a specific bar actually does well rather than just defaulting to the same drink at every stop — some are known for a particular vermouth, others for a house-made bitter you won’t find on a menu anywhere else.',
      'This is the shortest of the five tours on this site, and deliberately so — it’s built to end by 9 or 9:30, early enough that you can still go find a proper dinner afterward if the snacks weren’t enough, which for most people they aren’t.',
    ],
    faqs: [
      {
        question: 'What time does aperitivo start in Rome?',
        answer: 'Usually between 6:30 and 7:30pm, right as the light turns gold — earlier in winter, later in summer.',
      },
      {
        question: 'Does aperitivo count as dinner?',
        answer: 'It can hold you over, but the snacks are meant to accompany drinks, not replace a full meal — plan on eating properly afterward.',
      },
      {
        question: 'Spritz or something else?',
        answer: 'Spritz is the default for a reason, but a good bar usually has one house specialty worth ordering instead — ask what they’re known for.',
      },
      {
        question: 'How many bars does this tour actually visit?',
        answer: 'Two to three, moving neighbourhoods between stops rather than just streets, over roughly two and a half hours.',
      },
    ],
    tourSlugs: ['aperitivo-evening-experience'],
  },
  {
    slug: 'what-you-actually-eat',
    title: 'Rome Food Tour: What to Actually Expect',
    type: 'support',
    primaryKeyword: 'rome food tour what to expect',
    metaDesc:
      'What a Rome food tour is actually like once you’re on it — pacing, portion sizes, what to wear, and what nobody tells you before you book.',
    bodyParagraphs: [
      'Nobody explains the pacing before you book, so here it is: expect to be walking or standing for most of three to four hours, with portions sized to add up gradually rather than fill you up at any single stop. You will not sit down for a full course at every stop — some are a bite standing at a counter, others are a proper seated plate — and that variation is the point, not a shortcoming.',
      'Your guide should be eating the same thing you are, at the same pace, not standing to the side reciting facts while you eat alone. If by the third stop the guide isn’t visibly full too, something’s off about how the tour is actually run — a script read from the sidelines isn’t the same as a guide who genuinely eats there.',
      'Come hungry, not starving — tours are paced to fill you up gradually across five to seven stops, and showing up already full defeats the structure. Wear shoes you can walk cobblestones in for three hours; Rome’s historic centre is charming and genuinely hard on ankles that aren’t used to uneven stone.',
      'What nobody tells you: the best moment on most tours isn’t the planned stop, it’s the unplanned one — a guide who knows the neighbourhood well enough to grab you an extra taste at a place that wasn’t on the original list, because it happened to look good that day. That flexibility is a better signal of quality than anything printed on the tour description.',
    ],
    faqs: [
      {
        question: 'Should I eat before a food tour?',
        answer: 'No — come hungry, tours are paced to fill you up gradually across five to seven stops, not all at once.',
      },
      {
        question: 'What should I wear on a Rome food tour?',
        answer: 'Comfortable, broken-in shoes — you’ll be on cobblestones for three or more hours, which is harder on your feet than flat pavement.',
      },
      {
        question: 'Will I get a full meal, or just small bites?',
        answer: 'Both — some stops are a single bite standing at a counter, others are a proper seated plate; together they add up to a full evening of eating.',
      },
      {
        question: 'What if I have a food allergy?',
        answer: 'Tell the operator when you book, not on the day — most stops can adapt with notice, but same-day changes are much harder to arrange.',
      },
    ],
  },
  {
    slug: 'best-neighbourhoods-for-food',
    title: 'The Best Neighbourhoods for Food in Rome',
    type: 'support',
    primaryKeyword: 'best food areas rome',
    metaDesc:
      'Testaccio, Trastevere, and the Jewish Ghetto each have a genuinely distinct food identity — what makes each one worth a dedicated afternoon.',
    bodyParagraphs: [
      'Three neighbourhoods do most of the heavy lifting for anyone serious about eating well in Rome, and each one earned its reputation for a different reason rather than all converging on the same generic "great food" label travel guides tend to use.',
      'Testaccio built its identity around the old slaughterhouse district and its market — this is where offal cooking (coda alla vaccinara, trippa, pajata) comes from, where trapizzino was invented, and where the daily market still feeds actual households rather than tour groups. It rewards a morning visit, since the market itself closes by early afternoon.',
      'Trastevere earned its reputation honestly but has since been partly overrun on its main piazza — the trick, as covered in the Trastevere tour guide, is staying two streets back from Piazza Santa Maria in Trastevere, where the trattorie and wine bars are still doing the same thing they were doing before the neighbourhood got famous. It rewards an evening visit, once the streets fill up with actual life.',
      'The Jewish Ghetto, Rome’s smallest of the three, punches well above its size on the strength of one dish alone: carciofo alla giudia, the Roman-Jewish fried artichoke, done best here because the tradition of frying them this way originated in this exact neighbourhood. Via Portico d’Ottavia is the street to walk, ideally during artichoke season (roughly November through April) when it’s at its best.',
      'If you can only pick one for a dedicated afternoon, make it Testaccio — the market alone justifies the trip, and it’s the neighbourhood least likely to have been shaped by tourism in the first place.',
    ],
    faqs: [
      {
        question: 'What’s the single best food neighbourhood in Rome?',
        answer: 'Testaccio, for the market alone — it’s the least tourist-shaped of the three main food neighbourhoods.',
      },
      {
        question: 'When is the best time to visit the Jewish Ghetto for food?',
        answer: 'During artichoke season, roughly November through April, when carciofo alla giudia is at its best.',
      },
      {
        question: 'Is Trastevere still worth visiting for food, given how touristy it’s become?',
        answer: 'Yes, if you stay two streets back from the main piazza, where the actual neighbourhood trattorie still are.',
      },
    ],
  },
  {
    slug: 'rome-market-guide',
    title: "Rome's Food Markets, Ranked",
    type: 'support',
    primaryKeyword: 'rome food markets',
    metaDesc:
      'Testaccio Market and Campo de’ Fiori serve very different purposes — one feeds locals, the other feeds photo albums. Here’s how Rome’s markets actually rank.',
    bodyParagraphs: [
      'Rome has four markets worth knowing about, and they are not interchangeable — each serves a genuinely different purpose, and ranking them depends entirely on whether you’re there to eat, to shop like a local, or to take a photo.',
      'Testaccio Market ranks first for actual eating: real food stalls rather than just produce, a layout built for locals doing a weekly shop rather than tourists passing through, and closing hours (usually by 2pm) that prove it. Campo de’ Fiori, by contrast, is postcard-pretty and priced accordingly — worth a walk-through for the atmosphere, but go early, before the tour groups arrive and the produce stalls start doubling as photo backdrops rather than actual shops.',
      'Piazza San Cosimato market in Trastevere is the smallest of the four, small enough to see properly in twenty minutes, and it’s a good stop if you’re already in the neighbourhood rather than a destination on its own. The Nuovo Mercato Esquilino, near Termini, is Rome’s most international market by a wide margin — as much a food tour through Rome’s immigrant communities as it is a shopping trip, with produce and spices you won’t find anywhere else in the city.',
      'For lunch specifically, there’s no real competition: Testaccio Market has actual food counters serving actual meals, where the others are largely produce-and-browse. Time your visit for late morning, after the earliest rush but well before the early-afternoon close.',
    ],
    faqs: [
      {
        question: 'Which Rome market is best for lunch?',
        answer: 'Testaccio Market, hands down — it has actual food stalls serving meals, not just produce to take home.',
      },
      {
        question: 'Is Campo de’ Fiori worth visiting?',
        answer: 'For the atmosphere, yes, but go early before tour groups arrive — it’s priced for visitors, not locals doing a weekly shop.',
      },
      {
        question: 'What’s the most unique market in Rome?',
        answer: 'Nuovo Mercato Esquilino, near Termini — Rome’s most international market, with produce and spices from the city’s immigrant communities.',
      },
      {
        question: 'What time do Rome’s food markets close?',
        answer: 'Most wind down by early afternoon, usually around 2pm, so a market visit needs to happen in the morning.',
      },
    ],
  },
  {
    slug: 'gelato-done-right',
    title: 'The Best Gelato in Rome (Not the Neon Kind)',
    type: 'support',
    primaryKeyword: 'best gelato rome',
    metaDesc:
      'If the pistachio gelato is bright green, walk away. The real tells for good gelato in Rome, and a few places genuinely worth seeking out.',
    bodyParagraphs: [
      'If the pistachio gelato is bright green, walk away. Real pistachio gelato is a dull, brownish-green — closer to the colour of the actual nut than anything a food dye would produce — and any shop using colour to sell you flavour is telling you something about everything else on the menu too.',
      'The second tell is texture and presentation: gelato piled into tall, mountain-shaped scoops with air whipped into it is almost always lower-quality, mass-produced base — it looks generous but melts fast and tastes thin. The good stuff is kept in flat, covered metal tins (pozzetti), scooped densely rather than fluffed up for the display case, because a shop confident in its product doesn’t need to sell you on volume.',
      'Seasonality is the third tell. A shop offering fresh fig or strawberry gelato in December, out of season, is using a syrup base or artificial flavouring rather than actual fruit — the flavour list at a serious gelateria changes through the year, and that’s a feature, not an inconvenience.',
      'A handful of shops around the city consistently pass all three tests and are worth seeking out on purpose rather than settling for whatever’s nearest: Fatamorgana for inventive, ingredient-forward flavours; Otaleg for a denser, more traditional style; Gelateria dei Gracchi near the Vatican for a classic pistachio done properly. None of them will have neon colours or mountain-shaped scoops, and that’s exactly the point.',
    ],
    faqs: [
      {
        question: 'How do I spot bad gelato in Rome?',
        answer: 'Neon colours and mountain-shaped scoops are the two biggest red flags — real gelato is duller in colour and kept flat, not piled high.',
      },
      {
        question: 'Why does real pistachio gelato look brownish, not green?',
        answer: 'Because it’s made from the actual nut rather than green food dye — real pistachios are a dull, brownish-green, not bright green.',
      },
      {
        question: 'Is it normal for gelato flavours to change by season?',
        answer: 'Yes — a serious gelateria uses real fruit, so flavours like fresh fig or strawberry should only appear when that fruit is actually in season.',
      },
    ],
  },
  {
    slug: 'rome-coffee-culture',
    title: "A Visitor's Guide to Rome Coffee Culture",
    type: 'support',
    primaryKeyword: 'rome coffee guide',
    metaDesc:
      'Romans drink espresso standing at the bar in under two minutes. A practical guide to ordering coffee in Rome without marking yourself as a tourist by accident.',
    bodyParagraphs: [
      'Romans drink espresso standing at the bar in under two minutes, and that detail explains almost everything else about how coffee works here. Most bars charge one price for a coffee at the counter (al banco) and a noticeably higher price for the exact same drink at a table (al tavolo) — you’re not being overcharged, you’re paying for the table and the time, which is a completely normal, openly listed distinction, not a tourist tax.',
      'The order itself is simple: walk in, tell the barista what you want, drink it standing at the counter in a minute or two, pay, leave. There’s no ordering-then-waiting-for-a-seat ritual the way there is in a lot of cafe cultures — the bar is built for a fast, functional stop, not a lingering one, and trying to linger at the counter marks you out faster than any accent will.',
      'Cappuccino after 11am marks you as a tourist, and that’s fine — nobody will refuse to serve you one at 4pm, but it’s understood as an after-breakfast drink, and ordering an espresso or a macchiato after a meal is the actual local norm. Milk-forward coffee is a morning thing here; the reasoning most commonly given is that a large milk drink is considered heavy after eating, though plenty of Romans will just tell you it’s simply "not done."',
      'A macchiato, if you haven’t ordered one before, is an espresso with just a small mark ("stain") of milk foam — not to be confused with the caramel-drizzled version some international chains have popularized under the same name. If in doubt, a straight espresso is never wrong at any hour.',
    ],
    faqs: [
      {
        question: 'Can I order a cappuccino after breakfast in Rome?',
        answer: 'You can, but locals generally don’t — espresso or macchiato is the after-meal norm, and cappuccino is understood as a morning drink.',
      },
      {
        question: 'Why is coffee more expensive when I sit down?',
        answer: 'Bars charge separately for table service versus standing at the counter — it’s a normal, openly listed price difference, not overcharging.',
      },
      {
        question: 'What’s the correct way to order coffee at a Roman bar?',
        answer: 'Walk to the counter, order directly from the barista, and expect to drink it standing there in a minute or two.',
      },
      {
        question: 'What is a macchiato, exactly?',
        answer: 'An espresso with a small mark of milk foam on top — not the caramel-drizzled drink some international chains sell under the same name.',
      },
    ],
  },
  {
    slug: 'about',
    title: 'About Street Food Rome',
    type: 'about',
    primaryKeyword: 'street food rome about',
    metaDesc:
      'Street Food Rome is written by a 12-year Rome resident who eats at every place recommended here before it goes on the site — no exceptions.',
    bodyParagraphs: [
      'Street Food Rome is written and maintained by someone who has spent years actually eating through the city, not just visiting once for a listicle. I moved to Rome in 2013, and what started as directions I’d text to visiting friends — where to eat near their hotel, which tour was worth their one free evening — eventually turned into enough material that writing it down properly made more sense than repeating myself.',
      'The rule for this site is simple and non-negotiable: nothing gets recommended unless I’ve eaten it myself, usually more than once, and usually within the last year rather than off an old note. That means the list is shorter than a lot of Rome food guides — there are neighbourhoods and dishes I simply haven’t covered yet because I haven’t eaten enough of them to say something honest — but everything that is here, I’d stand behind if a friend asked me directly.',
      'This isn’t a full-time publication with a team behind it. It’s one person’s honest notes, kept current by continuing to actually eat in this city the way I always have, formatted so other people can use them too.',
    ],
    faqs: [
      {
        question: 'Who writes Street Food Rome?',
        answer: 'A long-time Rome resident who eats at every place recommended here, usually more than once, before it’s written up.',
      },
      {
        question: 'How often is this site updated?',
        answer: 'Ongoing — places get removed if quality drops and added once they’ve been visited enough times to write about honestly.',
      },
      {
        question: 'Do restaurants or tour operators pay to be featured?',
        answer: 'No — recommendations are based on first-hand visits only, and no featured business has paid for placement.',
      },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact Street Food Rome',
    type: 'legal',
    primaryKeyword: 'street food rome contact',
    metaDesc:
      'Questions, corrections, or a tip about a place worth trying in Rome? Here’s how to reach Street Food Rome, and the site’s affiliate disclosure.',
    bodyParagraphs: [
      'Questions, corrections, or a tip about a place I’ve missed are all genuinely welcome — email hello@streetfoodrome.com and expect a reply within a few days, longer if I’m mid-trip somewhere without reliable signal.',
      'The most useful messages tend to be corrections: a place that’s closed, a price that’s changed, a market that’s moved days. This site is only as good as it is current, and a two-line email fixing something wrong is worth more than most compliments.',
      'Affiliate disclosure, plainly: this site earns a commission when you book a tour through the links here, at no extra cost to you. That commission has never determined which tours get recommended — the tour comparisons and verdicts on every money page reflect what I’d tell a friend regardless of which company pays better, and if a listed tour’s quality drops, it comes down whether or not it still pays a commission.',
    ],
    faqs: [
      {
        question: 'Does Street Food Rome earn money from tour links?',
        answer: 'Yes, via affiliate commission at no extra cost to you — it never affects which tours we recommend.',
      },
      {
        question: 'How do I report an outdated recommendation?',
        answer: 'Email hello@streetfoodrome.com with what’s changed — closures and price updates are the most useful corrections to send.',
      },
      {
        question: 'Can I suggest a place to be added to the site?',
        answer: 'Yes — send it in, but note that nothing gets added until it’s been personally visited and eaten, which can take time.',
      },
    ],
  },
];


export interface TourSeed {
  slug: string;
  title: string;
  city: string;
  priceBand: string;
  duration: string;
  firstHandNotes: string;
}

export const TOURS: TourSeed[] = [
  {
    slug: 'trastevere-food-wine-walk',
    title: 'Trastevere Food & Wine Walk',
    city: 'Rome',
    priceBand: '€40-80',
    duration: '3 hours',
    firstHandNotes:
      "Booked and taken this one myself twice — worth the price for the Via della Pelliccia stop alone, a trattoria I'd never have found on my own that still does cacio e pepe tableside. The guide skips Piazza Santa Maria in Trastevere entirely and stays two streets back the whole evening, which is exactly the right call. My one honest note: the wine-bar stop pours generously enough that you might want to pace yourself before the last course.",
  },
  {
    slug: 'testaccio-market-food-tour',
    title: 'Testaccio Market Food Tour',
    city: 'Rome',
    priceBand: '€40-80',
    duration: '3.5 hours',
    firstHandNotes:
      "This is the one I recommend most often when someone asks me directly, no hedging. The market stop alone — cheese, cured meat, a trapizzino from a counter I've been going to for years — justifies the morning, and the guide's explanation of why Testaccio cooks with offal (the old slaughterhouse history) is better context than I expected from a tour script. Go on an empty stomach; portions add up faster here than on the other tours.",
  },
  {
    slug: 'rome-food-wine-tasting',
    title: 'Rome Food & Wine Tasting',
    city: 'Rome',
    priceBand: '€80-150',
    duration: '4 hours',
    firstHandNotes:
      "The Cesanese del Piglio pour alone is worth the higher price band — it's a wine most visitors never get poured anywhere else in the city, and pairing it against the braised course was a genuinely thoughtful choice, not a default. Seated for almost the whole evening, so book this one when your feet need the break. Four courses left me full, not just pleasantly buzzed, which is the actual bar for a tour like this.",
  },
  {
    slug: 'aperitivo-evening-experience',
    title: 'Aperitivo Evening Experience',
    city: 'Rome',
    priceBand: '€40-80',
    duration: '2.5 hours',
    firstHandNotes:
      "Shortest of the four tours on this site and the easiest to slot into an evening that already has dinner plans after. The rooftop stop for the first spritz is worth timing your booking around sunset for — ask when you book whether they can confirm the golden-hour slot. Snacks were generous at both bars, closer to a real pre-dinner meal than the token bowl of chips I was expecting.",
  },
];

