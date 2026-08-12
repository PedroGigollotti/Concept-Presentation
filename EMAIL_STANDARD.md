# EMAIL_STANDARD.md

Locked production standard for Concept email campaigns.
Version 1.1, August 12, 2026. Verified end to end by live send.

This document governs every email sent to the Concept student list. It sits
alongside SERIES_STANDARD.md and follows the same rule: the standard is the
authority, not any individual campaign file. When a campaign and this document
disagree, the campaign is wrong.

---

## 1. Sending identity

| Field | Value |
| :---- | :---- |
| From name | Pedro Gigollotti |
| From address | pedro.gigollotti@theconceptmethod.com |
| Reply-to | pedro.gigollotti@theconceptmethod.com |
| Domain | theconceptmethod.com |

Never send campaign mail from an @me.com address. Apple publishes a DMARC
policy for its own domains, so a campaign platform sending as @me.com fails
authentication and cannot be fixed from your side.

---

## 2. Authentication, verified state

The domain is authenticated as of August 12, 2026. Confirmed live on both
authoritative nameservers.

| Record | Host | Value |
| :---- | :---- | :---- |
| SPF | @ | v=spf1 include:spf.privateemail.com ~all |
| DKIM | privateemail._domainkey | v=DKIM1;k=rsa;p=... (2048 bit, published) |
| DMARC | _dmarc | v=DMARC1; p=none; rua=mailto:pedro.gigollotti@theconceptmethod.com |

Rules that do not change:

1. **Exactly one SPF record on the domain.** Two SPF records cause both to
   fail. When adding a sending platform, edit the existing record to add its
   include. Never add a second TXT record starting v=spf1.
2. **The DKIM selector is `privateemail`, not `default`.** A record published
   under the wrong selector resolves but never verifies.
3. **DMARC stays at p=none** until at least one month of reports has been
   reviewed. Moving to p=quarantine early risks silently losing real mail.
   Tightening later also unlocks BIMI, which displays the Concept mark beside
   the sender name.

DNS is managed at Namecheap. The domain uses PremiumDNS. The mailbox is
Namecheap Private Email.

---

## 3. Technical construction

Email HTML is not web HTML. Outlook renders with Microsoft Word's engine and
Gmail strips stylesheets. The following are constraints, not preferences.

- **Nested tables for all layout.** No div plus flexbox, no CSS grid.
- **Inline styles on every element.** The `<style>` block may hold only media
  queries and a few resets; assume it is discarded.
- **600 pixels maximum width**, centered inside a full-width background table.
- **Buttons are table cells** with a background color, with padding repeated on
  the inner anchor. Never a styled div.
- **Web-safe fonts only.** Georgia for headings, Arial with Helvetica fallback
  for body. Calibri does not exist outside Windows and must not be specified.
- **Total HTML under 100 KB.** Gmail clips messages above roughly 102 KB and
  hides everything past the cut, including the unsubscribe link.
- **No JavaScript, no forms, no background images, no web fonts.**

---

## 4. Brand application

Palette, unchanged from the brand manual:

| Token | Hex | Use |
| :---- | :---- | :---- |
| Red | #B3132B | Accent, buttons, links, eyebrows, rules |
| Near-black | #0A0B0D | Display headings |
| Charcoal | #1A1A1A | Body text |
| Platinum | #E7E8EA | Borders and dividers |
| Gray | #6B7075 | Footer and secondary text |
| Tagline gray | #6E6E6E | Wordmark tagline only |

Header lockup:

- The logo is `mark-light-bg` at 48 pixels, never the dark variant. The email
  card is white, and the dark mark goes nearly invisible on light surfaces.
- The full stacked lockup is not used in email headers. It must not be shown
  below roughly 140 pixels wide, and at that width it is taller than the
  content beneath it.
- CONCEPT and MIND YOUR FUTURE are set as live HTML text, not baked into an
  image, so they survive image blocking. CONCEPT is bold, #B3132B, wide
  letter-spacing. The tagline is smaller, #6E6E6E.

---

## 5. Images

- Hosted at theconceptmethod.com. Images cannot be embedded in email; the
  reader's mail app fetches them at open time.
- **Book covers: 220 pixels wide, JPEG, quality 82, under 10 KB each.** The
  print masters are 2550 by 3300 and must never be linked directly.
- **Every image carries alt text**, because roughly half of recipients see
  images blocked by default. With images off, alt text must leave the email
  readable and the offer intelligible.
- Filenames are case-sensitive on GitHub Pages.
- Once a campaign is sent, its image URLs are permanent. Renaming or moving a
  file breaks the covers in every email already delivered. Never reorganize
  image paths that a sent campaign depends on.

### Cache-busting, mandatory

**Every image URL carries a version query string:** `?v=YYYYMMDDx`.
Example: `https://theconceptmethod.com/PEP_C1_email.jpg?v=20260812b`

GitHub Pages ignores the query string and serves the same file, but every cache
in the chain treats the URL as new.

This is not optional, and it is not cosmetic. Learned the hard way on
August 12, 2026: the cover images returned 404 for a few hours during setup.
Apple Mail and its privacy proxy fetched them during that window, cached the
failure, and then refused to load those exact URLs afterward, even once the
files were live and loading correctly in Safari and Chrome. Adding the version
string fixed it immediately.

Bump the version whenever an image is replaced at an existing path, and use a
fresh version for each campaign. A cached failure is invisible to the sender
and permanent for the reader.

---

## 6. Platform configuration, locked

Sending platform: **MailerLite**. Account "The Concept Method",
`pedro.gigollotti@theconceptmethod.com`. Domain authenticated August 12, 2026.

| Setting | Value |
| :---- | :---- |
| Sender name | The Concept Method |
| Sender email | pedro.gigollotti@theconceptmethod.com |
| Reply-to | pedro.gigollotti@theconceptmethod.com |
| Editor | Custom HTML editor, "Code from scratch" |
| Campaign type | Regular campaign |

**Never set the sender to an @me.com address.** MailerLite rejects it outright:
"Campaigns cannot be sent from this domain." Apple's domain, Apple's rules.

### Merge tags

MailerLite syntax, not Mailchimp's. Convert on every build:

| Purpose | Tag |
| :---- | :---- |
| First name | `{$name}` |
| Unsubscribe | `{$unsubscribe}` |

Source files may use `FIRST_NAME` and `*|UNSUB|*` as placeholders; both are
replaced when the file is loaded into the editor. Verified working: a live send
rendered "Hi Pedro," correctly.

### Build and send procedure

1. Build the HTML locally. Bump the image version string.
2. Upload the campaign HTML to the repo root. It becomes the canonical archived
   copy and can be loaded directly into the editor by URL.
3. Campaigns, Create, Regular campaign, Start from scratch, Custom HTML editor,
   Code from scratch.
4. Load the file, converting merge tags in the same pass.
5. Done editing, then set campaign name and subject.
6. **Send a test.** Use the "Send a test" control above the preview.
   **Do not press Continue**, which advances to the Schedule step and will send
   the campaign for real. This happened once on August 12, 2026.
7. Verify in the delivered message before scheduling anything.

### Known client behavior

- The MailerLite editor preview blocks remote images. Broken images there mean
  nothing. Verify in a delivered message.
- Apple Mail and Namecheap webmail both block or proxy remote images by
  default. A delivered email showing placeholders is normal, not a defect.
- Test sends have limited features. Unsubscribe, forward, and preference-center
  links do not work in them.

## 7. Links and tracking

Every link carries UTM parameters so analytics can attribute traffic:

```
?utm_source=email&utm_medium=students&utm_campaign=<name>_<mon><yy>&utm_content=<slot>
```

In HTML source, `&` is written `&amp;`.

Companion pages currently live: `c1.html`, `c2.html`, `phrasal-verbs.html`,
`calibrated-speech/contents.html`. Books 1 and 2 (A1-A2, B1-B2) have no
companion page and must not be linked until one exists.

---

## 8. Copy rules

- American English. Serial comma. Periods and commas inside quotation marks.
- No em dashes, no en dashes, no emojis.
- Written teacher to student, not brand to prospect. These people know Pedro.
- Sign-off is warm, not formal. "See you in class," not "Sincerely."
- One primary call to action. Secondary links may appear inline.
- Preheader text is 40 to 90 characters, followed by hidden spacer characters
  so the inbox does not pull in the first line of the body.
- No sentence that asks the reader to identify their own level or need. They
  study with Pedro; he already knows.

---

## 9. Footer, required in every send

- Reason for receiving: "You are receiving this because you study with Concept."
- Practitioner name and locations: Pedro Gigollotti, The Concept Method.
  Sao Paulo, Rome, Milan.
- Working unsubscribe link, injected by the sending platform.
- Contact address.

The unsubscribe link is legally required under CAN-SPAM, GDPR, and LGPD. The
list spans Italy and Brazil, so this is not optional.

---

## 10. List handling

- The list is students and former students only. No purchased or scraped
  addresses, ever.
- Most addresses are corporate (@bendingspoons.com). A marketing send to a work
  address is a different act from a lesson invitation. Keep frequency low and
  relevance high.
- Contact file format: two columns, First name and Email.
- Consider segmenting active from lapsed students. A student who has not had a
  lesson since January should not receive copy that assumes weekly contact.
- Suppress anyone who unsubscribes, permanently, across all future sends.

---

## 11. Pre-send checklist

Run in order. Do not skip ahead.

1. All image URLs return 200 with the expected content type and byte size,
   **including the version query string**, which must be bumped for this send.
2. HTML tag balance verified: tables, rows, cells, paragraphs, anchors.
3. Every link resolves to a page that exists.
4. Total HTML under 100 KB.
5. Exactly one SPF record on the domain, including the sending platform.
6. Platform domain verification complete, its DKIM records published.
7. Test send to a Gmail address. Open "Show original" and confirm three PASS
   lines: SPF, DKIM with header.d=theconceptmethod.com, and DMARC.
8. Test send opened on a phone and on a desktop client.
9. Test send viewed with images blocked, to confirm alt text carries it.
10. Personalization tag renders a real first name, not the raw merge tag.
11. Unsubscribe link clicked and confirmed working.
12. Merge tags converted to MailerLite syntax: `{$name}`, `{$unsubscribe}`.

A campaign that fails any step does not go out.

---

## 12. Open items

Carried forward, not yet resolved:

- Student addresses not yet imported. Import file prepared: 36 students plus
  pedro.gigollotti@me.com, 37 rows, validated for duplicates and format.
- Newsletter assets: `concept-mark-dark-email.png` not yet uploaded, needed by
  The Reading masthead.

Resolved August 12, 2026:

- Domain authenticated in MailerLite. All four DNS records live and consistent
  on both nameservers.
- Live send verified end to end: correct sender, merge tag rendering "Hi Pedro",
  images loading after cache-busting.
- SPF and DKIM confirmed passing on a MailerLite-sent message via Gmail
  "Show original".
- PremiumDNS and Private Email subscriptions to be renewed rather than lapsed.
- Two-factor authentication enabled on the Namecheap account, authenticator app,
  backup codes stored outside the account.
- The shelf page still describes Calibrated Speech as being for Brazilian
  speakers, which contradicts the universal second edition.
- Campaign images and HTML sit in the repo root rather than a dedicated folder.
- `concept-mark-dark-email.png` not yet uploaded, needed by the newsletter
  masthead.

---

CONCEPT · Mind Your Future
