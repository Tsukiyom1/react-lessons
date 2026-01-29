import type React from "react";
import type { IPosts } from "./IPosts";
import type { IComment } from "./IComment";

export interface IPostProps {
	posts: IPosts;
	onDelete: (id: string) => void;
	isEdit?: boolean;
	onUpdate: (id: string) => void;
	onCancel: () => void;
	onEdit: (post: IPosts) => void;
	onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	editValue: { title: string; body: string };
	// Пропсы для комментариев
	comments: IComment[];
	onAddComment: (postId: string, text: string) => void;
	onDeleteComment: (id: string) => void;
	onEditComment: (comment: IComment) => void;
	onUpdateComment: (id: string) => void;
	onCommentEditCancel: () => void;
	editCommentValue: string;
	editingCommentId: string | null;
	onEditCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
