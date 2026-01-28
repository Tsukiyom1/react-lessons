import instance from "../instance";

export class PostAPIService {
	static async getAllPosts() {
		try {
			const response = await instance.get("posts.json");
			console.log(response.data, "post api service");

			return response.data;
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	}
}
