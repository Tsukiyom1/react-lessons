import React from "react";
import type { IPosts } from "../interfaces/IPosts";

export const useSortedPosts = (posts: IPosts[], selected: string) => {
	const sortedPosts = React.useMemo(() => {
		if (!selected) {
			return [...posts];
		}

		return [...posts].sort((a, b) =>
			a[selected as keyof Omit<IPosts, "id">].localeCompare(
				b[selected as keyof Omit<IPosts, "id">],
			),
		);
	}, [posts, selected]);

	return sortedPosts;
};
