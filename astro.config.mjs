// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://frionorte.com.pe',
  // Static by default; only Actions (lead form) run on the server.
  // imageService: optimise images through Vercel, including on on-demand pages like /cotizar.
  adapter: vercel({ imageService: true }),
  image: { layout: 'constrained' },
  // Quote photos (up to 6 × ~300 KB after client compression). Vercel caps function bodies at 4.5 MB.
  security: { actionBodySizeLimit: 4 * 1024 * 1024 },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: { plugins: [tailwindcss()] },
  integrations: [react()],
});
