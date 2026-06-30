import type { APIRoute } from "astro";

import { siteConfig } from "@/site-config";
import { filterHidden, getAllPosts, sortMDByDate } from "@/utils";

function oneLine(text = "") {
	return text.replace(/\s+/g, " ").trim();
}

export const GET: APIRoute = async () => {
	const posts = sortMDByDate(filterHidden(await getAllPosts())).filter(
		(post) => post.data.draft !== true,
	);

	const body = [
		`# ${siteConfig.title}`,
		"",
		`> ${oneLine(siteConfig.description)}`,
		"",
		"## Posts",
		...posts.map((post) => {
			const url = new URL(`${post.slug}.md`, import.meta.env.SITE).href;
			const description = oneLine(post.data.description);

			return `- [${post.data.title}](${url})${description ? `: ${description}` : ""}`;
		}),
		"",
	].join("\n");

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
