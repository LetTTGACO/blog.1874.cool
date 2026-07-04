import { defineConfig } from "@elog/cli";
import fromNotion from "@elog/plugin-from-notion";
import toLocal from "@elog/plugin-to-local";
import imageR2 from "@elog/plugin-transform-image-r2";
import { blogFrontMatter } from "./elog.transforms";

const env = (name: string) => {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing ${name}`);
	}
	return value;
};

export default defineConfig({
	cacheFilePath: "elog.cache.json",
	from: fromNotion({
		token: env("NOTION_TOKEN"),
		databaseId: env("NOTION_DATABASE_ID"),
		filter: {
			property: "status",
			status: {
				equals: "Archive",
			},
		},
	}),
	plugins: [
		blogFrontMatter(),
		imageR2({
			accessKeyId: env("R2_ACCESSKEYID"),
			secretAccessKey: env("R2_SECRET_ACCESSKEY"),
			bucket: env("R2_BUCKET"),
			endpoint: env("R2_ENDPOINT"),
			host: env("R2_HOST"),
			prefixKey: "blog",
			propertyImageFields: ["cover"],
		}),
	],
	to: toLocal({
		outputDir: "./src/content/archive",
		filename: "urlname",
		frontMatter: {
			enable: true,
		},
	}),
});
