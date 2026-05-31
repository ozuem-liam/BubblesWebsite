# Bubbles Website — Reference

**Stack**: Next.js 15.2.2, TypeScript 5, Tailwind CSS 4, Radix UI, Framer Motion, Zustand 5
**Role**: Marketing/customer-facing web presence — landing page, customer web portal

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` 15.2.2 | React framework with App Router |
| `tailwindcss` 4.0.14 | Utility CSS |
| `framer-motion` | Page/component animations |
| `swiper` | Carousel/slider components |
| `@radix-ui/*` | Accessible UI primitives |
| `react-hook-form` + `zod` | Form handling & validation |
| `zustand` 5.0.5 | Client state |
| `date-fns` | Date formatting |
| `lucide-react` | Icons |

---

## Directory Map

```
app/
├── auth/                             # Web authentication (login/register)
└── dashboard/                        # Customer web dashboard

components/
└── (marketing + UI components)

public/
└── (static assets, images)
```

---

## Key Sections

- **Landing page**: Hero, features, how-it-works, CTA
- **Auth** (`/auth`): Customer login / registration
- **Dashboard** (`/dashboard`): Customer order management via web

---

## Run / Build

```bash
npm run dev       # Dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production
```

---

## Relates To

- **Backend**: `../bubbles/` — calls same REST API as mobile apps
- Customer accounts are shared between this website and the Flutter mobile app
- See root `../CLAUDE.md` for full platform overview
