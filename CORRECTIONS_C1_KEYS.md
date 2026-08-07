# C1 match keys, scrambled

## The defect

Thirty-nine matching exercises in the C1 book shipped with the key `a, b, c, d, e, f`.
Item 1 was answer a, item 2 was answer b, straight down. Every unit's vocabulary
matcher was affected, plus exercise D in Units 2, 3 and 8. A student who noticed the
pattern once could score every later matcher in the book without reading a single
definition: roughly 220 items, free.

`SERIES_STANDARD.md` already required a scrambled key. The rule existed; the check
did not.

## Why it was never caught

`check_answers` in `verify.py` only inspected a `_KEY` when it could also find
`_OPENERS` and `_ENDINGS` alongside it, and it tested the key for completeness,
one-to-one mapping and duplicates but **never for sequence**. So:

- the sequential test simply did not exist, and
- Unit 1, which is hand-built and names its columns `G_ITEMS` and `G_MEANINGS`,
  fell outside the pattern entirely and was skipped in silence.

Both were fixed in `verify.py` before any content was touched. The key check now
finds the two columns whatever they are called, reports an exercise it cannot read
rather than passing it, fails a sequential key outright, and fails a key where more
than half the items still sit in their own position.

## The fix

The right-hand column was reordered and the key rewritten to follow it, so every
opener still points at exactly the same text. **No pairing was altered.** All 396
item pairings across the 36 units were compared before and after: zero changed.

Each permutation is a derangement, so no item's answer sits in its own position, and
each is seeded per unit and exercise so the result is reproducible from the sources.

Verified in a browser on Units 1, 2, 8, 15, 22, 30 and 36: answering every item with
its keyed ending marks all items correct, and a deliberately wrong answer is
rejected.

## Two things found along the way

**The C1 kit had drifted.** Units 3, 6 and 33 carried chip widenings that were
applied to the live HTML and never fed back into the unit sources, so a rebuild would
have silently reverted them. Synced; the kit now reproduces all 36 live units.

**`units/unit1.py` no longer missing.** It was reconstructed from the built page. Unit
1 predates the shared engine and had hand-written inline builders, so this is a
migration rather than a copy: it now uses `buildForm`, `buildRewrite`, `buildMatch`,
`buildChoice` and `buildGap` like the other 35, and will inherit every future engine
fix. Byte-comparison was therefore impossible, so it was checked by comparing every
visible word instead: 1,108 words, 100.00% identical, zero differing runs. Exercise
labels, titles, instructions and soft-notes all land on the same exercises as before.

**`build.py` with no arguments built nothing**, despite the README documenting that it
builds everything. This is how a stylesheet change can appear to ship and not. Fixed.

## Also in this batch

The unit label in the sticky header sat at zero pixels from the CONCEPT wordmark on a
390px screen, so the two collided. The label now takes padding, and is hidden below
520px, where the unit name is already the page heading two lines down.
