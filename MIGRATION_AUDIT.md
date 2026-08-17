# Rebuild and domain audit

## Repository inspection (17 August 2026)

The starting branch contained one initial commit with only `README.md` and `LICENSE`. There were no application sources, images, WordPress files, exports, server middleware, Vite settings, `.htaccess`, nginx files, Hostinger metadata, JavaScript redirects, meta refresh tags or historical content to preserve.

## Migration decision

- Preserve the original Git history and licence.
- Build a static Vite SPA because the requested public experience needs no custom authentication, examination, payment or application backend.
- Keep all Testpress destinations behind `src/config/platform.ts` and environment variables.
- Store editorial articles as Markdown so publication does not require component editing.
- Use an Apache rewrite scoped to the public hosting directory, with an exact-host redirect for `www.expressmock.in` only.

## Redirect boundary

No frontend code redirects based on hostname. External Testpress actions are ordinary secure links opened with `noopener noreferrer`. The only production redirect rule is guarded by the exact regular expression `^www\.expressmock\.in$`. The SPA fallback is an internal rewrite—not an external redirect—and can only operate on the Hostinger directory where this build is installed.

Do not install this public build or its `.htaccess` in a document root that also controls `expressmock.testpress.in`. Testpress DNS and portal configuration remain separate systems.
