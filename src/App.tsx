import React, { type ChangeEvent, type FormEvent } from "react";
import { useState } from "react";
import Posts from "./components/posts/Posts";
import type { IPosts } from "./interfaces/IPosts";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
function App() {
	const [posts, setPosts] = useState<IPosts[]>([
		{
			id: 1,
			title: "Js",
			body: "Я изучаю js",
		},
		{
			id: 2,
			title: "React",
			body: "Я изучаю React",
		},
		{
			id: 3,
			title: "Python",
			body: "Я изучаю Python",
		},
	]);

	const [change, setChange] = useState({
		title: "",
		body: "",
	});
	const [editValue, setEditValue] = useState({
		title: "",
		body: "",
	});
	const [editingPostId, setEditingPostId] = useState<number | null>(null);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await fetch(
	// 				"https://jsonplaceholder.typicode.com/posts"
	// 			);

	// 			const data: IPosts[] = await response.json();

	// 			setPosts(data);
	// 		} catch (error) {
	// 			console.error(error, "error when getting data");
	// 		}
	// 	};
	// 	fetchData();
	// }, []);

	const addNewPost = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newPosts: IPosts = {
			id: Date.now(),
			body: change.body,
			title: change.title,
		};

		setPosts([...posts, newPosts]);
		setChange({
			title: "",
			body: "",
		});
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setChange(prev => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onDeletePost = (id: number) => {
		setPosts(
			posts.filter(post => {
				return post.id !== id;
			})
		);
	};

	const startEdit = (post: IPosts) => {
		console.log(post);

		setEditingPostId(post.id);
		setEditValue({ title: post.title, body: post.body });
	};

	return (
		<React.Fragment>
			{/* это является управляемым компонентом */}
			<form onSubmit={addNewPost}>
				<MyInput
					name='title'
					onChange={onChange}
					placeholder='Введите заголовок'
					type='text'
					value={change.title}
				/>
				<MyInput
					name='body'
					onChange={onChange}
					placeholder='Введите текст'
					type='text'
					value={change.body}
				/>
				<MyButton type='submit' children='Отправить' />
			</form>
			<h2>Посты</h2>
			{posts.map((post, index) => (
				<Posts
					posts={post}
					key={index}
					onDelete={onDeletePost}
					editValue={editValue}
					onCancel={() => {}}
					onEdit={startEdit}
					onEditChange={() => {}}
					onUpdate={() => {}}
					isEdit={editingPostId === post.id}
				/>
			))}
		</React.Fragment>
	);
}

export default App;
