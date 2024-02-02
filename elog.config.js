module.exports = {
	write: {
		platform: "notion",
		notion: {
			token: process.env.NOTION_TOKEN,
			databaseId: process.env.NOTION_DATABASE_ID,
			// filter: {
			// 	property: "status",
			// 	status: {
			// 		equals: "Done",
			// 	},
			// },
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
		platform: "cos",
		cos: {
			secretId: process.env.COS_SECRET_ID,
			secretKey: process.env.COS_SECRET_KEY,
			bucket: process.env.COS_BUCKET,
			region: process.env.COS_REGION,
			host: process.env.COS_HOST,
			prefixKey: "",
		},
	},
};
