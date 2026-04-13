# Z-TRANS — Current Status & To-Do

**Last updated:** 2026-04-13

**Read order for a fresh Claude session:**
1. This file (STATUS.md) — current state and what needs doing next
2. [BRIEF.md](BRIEF.md) — business context (client, problem, wow moments, brand, pitch)
3. [CLAUDE.md](CLAUDE.md) — technical setup, commands, architecture rules

---

## TL;DR

This is a **shipper tracking portal concept** for Z-TRANS (40-truck Slovak freight carrier, SK↔France route specialist). The concept is ~70% built. Core scaffold + design system + 5 pages + i18n + Leaflet map are in place. What's missing are **content depth, interactive completeness, and one missing flow** — all fixable in 2-3 days of 8-hour work.

**Status:** Concept draft. NOT yet demo-ready. Outreach is blocked until the demo is polished enough to feel like a real product, not a placeholder.

**Blocker on outreach side:** None — we can send outreach whenever the demo is ready. JAPAVO (parallel project) is blocked until 28 April–8 May waiting on their ERP tender, so Z-TRANS outreach can happen any time before or during that window.

---

## What's built and works

These are genuine, demoable pieces. Don't rebuild them.

### Design system + brand
- Real Z-TRANS blue `#1A61AB` pulled from their actual logo SVG
- Montserrat font, dark/light tokens in `src/styles.scss`
- Material 19 theme layered on top correctly
- `.zt-card` / `.zt-page` / `.zt-section-title` utility classes for visual consistency
- CARTO dark-navy map tiles chosen to match brand

### i18n (3 languages, signal-based)
- SK / FR / EN switcher in header
- 50+ translation keys covering nav, statuses, dashboard, detail, history, documents
- Lives in [`src/app/shared/services/i18n.service.ts`](src/app/shared/services/i18n.service.ts)
- **This is one of the 3 wow moments from BRIEF.md and it works**

### Map view (the headline wow moment)
- File: [`src/app/pages/shipment-map/shipment-map.ts`](src/app/pages/shipment-map/shipment-map.ts)
- Leaflet + CARTO dark tiles
- Custom DivIcons (warehouse for origin, flag for destination, animated truck for in-transit)
- Solid polyline for traveled portion + dashed polyline for remaining route
- Live-updating ETA countdown refreshing every second (Xh XXm XXs format)
- Click a marker → popup with driver/truck/cargo/ETA
- Sidebar lists active shipments with deep links to detail view

### Dashboard
- Welcome banner with customer name
- 4 stat cards (active / delivered / total / next ETA)
- Recent activity feed with clickable rows → shipment detail
- Quick links to map/documents/history
- "Next delivery" highlight card

### Shipment detail
- Route, dates, driver, truck, cargo, weight
- 4-step timeline (Pickup → In Transit → Border Crossing → Delivered)
- Document icons matched to type (cmr, delivery_note, pod, invoice, customs_declaration)

### Shipment history
- Angular Material table with sorting on id/origin/destination/status/departed/driver
- Clickable rows → detail view

### Documents page
- Filter-by-type chips
- Material icons mapped to doc type (article / receipt_long / verified / request_quote / gavel)

### Header
- Logo, 4 nav links, active-route highlighting
- SK / FR / EN language switcher
- Responsive mobile hamburger menu

---

## What's missing for a real demo

Ordered by impact-per-hour. Items 1–4 are the **critical path to demo-readiness** (~8–11 hours). Items 5–8 are polish.

### 🔴 Critical — fix before any outreach

#### 1. Generate 40–60 realistic mock shipments (~2 hours)

**Problem:** Current `src/assets/mock/shipments.json` has only **4 shipments**. For a carrier running 40 trucks (real volume ≈ 300–500 shipments/year ≈ 6–10/week), a demo dashboard showing "4 shipments ever" breaks credibility instantly. Michal Zahustel will do a 2-second mental check — *"wait, that's not how my operation looks"* — and the demo is done.

**Fix:**
- Generate 40–60 shipments covering the last 6 months
- Mix of statuses: ~10 in_transit, ~45 delivered, ~3 pending, ~2 delayed
- Real SK→FR and FR→SK routes using actual cities:
  - SK origins: Púchov, Bratislava, Žilina, Trnava, Nitra, Prešov, Košice
  - FR destinations: Paris, Lyon, Marseille, Bordeaux, Strasbourg, Lille, Nantes, Toulouse, Nice, Rennes
- Real GPS coordinates for all cities (the 4 existing shipments have correct ones — copy the pattern)
- Realistic Slovak driver names: Jakub Zahustel, Peter Novák, Martin Kováč, Tomáš Horváth, Pavol Varga, Ján Baláž, Michal Krajčí, Andrej Bartoš, Marek Szabó
- Realistic truck plates: ZA-xxxBK, TN-xxxAX, PP-xxxCJ (Slovak regional codes)
- Variety of cargo: automotive parts, industrial machinery, steel components, consumer electronics, textiles, food products (dry goods), chemical products (non-hazmat), packaging materials
- For in-transit shipments: realistic `currentPosition` coordinates between origin and destination, realistic `eta` 4-72 hours in the future
- For delivered: `deliveredAt` between origin departure and ETA

#### 2. Wire up PDF document downloads (~2 hours)

**Problem:** `documents.html` lists document entries but clicking does nothing. During the demo when the narrator says "and here your customer downloads the CMR" → silence. Memorable failure.

**Fix:**
- Create 5–10 mock PDF files in `src/assets/docs/` — even simple ones work:
  - `cmr-sample.pdf` (CMR consignment note form with Z-TRANS logo watermark)
  - `delivery-note-sample.pdf`
  - `pod-sample.pdf`
  - `invoice-sample.pdf`
  - `customs-declaration-sample.pdf`
- Add click handler on document rows in [`documents.ts`](src/app/pages/documents/documents.ts) that triggers `window.open('/assets/docs/{file}', '_blank')` or an `<a href download>` tag
- Do the same in [`shipment-detail.ts`](src/app/pages/shipment-detail/shipment-detail.ts) document icons

**Tip:** The PDFs don't need to be real. They need to open and look plausible — even a single-page PDF generated from a Word template with "CMR No. {ID}" placeholder text works.

#### 3. Add truck-icon pulse animation on map (~30 minutes)

**Problem:** The map shows static truck positions. For the "live tracking" moment you want the eye to be drawn to movement. Right now it's a snapshot.

**Fix:** Add a CSS pulse keyframe animation to the `.truck-marker-inner` class in [`shipment-map.scss`](src/app/pages/shipment-map/shipment-map.scss):
```scss
@keyframes truckPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(26, 97, 171, 0.6); }
  50% { box-shadow: 0 0 0 12px rgba(26, 97, 171, 0); }
}
.truck-marker-inner {
  animation: truckPulse 2s ease-in-out infinite;
}
```

30-minute fix, big perceptual impact.

#### 4. Add "Request a Quote" flow (2 screens, ~3–4 hours)

**Problem:** The BRIEF.md deliberately excluded Pattern 4 (booking) from the prototype. But Michal will absolutely ask: *"how does a new shipper request a quote?"* No answer = pitch momentum lost.

**Fix:** Shallow 2-screen flow.
- Add "Request a Quote" CTA button to the dashboard hero and map sidebar
- New route `/quote` with a form component:
  - Origin (dropdown: SK cities)
  - Destination (dropdown: FR cities)
  - Cargo type (dropdown: pallets / bulk / temperature-controlled / ADR)
  - Weight (number input)
  - Preferred pickup date (date picker)
  - Email / contact (text input, pre-filled from `customer.json`)
- Submit → navigate to `/quote/confirmation` with a fake confirmation screen:
  - "Quote request submitted — Z-TRANS will contact you within 24 hours"
  - Display the entered details as a summary
  - Fake quote ID like "Q-2026-0042"

Keep it shallow — no real calculation, no real backend. The pitch line: "This is how a new customer requests a quote — no phone call, 24-hour response SLA."

### 🟡 Important — fix if you have time before outreach

#### 5. Search + date filters on history and documents (~2–3 hours)

At this tier customers want to find things. Currently history sorts but doesn't filter. Documents filters by type but not by date or route. *"Show me all CMRs from March on the Lyon route"* = impossible in the UI.

Add MatFormField + MatInput search boxes on history and documents. Filter as-you-type on shipment ID, origin, destination. Date-range picker on history.

#### 6. Animated truck movement along route (~1–2 hours)

Cheaper version: CSS pulse (done in #3). Fuller version: JS `setInterval` that nudges the truck marker's `lat`/`lng` by small increments along the route vector every second. Makes it genuinely look like live GPS. Michal will ask "is this real-time?" and you say "the feed is from your GPS — yes."

#### 7. Mobile responsive pass on all 5 pages (~4–6 hours)

Header has a mobile menu, but the dashboard / map / history layouts probably break on a phone viewport. For the "open on your phone" demo moment to actually work (BRIEF.md wow moment #3), every page needs to be phone-usable at 375px viewport minimum.

Run `ng serve --host 0.0.0.0` and test on an actual phone via LAN IP.

### 🟢 Nice to have — polish only

#### 8. Dashboard sparklines / KPI trends (~1–2 hours)

Replace the 4 static stat cards with mini-charts: shipments-per-week trend, on-time rate, avg transit time. Chart.js or native SVG sparkline. Makes the dashboard feel like a tool, not a status page.

---

## What's NOT a problem — leave alone

Don't waste time on these at concept stage:

- **No real authentication.** Mock login / goes straight to dashboard is correct.
- **No real backend.** Mock JSON is enough. Don't scaffold a .NET API.
- **No real GPS integration.** Mock coordinates are the right call until production.
- **No admin panel for dispatchers.** That's Pattern 6, future phase (production scope from BRIEF.md).
- **No payment integration.** Out of scope for a shipper portal.
- **No push notifications / email alerts.** Explicitly excluded in BRIEF.md.

---

## Stack reference

Quick orientation for a new session:

- **Angular 21** + standalone components + signals
- **Angular Material 21** — `MatTable`, `MatSort`, `MatFormField`, `MatInput` imported per-component
- **Leaflet 1.9** + CARTO dark tiles for the map
- **TypeScript 5.9**
- **SCSS** — design tokens in `src/styles.scss` (CSS custom properties prefixed `--zt-`)
- **Mock data** in `src/assets/mock/shipments.json` + `customer.json`
- **Routes** in `src/app/app.routes.ts` — lazy via `loadComponent`, title per route
- **No tests, no backend, no auth** — by design for concept stage

Run with `ng serve` → [http://localhost:4200](http://localhost:4200).

---

## Strategic context (pipeline position)

This concept is one of two built prototypes, both awaiting outreach:

- **JAPAVO** (`C:/Users/cmisa/Desktop/Mike/Projects/japavo`) — B2B pasta-ordering portal, prototype built, outreach blocked until 28 April–8 May waiting on their ERP tender selection
- **Z-TRANS** (this project) — shipper tracking portal, prototype ~70% built, outreach can happen any time once demo is polished

After these two, the upper-mid-market hunt (manufacturing tier, €100–500M) in CZ/SK/DE/AT mostly failed: 7 candidates hunted → 4 rejected, 1 watch, 2 borderline, 0 PROCEED. The strategic learning is that €100–500M manufacturers have a high density of in-house dev teams, existing customer portals, and OEM-controlled industry platforms. **The pivot's vertical choice was wrong; the next hunt should try mid-cap logistics at €50–300M, property/real-estate operators, or specialized e-commerce at scale.**

Full pivot details in `C:/Users/cmisa/Desktop/Mike/Projects/client-hunter/` and the memory at `C:/Users/cmisa/.claude/projects/c--Users-cmisa-Desktop-Mike-Projects-client-hunter/memory/project_tier_pivot.md`.

---

## Recommended next action for a fresh Claude session

If you're opening this project for the first time and want to continue:

1. Read [BRIEF.md](BRIEF.md) for business context (5 minutes)
2. Read [CLAUDE.md](CLAUDE.md) for technical setup (2 minutes)
3. Run `ng serve` and click through all 5 screens — you'll see immediately what "works" vs "needs depth"
4. Pick from the prioritized to-do above. **Start with #1 (generate 40-60 mock shipments)** — single biggest credibility unlock for the lowest effort, and every other feature benefits from having realistic data.
