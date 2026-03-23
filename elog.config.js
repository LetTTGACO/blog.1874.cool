const r2 = require("@elog/plugin-img-r2");

module.exports = {
	write: {
		platform: "notion",
		notion: {
			token: process.env.NOTION_TOKEN,
			databaseId: process.env.NOTION_DATABASE_ID,
			filter: {
				property: "status",
				status: {
					equals: "Done",
				},
			},
		},
	},
	deploy: {
		platform: "local",
		local: {
			outputDir: "./src/content/post",
			filename: "urlname",
			format: "markdown",
			frontMatter: {
				enable: true,
			},
			formatExt: "elog.format.js",
		},
	},
	image: {
		enable: true,
		plugin: r2,
		r2: {
			accessKeyId: process.env.R2_ACCESSKEYID,
			secretAccessKey: process.env.R2_SECRET_ACCESSKEY,
			bucket: process.env.R2_BUCKET,
			endpoint: process.env.R2_ENDPOINT,
			host: process.env.R2_HOST,
			prefixKey: "blog",
		},
	},
};
