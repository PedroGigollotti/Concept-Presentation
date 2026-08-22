# C1 corrections

The running register for the C1 interactive companion, opened 2026-08-20 during the
pedagogical review. It is the diff between the print edition and these pages.

`CORRECTIONS_C1_KEYS.md` is a separate thing: the write-up of one incident, the
sequential match keys. It is not a running register and nothing is added to it.

## How to read this

Every row is one approved textual change with a specific old value and a specific
new one, and `check_corrections_drift()` in `verify.py` checks the "Approved
correction" column against the file named in "Location" on every run. A row that
stops matching the page turns red. That is the point of the row.

**A standing rule is not a row.** "No matching key may sit in its own position" is
true of every future unit as much as this one and belongs in a check function. Only
put a row here when there is a literal string to compare.

## Changes applied across the book, which are not rows

These are patterns, not single strings, so they live in checks and in prose here.

- **Matching dropdown labels relabelled a-f in display order**, scramble moved into
  the key. 44 exercises across the three books. Enforced permanently by
  `check_matching_labels()` and `_deducibility()`.
- **A per-item feedback hook (`item.why`)** added to `checkForm()` and
  `checkRewrite()` in the shared engine, in all 57 files that carry it, so a key
  accepting two forms can name the difference. Inert wherever no item uses it.
  Engine uniformity is checked by `check_book_uniformity()`.

## Rows

| Location | As published | Approved correction |
|---|---|---|
| c1-unit1.html, Access dialogue, Sofia's closing line | the deposition is back on the calendar. | the deposition is on the calendar. |
| c1-unit1.html, The moves, fourth line | [closed / settled]</span> the case. | [closed three cases / settled two matters] |
| c1-unit1.html, Watch out, first paragraph | Write “I called them yesterday,” | Say “I called them yesterday,” |
| c1-unit1.html, Exercise H instruction | Complete each sentence with an expression from G. | Complete each sentence with an expression from G. Use each expression once. |
| c1-unit1.html, Exercise H word bank | "in the loop","a heads-up","circle back" | "in the loop","heads-up","circle back" |
| c1-unit1.html, Exercise A item 2, key | "a": ["have worked", "'ve worked", "i have worked"] | "have been working", "'ve been working" |
| c1-unit1.html, Exercise A item 2, feedback | (no feedback note) | Have been working is equally correct. |
| c1-unit1.html, Exercise B item 5, key | keys:["worked together for"] | been working together for |
| c1-unit1.html, Exercise D instruction | Join each opener to the ending whose time marker fits its tense. | Join each opener to the ending that completes it. The tense narrows the field, and the detail decides which one is left. |
| c1-unit1.html, Exercise D endings, rebuilt with locks | t:"since January." | ever since it was four people in a corner. |
| c1-unit2.html, Exercise A instruction | Put each verb into the present perfect continuous or the present perfect simple. | Some items take either, and the feedback names the difference. |
| c1-unit2.html, Exercise A item 1, key | "a": ["have been seeing"] | "have been seeing", "have seen" |
| c1-unit2.html, Exercise A item 3, key | "a": ["have been working"] | "have been working", "have worked" |
| c1-unit2.html, Exercise A item 5, brief added | I ______ (try) to reach the vendor all morning. | [frame it as still going] |
| c1-unit2.html, Exercise B item 4, model answer | They've hit the target every month, so it's confirmed. | They've reached the target every month, so it's confirmed. |
| c1-unit2.html, Exercise C item 2, prompt | We fixed the onboarding process. | We are fixing the onboarding process. |
| c1-unit2.html, Exercise C item 4, prompt | We reduced churn by three points. | We are reducing churn. |
| c1-unit2.html, Exercise E item 4, rebalanced to 2:2 | You want to signal calm, steady progress without a dramatic number. | The audit is closed and you are stating what it found, nothing more. |
| c1-unit2.html, Exercise H item 1 | It's ______, but the early signals are promising. | It's only ______, but the early signals are promising. |
| c1-unit2.html, Exercise H item 2 | After a slow start, the campaign is finally ______. | with the under-30s |
| c1-unit2.html, Exercise H item 6 | I think we've finally ______ on this project. | The worst is behind us. |
| c1-unit2.html, Watch out, first heading | Don't put a number on the continuous. | Don't put a closed count on the continuous. |
| c1-unit2.html, Exercise D endings, rebuilt with locks | "t": "as of this morning." | twice now, once in beta and once for real. |
| c1-unit3.html, Access dialogue, Jordan | Had quality signed off before that? | the quality team <b>signed off</b> |
| c1-unit3.html, Access dialogue, Ana | The line stopped at 2 a.m. | The production line <b>stopped</b> |
| c1-unit3.html, The moves, first line | before quality weighed in. | before the quality team weighed in. |
| c1-unit3.html, The moves, second line | [the line / the batch] | [the production line / the batch] |
| c1-unit3.html, The moves, fourth line | [recalibrated it / reset the line] | [recalibrated it / reset the production line] |
| c1-unit3.html, Exercise A item 2 | (shut down) the line after | (shut down) the production line after |
| c1-unit3.html, Exercise A item 5 | Once quality ______ (sign off) | Once the quality team ______ (sign off) |
| c1-unit3.html, Exercise B item 1 | quality had finished the inspection. | the quality team had finished the inspection. |
| c1-unit3.html, Exercise B item 2 | We shut down the line after the readings had spiked. | We shut down the production line after the readings had spiked. |
| c1-unit3.html, Exercise C item 1 | before quality had reviewed it. | before the quality team had reviewed it. |
| c1-unit3.html, Exercise D, first opener | They'd tested the line twice | They'd tested the production line twice |
| c1-unit3.html, Exercise G word bank | "a near miss", "a blind spot" | "near miss", "blind spot" |
| c1-unit4.html, Exercise D instruction | Join each opener to the ending that matches its future form. | Join each opener to the ending that completes it. The future form narrows the field, and the detail decides which one is left. |
| c1-unit4.html, Exercise D ending c, locked to the future perfect | "t": "v2 by the end of Q3." | every open ticket by the end of Q3. |
| c1-unit5.html, Exercise D instruction | Join each opener to the ending that fits its timing. | Join each opener to the ending that completes it. The timing narrows the field, and the detail decides which one is left. |
| c1-unit5.html, Exercise D endings b and c, locked | "t": "present the final numbers." | present the final numbers herself. |
| c1-unit5.html, Watch out, due to paragraph | Write “The report is due to land Friday.” | Say “The report is due to land Friday.” |
| c1-unit12.html, Watch out, would in the if-clause | Write “if we had locked,” | Say “if we had locked,” |
| c1-unit4.html, Exercise H instruction | Complete each sentence with an expression from G. Change the form where the sentence needs it. | Use each expression once. |
| c1-unit4.html, Exercise H word bank | "a moving target", "in the pipeline" | "moving target", "in the pipeline" |
| c1-unit4.html, Exercise H word bank | "a hard deadline" | "hard deadline" |
| c1-unit4.html, Exercise A item 1, key | "a": ["will have finished"] | "will have finished", "will finish" |
| c1-unit4.html, Exercise A item 6, key | "a": ["will have onboarded"] | "will have onboarded", "will onboard" |
| c1-unit5.html, Exercise H instruction | Complete each sentence with an expression from G. | Complete each sentence with an expression from G. Use each expression once. |
| c1-unit6.html, Exercise G instruction | Complete each sentence with an expression from F. Change the form where the sentence needs it. | Use each expression once. |
| c1-unit6.html, Exercise G word bank | "a growing pain" | "growing pain" |
| c1-unit6.html, Exercise A item 1, key | "a": ["used to ship"] | "used to ship", "would ship" |
| c1-unit7.html, Exercise G instruction | Complete each sentence with an expression from F. | Complete each sentence with an expression from F. Use each expression once. |
| c1-unit7.html, Exercise G word bank | "a key account", "a repeat client", "the point of contact" | "key account", "repeat client", "point of contact" |
| c1-unit7.html, Exercise G word bank | "a long-standing relationship", "a red flag" | "long-standing relationship", "red flag" |
| c1-unit7.html, Exercise A item 1, key | "a": ["who"] | "who", "that" |
| c1-unit8.html, Exercise G instruction | Complete each sentence with an expression from F. | Complete each sentence with an expression from F. Use each expression once. |
| c1-unit8.html, Exercise A item 1, key | "a": ["Reviewing the numbers"] | "Reviewing the numbers", "Having reviewed the numbers" |
| c1-unit9.html, Exercise H instruction | Complete each sentence with an expression from G. | Complete each sentence with an expression from G. Use each expression once. |
| c1-unit9.html, Exercise H word bank | "a game changer", ... "a marginal gain", ... "a wide margin" | "game changer", "head and shoulders above", "marginal gain" |
| c1-unit10.html, Exercise H instruction | Complete each sentence with an expression from G. | Complete each sentence with an expression from G. Use each expression once. |
| c1-unit10.html, Exercise H word bank | "a sticking point", ... "a non-starter", ... "a fair ask" | "give ground", "sticking point", "non-starter" |
| c1-unit10.html, Exercise A item 3, key | "a": ["While", "Although"] | "While", "Although", "Even though" |
| c1-unit10.html, Exercise A item 6, key | "a": ["Even though", "Although"] | "Even though", "Although", "While" |
| c1-unit32.html, Exercise A item 6, the other side of the flesh out / work out contrast | Can you ______ (flesh) that idea a bit more? | We still need to ______ (work) how to fund the second phase. |
| c1-unit20.html, Watch out, level scope | Only true negative or restrictive fronting triggers inversion. | At this level, only negative or restrictive fronting triggers inversion. |
| c1-unit5.html, Watch out, level scope | It means the very next moment. | At this level, use it for the very next moment. |
| c1-unit11.html, Watch out, level scope | Match so with an adjective, such with a noun. | At this level, match <em>so</em> with an adjective and <em>such</em> with a noun. |
| c1-unit28.html, Exercise B item 5, redundant reject removed | reject: was approve | was approved this morning |
| c1-unit33.html, Exercise E item 1, redundant reject removed | reject: few clients renewed, | A few clients renewed, which is a great result. |
| c1-unit14.html, Exercise A items 1, 3, 6, comma splices in prompts | already, it's marked read | already. It's marked read. |
| c1-unit17.html, Exercise A item 3, comma splice with however | It's a fair point, ______, the numbers | It's a fair point. ______, the numbers |
| c1-unit18.html, Exercise A rebuilt: the slot decides, not the parenthesis | This is ______ (absolutely) the right approach. | There's ______ that this trend is real. |
| c1-unit33.html, Exercise A rebuilt: the second half calls the quantifier | ______ (few) of them are high-value clients. | which is the disappointing part |
| c1-unit15.html, Exercise A item 2, data takes a singular or plural verb | "a": ["suggests"] | "suggests", "suggest" |
| c1-unit12.html, Exercise A items 2 and 6, were and was both accepted | [["were"] | "were", "was" |
| c1-unit2.html, Watch out, stative verbs, moved out of the variety box and rewritten | Casual American marketing register sometimes stretches stative verbs | Putting a state in the continuous forces a process onto it |
| c1-unit35.html, Exercise A item 4, inverted collocation replaced | (heavy/strong) demand this quarter | (hard/difficult) evidence, not opinion |
| c1-unit35.html, Exercise A item 6, margin too small | (give/do) a presentation tomorrow | (take/get) responsibility for the miss |
| c1-unit35.html, Exercise A item 5, variety not error | "a": ["take"] | "take", "have" |
| c1-unit21.html, Exercise A rebuilt: the gap is the focused element | It ______ (be) the pricing change that drove the increase. | It was ______ that drove the increase. |
| c1-unit22.html, Exercise A rebuilt: the sentence carries the minimizer | ______ we're asking is a short extension. | a two-day extension, nothing more. |
| c1-unit26.html, Exercise A rebuilt: the bracket gives the tone, never the verb | (acknowledge) the delay | [she named it and gave nothing away] |
| c1-unit17.html, Exercise D opener, comma splice with however | It's a fair point, however, | It's a fair point. However, |
| c1-unit33.html, Exercise A rebuilt: the second half calls the quantifier | ______ (few) of them are high-value clients. | which is the disappointing part |
| c1-unit18.html, Exercise A rebuilt: the slot decides, not the parenthesis | This is ______ (absolutely) the right approach. | There's ______ that this trend is real. |
| c1-unit3.html, Exercise A, the past perfect is optional where a conjunction marks the order | "a": [["shut down"], ["had spiked"]] | "had spiked", "spiked" |
| c1-unit3.html, Exercise A item 4, rebuilt so the past perfect is required | because the spec ______ (change) twice. | The team missed the deadline. The spec ______ (change) twice that month. |
| c1-unit35.html, Exercise A item 4, inverted collocation replaced | (heavy/strong) demand | (hard/difficult) evidence |
