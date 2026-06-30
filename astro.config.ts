import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import fs from "fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import { expressiveCodeOptions } from "./src/site.config";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
	// ! Please remember to replace the following site property with your own domain
	site: "https://blog.1874.cool/",
	markdown: {
		processor: unified({
			remarkPlugins: [remarkUnwrapImages, remarkReadingTime, remarkMath],
			rehypePlugins: [
				rehypeKatex,
				[
					rehypeExternalLinks,
					{
						target: "_blank",
						rel: ["nofollow, noopener, noreferrer"],
					},
				],
			],
			remarkRehype: {
				footnoteLabelProperties: {
					className: [""],
				},
			},
		}),
	},
	integrations: [
		mermaid({
			autoTheme: true,
			enableLog: false,
		}),
		expressiveCode(expressiveCodeOptions),
		icon(),
		sitemap(),
		mdx(),
	],
	image: {
		domains: ["image.1874.cool"],
	},
	// https://docs.astro.build/en/guides/prefetch/
	prefetch: true,
	vite: {
		plugins: [rawFonts([".ttf", ".woff"])],
	},
});

function rawFonts(ext: Array<string>) {
	return {
		name: "vite-plugin-raw-fonts",
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
