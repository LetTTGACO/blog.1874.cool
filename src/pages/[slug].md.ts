import type { APIRoute, GetStaticPaths } from "astro";
import type { CollectionEntry } from "astro:content";

import { getAllPosts } from "@/utils/post";

const postSources = import.meta.glob<string>("../content/post/*.md", {
	eager: true,
	import: "default",
	query: "?raw",
});

export const getStaticPaths = (async () => {
	const posts = await getAllPosts();

	return posts.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
	const post = props.post as CollectionEntry<"post">;
	const body = postSources[`../content/post/${post.id}.md`] ?? post.body;

	return new Response(body, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
};
