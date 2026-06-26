# Typography System

This project uses two carefully selected font families to establish a premium, modern, and technical visual identity.

Typography should create hierarchy through scale, spacing, and rhythm before relying on color or decoration.

Do not introduce any additional font families.

---

# Primary Heading Font

## JetBrains Mono

Use JetBrains Mono for:

* Hero headlines
* Section headings
* Feature titles
* Pricing titles
* Statistics
* Technical labels
* Small UI badges
* Code snippets (if any)

The goal is to create a refined engineering aesthetic inspired by premium developer-focused products.

Avoid using JetBrains Mono for long paragraphs.

---

# Primary Body Font

## Inter

Use Inter for:

* Body text
* Navigation
* Buttons
* Cards
* Pricing descriptions
* Testimonials
* FAQ
* Footer
* Form elements
* Captions
* Supporting copy

Inter should provide excellent readability across every viewport.

---

# Typography Principles

Maintain generous whitespace.

Large confident headings.

Comfortable body copy.

Avoid dense paragraphs.

Maintain consistent line height and spacing throughout the application.

Prefer typography hierarchy over excessive color.

Whitespace should create emphasis more effectively than bold text.

Typography should feel calm, premium, and intentional.

---

# Recommended Font Weights

## JetBrains Mono

* 500 — Technical labels
* 600 — Section headings
* 700 — Hero headings

Avoid excessive use of very heavy font weights.

---

## Inter

* 400 — Body copy
* 500 — Navigation
* 500–600 — Buttons
* 600 — Subheadings
* 700 — Only when strong emphasis is necessary

Use font weights consistently throughout the project.

---

# Font Loading

Use Next.js font optimization.

Since local font files are not provided, use `next/font/google` to load:

* JetBrains Mono
* Inter

Do not use CSS `@import`.

Do not load fonts using external `<link>` tags.

Allow Next.js to optimize, preload, and subset the fonts automatically.

---

# Responsive Typography

Typography should scale fluidly across devices.

Support:

* Mobile (320px+)
* Tablet
* Laptop
* Desktop
* Large displays

Avoid oversized headings on small screens.

Maintain comfortable line lengths.

Prevent text overflow, clipping, or awkward wrapping.

---

# Accessibility

Ensure sufficient color contrast.

Respect browser zoom levels.

Use semantic heading hierarchy (`h1` → `h6`).

Do not use typography as the sole method of conveying meaning.

Text should remain readable for users with reduced vision.

---

# Overall Goal

The typography should feel clean, premium, and highly readable.

The visual impression should resemble modern software products such as Linear, Vercel, Stripe, Raycast, and Apple—minimal, confident, and engineered with precision.
