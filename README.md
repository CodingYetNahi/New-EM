# ExpressMock public website

Production-oriented React, TypeScript, Vite and Tailwind website for `expressmock.in`. This repository is only the public marketing, exam-information and editorial layer. Testpress remains responsible for user accounts, authentication, products, payments, tests, results and administration.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure `.env.local` before testing external actions. Only `VITE_` values are exposed to the browser; never place secrets, API tokens or passwords in them.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Canonical public origin, normally `https://expressmock.in` |
| `VITE_TESTPRESS_STUDENT_URL` | One base URL for student login, tests and products |
| `VITE_TESTPRESS_ADMIN_URL` | Full Testpress administrator login/dashboard URL |
| `VITE_CONTACT_EMAIL` | Optional public support email |
| `VITE_CONTACT_FORM_URL` | Optional HTTPS form-handler endpoint |

An unset or invalid platform URL produces a disabled, clearly labelled action. The site never falls back to an unrelated destination.

## Publish a blog article

1. Copy any file in `content/blog/` and give it a simple filename ending in `.md`.
2. Edit the metadata between the two `---` lines. Keep `slug` unique and URL-friendly. Dates use `YYYY-MM-DD`.
3. Write the article below the second `---`. Supported author-friendly Markdown includes headings (`##` and `###`), paragraphs, unordered lists and bold text.
4. Set `published: true` when ready. Use an image from `public/images/` and reference it as `/images/name.svg`.
5. Run `npm run build`. The article is automatically included in search, categories, article metadata and related posts—no React editing required.

Required metadata:

```yaml
title: "Article title"
slug: "article-slug"
description: "Search summary"
date: "2026-08-17"
updated: "2026-08-17"
author: "ExpressMock Editorial"
category: "Preparation"
tags: ["Mock Tests", "Study Plan"]
featuredImage: "/images/example.svg"
published: true
featured: false
```

The renderer creates React nodes rather than injecting raw HTML, avoiding unsanitised `dangerouslySetInnerHTML`. When adding many articles, also add their public URLs to `public/sitemap.xml` or automate sitemap generation in the deployment pipeline.

## Build and quality checks

```bash
npm run lint
npm test
npm run build
npm audit --omit=dev
```

## Hostinger deployment

1. In Hostinger, point only the apex `expressmock.in` and `www.expressmock.in` DNS records to this hosting account. Do not alter the Testpress-managed hostname.
2. Set the production variables above in the build environment. If Hostinger does not provide build-time variables, create an uncommitted `.env.production` before building.
3. Run `npm install` and `npm run build`.
4. Upload the **contents** of `dist/` to the public directory (commonly `public_html`). Vite copies `public/.htaccess` into the build.
5. Enable SSL. Verify the apex serves the public site, and only `www.expressmock.in` redirects to the apex.
6. Test every route directly in a new browser session, then test student and administrator actions against the configured Testpress destinations.

The Apache configuration has two deliberately narrow behaviours: it redirects exactly `www.expressmock.in` to the apex, and it rewrites missing files within this public hosting directory to `index.html` for React Router. It contains no wildcard-domain or Testpress redirect. If Hostinger manages the `www` redirect in its control panel, keep that rule equally host-specific.

## Content migration note

The repository began with only `README.md` and `LICENSE`; its Git history contained no website assets, WordPress export, database dump, uploads or prior redirect/server configuration. Nothing valuable was deleted. If a WordPress site exists outside this repository, export its posts, media and database before changing that installation, then migrate reviewed content into `content/blog/` without deleting the source backup.

## Pre-launch owner review

- Supply and verify the Testpress administrator URL.
- Verify every Testpress product path; remove cards for products not currently offered.
- Configure a real contact email/form provider, or keep the form visibly unavailable.
- Obtain legal review and replace marked starter legal language with jurisdiction- and business-specific terms.
- Update `sitemap.xml` whenever publishing articles or exam guides.
