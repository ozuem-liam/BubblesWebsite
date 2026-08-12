# PRD: Bubbles Content Hub for SEO & AEO

## Overview

Build a content hub and publishing system for Bubbles that grows qualified organic traffic, improves Google visibility, and makes Bubbles an accurate, answer-ready source for AI search experiences such as Google AI Overviews, ChatGPT, and Perplexity.

The product combines high-intent service pages with a CMS-powered blog, useful FAQs, structured data, and measurable search performance.

## Goal

Position Bubbles as a trusted Nigerian marketplace for laundry, cleaning, fumigation, repairs, and other everyday services, beginning with Lagos and Abuja.

Success means:

- More qualified organic traffic and conversions.
- More pages correctly indexed by Google.
- Visibility for local service and informational searches.
- Content that AI search tools can accurately summarize and cite.
- Clear paths from search content to downloading the customer app, finding a provider, or becoming a vendor.

## Target audiences

- Customers seeking laundry, cleaning, fumigation, repairs, or local service professionals.
- Vendors looking to grow their service business.
- Search engines and AI assistants seeking reliable, structured information about Bubbles and its services.

## Product scope

### Public experience

- `/blog`: searchable article index with categories, featured content, and pagination.
- `/blog/[slug]`: individual article pages.
- `/guides`: optional evergreen guides, added later if needed.
- `/services/[service]`: core service-intent pages.
- `/locations/[city]` and `/locations/[city]/[service]`: only for genuinely supported services and locations.
- Improved FAQ and support content.
- About, Contact, Coverage Areas, and Vendor pages.

### Admin experience

Add a content-management section to the existing Bubbles admin dashboard.

| Field | Purpose |
| --- | --- |
| Title | Article heading |
| Slug | Search-friendly URL |
| Excerpt | Blog-card and search summary |
| Content | Rich article content |
| Cover image and alt text | Visual quality and accessibility |
| Author | Credibility |
| Category and tags | Discovery and internal linking |
| SEO title | Optimized search title |
| Meta description | Search-result summary |
| Canonical URL | Duplicate-content prevention |
| Publish date | Freshness |
| Status | Draft, scheduled, published, or archived |
| Related service and location | Qualified conversion path |
| FAQ items | Answer extraction and FAQ schema |

## Backend and CMS requirements

The Bubbles API must own content data and publishing permissions. The public website reads only published content; drafts, scheduled content, revisions, and administrative activity must never be publicly accessible or indexed.

### Roles and permissions

| Role | Permissions |
| --- | --- |
| Admin | Full access: manage content, categories, authors, media, publication, redirects, and user roles. |
| Editor | Create and edit articles, manage SEO fields and media, submit for review, and publish if granted publication permission. |
| Author | Create and edit only their assigned drafts; submit articles for review; cannot publish directly. |
| Viewer | Read-only access to the content workspace and reporting. |

The API must enforce these permissions server-side. The frontend must not be the source of authorization decisions.

### Core data model

| Entity | Required fields and behaviour |
| --- | --- |
| `Article` | `id`, `title`, `slug`, `excerpt`, `content`, `status`, `seoTitle`, `metaDescription`, `canonicalUrl`, `coverImageId`, `coverImageAlt`, `authorId`, `publishedAt`, `scheduledFor`, `lastUpdatedAt`, `createdAt`, `updatedAt`, `relatedServiceSlugs`, and `relatedLocationSlugs`. |
| `ArticleRevision` | Immutable snapshot of article content and metadata on every save or publish. Includes `articleId`, `revisionNumber`, `snapshot`, `createdBy`, and `createdAt`. Enables audit history and rollback. |
| `Category` | `id`, `name`, `slug`, `description`, `seoTitle`, `metaDescription`, `sortOrder`, and active state. An article may have one primary category and multiple secondary categories/tags. |
| `Tag` | `id`, `name`, and unique `slug`; used for discovery, not as a substitute for categories. |
| `AuthorProfile` | Links an authenticated admin user to public `displayName`, `bio`, optional profile image, and role/credentials. |
| `MediaAsset` | `id`, storage URL/public ID, MIME type, dimensions, file size, alt text, caption, `uploadedBy`, `createdAt`, and optional focal point. |
| `ArticleFaq` | `id`, `articleId`, question, answer, `sortOrder`, and active state. Only active FAQs displayed on the article may be emitted as `FAQPage` schema. |
| `Redirect` | `fromPath`, `toPath`, HTTP status (default `301`), active state, createdBy, and timestamps. Used when a published slug changes or an article is retired. |
| `ContentAuditLog` | Actor, action, target entity, before/after metadata, IP/request identifier where available, and timestamp. |

### Article status lifecycle

```text
draft → in_review → scheduled → published → archived
                 ↘ draft        ↘ draft
```

- `draft`: private, editable, excluded from public APIs, sitemap, and indexing.
- `in_review`: private, awaiting editor approval.
- `scheduled`: private until `scheduledFor`; must pass validation before scheduling.
- `published`: visible through public APIs, indexable, eligible for sitemap inclusion.
- `archived`: no longer public; return `410 Gone` or redirect to the closest relevant page. The decision must be explicit per article.

Only `published` content may be returned by unauthenticated endpoints. A scheduled job must publish eligible articles at or after their scheduled time, record the action, trigger website revalidation, and update sitemap eligibility.

### API requirements

All write endpoints require authenticated staff roles. Public endpoints must return only published, non-future-dated content.

| Endpoint | Purpose |
| --- | --- |
| `GET /content/articles` | Public paginated article listing with supported filters: category, tag, search query, and page. |
| `GET /content/articles/:slug` | Public published article by slug. Return `404` for unknown/unpublished content. |
| `GET /content/categories` | Public active categories and article counts. |
| `GET /admin/content/articles` | Authenticated content listing, including status, author, and scheduled date. |
| `POST /admin/content/articles` | Create a draft. |
| `PATCH /admin/content/articles/:id` | Update draft/reviewed content according to role permissions. |
| `POST /admin/content/articles/:id/submit-review` | Move an article to `in_review`. |
| `POST /admin/content/articles/:id/publish` | Publish immediately after validation. |
| `POST /admin/content/articles/:id/schedule` | Schedule an article for publication. |
| `POST /admin/content/articles/:id/archive` | Archive with a required archive/redirect strategy. |
| `GET /admin/content/articles/:id/revisions` | Read revision history. |
| `POST /admin/content/articles/:id/revisions/:revisionId/restore` | Restore a previous revision as a new draft revision. |
| `POST /admin/content/media` | Upload and register a media asset. |
| `GET/POST/PATCH/DELETE /admin/content/categories` | Manage categories. |
| `GET/POST/PATCH/DELETE /admin/content/tags` | Manage tags. |
| `GET/POST/PATCH/DELETE /admin/content/redirects` | Manage permanent redirects. |

Endpoint naming may follow existing API conventions, but the behaviours above are required.

### Content validation

Before an article can be scheduled or published, the backend must validate:

- A unique, URL-safe slug exists and does not conflict with a live redirect.
- Title, excerpt, body, author, primary category, SEO title, and meta description are present.
- SEO title and meta description meet defined editorial length guidance.
- `publishedAt` is valid and not in the future for an immediately published article.
- A cover image has meaningful alt text when an image is used.
- Internal links use valid paths or approved external URLs.
- Canonical URLs, when overridden, are trusted Bubbles URLs unless an administrator explicitly approves an exception.
- FAQs contain both a question and an answer.
- Articles do not make prohibited or unverified pricing, service, coverage, safety, or performance claims.

The admin UI should show these validations before publication, but the API must enforce them.

### Media requirements

- Store media in the existing approved image storage provider; save provider public IDs rather than relying only on mutable URLs.
- Accept images only; restrict MIME types, dimensions, and file size according to backend security policy.
- Generate optimized variants for listing cards, article covers, and social sharing where the image provider supports it.
- Require alt text for editorial images; decorative images may be explicitly marked decorative.
- Support replacement without breaking historical revisions.
- Do not expose upload credentials to the public website.

### Slugs, URLs, and redirects

- Slugs are immutable after publication unless an editor deliberately changes them.
- On a published slug change, automatically create a `301` redirect from the old article path to the new path.
- Do not reuse published or redirected slugs without an explicit administrator override.
- When archiving an article, require either a related replacement URL (`301`) or an intentional `410 Gone` response.
- Canonical URLs must resolve to the public published URL for the article unless an approved exception applies.

### Website integration and caching

- The Next.js website must render public content server-side for crawlers and users.
- Article and category pages must use the backend as their source of truth; no article body should be duplicated manually in website source code.
- Generate page metadata, canonical URLs, Open Graph tags, and `BlogPosting`/`BreadcrumbList` JSON-LD from the published article response.
- Revalidate the article route, blog index, relevant category routes, and sitemap whenever an article is published, updated, archived, or redirected.
- Protect the revalidation endpoint with a shared secret and restrict calls to the trusted backend.
- Cache public content appropriately, while ensuring a publish/update becomes visible within the agreed service window (target: five minutes or less).

### Sitemap and indexing rules

- The sitemap must be generated from currently published articles, core pages, and qualifying landing pages.
- Each sitemap item must use the article's public canonical URL and an accurate `lastModified` value.
- Draft, review, scheduled, and archived articles must not appear in the sitemap.
- Archived articles returning `410` must be removed from the sitemap immediately; redirected articles must list only their destination if indexable.
- Admin, preview, and content-management routes must be `noindex` and excluded in `robots.txt`.
- The backend must trigger revalidation after a status change so sitemap changes are reflected promptly.

### Editorial workflow

1. Author creates a draft and completes content, SEO, category, author, media, related links, and FAQ fields.
2. Author submits the article for review.
3. Editor reviews factual accuracy, local relevance, marketplace language, internal links, AEO answer quality, and SEO validation.
4. Editor publishes immediately or schedules the article.
5. Backend records the revision/audit log, triggers website revalidation, and makes the article eligible for the sitemap.
6. The content owner reviews Search Console and conversion performance; significant changes create a new revision.

## SEO requirements

Every indexable page must have:

- A unique title, meta description, canonical URL, Open Graph, and Twitter metadata.
- One clear H1 and logical H2/H3 hierarchy.
- Accessible images with useful alt text.
- Server-rendered, crawlable content.
- Internal links to relevant services, locations, articles, and conversion actions.
- Inclusion in `sitemap.xml` when published.
- Exclusion from indexing and the sitemap when draft, private, or archived.
- Clean readable URLs, for example `/blog/laundry-pickup-cost-lagos`.
- No duplicate location pages with substantially identical content.

### Structured data

- `Organization` and `WebSite` globally.
- `BreadcrumbList` on articles and landing pages.
- `BlogPosting` on articles.
- `FAQPage` only when matching visible FAQ content is present.
- `LocalBusiness` only where factual business/location details are current and maintained.

## AEO requirements

Content must be easy for answer engines to quote and summarize accurately.

Each article must:

- Answer its main question in the first 100–150 words.
- Use clear question-based headings.
- Include concise direct answers before deeper explanation.
- State location, applicability, and caveats clearly.
- Attribute factual claims when needed.
- Include visible FAQs where useful.
- Describe Bubbles accurately as a marketplace connecting customers with independent providers; do not imply Bubbles performs every listed service.
- Display a "Last updated" date and author or editor identity.

Example answer format:

> **How much does laundry pickup cost in Lagos?** Laundry pickup costs vary by provider, service type, and distance. Bubbles shows the available price and delivery option before a customer confirms a request.

## Content strategy

### Core content pillars

- Laundry and dry cleaning
- Home and office cleaning
- Fumigation
- Everyday repairs and artisans
- Customer booking guidance
- Vendor business growth
- Location-specific service guidance

### First 12 articles

1. How laundry pickup and delivery works in Lagos
2. How to choose a laundry service in Lagos
3. Laundry care guide for delicate fabrics
4. What affects laundry pickup costs?
5. How often should you fumigate your home?
6. Moving-in cleaning checklist for Nigerian homes
7. How to prepare your home for a cleaning appointment
8. Dry cleaning vs wash-and-fold: what is the difference?
9. How to find reliable service professionals in Lagos
10. What to expect when booking a service through Bubbles
11. How service vendors can get more customers online
12. A guide to managing service bookings as a busy professional

## Conversion requirements

Each page needs one primary, context-relevant action:

- Customer content: download/open the Bubbles customer app or find an available service.
- Vendor content: become a Bubbles vendor.
- General content: contact Bubbles or explore services.

Avoid intrusive popups that harm reading experience or performance.

## Measurement

Track through Google Search Console and analytics:

- Indexed pages.
- Organic impressions, clicks, click-through rate, and average position.
- Non-branded traffic growth.
- Ranking keywords by service and city.
- Blog-to-app and blog-to-vendor CTA clicks.
- Article engagement and conversion rate.
- Crawl errors, duplicate pages, and Core Web Vitals.
- AI referral traffic where available.

## Delivery phases

### Phase 1: Foundation

- Deploy sitemap, robots, metadata, canonicals, and city pages.
- Configure Google Search Console and analytics.
- Add global `Organization` and `WebSite` schema.
- Build the blog data model and public article templates.

### Phase 2: Publishing workflow

- Build admin content creation, preview, review, scheduling, and publication.
- Add automatic sitemap updates and article schema.
- Publish the first 8–12 high-quality articles.

### Phase 3: Content clusters

- Expand service and city pages based on real availability.
- Build internal links between guides, services, and locations.
- Create coverage-area and service hubs.

### Phase 4: Optimization

- Review Search Console monthly.
- Improve pages with strong impressions but weak click-through rate.
- Create content based on real search queries and customer questions.
- Improve pages that receive traffic but do not convert.

## Non-goals

- Mass-producing thin city/service pages.
- Publishing AI-generated content without human review.
- Making unverified claims about service, pricing, coverage, or quality.
- Chasing keywords unrelated to Bubbles' real services.

## Acceptance criteria

The first release is complete when:

- Admin users can draft, preview, schedule, publish, edit, and archive posts.
- Published articles render at stable `/blog/[slug]` URLs.
- Published articles have valid metadata, canonical URLs, and article/breadcrumb structured data.
- Published articles appear in the sitemap within one deployment/update cycle.
- Drafts and archived articles are not indexable.
- `/blog` supports category filtering and pagination.
- Every article includes a relevant conversion CTA.
- Google Search Console validates sitemap discovery and reports no blocking crawl issues.

## Guiding principle

Publish fewer, genuinely useful, locally accurate pages that answer real questions better than generic content farms.
