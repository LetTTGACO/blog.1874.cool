import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "1874",
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: "1874's BLOG",
	// Meta property used as the default description meta property
	description:
		"一个对已有笔记的阶段性总结的独立博客。在这里你可以了解我是什么样的人、我在想什么、我在做什么。原创博客内容多为技术分享、踩坑记录，偶尔也会写点正经文字，以写出有用且有趣的文字为己任，希望诸君能够喜欢。",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: "zh-Hans",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "zh_Hans_CN",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "zh-Hans-CN",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// webmentions: {
	// 	link: "https://webmention.io/blog.1874.cool/webmention",
	// },
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
	{
		title: "首页",
		path: "/",
	},
	{
		title: "标签",
		path: "/tags",
	},
	{
		title: "关于我",
		path: "/about",
	},
	{
		title: "友情链接",
		path: "/links",
	},
];

export const buildLinks: Array<{ title: string; path: string }> = [
	{
		title: "Notion",
		path: "https://www.notion.so",
	},
	{
		title: "Elog",
		path: "https://elog.1874.cool",
	},
	{
		title: "Astro",
		path: "https://astro.build",
	},
	{
		title: "Vercle",
		path: "https://vercel.com",
	},
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	useThemedScrollbars: false,
	styleOverrides: {
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		borderRadius: "4px",
		codePaddingInline: "1rem",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
	},
};
