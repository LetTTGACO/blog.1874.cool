import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	type: "content",
	schema: () =>
		z.object({
			title: z.string().max(60),
			// description: z.string().min(50).max(160),
			date: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updated: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			cover: z.string().optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			// ogImage: z.string().optional(),
		}),
});
export const collections = { post };
