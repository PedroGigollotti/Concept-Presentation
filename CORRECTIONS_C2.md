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
| c2-unit1.html, Access dialogue, speaker roles added | Ana I need to know today | <i>(engagement lead)</i> |
| c2-unit1.html, Watch out, understand removed from the resisting list | I am knowing or I am understanding are not | but <em>I am knowing</em> is not. |
| c2-unit3.html, Exercise D rebuilt with locks | that every invoice be approved in writing. | without exception. |
| c2-unit5.html, Exercise D item 2, semicolon before a relative clause | We interviewed five candidates; | We interviewed five candidates, |
| c2-unit10.html, Exercise A item 4, who and that both accepted | "who"]] | "who", "that" |
| c2-unit13.html, Exercise A items 1, 2, 3, the card teaches both markers | "a": ["However"] | "However", "Nonetheless" |
| c2-unit15.html, Exercise A items 2 and 6, the card lists both verbs | "a": ["concedes"] | "concedes", "admits" |
| c2-unit16.html, Exercise A item 3, the card teaches kind of and sort of | "a": ["kind"] | "kind", "sort" |
| c2-unit20.html, Exercise A items 5 and 6, the moves offer both | "a": ["setback"] | "setback", "issue" |
| c2-unit21.html, Access dialogue, repeated speaker names replaced | Nadia How should we tell | Renata |
| c2-unit2.html, Dialogue block, speaker name spacing moved into the CSS | font-weight:600;} | font-weight:600;margin-right:7px;} |
| c2-unit11.html, Exercise A item 6, base sentence changed so the answer does not land on a fixed idiom | Our budget goes there. -> There goes our budget. | In the footnotes lies the answer. |
| c2-unit17.html, The preposition paragraph moved from Watch out to Analysis, where it explains rather than forbids | Watch out: In look forward to and be used to, the to is a preposition | One more -ing looks like the same rule and is not. |
| c2-unit21.html, Analysis, three politeness levels now take one verdict | <i>send it by five</i> is blunt | &ldquo;send it by five&rdquo; is blunt |
