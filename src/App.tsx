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
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

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
			body: body,
			title: title,
		};

		setPosts([...posts, newPosts]);
		setTitle("");
		setBody("");
	};

	const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	const onBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
		setBody(e.target.value);
	};

	return (
		<React.Fragment>
			{/* это является управляемым компонентом */}
			<form onSubmit={addNewPost}>
				<MyInput
					name=''
					onChange={onTitleChange}
					placeholder='Введите заголовок'
					type='text'
					value={title}
				/>
				<MyInput
					name=''
					onChange={onBodyChange}
					placeholder='Введите текст'
					type='text'
					value={body}
				/>
				<MyButton type='submit' children='Отправить' />
			</form>
			<h2>Посты</h2>
			{posts.map((post, index) => (
				<Posts title={post.title} body={post.body} id={post.id} key={index} />
			))}
		</React.Fragment>
	);
}

export default App;
