interface StaleNoticePost {
	data: {
		date: Date;
		tags: string[];
	};
}

const excludedStaleNoticeTags = ["月刊", "年刊", "代码之外"];

function isOlderThanMonths(date: Date, months: number, now: Date) {
	const staleDate = new Date(now);
	staleDate.setMonth(staleDate.getMonth() - months);

	return date < staleDate;
}

export function getStaleNoticeType(
	post: StaleNoticePost,
	now = new Date(),
): "vibecoding" | "default" | undefined {
	if (post.data.tags.includes("vibecoding")) {
		return isOlderThanMonths(post.data.date, 1, now) ? "vibecoding" : undefined;
	}

	if (post.data.tags.some((tag) => excludedStaleNoticeTags.includes(tag))) {
		return undefined;
	}

	return isOlderThanMonths(post.data.date, 12, now) ? "default" : undefined;
}
