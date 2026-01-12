import React, { useEffect } from "react";
import { useState } from "react";
import Posts from "./components/posts/Posts";
import type { IPosts } from "./interfaces/IPosts";

function App() {
	const [posts, setPosts] = useState<IPosts[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/posts"
				);

				const data: IPosts[] = await response.json();

				setPosts(data);
			} catch (error) {
				console.error(error, "error when getting data");
			}
		};
		fetchData();
	}, []);

	return (
		<React.Fragment>
			{posts.map((post, index) => (
				<Posts title={post.title} body={post.body} id={post.id} key={index} />
			))}
		</React.Fragment>
	);
}

export default App;
