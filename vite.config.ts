import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/New-EM/',
  plugins: [react()],
  build: { sourcemap: false, cssCodeSplit: true },
  server: { host: true },
});
