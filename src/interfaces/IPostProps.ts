import type React from "react";
import type { IPosts } from "./IPosts";

export interface IPostProps {
	posts: IPosts;
	onDelete: (id: number) => void;
	isEdit?: boolean;
	onUpdate: () => void;
	onCancel: () => void;
	onEdit: (post: IPosts) => void;
	onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	editValue: { title: string; body: string };
}
