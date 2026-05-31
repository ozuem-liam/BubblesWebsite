# BubblesWebsite — Product Requirements Document

## 1. What Is Bubbles?

Bubbles is a **multi-vendor cleaning services marketplace** operating in Lagos, Nigeria. It connects customers who need cleaning done with vetted local vendors (laundry shops, dry cleaners, cleaning businesses) who fulfil those orders. The platform is built around two audiences:

- **Customers** — busy professionals and households who want cleaning handled without friction
- **Vendors** — laundry and cleaning businesses that want steady order flow, logistics support, and reliable payouts

Bubbles currently operates via two mobile apps (Flutter customer app, React Native vendor app) and a shared REST API. The website (`BubblesWebsite`) is the public-facing web presence — marketing, brand trust, and a web portal for customers who don't want to use the mobile app.

---

## 2. Services Bubbles Offers

| Service | Description |
|---------|-------------|
| **Wash** | Deep-cleaned, fresh, folded laundry delivered to the door. Everyday wear to delicate fabrics. |
| **Dry Clean** | Gentle on fabric, tough on stains. For premium and delicate garments. |
| **Iron / Press** | Precision-pressed, wrinkle-free clothes returned sharp and ready to wear. |
| **Essentials** | Shoes, bags, rugs, duvets — specialist cleaning per item type. |
| **Fumigation** | Professional pest elimination for homes and businesses. |

**Fulfillment model:** Pickup & delivery (vendor collects, cleans, returns) and on-site (vendor comes to customer location).
**Coverage:** 20+ LCDAs across Lagos.
**Pricing:** Fixed, range-based, or quote-based per vendor. Pay-before or pay-after-service models.

---

## 3. Current Website State (What Exists)

The site is a **single-page marketing landing page** with these sections rendered in order:

| Section | Status | Notes |
|---------|--------|-------|
| **Hero** | Live | Fade-carousel with "Cleaning Made Simple For You", app store links (Play Store + App Store). Car wash and multi-slide variants are commented out. |
| **Services showcase** | Live | Scroll-driven panel showing 5 customer services (Wash, Dry Clean, Iron, Essentials, Fumigation) with images. Vendor tab commented out. |
| **How It Works** | Live | 3-step visual using SVG step images. CTA "Get Started" button loops back to `/` — broken. |
| **Backed by Tech** | Live | Photo grid + "Secure Payment", "Verified Vendor", "Eco-Friendly" badges. |
| **FAQ** | Live | Accordion, 4 customer FAQs + 6 vendor FAQs. Vendor tab toggle is commented out. |
| **Second Hero / App CTA** | Live | "Don't Get Left in the Basket" CTA, app store links again. |
| **Store Products** | Partial | Calls live API (`/item`), renders 8 items in a grid. Cart interactions all commented out. "View All Products" routes to `bubblesStoreRoute` but no `/store` page exists. |
| **Need Help** | Live | Simple support callout. |
| **Footer** | Live | Logo, contact (email + Lagos address), links (About, Services, Terms, Privacy Policy), Support (FAQ, Become a vendor), Socials (Twitter, Instagram, WhatsApp). |

**Auth & Dashboard:** Context file exists (`contexts/auth-context.tsx`), Zustand cart store exists (`stores/CartStore.ts`), but there are no `/auth` or `/dashboard` pages — only stubs referenced in comments.

---

## 4. What's Missing / Broken

### Critical gaps
- **No web ordering flow** — customers can't actually place an order from the website
- **No auth pages** — `/auth/sign-in`, `/auth/sign-up` don't exist despite being referenced
- **No customer dashboard** — order history, status tracking, addresses all absent
- **Vendor tab is hidden** — the Customer/Vendor toggle is commented out; the vendor pitch is invisible
- **Broken CTA** — "Get Started" routes to `/` instead of sign-up
- **Store page missing** — "View All Products" button has nowhere to go
- **Cart disabled** — all cart logic is commented out

### Content gaps
- No dedicated `/services` page (each service detailed)
- No `/vendor` or `/partner` landing page
- No `/about` page (company story, team, mission)
- No `/blog` or resources section
- No pricing/transparency page
- No `/contact` page
- No legal pages (`/terms`, `/privacy` — footer links are dead or point to an unrelated domain)

### Trust & conversion gaps
- No testimonials or reviews visible
- No coverage map or "Are you in my area?" checker
- No social proof counters (vendors, orders, LCDAs served)

---

## 5. Goals for the Website

1. **Convert visitors into app downloads** (primary KPI: Play Store + App Store click-throughs)
2. **Convert vendors** — laundry business owners landing on the site should understand the value proposition and sign up
3. **Support web ordering** — customers who don't want the app can book directly via the website
4. **Build brand trust** — verified vendor badges, eco-friendly story, coverage clarity, real testimonials
5. **SEO / discoverability** — service pages, city/LCDA landing pages, blog for organic traffic

---

## 6. Proposed Website Structure (Target State)

```
/                          Landing page (marketing)
/services                  Full services catalogue
/services/[slug]           Individual service page (wash, dry-clean, iron, essentials, fumigation)
/vendor                    Vendor acquisition landing page
/about                     Company story, mission, team
/blog                      Content marketing
/blog/[slug]               Article page
/contact                   Contact form + support links
/terms                     Terms of service
/privacy                   Privacy policy

/auth/sign-in              Customer login
/auth/sign-up              Customer registration
/auth/verify               OTP / email verification

/store                     Browse all vendors / services
/store/[vendorId]          Vendor shop page
/store/[vendorId]/order    Order flow (cart → schedule → pay)

/dashboard                 Customer dashboard (auth-gated)
/dashboard/orders          Order history + status tracking
/dashboard/orders/[id]     Order detail + OTP handshake
/dashboard/addresses       Saved addresses
/dashboard/profile         Account settings
/dashboard/wallet          Web wallet (view balance, payment methods)
```

---

## 7. Page Requirements

### 7.1 Landing Page (/) — Improvements
| Requirement | Priority |
|-------------|----------|
| Un-comment vendor tab and restore Customer/Vendor toggle | High |
| Fix "Get Started" CTA → `/auth/sign-up` | High |
| Add real testimonials / star ratings section | High |
| Add social proof counters (e.g. "2,000+ orders", "20+ LCDAs", "150+ vendors") | High |
| Add coverage section — map or LCDA list | Medium |
| Re-enable multi-slide hero (car wash, etc.) or replace with a focused single slide | Medium |
| Fix Store Products section — either link to `/store` or remove until the page exists | High |

### 7.2 Services Pages (/services + /services/[slug])
Each service (Wash, Dry Clean, Iron, Essentials, Fumigation) needs:
- Hero with service name + short description
- How it works (steps specific to that service)
- Pricing clarity (ranges if available)
- CTA → book now (web order flow or app download)
- Related services

### 7.3 Vendor Landing Page (/vendor)
- Headline: "Grow your laundry business with Bubbles"
- Value props: More orders, streamlined management, reliable payouts
- How onboarding works (4 steps matching the API flow)
- Earnings calculator or example revenue
- Testimonials from existing vendors
- CTA → download vendor app (Play Store link)
- FAQ (pull from existing vendor FAQ data)

### 7.4 Auth (/auth/sign-in, /auth/sign-up)
- Connect to existing backend: `POST /customer/register`, `POST /customer/login`
- Email OTP verification flow
- JWT stored in cookie or localStorage, synced with `auth-context.tsx`
- Redirect to `/dashboard` after login

### 7.5 Store & Order Flow (/store)
- Browse vendors by service category
- Filter by LCDA / area
- View vendor shop: services, pricing, ratings
- Add items to cart (re-enable Zustand CartStore)
- Schedule pickup
- Payment via Paystack

### 7.6 Customer Dashboard (/dashboard)
- Order list with status badges (matching the 15+ order statuses)
- Real-time status updates
- OTP display at pickup and collection stages
- Address management
- Profile editing

### 7.7 About, Contact, Legal
- `/about`: Brand story, team, office address (10 Hughes Ave, Alagomeji-Yaba, Lagos)
- `/contact`: Form + email (williams@bubblesng.com) + WhatsApp (+234 810 595 1215)
- `/terms`, `/privacy`: Replace the dead/third-party links in the footer

---

## 8. Design & Technical Principles

- **Stack stays the same**: Next.js 15, TypeScript, Tailwind 4, Framer Motion, Radix UI, Zustand, react-hook-form + zod
- **API**: All data fetching hits `https://api.bubbles.com/api/v1` — same backend as mobile apps, customer accounts are shared
- **Auth**: JWT Bearer token, same credentials work on web and mobile
- **Font**: Hanken Grotesk (already set in layout)
- **SEO**: Each service and vendor page should have unique metadata (title, description, OG tags)
- **Performance**: Images via Next.js `<Image>` (already consistent), lazy-load below-fold assets
- **Accessibility**: Radix UI primitives are already in use — maintain keyboard navigation and ARIA throughout
- **Mobile-first**: The site already handles this well; maintain the pattern

---

## 9. Prioritised Build Order

| Phase | Work | Why |
|-------|------|-----|
| **Phase 1 — Fix what's broken** | Fix "Get Started" CTA, restore vendor tab, fix/remove broken store section, fix footer legal links | Immediate trust and conversion damage |
| **Phase 2 — Auth + Dashboard** | `/auth` pages, `/dashboard` with orders | Enables web customers, unlocks retention |
| **Phase 3 — Store & Ordering** | `/store`, vendor pages, cart + Paystack checkout | Core revenue path on web |
| **Phase 4 — Marketing pages** | `/services/[slug]`, `/vendor`, `/about`, `/contact`, legal pages | SEO, vendor acquisition, brand completeness |
| **Phase 5 — Growth** | Blog, coverage map, testimonials engine, social proof counters | Organic acquisition and conversion uplift |
