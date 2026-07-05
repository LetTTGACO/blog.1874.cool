interface StaleNoticePost {
	data: {
		date: Date;
		tags: string[];
	};
}

export function shouldShowVibeCodingStaleNotice(post: StaleNoticePost, now = new Date()) {
	const staleDate = new Date(now);
	staleDate.setMonth(staleDate.getMonth() - 1);

	return post.data.tags.includes("vibecoding") && post.data.date < staleDate;
}
