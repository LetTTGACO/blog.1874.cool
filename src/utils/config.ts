import { getEntry } from "astro:content";

/** Note: this function filters out draft posts based on the environment */
export async function getConfigPage(slug: string) {
	const res = await getEntry({ collection: "post", slug });
	return res!;
}
