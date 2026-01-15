import React from "react";
import MyButton from "../../UI/button/MyButton";
import type { IPostProps } from "../../interfaces/IPostProps";

const Posts = ({ posts, onDelete }: IPostProps) => {
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
				<MyButton children='Редактировать' type='button' />
			</div>
		</React.Fragment>
	);
};

export default Posts;
