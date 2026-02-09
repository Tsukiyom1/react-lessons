import { createSlice } from "@reduxjs/toolkit";
import type { IComment } from "../../interfaces/IComment";

interface IState {
	comments: IComment[];
	isLoading: boolean;
	error: Error | null;
}

const initialState: IState = {
	comments: [],
	isLoading: false,
	error: null,
};

const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {},
});

export const commentReducer = commentSlice.reducer;
