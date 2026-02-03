// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: import.meta.env.VITE_BASE_URL,
	integrations: [mdx(), sitemap()],
	trailingSlash: 'always'
});
