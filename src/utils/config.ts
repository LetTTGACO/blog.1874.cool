import { getCollection } from "astro:content";

/** Note: this function filters out draft posts based on the environment */
export async function getConfigPage(slug: string) {
	const posts = await getCollection("post");
	const entry = posts.find((p) => p.slug === slug || p.id === slug);
	return entry!;
}
