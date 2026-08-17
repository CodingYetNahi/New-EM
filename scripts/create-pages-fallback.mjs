import { copyFile } from 'node:fs/promises';

// GitHub Pages has no server-side SPA rewrite. Its 404 response can boot the
// same Vite application, after which React Router handles the requested route.
await copyFile('dist/index.html', 'dist/404.html');
