import React from "react";
import MyButton from "../../UI/button/MyButton";
import type { IPostProps } from "../../interfaces/IPostProps";
import MyInput from "../../UI/input/MyInput";

const Posts = ({
	posts,
	onDelete,
	isEdit,
	editValue,
	onCancel,
	onEdit,
	onEditChange,
	onUpdate,
}: IPostProps) => {
	if (isEdit === true) {
		return (
			<div>
				<h3 style={{ textAlign: "center", marginBottom: "10px" }}>
					Редактировать пост
				</h3>
				<MyInput
					name='title'
					onChange={onEditChange}
					type='text'
					value={editValue.title}
				/>
				<MyInput
					name='body'
					onChange={onEditChange}
					type='text'
					value={editValue.body}
				/>
				<MyButton type='button' children='Сохранить' onClick={onUpdate} />
				<MyButton type='button' children='Отмена' onClick={onCancel} />
			</div>
		);
	}
	return (
		<React.Fragment>
			<div className='post' key={posts.id}>
				<h2>
					{posts.id}.{posts.title}
				</h2>
				<p>{posts.body}</p>
			</div>
			<div className='btns'>
				<MyButton
					onClick={() => onDelete(posts.id)}
					children='Удалить'
					type='button'
				/>
				<MyButton
					children='Редактировать'
					type='button'
					onClick={() => onEdit(posts)}
				/>
			</div>
		</React.Fragment>
	);
};

export default Posts;
