// 0.12.0及以上版本用法
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { matterMarkdownAdapter } = require("@elog/cli");

/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {ImageClient} imageClient 图床下载器，可用于图片上传
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc, imageClient) => {
	doc.properties.draft = doc.properties.status.name !== "Done";
	delete doc.properties.status;
	const cover = doc.properties.cover;
	if (cover) {
		// 将 cover 字段中的 notion 图片下载到本地
		// 只有启用图床平台image.enable=true时，imageClient才能用，否则请自行实现图片上传
		// cover链接替换为本地图片
		doc.properties.cover = await imageClient.uploadImageFromUrl(cover, doc);
	}

	doc.body = matterMarkdownAdapter(doc);
	return doc;
};

module.exports = {
	format,
};
