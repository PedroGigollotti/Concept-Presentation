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

| Location | As published | Approved correction |
|---|---|---|
| E, key-box, all 32 units | `<b>hash out</b> — to work through a problem…` | `<b>hash out</b>: to work through a problem…` |

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
