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

## Why this file exists

These pages have no generator. This record is the only place the correction is
written down, so a future edit that regenerates or replaces the page has
something to check itself against.
