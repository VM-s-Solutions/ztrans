# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read order for a fresh session

The project is past the build phase. As of 2026-04-13 the prototype is demo-ready and the next phase is **outreach → pitch → close**.

1. **[NEXT_STEPS.md](NEXT_STEPS.md)** — the operational playbook for getting Michal Zahustel from cold to signed. **Read this first.** It contains: outreach plan, pitch meeting structure, demo sequence, pricing milestones (€3,200 M1 → €30,400 total), objection handling, post-meeting follow-up cadence, pre-outreach checklist.
2. **[STATUS.md](STATUS.md)** — current state of what's built, what shipped, what was deferred.
3. **[BRIEF.md](BRIEF.md)** — business context: client, problem, 3 wow moments, brand guidelines, pitch line.
4. **This file (CLAUDE.md)** — technical setup, commands, architecture rules. Only needed if you're modifying code.

## What this project is

A shipper portal prototype for Z-TRANS s.r.o. (Slovak freight carrier, 40 trucks, SK-to-FR routes). Pattern 5 — Customer Portal from the Client Hunter playbook. This is a **prototype for a pitch meeting**, not production software.

## Commands

- `ng serve` — start dev server at localhost:4200
- `ng build` — production build to dist/
- `ng generate component {name}` — scaffold a new component

## Architecture

- Angular 19+ with Angular Material
- Leaflet (OpenStreetMap) for map visualization
- 5 prototype screens: Dashboard, Shipment Map, Shipment Detail, Shipment History, Documents
- Mock data in `src/assets/mock/*.json` — no real backend, no real GPS
- Z-TRANS brand colors: orange `#fc7820`, navy `#2d3359`

## The 5 screens

1. **Dashboard** — active shipments count, recent activity, quick links to map and documents
2. **Shipment Map** — Leaflet map showing truck positions on SK-FR routes with animated markers, ETA display
3. **Shipment Detail** — single shipment view: origin/destination, current position, ETA, driver, cargo details, document links
4. **Shipment History** — all past shipments in a sortable Material table with status badges
5. **Documents** — CMR notes, delivery confirmations (POD), invoices — downloadable per shipment

## Key constraints

- All data is hard-coded mock JSON. No API calls. No auth. No real GPS feed.
- Truck positions are pre-set in mock data. The "live" feel comes from showing recent timestamps.
- Must look like Z-TRANS's brand — orange `#fc7820` + navy `#2d3359`.
- 5 screens max. Polish these, don't add more.
- Must be responsive — Michal Zahustel will see this on his phone.
- The wow moment: animated truck icon on a real map showing the SK-FR route with ETA countdown.

## Mock data

- `src/assets/mock/shipments.json` — 4 shipments (2 in transit, 2 delivered) with real GPS coordinates on SK-FR routes
- `src/assets/mock/customer.json` — mock French shipper customer (Durand Industrie S.A.)

## Research dossier

Full research at `../client-hunter/research/z-trans.md`. Build brief is pinned at the top of that file.
