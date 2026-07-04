import type { DocDetail, TransformPlugin } from "@elog/cli";

export const blogFrontMatter = (): TransformPlugin => ({
	name: "transform:blog-frontmatter",
	kind: "transform",
	async transform(docs: DocDetail[]) {
		return docs.map((doc) => {
			const status = doc.properties.status as { name?: string } | undefined;

			doc.properties.draft = status?.name !== "Done";
			doc.properties.hidden = Boolean(doc.properties.hidden);
			delete doc.properties.status;

			return doc;
		});
	},
});
