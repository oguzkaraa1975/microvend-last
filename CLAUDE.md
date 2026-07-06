# CLAUDE.md — Microvend Project Guide

## 1. Project Identity

Microvend is a digital showcase platform for micro and small businesses.

It is not a marketplace.

Do not build marketplace features unless explicitly requested:

* Cart
* Checkout
* Payment
* Order management
* Inventory management
* Commission logic

Core positioning:

> A premium, simple, commission-free digital showcase for micro businesses.

## 2. Product Logic

Microvend helps small sellers present their brand, products, campaigns, and contact channels.

Main user flow:

1. Visitor lands on Home.
2. Visitor understands the value proposition.
3. Visitor browses categories.
4. Visitor sees seller cards.
5. Visitor opens seller detail page.
6. Visitor contacts seller through WhatsApp, Instagram, or website.
7. Seller applies through application form.

Transactions happen outside Microvend.

## 3. Target Customers

Primary customers:

* Micro businesses
* Local shops
* Handmade product sellers
* Boutique brands
* Local food producers
* Home-based sellers
* Instagram-first sellers
* Small service providers

Their problems:

* No professional website
* Instagram looks unstructured
* Low digital trust
* Limited technical skill
* Need visibility without marketplace commissions

## 4. Business Model

Initial package model:

* Silver: 10 USD / month
* Gold: 25 USD / month
* Premium: 100 USD / month

The first MVP can run as a free pilot.

Do not implement payment, billing, or subscriptions in the first MVP unless explicitly requested.

## 5. Tech Stack

Current stack:

* React
* TypeScript
* Vite
* Tailwind CSS
* pnpm

Possible future backend:

* Supabase

Do not migrate to Next.js or another framework unless explicitly requested.

Do not add heavy dependencies unless clearly necessary.

## 6. Design Direction

Microvend should feel:

* Premium
* Minimal
* Clean
* Calm
* Trustworthy
* Modern
* Lightweight

Avoid:

* Flashy marketplace visuals
* Aggressive sales language
* Dense layouts
* Too many colors
* Too many animations
* Generic SaaS clutter

## 7. Visual System

Preferred palette:

* Background: `#fcfcfc`
* Primary: `#4e7bab`
* Accent 1: `#6b91b9`
* Accent 2: `#88a7c7`
* Accent 3: `#a5bed6`

Use white, soft gray, and muted blue tones.

Do not introduce unrelated colors except for validation, warning, or accessibility states.

Typography direction:

* Headings: Montserrat Light / Montserrat
* Body: Montserrat or clean sans-serif fallback

Use spacious layouts, readable text, and calm card structures.

## 8. Expected Pages

Expected pages may include:

* Home
* Categories
* Category detail
* Sellers
* Seller detail
* Apply
* About
* Pricing

Use the existing routing structure.

Do not rewrite routing unless necessary.

## 9. Expected Components

Expected components may include:

* Header
* Hero
* CategoryGrid
* FeaturedSellers
* SellerCard
* SellerDetail
* PricingPlans
* SellerApplySection
* Footer

Reuse components where possible.

Avoid duplicating large UI blocks.

## 10. Mock Data

Mock data should usually live in:

* `src/data/mockData.ts`

Expected data groups:

* categories
* sellers
* pricing plans
* featured sellers

Do not hardcode seller or category data inside visual components if mock data already exists.

Keep data structures compatible with future Supabase tables.

## 11. Seller Data Model

A seller should generally support:

* id
* slug
* name
* categoryId
* categoryName
* city
* shortDescription
* fullDescription
* story
* coverImage
* logoImage
* tags
* instagramUrl
* whatsappUrl
* websiteUrl
* featured
* planType

Keep field names consistent.

If new fields are needed, update mock data and affected components cleanly.

## 12. Category Data Model

A category should generally support:

* id
* slug
* name
* description
* image
* sellerCount
* featured

Category URLs should use slugs, not display names.

## 13. Development Priorities

Current priority order:

1. Stabilize frontend structure.
2. Ensure all pages render correctly.
3. Implement category filtering.
4. Implement seller search.
5. Implement seller detail pages.
6. Improve application form UX.
7. Improve mobile responsiveness.
8. Prepare data structure for Supabase.
9. Add basic SEO.
10. Add backend only after frontend MVP is clean.

## 14. MVP Scope

MVP should include:

* Home page
* Category browsing
* Seller cards
* Seller detail page
* Application form
* Pricing section
* Responsive layout
* Clean mock data

MVP should not include unless requested:

* User login
* Seller dashboard
* Payment
* Subscription billing
* Admin panel
* Multi-language support
* Marketplace checkout

## 15. Coding Rules

Use TypeScript properly.

Keep components small, readable, and focused.

Prefer clear prop names.

Avoid overengineering.

Do not add Redux, Zustand, or similar state tools unless explicitly requested.

Use React hooks simply and predictably.

Preserve existing working logic unless a change is necessary.

When editing an existing file, make the smallest effective change.

## 16. Styling Rules

Use Tailwind CSS consistently.

Preserve the current blue-white premium/minimal identity.

Use generous spacing.

Cards should feel clean and credible.

Buttons should be clear, not aggressive.

CTAs should use Microvend blue tones.

Maintain responsive behavior for mobile and desktop.

Avoid inline styles unless there is a strong reason.

## 17. Routing Rules

Use existing routing setup.

Do not replace routing architecture unless explicitly requested.

Category and seller detail pages should use slugs when possible.

Navigation links must match actual routes.

Avoid broken routes.

## 18. Forms

Application form should collect:

* Full name
* Brand name
* Category
* City
* Email
* Phone
* Instagram
* Website
* Short description

Validation should be simple:

* Required fields
* Basic email validation
* Clear error message
* Clear success message

If backend is absent, simulate successful submission cleanly.

## 19. Accessibility

Use semantic HTML.

Buttons must be buttons.

Links must be links.

Images should have alt text.

Text contrast must stay readable.

Interactive elements should have visible hover/focus states.

## 20. Performance

Keep the app lightweight.

Avoid unnecessary packages.

Avoid large image files.

Avoid complex animation libraries.

Use reusable components.

## 21. SEO Direction

Basic SEO may later include:

* Page titles
* Meta descriptions
* Open Graph tags
* Clean URLs
* Seller/category slugs

Do not prioritize advanced SEO before the MVP flow works.

## 22. Supabase Future Direction

Supabase may later be used for:

* Sellers
* Categories
* Applications
* Admin review
* Featured seller status
* Uploaded images

Do not implement Supabase until explicitly requested.

## 23. Admin Panel Future Direction

Admin panel may later include:

* View applications
* Approve/reject sellers
* Add/edit sellers
* Manage categories
* Mark sellers as featured
* Manage pricing plans

Do not build admin panel in the first MVP unless requested.

## 24. Claude Code Workflow

Before making changes:

1. Inspect relevant files.
2. Summarize current structure.
3. List files that will be changed.
4. Explain the intended change briefly.

After making changes:

1. Summarize what changed.
2. List changed files.
3. Mention known limitations.
4. Suggest the next practical step.

Do not make broad unrelated changes.

Do not refactor the whole project unless explicitly requested.

## 25. Commands

Use only commands that exist in `package.json`.

Common commands may include:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

If this project uses npm instead of pnpm, use the existing package manager shown by lock files.

## 26. Git Discipline

Do not create commits unless explicitly requested.

Do not change remote settings.

Do not overwrite user work.

Do not delete files unless clearly obsolete and confirmed.

## 27. First Recommended Task

When starting work, inspect:

* `package.json`
* `src/App.tsx`
* `src/main.tsx`
* `src/index.css`
* `src/data/mockData.ts`
* `src/components`
* `src/pages`

Then report:

* Current file structure
* What already works
* What is missing
* Recommended next 3 development steps

Do not edit files before this first inspection unless explicitly instructed.

## 28. Current Strategic Direction

First goal: produce a strong visual frontend MVP.

The product should prove:

* The concept is understandable.
* Sellers can be displayed attractively.
* Categories work.
* Seller profiles work.
* Application flow works.
* The design feels credible enough for pilot outreach.

Do not prematurely build complex infrastructure.
