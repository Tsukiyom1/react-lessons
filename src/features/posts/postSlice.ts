import { PostAPIService } from "../../components/api/endpoints/post.api";
import instance from "../../components/api/instance";
import type { IPosts } from "../../interfaces/IPosts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface IState {
	postsRedux: IPosts[];
	isLoading: boolean;
	error: Error | null;
}

const initialState: IState = {
	postsRedux: [],
	isLoading: false,
	error: null,
};

export const getPosts = createAsyncThunk("posts/get", async () => {
	const response = await instance.get("/posts.json");
	console.log(response, "response from async thunk");

	const postResponse = response.data;
	console.log(postResponse);

	const options = Object.keys(postResponse).map(value => {
		return {
			id: value,
			...postResponse[value],
		};
	});

	console.log(options, "options from async thunk");

	return options;
});

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getPosts.pending, state => {
				state.isLoading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				console.log(action, "action from extra reducers");

				state.isLoading = false;
				state.postsRedux = action.payload;
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error as Error;
			});
	},
});

export const postReducer = postsSlice.reducer;
