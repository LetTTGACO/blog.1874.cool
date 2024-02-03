import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
const configPage = ["about", "links"];

/** Note: this function filters out draft posts based on the environment */
export async function getAllPosts() {
	const posts = await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	return posts.filter((post) => !configPage.includes(post.slug));
}

export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
	return posts.sort((a, b) => {
		const aDate = new Date(a.data.date ?? a.data.updated).valueOf();
		const bDate = new Date(b.data.date ?? b.data.updated).valueOf();
		return bDate - aDate;
	}) as Array<CollectionEntry<"post">>;
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
