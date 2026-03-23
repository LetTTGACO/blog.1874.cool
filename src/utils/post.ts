import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

const configPage = ["about", "links"];

export async function getAllPosts(): Promise<Array<CollectionEntry<"post">>> {
	const posts = await getCollection("post", ({ data }) => {
		if (import.meta.env.PROD) return data.draft !== true;
		return true;
	});

	return posts.filter((post) => !configPage.includes(post.slug));
}

export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
	return posts
		.filter((post) => !configPage.includes(post.slug))
		.sort((a, b) => {
			const aDate = new Date(a.data.date ?? a.data.updated).valueOf();
			const bDate = new Date(b.data.date ?? b.data.updated).valueOf();
			return bDate - aDate;
		}) as Array<CollectionEntry<"post">>;
}

export function filterHidden(posts: Array<CollectionEntry<"post">>) {
	return posts
		.filter((post) => !configPage.includes(post.slug))
		.filter((post) => !post.data.hidden) as Array<CollectionEntry<"post">>;
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllTags(posts: Array<CollectionEntry<"post">>) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTags(posts: Array<CollectionEntry<"post">>) {
	return [...new Set(getAllTags(posts))];
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTagsWithCount(
	posts: Array<CollectionEntry<"post">>,
): Array<[string, number]> {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
