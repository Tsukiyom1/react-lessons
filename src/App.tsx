import React, { useMemo, type ChangeEvent, type FormEvent } from "react";
import { useState } from "react";
import Posts from "./components/posts/Posts";
import type { IPosts } from "./interfaces/IPosts";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import MyModal from "./UI/modal/MyModal";
import { useSortedPosts } from "./hooks/useSortedPosts";
import { PostAPIService } from "./components/api/endpoints/post.api";
import type { IComment } from "./interfaces/IComment";
import { CommentApiService } from "./components/api/endpoints/comments.api";

function App() {
	const [posts, setPosts] = useState<IPosts[]>([]);
	const [comments, setComments] = useState<IComment[]>([]);
	const [change, setChange] = useState({
		title: "",
		body: "",
	});
	const [editValue, setEditValue] = useState({
		title: "",
		body: "",
	});
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [editingPostId, setEditingPostId] = useState<string | null>(null);
	const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
	const [selected, setSelected] = useState<string>("");
	const [modal, setModal] = useState(false);
	const sorted = useSortedPosts(posts, selected);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const postResponse = await PostAPIService.getAllPosts();
				const commentResponse = await CommentApiService.getAllComments();

				if (postResponse) {
					const data = Object.keys(postResponse).map(value => {
						return {
							id: value,
							...postResponse[value],
						};
					});

					setPosts(data);
				} else {
					setPosts([]);
				}

				if (commentResponse) {
					const data = Object.keys(commentResponse).map(value => {
						return {
							id: value,
							...commentResponse[value],
						};
					});

					setComments(data);
				} else {
					setComments([]);
				}
			} catch (error) {
				console.error("Error when getting data", error);
			}
		};

		fetchData();
	}, []);

	const addNewPost = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const postData = {
				body: change.body,
				title: change.title,
			};

			const postId = await PostAPIService.createPost(postData);
			console.log(postId, "post id");

			const newPost: IPosts = {
				id: postId,
				title: change.title,
				body: change.body,
			};

			setPosts([...posts, newPost]);

			setChange({
				title: "",
				body: "",
			});

			setModal(!modal);
		} catch (error) {
			console.error("Error when creating post:", error);
		}
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

	const onDeletePost = async (id: string) => {
		try {
			await PostAPIService.deletePost(id);
			setPosts(
				posts.filter(post => {
					return post.id !== id;
				}),
			);
		} catch (error) {
			console.error("Error when deleting post", error);
		}
	};

	const startEdit = (post: IPosts) => {
		setEditingPostId(post.id);
		setEditValue({ title: post.title, body: post.body });
	};

	const cancelEdit = () => {
		setEditingPostId(null);
	};

	const onEditChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditValue(prev => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onUpdatePost = async (id: string) => {
		try {
			const updateData = {
				title: editValue.title,
				body: editValue.body,
			};
			await PostAPIService.updatePost(id, updateData);
			setPosts(
				posts.map(post => {
					return post.id === id
						? { ...post, title: editValue.title, body: editValue.body }
						: post;
				}),
			);
			setEditingPostId(null);
		} catch (error) {
			console.error("Error when updating post", error);
		}
	};

	const onAddComment = async (postId: string, text: string) => {
		const commentData = {
			text: text,
			postId: postId,
		};

		const commentId = await CommentApiService.createComment(commentData);
		console.log(postId, "post id");
		console.log(commentId, "commentId id");

		const newComment: IComment = {
			id: commentId,
			text: text,
			postId: postId,
		};

		setComments([...comments, newComment]);
	};

	const onDeleteComment = async (id: string) => {
		try {
			await CommentApiService.deleteComment(id);
			setComments(
				comments.filter(comment => {
					return comment.id !== id;
				}),
			);
		} catch (error) {
			console.error("Error when deleting post", error);
		}
	};

	const sortPosts = (sort: string) => {
		setSelected(sort);
	};

	const searchPosts = () => {
		if (searchQuery === "") {
			return sorted;
		}

		const query = searchQuery.toLowerCase();

		console.log();

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
			<MyButton
				children='Создать пост'
				type='button'
				onClick={() => setModal(!modal)}
			/>
			<MyModal setVisible={setModal} visible={modal}>
				<h2 style={{ textAlign: "center" }}>Создайте пост!</h2>
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
			</MyModal>

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
						comments={comments}
						editCommentValue=''
						editingCommentId={editingCommentId}
						onAddComment={onAddComment}
						onCommentEditCancel={() => {}}
						onDeleteComment={onDeleteComment}
						onEditComment={() => {}}
						onEditCommentChange={() => {}}
						onUpdateComment={() => {}}
					/>
				))
			)}
		</React.Fragment>
	);
}

export default App;
