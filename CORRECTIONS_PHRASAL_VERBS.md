# CORRECTIONS: Professional English Practice, Book 3, Phrasal Verbs

Approved corrections applied to the 32 published unit pages, `unit1.html`
through `unit32.html`, in this repository.

---

## THESE 32 PAGES HAVE NO GENERATOR

There is no build script, no unit sources, and no engine file for this book
anywhere. The pages in this repository are the only artifact and the only
record.

The Node and `docx` pipeline in `Concept_Series_Workspace` builds the **print**
book, not these pages, and it covers only units 5 through 8. `pv_engine_base.js`
is a docx front-matter builder; none of its functions appear in these pages.

**If a generator is ever written for this book, it must carry every correction
below forward. Otherwise the first rebuild silently reverts them.**

That is not a hypothetical. On 2026-08-17 the C1 book was found in exactly that
state: 40 match keys and 4 figure corrections existed only in the published
pages, and rebuilding from source would have erased all of them. C1 had a
generator and still nearly lost the work. This book has none, so this file is
the whole defense.

---

## Applied 2026-08-17

### 1. Em dash in the exercise E answer keys

96 instances, exactly 3 on every one of the 32 pages, all in the same place:
the `<div class="key-box" id="keyE">` panel, separating a phrasal verb from its
gloss.

**This is a pattern, not a table row.** Each unit teaches different phrasal
verbs, so no single before/after string is literally present in all 32 files
-- a table row here would be checked (by `check_corrections_drift()`, which
applies every row in this file against the full 32-unit glob, with no way to
scope a single row to one file) against 31 files it was never true of. The
general rule it enforces -- no em dash, anywhere in body copy -- is already
permanent and file-independent: `check_language()` in verify.py flags any em
dash on any page, key-box entries included, forever. That check is the actual
guard here, so this entry is deliberately kept out of table format.

One instance, from unit 1, as a record of what the fix looked like:

    as published:         <b>hash out</b> — to work through a problem…
    approved correction:  <b>hash out</b>: to work through a problem…

The em dash breaks the house rule, which admits none. A colon reads naturally
between a term and its gloss and changes no word the learner reads.

This was a template separator, not prose. No source text was touched. Verified:
em dash count 96 to 0, word count unchanged on every page, and the only token
difference anywhere is the em dash becoming a colon in place.

Phrasal Verbs was the only book with the defect. C1, C2, and Calibrated Speech
each carry zero em dashes. The house rule held everywhere the shared engine was
used and broke in the one book with its own builder.

### 2. The shared series unlock key

The gate tells every learner that "one code unlocks every book in the series."
These pages did not participate in the mechanism that makes that true. They read
and wrote only `cm_pv_access`, the legacy key, and never touched `cm_access`,
the shared one.

| Location | As published | Approved correction |
|---|---|---|
| `tryCode`, all 32 | `setItem('cm_pv_access','1')` | `setItem('cm_access','1'); setItem('cm_pv_access','1')` |
| auto-unlock, all 32 | `getItem('cm_pv_access') === '1'` | `getItem('cm_access') === '1' \|\| getItem('cm_pv_access') === '1'` |
| privacy write, all 32 | `setItem('cm_pv_privacy_seen','1')` | `setItem('cm_privacy_seen','1'); setItem('cm_pv_privacy_seen','1')` |
| privacy read, all 32 | `getItem('cm_pv_privacy_seen') !== '1'` | `getItem('cm_privacy_seen') !== '1' && getItem('cm_pv_privacy_seen') !== '1'` |

Now identical to C1, C2, and Calibrated Speech: read either key, write both.

**No learner was locked out before this fix.** It worked in both directions only
because the other three books read the legacy key and write it. Phrasal Verbs was
riding on back-compatibility it did not provide. The exposure was one deletion
away: the comment in the other books calls `cm_pv_access` "the legacy
phrasal-verbs key," and the day anyone removes it, this book would have been
islanded in both directions at once.

### 3. A stale pre-launch note above the access codes

| Location | As published | Approved correction |
|---|---|---|
| script header, all 32 | `/* ===== ACCESS CODES (pilot: replace with the real 50 before launch) ===== */` | `/* ===== ACCESS CODES ===== */` |

The book has launched, and the 500 codes in it are correct: the list is
byte-identical, in the same order, to `codes.json` in the `concept-kit`
repository. The note said "the real 50," said "before launch," and sat above a
launched book with 500 valid codes.

Removed because residue that reads as an open task will be picked up as one. The
section marker was kept so the landmark survives. Recorded here so the record
shows this was considered, not overlooked.

---

## Considered and deliberately NOT changed

**"Whilst" in C1 and C2.** Eight instances, C1 unit 10 and C2 units 4, 13, and
22. Every one sits inside the "American / British English" callout, in quotation
marks, followed by the book stating its own choice: *This book uses "while."*
The word is mentioned, not used. `verify.py`'s British-spelling check cannot tell
the difference and flags the exact section that documents the rule it enforces.
The defect is in the checker, not the book. Logged in `concept-kit/KNOWN_ISSUES.md`.

---

## How these were verified

- Every target string was confirmed byte-identical across all 32 files before
  any edit was written. The script refuses any file that does not match exactly
  rather than guessing.
- Applied first to a scratch copy and checked there: 96 em dashes to 0, 32 reads
  and 32 writes of each key, the stale note gone from all 32.
- Visible text compared token by token against the live pages. The only
  difference anywhere is an em dash becoming a colon, in place.
- Exactly 32 files differ from the pre-fix repository. Nothing outside
  `unit1.html` through `unit32.html` was touched.

The script is `tools/fix_phrasal_verbs.py` in the `concept-kit` repository. It is
idempotent by refusal: run twice, the second run finds zero matches and stops.

---

# The landing page was one revision behind its own book

**18 Aug 2026. One page: `phrasal-verbs.html`.**

## The defect

The correction of 17 Aug moved the 32 unit pages to the series-wide unlock: read
either `cm_access` or `cm_pv_access`, write both. **The landing page was not
included.** It read and wrote `cm_pv_access` alone.

So a student who unlocked through C1 or C2, and therefore holds `cm_access`,
arrived at the Phrasal Verbs contents page and **was asked for a code again**,
then walked into a unit that let them straight through. The book's front door
was stricter than the book.

This is a live defect and not a tidy-up. It is exactly the failure the 17 Aug
correction was written to remove, surviving on the one page that correction did
not touch.

## The fix

Matched to what the 32 unit pages already do, not invented:

    write   setItem('cm_access','1'); setItem('cm_pv_access','1');
    read    getItem('cm_access') === '1' || getItem('cm_pv_access') === '1'

## Verified by count, not by assurance

    landing page   writes cm_access 1  writes cm_pv_access 1
                   reads  cm_access 1  reads  cm_pv_access 1
    unit pages     identical, and all 32 identical to each other
    match          true

## The privacy modal had the same defect, and it is fixed too

Found and left in the first pass, then fixed on Pedro's instruction the same
hour. His reason is the better rule: **leaving it means rediscovering it in
three weeks and spending ten minutes working out why.**

The landing page wrote and read `cm_pv_privacy_seen` alone, while its unit pages
write both keys and suppress the modal if **either** has been seen. So a student
who dismissed "Nothing is saved here" in C1 met it again on this page.

Matched to the units, including the operator, which is `&&` and not `||`:

    write   setItem('cm_privacy_seen','1'); setItem('cm_pv_privacy_seen','1');
    read    getItem('cm_privacy_seen') !== '1' &&
            getItem('cm_pv_privacy_seen') !== '1'

### All four keys, verified by count

                        w cm_access  w cm_pv_access  r cm_access  r cm_pv_access
      landing                1             1             1             1
      units                  1             1             1             1

                        w privacy   w pv_privacy   r privacy   r pv_privacy
      landing                1             1             1             1
      units                  1             1             1             1

      all 32 units identical to each other        TRUE
      landing matches the units on ALL FOUR KEYS  TRUE

**Nothing outstanding on this page.** The landing page and the book it fronts
now agree on every storage key they share.

## Pedagogical review, 2026-08-22

| Location | As published | Approved correction |
|---|---|---|
| `unit1.html`, exercise G | two `var G_CORRECT` lines, `[0, 3, 2, 5, 4, 1]` then `[0, 1, 2, 4, 5, 3]` | `var G_CORRECT = [0, 3, 2, 4, 1, 5];` |

**Exercise G in unit 1 taught three wrong meanings.** The live key attached
*a blocker* to "capacity to take on work", *bandwidth* to "among your current
tasks", and *on my plate* to "something stopping your progress". A student who
answered correctly was marked wrong and shown the wrong definition as the model
answer. Exercise H on the same page uses all six terms in context and confirms
the intended senses, so the page contradicted itself. The corrected key agrees
with H on all six.

The page also declared `G_CORRECT` twice, one line apart, with two different
and both incorrect keys. JavaScript runs the last assignment, so the first line
was dead. It is gone, and `check_duplicate_declaration()` now fails the run on
any repeat.

**The particle-swap answer was the first button in every item in the book.**
All 128 items in all 32 units stored `correct:0`, and `buildF()` renders the
options in array order, so the correct answer was always leftmost. The index is
now spread across the three positions, 43 at option 0, 43 at option 1, 42 at
option 2. This one has no row in the table above because the table holds
literal text that must appear in the named file, and the corrected index
differs in every unit. It is guarded instead by `check_choice_position()`,
which fails the run on a book that puts every correct answer in one place, and
on the mirror. A machine check is the stronger record of the two.

Neither defect changes a word a student reads. Both change which answer the
page marks correct.

## Pedagogical review, units 1 to 10 read, 2026-08-22

| Location | As published | Approved correction |
|---|---|---|
| `unit1.html`, exercise A | "One sentence has none" | `Two sentences have none` |
| `unit2.html`, exercise D | `"separable: also splits, pick it up"` | `"separable: pronoun goes between, as in pick it up"` |
| `unit3.html`, exercise B title | "Spot and fix the error" | `Write out the blend` |
| `unit26.html`, exercise G | `"make noticeable progress"` / `"start to make real progress"` | `"move forward against something difficult"` |
| `unit9.html`, exercise B | `key:"put off"` on item 3, `key:"backed out of"` on item 5 | `key:"launch off"` |
| `unit15.html`, exercise B | `key:"water down the proposal"`, `key:"tone down the forecast"` | `key:"proposal down"` |
| `unit17.html`, exercise B | `key:"scale back"` | `key:"rollout back"` |
| `unit18.html`, exercise B | `key:"hand over"`, `key:"talk over"` | `key:"workstream over"` |
| `unit21.html`, exercise B | `key:"turn around"`, `key:"pass around"` | `key:"flow around"` |
| `unit25.html`, exercise B | `key:"put across"` | `key:"numbers across"` |

**Exercise B marked the book's own model answer wrong, in 10 of 160 items.**
B is graded by substring: the answer passes if it contains `key`. In each of
these the defective prompt has the wrong particle in the separated word order
("Let's water the proposal off"), and the printed model answer keeps that order
and swaps the particle ("Let's water the proposal down"). The graded key had
been written in the joined order ("water down the proposal"), which the model
answer does not contain. A learner who copied the answer printed under the
exercise was marked wrong. Unit 2 teaches that both orders are correct with a
full noun phrase, so the grader also contradicted the rule the book teaches.

Each key is now the object plus the corrected particle, which appears in the
printed answer and does not appear in the defective prompt. The tenth,
`unit9.html` item 5, was different in kind: the grader demanded "backed out of"
while the printed answer said "backed off the earnout". Those are different
verbs with different meanings, and the printed answer is the right one.

`check_pv_softkey()` now fails the run on both directions: a graded key absent
from its own printed model answer, and a graded key already present in the
prompt, which would pass an answer that changed nothing.

**Exercise A in unit 1 told the learner the wrong number.** "One sentence has
none; write none" over six items, two of which are keyed "none". A learner who
believes the instruction stops looking after the first and gets the second
wrong while doing exactly what they were told. `check_instruction_count()` now
fails the run when an instruction states a count the data contradicts.

**Unit 3's exercise B was titled "Spot and fix the error"** over items the unit
itself presents as accurate transcription: "Each phrasal verb is written the
way it blends in fast speech." The unit teaches that blending is what fluent
speakers do, and the title called it an error. Swept the other 31 units; it was
the only title that named an error where the instruction described none.

**Unit 2's exercise D had an ending that depended on reading order.**
"separable: also splits, pick it up" only makes sense after the other separable
entry, and the endings are displayed scrambled, so "also" could appear first.

**Unit 26's exercise G did not decide.** "make headway" was keyed to "make
noticeable progress" and "gain traction" to "start to make real progress".
Either definition read correctly against either term. They now name what
separates the two: headway is movement against resistance, traction is other
people starting to back it.

## Pedagogical review, units 11 to 20 read, 2026-08-22

| Location | As published | Approved correction |
|---|---|---|
| `unit7.html`, exercise B | "The committee ruled against the second option" | `The committee ruled off the second option` |
| `unit7.html`, exercise D | `"the regional workshops to close the gap."` | `"the regional workshops ourselves, to close the gap."` |
| `unit8.html`, exercise B | "The pilot turned out a success faster than we expected." | `We hand in the revised deck to every regional lead on Friday.` |
| `unit9.html`, exercise D | `"before the documents were signed."` | `"before the documents were signed, saying his flight was at eight."` |
| `unit9.html`, exercise G | `"end an effort or a partnership"` | `"give up and stop, with both sides agreeing"` |
| `unit10.html`, exercise G | `"start fast and productively"` | `"start at full speed from day one"` |
| `unit11.html`, exercise D | `"the returns backlog until outbound settles."` | `"any more of the returns backlog until outbound settles."` |
| `unit15.html`, exercise D | `"the travel budget before the review."` | `"on travel before the review."` |
| `unit15.html`, exercise G | `"set a firm limit you won't cross"` | `"set a firm limit in advance, before the pressure starts"` |
| `unit16.html`, exercise G | `"fixed and impossible to change"` | `"fixed, and no longer open to change"` |

**Two items were presented as errors that were not errors.** Unit 7 said "The
committee ruled against the second option and kept the first" under an
instruction reading "Each sentence has one mistake." *Ruled against* is correct,
idiomatic English. There was no mistake to find, only a word to swap, which is
what exercise C of the same unit is for. It is now a wrong particle, *ruled
off*, which is an error. Unit 8's "The pilot turned out a success" was the same
shape one step weaker: *turn out* plus a noun phrase without *to be* exists and
is attested, it is only rare in this register. Replaced with a wrong particle,
*hand in* where the sense needs *hand out*.

**Six matching exercises did not decide.** In each, two answers swapped places
and both readings survived. The fix names what separates the pair rather than
rewriting it:

- unit 9 G, *pull the plug* against *call it quits*: who ends it. A decision
  from above, or both sides agreeing to stop.
- unit 10 G, *hit the ground running* against *get the ball rolling*: full speed
  from day one, or setting something moving for others to carry on.
- unit 15 G, *draw a line in the sand* against *put your foot down*: a limit set
  in advance, or a refusal after being pushed.
- unit 16 G, *set in stone* against *a done deal*: no longer changeable, or
  settled by agreement.
- unit 7 D and unit 9 D took grammatical locks instead, because the endings are
  sentence halves. *ourselves* cannot follow "The plan leaves out", and "saying
  his flight was at eight" needs a subject that can speak, which "The
  negotiations" is not.
- unit 11 D and unit 15 D took the same treatment. *any more* requires the
  negative in "Let's not take on", and *cut down on* takes a preposition that
  *scale down* does not.

## Pedagogical review, units 21 to 32 read, the book closed, 2026-08-22

| Location | As published | Approved correction |
|---|---|---|
| `unit21.html`, exercise G | `"suggest rough ideas freely and quickly"` | `"suggest rough ideas out loud, fast and unfiltered"` |
| `unit22.html`, exercise D | `"the whole vendor list."` | `"the whole vendor list ourselves, not just the flagged rows."` |
| `unit27.html`, exercise G | `"the final result or conclusion"` | `"the outcome, once everything has played out"` |
| `unit28.html`, exercise C | "Let's solve a phased plan we can fund." | `"Let's devise a phased plan we can fund."` |
| `unit31.html`, exercise A | `a:"get on board with"` and `a:"on board with"` | `a:"not get on board with"` |

**Unit 31 keyed two answers in the positive where the meaning needs the
negative.** "I oppose slipping the date" was keyed *get on board with*, and "I
disagree with cutting QA" was keyed *on board with*. Getting on board with
something is agreeing to it. The page contradicted itself twice over: its own
exercise D reads "Not get on board with", and its American/British callout says
"This book uses not sold on and not on board with." Grading is an exact string
match, so the learner had to type the phrase that means the opposite of the
prompt.

**Unit 28 asked the learner to rewrite a sentence that was not English.**
"Let's solve a phased plan we can fund." You do not solve a plan. Exercise C
gives a formal verb to replace with a phrasal verb, so the formal verb has to be
correct English first. *Devise* is the formal twin of *work out* for a plan, and
the printed key already read "Let's work out a phased plan we can fund."

**Three more matching exercises did not decide**, and took the same treatment as
the six before them: name what separates the pair, or add a grammatical lock.
*Spitball* is talking, *throw spaghetti at the wall* is doing. *The upshot* is
what it led to, *the bottom line* is what matters more than the rest. And
*ourselves* cannot follow "I'll dig into", which fixes the vendor-list ending to
"We need to look into".

## Captions and categories, 2026-08-22

| Location | As published | Approved correction |
|---|---|---|
| `unit1.html`, figure caption | "Only the height on the ladder changes." | `Only the distance from the literal changes.` |
| `unit9.html`, exercises A and B | `a:"backed off"`, `key:"backed off the"` | `a:"backed down"` |

**Unit 1's caption described a ladder over a horizontal bar.** The figure is a
left-to-right gradient from LITERAL to FIGURATIVE with no vertical axis and no
ladder. The sentence keeps its shape and now says what the figure shows.

**Unit 9 said three different things about one verb.** Its Analysis reads "you
call off an event, or back down from a position." Its figure files *back off*
under Cancellation. Its exercises keyed *backed off* with a direct object. None
of the three uses of *back off* in that unit is cancellation.

Measured on Google Books Ngrams, en-US-2019, ten-year average: *back down from*
1.624e-07 against *back off from* 5.199e-08, so back down from is 3.1 times more
common in the sense of retreating from a position, and 1.3 times in the past
tense. "back down on" and "back off the" were measured and excluded, because
both pick up physical uses and do not answer the same question.

The Analysis was already right. Exercise A now reads "Two directors backed down
from the earnout terms this morning", exercise B keys "backed down from", and
the printed model answer follows. **The figure still says back off**, and cannot
be corrected: the published figures are raster PNGs with no generator anywhere.
See the note below.

## The three category corrections are blocked on one decision

Three figures carry a verb in the wrong category:

- unit 8, *turn out* under VISIBILITY. All five uses in that unit are result,
  and the Analysis names only find out and point out for that sense.
- unit 9, *back off* under CANCELLATION, above.
- unit 12, *push on* under IMPOSITION, whose commoner reading is continuation,
  the neighbouring unit's category. Measured replacement: *dump on*, 6.580e-08
  against *foist on* 1.293e-08 already in that category, 5.1 times more common,
  fiction/general 1.88 so it carries in speech.

None can be applied. The published figures are PNGs and no generator for them
exists in any repository. `wheel_engine.py` in the Book 3 archive generates the
19 Particle Wheels and has all three entries on one line each, so on the wheels
every one of these is a one-line edit. On the blocks, none of them is possible
without rebuilding a generator from the images.

## The 19 panels regenerated, 2026-08-22

The published figures had no generator. `block_engine.py` now exists beside
`wheel_engine.py` in the Book 3 archive and reads the same PARTICLES table, so
the wheel and the panel cannot disagree about what a category holds. Every
constant in it was measured off the published images.

All 19 were regenerated and substituted. Verified against the pages they
replaced: same canvas, same nine text bands, same four colors, element widths
within 18px on the longest line and exact on most, minimum 94px of clearance
between columns. 1.4% to 2.6% of pixels differ inside the glyphs, at identical
size and position, which is a different DejaVu build and not a layout error.

**Two bugs in the first generated set, caught by comparing against the pages
they replaced.** The footer has two texts, not one: the first unit of a pair
introduces the split and the second refers back to it, and using the second for
both made six panels 58px short. The title drops to a smaller size for a
two-word label, not for a label over six characters, which had shrunk THROUGH.

**One content regression, caught the same way.** The panels are generated from
PARTICLES, and PARTICLES carried the wheel's `fall through` in unit 19 where
the published block already said `cut through`. Regenerating would have put a
verb the unit never teaches back into the book. PARTICLES was corrected.

| Location | As published | Approved correction |
|---|---|---|
| `unit1.html`, exercise F | "Please ___ the draft before we ship." (look over) | `What's ___ the release this week?` |
| `unit6.html`, exercise F | "We're ___ the work we did last quarter" (building on) | `If something is wrong on the line, ___.` |
| `unit6.html`, exercise F | "She ___ for the junior engineer" (stood up) | `She ___ the pressure from finance when nobody else would.` |
| `unit7.html`, exercise F | "She ___ of the partnership" (pulled out) | `Two partners ___ of the deal before the contract was signed.` |
| `unit9.html`, figure alt | "Cancellation: call off, put off, back off." | `Cancellation: call off, put off, back down.` |

**Four graded items tested a verb the unit had not taught.** Every replacement
uses a verb the unit does teach: hold up (unit 1's own matching exercise),
speak up and stand up to (unit 6's dialogue and panel), walk out (unit 7's
Analysis and panel).

The count that produced these was wrong twice before it was right. The first
sweep said six, because it stripped the figures' alt text, which is where the
book lists the panel's vocabulary, and because it did not match inflections.
Corrected: two verbs the book never teaches, one sense never taught, and one
taught 29 units after it is tested.

## Six categories corrected and twenty captions rewritten, 2026-08-23

| Panel category | Was | Now | Why |
|---|---|---|---|
| unit 5 COMPLETION | round up | `tie up` | round up is gathering, not completing. *round off* is the completion verb but belongs to OFF, and this is the UP panel. tie up is taught in unit 5's own exercise A and matching. |
| unit 8 VISIBILITY | turn out | `spell out` | all five uses of turn out in unit 8 are result, and the Analysis names only find out and point out for visibility. spell out is visibility, and it is unit 8's own prediction verb. |
| unit 9 CANCELLATION | back off | `back down` | the Analysis already said "back down from a position". back down from is 3.1 times more common than back off from on en-US-2019. |
| unit 12 IMPOSITION | push on | `dump on` | push on reads as continuation, the neighbouring unit's category. dump on is 5.1 times more common than foist on beside it, and is imposition only. |
| unit 12 SCRUTINY | sit on | `check up on` | the Analysis said watch, the Watch out and the exercises said withhold. check up on is watching and nothing else, fiction/general 2.92 so it carries in speech. sit on stays taught in the unit; it is simply not scrutiny. |
| unit 17 REVERSAL | wind back | `walk back` | the Analysis names walk back for the reversal sense and the Watch out teaches roll back against walk back. wind back is never used in the unit. |

Each correction was made once, in the PARTICLES table, and reaches the panel,
the alt text and the Analysis prose together. Unit 12's Analysis still named
*sit on* after the panel changed, and `check_figure_vs_analysis()` failed the
run until the prose was brought into line, which is the first time that check
earned its keep on a defect nobody had listed.

**Twenty captions described a figure that is not on the page.** Nineteen said
hub, spokes, solid and dotted over two-column panels that separate the units by
color; the twentieth said "height on the ladder" over a horizontal bar. The
wheels are real and generated, three days before the pages were published, and
the figure was replaced without the caption following. Four texts now cover the
nineteen, and none repeats the line the figure already carries inside itself:

- units 5, 7, 9, 11, 13, 15: `The literal sense sits at the top. Everything under it is that same movement applied to something you cannot touch.`
- units 6, 8, 10, 12, 14, 16: `Nothing about the particle changed since Unit N. Only which half of its map this unit works on.`
- units 17 to 22: `The literal sense sits at the top, and all four senses under it belong to this unit. This particle does not split across two.`
- unit 23: `Five small particles, one tight meaning each, and not a family of senses like the big ones.`

`check_caption_vocabulary()` now fails the run on a caption that says wheel,
spoke, hub, solid or dotted. Ladder is deliberately not on that list: unit 30's
register table is a ladder and its caption's claim about the bottom rows is true.

## Six vocabulary expressions taught twice, 2026-08-23

224 distinct vocabulary items across the 32 units. Six were taught in two units
each, with a slightly different gloss in each place. The unit whose theme the
term actually belongs to keeps it; the other gets a written replacement.

| Unit | Was | Now | Meaning |
|---|---|---|---|
| 13 | read the room | `circle back` | come back to a point later, once there is more to go on |
| 5 | down to the wire | `put it to bed` | close something out for good and stop coming back to it |
| 10 | the home stretch | `get it off the ground` | get something started at all, after it has been stuck |
| 8 | the elephant in the room | `come clean` | admit something yourself before it is found out |
| 8 | a heads-up | `get wind of` | hear about something you were not meant to hear yet |
| 6 | a red flag | `stick your neck out` | take a personal risk by being the one who says it |

Each meaning was tested against the other five in its own unit before it was
written, because a vocabulary exercise that does not decide is the matching
defect in another costume. *put it to bed* had to separate from *in the can*, a
state, and *put a bow on it*, a presentation. *come clean* had to separate from
*break the news*, which can be someone else's news, and *blow the whistle*,
which is about another party. *get wind of* had to separate from *come to
light*: one is a person hearing, the other is a fact surfacing.

*get it off the ground* is coverage and not only substitution. Unit 10's other
two openings, *hit the ground running* and *get the ball rolling*, are both
about speed once a thing has started. Nothing in that unit covered a thing
getting started at all, and its H sentence says so: "The permits took four
months, but we finally got it off the ground in March."

**Unit 6 took the rarer of two candidates, on a rule that did not exist before.**
*force the issue* is 7.6 times more common than *stick your neck out*, and both
carry in speech. Unit 6's Analysis says "raise an issue in a room and you have
exposed it, and exposing something exposes you," and none of the other five
terms carried that personal cost. Coverage beats frequency when the unit's own
prose promises something no term delivers. Written into the series standard.

*flag it* was available, since *a red flag* left, and is taught in unit 6's own
American/British callout. It was rejected for overlapping *sound the alarm*.

## Two more categories, and 53 spokes in the answer keys, 2026-08-23

| Panel category | Was | Now |
|---|---|---|
| unit 10 FINISHING | round off, sign off, finish off | `round off, finish off` |
| unit 20 REMOVAL | give away, throw away, do away with | `give away, throw away, explain away` |
| unit 20 DISAPPEARANCE | fade away, die away, explain away | `fade away, die away` |

*sign off* left because all four of unit 10's uses are approval, with *on*, and
the unit's own Watch out says that without *on* the verb only means finish
writing, which the unit never uses. The panel was holding the one sense the unit
does not teach.

*explain away* moved rather than being replaced, and the defect was sharper than
a wrong label: it was the opposite movement from its neighbours. *fade away* is
a thing dwindling on its own; *explain away* is a person making it go. REMOVAL
is "you send something off for good", which is what dismissing a problem with a
convenient reason is. *do away with* left the panel because the unit never uses
it.

Neither category gained a third example. In both units the natural candidate was
already in that unit's Meet a Stranger, which declares its three verbs never
taught, so promoting one would have made that instruction false. A category with
two examples teaches; a category with three, one used in another sense, teaches
less.

In each case the Analysis was the third text and had to follow: unit 10 said
"you round off, sign off, finish off" and unit 20 said "fade away, explain
away". `check_figure_vs_analysis()` failed the run until both were corrected.

**53 occurrences of "spoke" in the printed answer keys, across 18 units.** The
Meet a Stranger keys read "Triggering spoke", "Using-up spoke", "Disappearance
spoke". Same defect as the twenty captions, in the text a learner reads only
after getting an item wrong. All 53 now read "sense", which is the word the
Analysis uses in every unit. `check_caption_vocabulary()` was extended to read
the answer keys, having read only captions before.

## A defect I introduced, and the check that now catches it, 2026-08-23

Unit 12's panel needed replacements for *push on*, which reads as continuation,
and *sit on*, which is not scrutiny. I measured frequency, proposed *dump on*
and *check up on*, and both were already two of the three verbs that unit's own
Meet a Stranger declares never taught. The instruction went false twice in one
edit and was published.

The trap had been written into the series standard that same morning, which is
why units 10 and 20 were left with two examples in a category rather than
promoting a verb out of the E. Naming it was not the same as checking for it.

`check_panel_vs_stranger()` compares the panel against the E key and fails the
run on any overlap. Four lines.

The fix keeps the panel corrections, because reverting them would trade a fix
for the defect it fixed, and replaces the two E items:

| Meet a Stranger, unit 12 | Was | Now |
|---|---|---|
| item 1 | dump on | `pile on` |
| item 3 | check up on | `sleep on` |

*hinge on* is untouched; it never collided. Both replacements were screened
against the ON panel and against all 32 units BEFORE being measured, which is
the order that prevents the original mistake. *sleep on* predicts from CONTACT,
*pile on* from IMPOSITION, so the set still tests three senses the book teaches
against three verbs it does not.

## The last two callouts, 2026-08-23

| Unit | Was | Now |
|---|---|---|
| 13 | no American / British callout at all, the only unit without one | `Americans say in the hospital; the British say in hospital, with no article. The same holds for at the university. This book uses the article.` |
| 15 | "Scale back is a little more common in the US, scale down in the UK. This book uses scale down" | `Americans shut down a project; British English often says close down. Both are understood on either side, but shut down is far the more common in the US. This book uses shut down.` |

All 32 units now carry the callout.

**Unit 15's old callout taught a contrast that does not exist.** Measured on
en-US-2019: *scale down the* 3.008e-08 against *scale back the* 3.292e-08, and
*scaled down* 1.818e-07 against *scaled back* 1.787e-07. A dead heat, both ways.
The callout claimed scale back was the American side and scale down the British,
and then declared the British one in an American book.

*downplay* against *play down* was the first replacement proposed and was
withdrawn before it was applied: downplay appears zero times in unit 15 and play
down five, so declaring it would have made the callout contradict its own
exercises, which is unit 14's defect with the sides swapped. *shut down* against
*close down* is 7.0x and the unit already uses shut down three times, including
in the Analysis and the Watch out.

The compression the downplay pair teaches, American English collapsing a phrasal
verb into one word, is worth teaching and belongs in unit 32, which is already
about the nouns those verbs form. Held for Pedro with the measurement:
*downplay the* 3.378e-07 against *play down the* 7.176e-08, 4.7x.

**Unit 13's second example was measured before it was written.** "in the
university" against "in university" is 1.3x, a tie. "at the university" against
"at university" is 3.6x and is what a British learner actually produces. Worth
knowing: the article is not a general rule in either direction. Americans DROP
it in *in class* and *at school*, where British English keeps it, so the callout
names the two forms rather than claiming a pattern.

## Open, waiting on Pedro

- the three American / British callouts: units 12, 13 and 14
- the 128 particle-swap items that give no explanation

## Why this file exists

These pages have no generator. This record is the only place the correction is
written down, so a future edit that regenerates or replaces the page has
something to check itself against.
