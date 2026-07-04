import rss from "@astrojs/rss";
import { siteConfig } from "@/site-config";
import { filterHidden, getAllPosts, sortMDByDate } from "@/utils/post";

export const GET = async () => {
	const posts = sortMDByDate(filterHidden(await getAllPosts()).filter((post) => !post.data.draft));

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/${post.id}`,
		})),
	});
};
