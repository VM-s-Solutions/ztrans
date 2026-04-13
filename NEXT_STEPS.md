# Z-TRANS — Next Steps (Outreach → Pitch → Close)

**Last updated:** 2026-04-13

**Read order for a fresh Claude session opening this file:**
1. **This file (NEXT_STEPS.md)** — the operational playbook for getting Michal Zahustel from cold to signed
2. [STATUS.md](STATUS.md) — what's been built and what's in the demo
3. [BRIEF.md](BRIEF.md) — business context, brand, wow moments
4. [CLAUDE.md](CLAUDE.md) — technical setup if you need to make changes

---

## TL;DR

The Z-TRANS shipper portal concept is **demo-ready** as of 2026-04-13. The user has implemented the 4 critical items from STATUS.md (60 mock shipments, document downloads, truck pulse animation, quote-request flow). It's time to move from building to selling.

**Goal:** Get a 30–45 minute meeting with Michal Zahustel (sole owner + sole statutory director of Z-TRANS, +421 911 870 650), demo the portal, walk away with a signed M1 (concept-validation phase) for €3,000–€7,000.

**Total project target if M1→M4 closes:** ~€30,000 EUR over 6–9 months.

**Why now:** The portal is built. JAPAVO outreach is blocked until 28 April–8 May (waiting on their ERP tender). Z-TRANS has no such block — outreach can fire today.

---

## The decision-maker — what to know

**Bc. Michal Zahustel** — sole owner + sole statutory director of Z-TRANS, s.r.o. (Púchov, SK). Slovak speaker. LinkedIn: limited profile but confirmed active.

**Direct contact:**
- Phone: **+421 911 870 650**
- Email: pattern not directly verified; try `michal.zahustel@z-trans.sk` or `info@z-trans.sk` (general inbox)

**Backup contacts (Zahustel family — all named on z-trans.sk):**
- Jakub Zahustel
- Pavol Zahustel
- Monika Zahustelová

**One-line pitch (Slovak):** *"Vaši francúzski zákazníci uvidia kde je ich kamión na mape a stiahnu si CMR — vo francúzštine — bez jediného telefonátu do Púchova."*

**One-line pitch (English):** *"Your French customers see exactly where their cargo is, download their CMR, and check their invoice — in French — without making a single phone call to Púchov."*

---

## The pitch motion (sequence)

### Stage 6 — Outreach (NOW)

**Channel:** LinkedIn DM + cold email + (optional) phone call as backup.

**Tone:** Slovak, peer-to-peer, founder-to-founder. NOT vendor-to-buyer. Reference his actual operation (40 trucks, SK↔FR routes, family business).

**Hook:** Lead with the operational pain that his team feels every day, not with our product. The pain is **"shippers calling Púchov to ask 'where's my truck?' across timezones in French and Slovak."**

**Proof:** Mention the working portal exists. Do NOT attach it. Do NOT send a link in the first message. The link is the carrot for the meeting.

#### Outreach message templates to write (do these in-chat, not in-file)

1. **LinkedIn DM template (Slovak, ≤300 chars)** — connection request + 2-line context
2. **Cold email template (Slovak, ~150 words)** — fuller story, mentions the portal exists, asks for 20 minutes
3. **Cold email template (English fallback)** — same as above but for the email gateway
4. **Phone call script (Slovak)** — 60-second voicemail message + 90-second live-conversation script
5. **Follow-up message (5 days after first send, if no response)** — softer, single sentence, "still interested?"

**See [07_OUTREACH_TEMPLATES.md](../client-hunter/07_OUTREACH_TEMPLATES.md) for proven message structures from The Miners and Kofio outreach.**

#### What goes in the first message

- Opening line that proves you researched: reference SK↔FR specialty, 40 trucks, or the family operation
- Pain framing: "every shipper status call is a Slovak/French phone call" — not "you don't have a portal"
- Working-software claim: "I built a working customer portal — not a mockup, real running software in Slovak/French/English"
- Specific ask: "20 minutes — video call or coffee in Žilina/Trenčín if you prefer in person"
- Soft close: "no commitment, just curious whether the shape fits your operation"

#### What stays out of the first message

- The URL (not until they say yes to a meeting)
- Pricing (zero mention until late in the meeting)
- Technical details (Angular, Leaflet, mock data — they don't care)
- Agency-style language ("digital transformation", "synergies", "best practices")
- A pitch deck attachment (defeats the moat — see [00_PLAYBOOK.md](../client-hunter/00_PLAYBOOK.md) Rule 1)

### Stage 7 — Pitch meeting (target: late April / early May 2026)

**Format:** 30–45 min. **In person if possible** — Z-TRANS HQ is Svätoplukova 1756, 020 01 Púchov (~6 hours from Prague by car, 2 hours from Žilina). If video, use the prototype URL on a phone, not screenshare.

**Meeting shape (per [08_PITCH_MEETING.md](../client-hunter/08_PITCH_MEETING.md)):**

#### Phase 1 — Discovery (0–10 min)

Ask, don't show. The questions specifically for Z-TRANS:

- "Aké sú vaše hlavné výzvy s francúzskymi zákazníkmi pri sledovaní zásielok?" *(What are your main challenges with French customers tracking shipments?)*
- "Koľko hovorov denne dostane Monika alebo Pavol s otázkou 'kde je môj kamión?'" *(How many "where's my truck?" calls per day does Monika or Pavol handle?)*
- "Ako práve teraz posielate CMR a faktúry zákazníkom?" *(How do you currently send CMRs and invoices to customers?)*
- "Čo sa stane keď je dispečer na dovolenke alebo cez víkend a niekto potrebuje status?" *(What happens when a dispatcher is on holiday or it's the weekend and someone needs a status?)*
- "Aké systémy už používate? GPS sledovanie? Účtovný softvér?" *(What systems do you already use? GPS tracking? Accounting software?)* — critical for sizing M2/M3 integration scope

**Listen.** Take notes. Don't pitch. The pain they describe is the pitch.

#### Phase 2 — Demo (10–25 min)

Phone in his hand. Open `https://{deployed-url}/dashboard` already logged in as Durand Industrie (the French shipper customer in mock data).

**Demo sequence (15 minutes max):**

1. **Dashboard (1 min)** — "This is what your French customer Pierre Durand sees when he logs in. 10 active shipments, 60 total since 2022."
2. **Click into Map (2 min)** — "He sees every truck on the SK↔FR corridor. Live ETA countdown — Lyon arrival in 4h 23m 15s. He doesn't need to call Pavol."
3. **Click a truck marker (1 min)** — "Driver name, truck plate, cargo, ETA. One tap, no phone call."
4. **THE WOW MOMENT — Tap the FR language button (30 sec)** — Whole UI flips to French instantly. "His operations team in Lyon uses this in French. Your dispatchers stay in Slovak. No translation overhead."
5. **Click into a Shipment Detail (2 min)** — Timeline, driver, cargo, downloadable CMR. **Click the PDF link, the document opens in a new tab.** "Pierre downloads his CMR himself. Your team stops emailing PDFs."
6. **Click Documents (2 min)** — Filter by type, download by shipment. "Every CMR, POD, and invoice from the last 6 months — searchable, filterable, downloadable."
7. **Click Shipment History (1 min)** — Sortable Material table. "All 60 shipments since they started with you. They can find anything."
8. **Click Request Quote (2 min)** — Demo the new-customer onboarding flow. "When a new shipper finds you on Google, they request a quote here. Your team gets a structured request, not a phone call interruption."
9. **THE SECOND WOW — Hand him the URL on his own phone (3 min)** — Send the URL via WhatsApp. He opens it. **Responsive. Loads in under a second.** "Your customer's CFO can check shipment status from his phone in a meeting in Lyon. No app to install."

**End the demo with:** "What would need to change for this to feel right for your operation?"

#### Phase 3 — Conversation (25–35 min)

Listen for objections. Don't sell. The objections most likely:

| Objection | Response |
|---|---|
| *"My customers like calling us, that's our personal touch."* | "They like the relationship — they don't like waiting on hold. Give them the option. The relationship calls become real conversations, not status calls." |
| *"How does this connect to our GPS system?"* | "What GPS do you use?" → *(answer)* → "I integrate with that in M2. The M1 phase proves the customer-facing UX so we know we're building the right thing before the integration work." |
| *"We're a small family operation, this looks like enterprise software."* | "It looks like enterprise software because it works the way enterprise software works — but it's built for a 40-truck family operation, not a 4000-truck multinational. The scale fits you." |
| *"What about French shippers — do they really want this?"* | "DSV and DHL have had shipper portals for 10 years. French shippers expect them now. You're competing with carriers that already have one — this closes the gap." |
| *"My IT guy won't like this."* | "There's no IT to displace at M1. We start with mock data. Your team uses it before we touch your systems." |

#### Phase 4 — Pricing & next step (35–45 min, only if engaged)

**Only mention pricing if he's leaning in.** If he says "send me a proposal" by minute 30, pricing comes up naturally. If he's skeptical, leave without quoting and follow up by email with a one-page leave-behind.

**The pricing structure (milestone-based per [09_PRICING_FRAMEWORK.md](../client-hunter/09_PRICING_FRAMEWORK.md)):**

| Milestone | Scope | Duration | Price (EUR) | Price (CZK) |
|---|---|---|---|---|
| **M1 — Concept validation** | This portal you're seeing now, polished + tested with 2–3 of your real customers, deployed to a Z-TRANS subdomain | 1–2 weeks | **€3,200** | ~80,000 CZK |
| **M2 — MVP build** | Real Angular + .NET backend, Postgres database, JWT auth, GPS integration to your existing fleet system, document upload/storage, shipper self-registration with your dispatcher approval workflow | 2–3 months | **€14,000** | ~350,000 CZK |
| **M3 — Full production** | Email/SMS notifications, advanced search, analytics dashboard for Michal, multi-language production content, customer onboarding flow polish | 1–2 months | **€10,000** | ~250,000 CZK |
| **M4 — Launch + 12-month managed support** | Production deployment, monitoring, monthly updates, bug fixes, 1 minor feature per month, 12-month support contract | Launch + ongoing | **€3,200 + €600/month** | ~80,000 + 15,000/mo |
| **TOTAL** | | ~6–9 months | **~€30,400** | **~760,000 CZK** |

**Pricing rules:**
- **M1 is the only commitment at signing.** Walk away after M1 with no penalty if it's not working.
- **IP protection:** Source code transfers at M2 completion + payment. M1 deliverables are demo-only — Z-TRANS does not receive source code if they walk after M1. This is the standard pattern from [09_PRICING_FRAMEWORK.md](../client-hunter/09_PRICING_FRAMEWORK.md).
- **Currency:** Quote in EUR, accept payment in EUR or CZK at current ECB rate.
- **Payment terms:** 50% upfront on M1 signing, 50% on M1 delivery. Net-15 invoicing. No retainer.
- **Scope-creep clause:** Each milestone has a fixed deliverable list. Changes mid-milestone get added to the next milestone, not the current one.

**Critical for Z-TRANS specifically:**
- Cash on hand is only ~€100k. **Milestone payments must be small enough to fit cash flow** — €3,200 M1 is realistic; €15,000 lump sum is not. Make this explicit in the proposal.
- **12-month managed support is mandatory in M4** — Z-TRANS has zero internal IT capacity. They cannot self-maintain. The €600/month support contract is non-negotiable on our side.

#### What to leave behind

A **one-page printed PDF** with:
- Three screenshots from the demo (dashboard, map with truck, shipment detail with CMR)
- One paragraph summarizing what the portal does
- M1–M4 milestone table (above)
- Contact info
- A "Next step" line: "I'll send a formal proposal within 5 business days if you're interested."

**Do NOT leave a USB drive or download link.** The leave-behind is a teaser, not a deliverable.

### Stage 8 — Close (post-meeting follow-up)

#### Within 24 hours of the meeting

- Send a **summary email** in Slovak/English (his choice). 4 paragraphs:
  1. "Thanks for your time. Here's what we discussed: {summarize their pain in their words}"
  2. "Here's what the portal addresses: {list the 3 pains the demo answered}"
  3. "Here's what M1 would look like for Z-TRANS specifically: {custom 1–2 sentences}"
  4. "I'll send the formal proposal by {date, 5 business days from meeting}. Anything you want to adjust before then?"
- Attach the one-page leave-behind PDF.
- Do NOT attach the source code, source URL, or any other deliverable.

#### Within 5 business days

- Send the **formal proposal** (PDF, 4–6 pages):
  - Cover page with Z-TRANS branding (their colors)
  - 1-page problem statement (their pain in their words from the meeting)
  - 1-page solution overview (the portal + integration story)
  - 1-page milestone table with prices and timelines (the M1–M4 table above)
  - 1-page IP protection + payment terms
  - 1-page references (mention The Miners, Kofio if relevant — discreet, not boastful)
  - Cover letter signed personally

#### Follow-up cadence

- **Day 7 after proposal:** soft check-in email, 2 sentences
- **Day 14 after proposal:** final follow-up call (phone, not email)
- **Day 21 after proposal:** archive lead as LOST or move to longer-term watch

**Per [00_PLAYBOOK.md](../client-hunter/00_PLAYBOOK.md) rule:** "After 2 follow-ups with no decision, archive the lead." Don't chase forever. The portal is reusable for the next logistics lead either way.

---

## Pre-outreach checklist (do this before sending anything)

- [ ] Deploy the prototype to a real URL on a Z-TRANS-themed subdomain (e.g., `portal.z-trans.demo.michael.dev` or similar). Vercel / Netlify / Cloudflare Pages free tier is fine.
- [ ] Test the deployed URL on **a real iPhone and a real Android phone** — not just the simulator. Wow moment 3 ("open it on your phone") only works if the responsive layout actually holds.
- [ ] Verify all 3 wow moments fire end-to-end: live-truck map, language switcher, phone-friendly responsive.
- [ ] Verify document downloads actually open PDFs (test on the deployed URL, not just localhost).
- [ ] Test the language switcher specifically in **French** — Pierre Durand opens the portal in French as the first thing he sees. If a single string is missing or English-fallbacks, the wow moment dies. Sweep all 5 pages in FR mode.
- [ ] Record a **90-second Loom walkthrough** as backup. If the live demo fails (WiFi, dead battery, browser issue), the Loom replaces it.
- [ ] Charge the demo phone. Bring a backup charger.
- [ ] Prepare the leave-behind PDF.
- [ ] Practice the demo end-to-end **3 times out loud in Slovak**. Time yourself. Sub-15 minutes for the demo portion is the target.

---

## Risk register — what could kill this deal

These are the things that have killed similar deals at this tier. Be prepared to address each:

1. **"Our cash position is tight"** — already accounted for via small milestone payments. Reinforce this proactively. Don't let cash become the silent reason they ghost.
2. **"What about GDPR?"** — French shippers are GDPR-strict. Have a 1-line answer ready: "M2 includes GDPR-compliant data processing agreement; mock data has no real customers."
3. **"What if you disappear?"** — solo developer risk. Mitigation: mention The Miners and Kofio as proof of completion. Offer a source-code escrow clause in M2 for an extra €500.
4. **"Pavol/Monika won't use it"** — operational change resistance. Mitigation: "M1 doesn't change Pavol's workflow — it gives Pierre a self-service alternative. Pavol's phone keeps ringing for the calls that actually matter."
5. **"We tried this before with X agency and it failed"** — common. Mitigation: "What didn't work last time?" → listen → "M1 is 1–2 weeks. If it doesn't work, you walk. That's the structural difference."

---

## Strategic context (for the Claude session reading this)

- **Pipeline state at handoff:** Z-TRANS is one of two prototype-ready leads. The other is JAPAVO (€18M food B2B), blocked until 28 April–8 May.
- **Why Z-TRANS first:** No external blocker. Outreach can fire immediately. A scheduled meeting with Michal validates the upper-mid-market hunting motion (even at SME scale) and produces real-world objection data for the playbook.
- **Why this matters beyond Z-TRANS:** If this closes, the portal concept becomes a **reusable template for the new upper-mid-market logistics hunt** (BATIM, OMIDA, VEDOS were just hunted in `pipeline/leads.md`). One closed Z-TRANS deal makes those next pitches 10× easier — "I built this for Z-TRANS, here's what it would look like for you."
- **The bigger play:** The user's strategic pivot (2026-04-12) targets €50M–€1B mid-cap private companies for €200k–€3M deals. Z-TRANS at €2M is below that target tier — but it's a **proof point**. Closing Z-TRANS validates the demo-driven sales motion at any scale, and the prototype itself is the asset for upper-mid-market logistics outreach.

---

## Files and resources

- **Live prototype:** [http://localhost:4200](http://localhost:4200) (run `ng serve` from project root); deployed URL TBD
- **Research dossier:** [`../client-hunter/research/z-trans.md`](../client-hunter/research/z-trans.md)
- **Pipeline entry:** [`../client-hunter/pipeline/leads.md`](../client-hunter/pipeline/leads.md) (search for "Z-TRANS")
- **Outreach templates:** [`../client-hunter/07_OUTREACH_TEMPLATES.md`](../client-hunter/07_OUTREACH_TEMPLATES.md)
- **Pitch meeting structure:** [`../client-hunter/08_PITCH_MEETING.md`](../client-hunter/08_PITCH_MEETING.md)
- **Pricing framework:** [`../client-hunter/09_PRICING_FRAMEWORK.md`](../client-hunter/09_PRICING_FRAMEWORK.md)
- **Z-TRANS brand colors:** navy `#1A61AB`, gold `#F5C518` (already applied in the portal)

---

## Recommended first action for the new Claude session

1. Read this file end-to-end (~10 min)
2. Read STATUS.md to confirm what shipped (~3 min)
3. Read BRIEF.md for the brand/wow moments (~5 min)
4. Run the pre-outreach checklist above (~30 min — deploy, test on phone, sweep FR mode)
5. **Draft the Slovak LinkedIn DM and the Slovak cold email** (this is in-chat work, not file work) — referencing [07_OUTREACH_TEMPLATES.md](../client-hunter/07_OUTREACH_TEMPLATES.md) Templates D and E for the B2B portal pitch shape, adapted to Slovak and Z-TRANS specifically
6. Send the messages. Track responses in [`../client-hunter/pipeline/leads.md`](../client-hunter/pipeline/leads.md) Z-TRANS entry activity log.

If outreach gets a response and a meeting is booked, the next session preps the pitch (the demo flow above + objection prep + leave-behind PDF). If outreach gets no response after 5 business days, the next session writes the follow-up.

---

*This file is the operational handoff. STATUS.md is the technical handoff. BRIEF.md is the business-context handoff. Together they let any fresh Claude session pick up Z-TRANS at any stage without losing context.*
