import type { IPosts } from "./IPosts";

export interface IPostProps {
	posts: IPosts;
	onDelete: (id: number) => void;
}
