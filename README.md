# BIKECARE — Premium Bike Servicing

> Keep Your Ride Running Perfect.

A premium, fully responsive bike-servicing website with a light‑luxury
glassmorphism design system, built with **Next.js 15 (App Router)**,
**TypeScript**, and **Framer Motion**.

## ✨ Highlights

- **17 pages** — home, services, service detail (dynamic), pricing, how‑it‑works,
  multi‑step booking, offers, about, contact, testimonials, FAQ, track service,
  login/signup, customer dashboard, privacy, terms, and a themed 404.
- **Glassmorphism UI** — frosted cards, blurred nav, aurora background, hidden scrollbar.
- **Animated throughout** — scroll reveals, staggered grids, animated counters, marquee,
  magnetic/tilt hovers, page transitions.
- **Custom glass controls** — a bespoke animated dropdown (`Select`) and calendar
  (`DatePicker`) replace the default browser widgets everywhere.
- **Fully responsive** — designed mobile‑first, verified 1440 → 375px, no horizontal overflow.
- **Everything works** — search, filters, sorting, multi‑step booking with validation,
  coupon codes, live order summary, toasts, service tracking, and more.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (port 5173) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

## 🗂 Structure

```
app/            # App Router pages + globals.css (design system)
components/     # Navbar, Footer, Select, DatePicker, Motion primitives, UI, …
lib/data.ts     # Central data: services, plans, brands, testimonials, FAQs, imagery
```

## 🎨 Design tokens

Warm ivory background `#F8F6F1`, near‑black ink `#161616`, burnt‑orange accent `#C96A3D`.
Editorial serif (Fraunces) headlines + Plus Jakarta Sans body.

## ☁️ Deployment

Deployed on **Vercel**, auto‑building from the `main` branch of this GitHub repo.
Every push to `main` triggers a new deployment.

---

Photography via [Unsplash](https://unsplash.com). Built with care. 🏍️
