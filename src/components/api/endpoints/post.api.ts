import type { IPosts } from "../../../interfaces/IPosts";
import instance from "../instance";

export class PostAPIService {
	static async getAllPosts() {
		try {
			const response = await instance.get("posts.json");
			console.log(response.data, "post api service");

			return response.data;
		} catch (error) {
			console.error("Error fetching posts:", error);
			throw error;
		}
	}

	static async createPost(post: Omit<IPosts, "id">) {
		try {
			const response = await instance.post("posts.json", post);
			return response.data.name;
		} catch (error) {
			console.error("Error when creating post:", error);
		}
	}

	static async deletePost(id: string) {
		try {
			await instance.delete(`posts/${id}.json`);
		} catch (error) {
			console.error("Error when deleting post", error);
		}
	}

	static async updatePost(id: string, post: Omit<IPosts, "id">) {
		try {
			await instance.put(`posts/${id}.json`, post);
		} catch (error) {
			console.error("Error when updating post", error);
		}
	}
}
