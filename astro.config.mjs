// @ts-check
import mdx from '@astrojs/mdx';
import node from "@astrojs/node";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

function resolveSite() {
	const rawSite = process.env.VITE_BASE_URL || import.meta.env.VITE_BASE_URL || "http://localhost:4321";
	const cleanedSite = rawSite.trim().replace(/^['"]|['"]$/g, "");

	try {
		return new URL(cleanedSite).toString();
	} catch {
		return "http://localhost:4321";
	}
}

const SITE = resolveSite();

// https://astro.build/config
export default defineConfig({
	site: SITE,
	output: "server",
	adapter: node({ mode: "standalone" }),
	integrations: [mdx(), sitemap()],
	trailingSlash: "always",
});
