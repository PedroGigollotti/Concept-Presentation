# C2 corrections

The running register for the C2 interactive companion, opened 2026-08-21 during the
pedagogical review. It is the diff between the print edition and these pages.

Same contract as `CORRECTIONS_C1.md`: every row is one approved textual change with a
specific old value and a specific new one, and `check_corrections_drift()` in
`verify.py` checks the "Approved correction" column against the file named in
"Location" on every run. A standing rule is not a row; it belongs in a check function.

This file exists because the C1 register was carrying C2 rows and the per-row scoping
check refused them: a row naming `c2-unit20.html` cannot be verified by a glob of
`c1-unit*.html`. The check caught it on the run that added them.

## Rows

| Location | As published | Approved correction |
|---|---|---|
| c2-unit20.html, Watch out, collocation example | only strong tea and powerful influence are right | only <em>strong tea</em> and <em>heavy workload</em> are right |
| c2-unit6.html, Exercise B item 6, added: no higher versus not higher | (item did not exist) | Costs were no higher than budget, so they held steady. |
| c2-unit17.html, Watch out, split into two mechanisms | Some verbs never take to + infinitive. | the <em>to</em> is a preposition, not part of an infinitive |
| c2-unit17.html, Exercise B item 6, added: be used to | (item did not exist) | I'm used to working late during closing week. |
| c2-unit9.html, Watch out, level scope | Invert only after a fronted negative. | At this level, invert only after a fronted negative. |
| c2-unit11.html, Analysis prose now says it is extending the last unit | One special case, fronting a place or direction, does flip the verb | adding to the fronted negatives of the last unit |
| c2-unit3.html, Exercise G and H, pompous phrase replaced with data | we would strongly urge | we strongly recommend |
