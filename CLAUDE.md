# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

This is the marketing website for Notipus, a real-time customer intelligence platform for Slack
notifications. Built with Hugo (static site generator) and Tailwind CSS.

## Commands

**Note:** This project uses `bun` as the package manager, not `npm`.

```bash
# Development - start Hugo server with drafts
bun run dev

# Production build - generates minified output to /public
bun run build

# Linting (runs in CI)
bun run lint           # CSS + Markdown
bun run lint:css       # Stylelint only
bun run lint:md        # Markdownlint only
bun run lint:html      # HTMLHint only

# Formatting
bun run format         # Apply Prettier
bun run format:check   # Check formatting (runs in CI)

# Clean build artifacts
bun run clean
```

For local preview with nginx: `docker-compose up` (port 8080)

## Architecture

**Hugo Structure:**

- `layouts/` - HTML templates using Go templating
  - `_default/baseof.html` - Base wrapper template
  - `_default/index.html` - Home page template (main landing page logic)
  - `partials/` - Reusable components (head, header, footer, SEO, schema)
- `content/` - Markdown pages (home, pricing, privacy)
- `assets/css/main.css` - Tailwind CSS source (uses `@tailwind` directives)
- `static/` - Unprocessed assets (images, manifests)

**Template Composition:** Pages use `baseof.html` as the wrapper, which includes partials for
`head.html`, `header.html`, `footer.html`. SEO tags are in `partials/seo/` and schema.org data in
`partials/schema/`.

**Tailwind Customization:** Custom theme in `tailwind.config.js` defines:

- Primary color palette (orange shades)
- Custom components: `.nav-link`, `.feature-card`, `.btn-primary`
- Animation: `.animate-fade-in-up`

## CI/CD

GitHub Actions (`.github/workflows/deploy.yml`) runs on push to master:

1. Lint and format checks
2. Hugo build
3. Deploy to GitHub Pages

All lint and format checks must pass before merge.
