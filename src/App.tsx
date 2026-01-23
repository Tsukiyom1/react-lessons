import React, { useMemo, type ChangeEvent, type FormEvent } from "react";
import { useState } from "react";
import Posts from "./components/posts/Posts";
import type { IPosts } from "./interfaces/IPosts";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
function App() {
	const [posts, setPosts] = useState<IPosts[]>([
		{
			id: 1,
			title: "Js",
			body: "фф изучаю js",
		},
		{
			id: 2,
			title: "React",
			body: "аа изучаю React",
		},
		{
			id: 3,
			title: "Python",
			body: "сс изучаю Python",
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
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [editingPostId, setEditingPostId] = useState<number | null>(null);
	const [selected, setSelected] = useState<string>("");
	const sorted = useMemo(() => {
		return selected
			? [...posts].sort((a, b) =>
					a[selected as keyof Omit<IPosts, "id">].localeCompare(
						b[selected as keyof Omit<IPosts, "id">],
					),
				)
			: [...posts];
	}, [posts, selected]);

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
			}),
		);
	};

	const startEdit = (post: IPosts) => {
		console.log(post);

		setEditingPostId(post.id);
		setEditValue({ title: post.title, body: post.body });
	};

	const cancelEdit = () => {
		setEditingPostId(null);
	};

	const onEditChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		console.log(value, "val");
		console.log(editValue);

		setEditValue(prev => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onUpdatePost = (id: number) => {
		setPosts(
			posts.map(post => {
				return post.id === id
					? { ...post, title: editValue.title, body: editValue.body }
					: post;
			}),
		);
		setEditingPostId(null);
	};

	const sortPosts = (sort: string) => {
		setSelected(sort);
	};

	const searchPosts = () => {
		if (searchQuery === "") {
			return sorted;
		}

		const query = searchQuery.toLowerCase();

		const filtered = sorted.filter(post => {
			const title = post.title.toLowerCase().includes(query);
			const body = post.body.toLowerCase().includes(query);

			return title || body;
		});

		return filtered;
	};

	const filteredPosts = useMemo(() => searchPosts(), [searchPosts]);
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
			<div>
				<MyInput
					name='search'
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setSearchQuery(e.target.value)
					}
					type='text'
					value={searchQuery}
					placeholder='Поиск...'
				/>
				<MySelect
					defaultValue='Сортировка по'
					onChange={sortPosts}
					options={[
						{ name: "Сортировка по названию", value: "title" },
						{ name: "Сортировка по описанию", value: "body" },
					]}
					value={selected}
				/>
			</div>
			{filteredPosts.length === 0 ? (
				<div>Постов не обнаружено</div>
			) : (
				filteredPosts.map((post, index) => (
					<Posts
						posts={post}
						key={index}
						onDelete={onDeletePost}
						editValue={editValue}
						onCancel={cancelEdit}
						onEdit={startEdit}
						onEditChange={onEditChange}
						onUpdate={onUpdatePost}
						isEdit={editingPostId === post.id}
					/>
				))
			)}
		</React.Fragment>
	);
}

export default App;
