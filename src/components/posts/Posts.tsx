import React from "react";
import type { IPosts } from "../../interfaces/IPosts";

const Posts = ({ body, title, id }: IPosts) => {
	return (
		<React.Fragment>
			<div className='post' key={id}>
				<h2>
					{id}.{title}
				</h2>
				<p>{body}</p>
			</div>
		</React.Fragment>
	);
};

export default Posts;
