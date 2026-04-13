# Z-TRANS — Prototype Build Brief

## Who they are

Z-TRANS, s.r.o. is a **Slovak family-owned road freight carrier** based in Púchov (Trenčín region, ~45 km from Žilina). 40 Euro-6 trucks. Founded 1999 (current entity registered 2010). Revenue €2M (2025), profit €249k. Sole owner and statutory director: **Bc. Michal Zahustel**. Family operation: Jakub, Pavol, and Monika Zahustel also involved. IČO 45378266.

They specialize in **Slovakia ↔ France** long-haul routes, plus Europe-wide transport. Cargo: automotive parts, industrial machinery, steel components, consumer electronics. Clients are primarily French and Central European manufacturers/distributors.

## The problem we're solving

**Shippers call to ask "where is my truck?" — across timezones, across languages.** French-speaking shippers calling Slovak dispatchers multiple times per day for status updates on 48–96 hour transit loads. No tracking portal, no document self-service, no shipment history. Everything is phone and email. GPS monitoring exists internally but is invisible to customers.

## What we're building

A **shipper tracking portal** (Pattern 5 — Customer Portal) where Z-TRANS's customers can:
- See their active shipments on a live map with truck positions and ETA
- View full shipment details (origin, destination, driver, cargo, weight, status)
- Track shipment timeline (pickup → in transit → border crossing → delivered)
- Download documents: CMR notes, proof of delivery (POD), invoices
- Browse shipment history with filters
- Do all of this without calling anyone, in Slovak, French, or English

## The 5 screens to build

1. **Dashboard** — mock login → active shipments overview with status cards, next delivery ETA, monthly stats
2. **Shipment Map** — Leaflet/OpenStreetMap showing truck positions on SK–FR corridor with animated markers, route lines, ETA countdown, Z-TRANS branded markers (orange `#fc7820`)
3. **Shipment Detail** — single shipment: full timeline, origin/destination, current position, driver, cargo specs, document links
4. **Shipment History** — all past shipments in a sortable Angular Material table with status badges and date filters
5. **Documents** — CMR notes, delivery confirmations, invoices — filterable, downloadable per shipment

## The 3 wow moments (prioritize these in the UI)

1. **Live map with animated truck icon** on the SK→FR route. Orange Z-TRANS markers on navy map theme. Real GPS coordinates (Paris, Zürich, Lyon, Bordeaux, Marseille on the mock routes). This is the 60-second closer.
2. **Language switcher (SK/FR/EN)** — entire portal flips instantly. "Your French shippers use this in French. No translator needed."
3. **"Open on your phone"** — mid-demo, send the URL to Michal. Responsive portal loads in under 1 second with Z-TRANS logo and his fleet dashboard.

## What is NOT in the prototype

- No real GPS integration (all truck positions are pre-set mock coordinates — GPS vendor unknown)
- No real authentication (mock login → straight to dashboard)
- No real backend or API (all data is hard-coded JSON in `src/assets/mock/`)
- No real document upload or PDF generation (mock document links)
- No quote request or booking flow (future phase)
- No dispatcher admin panel (that's Pattern 6 — future phase)
- No push notifications or email alerts
- No payment/invoicing integration

## Brand guidelines

- **Primary color:** Orange `#fc7820`
- **Secondary color:** Navy `#2d3359`
- **Logo:** Z-TRANS logo from z-trans.sk
- **Tone:** Professional, reliable, family. "Na cestách od 1999" (On the road since 1999).
- **Map theme:** Dark/navy base map with orange markers and route lines
- **Typography:** Clean sans-serif

## Mock data

Already created in `src/assets/mock/`:
- **shipments.json** — 4 shipments (2 in transit SK→FR, 2 delivered) with real GPS coordinates along the SK–FR corridor (Púchov → Paris → Lyon → Marseille → Bordeaux), driver names (Jakub Zahustel, etc.), cargo descriptions, document lists
- **customer.json** — mock French shipper "Durand Industrie S.A." (47 total shipments, customer since 2022)

## Key decision-maker (the person who'll see this demo)

**Bc. Michal Zahustel** — sole owner, sole statutory director, Head of Transport. He is the single person who says yes. Phone: +421 911 870 650. LinkedIn confirmed (limited profile). Slovak-speaking.

The pitch to Michal: "Your French customers open this URL, see where their truck is on a map, and download their CMR — in French — without calling Púchov."

## Budget context

Z-TRANS revenue is €2M, profit €249k. This is a smaller deal than JAPAVO. Total project scope: ~€30k (M1 concept €3.2k → M2 MVP €14k → M3 full build €10k → M4 handover €3.2k). Milestone-based payments are essential — cash on hand is only ~€100k.

**Critical:** Must include a 12-month managed support package in the proposal. Z-TRANS has zero internal IT capacity — nobody to maintain the product post-delivery.

## Map implementation notes

- Using **Leaflet** with OpenStreetMap tiles (already installed: `npm install leaflet @types/leaflet`)
- Mock truck positions are real GPS coordinates on the SK–FR corridor
- Animate truck markers with CSS transitions or Leaflet moving markers
- Route lines: draw polylines from origin through current position to destination
- ETA display: calculate from mock `eta` field and show countdown

## Production scope (if they buy)

M2 MVP: real Angular + .NET backend, Postgres, JWT auth, GPS integration (vendor TBD — likely Webfleet/Samsara/Trimble API), document storage, shipper self-registration. M3: email/SMS notifications, analytics dashboard for Michal. M4: handover with 12-month support.

## Full research

The complete research dossier (9 sections, all sourced with URLs) is at `../client-hunter/research/z-trans.md`.
