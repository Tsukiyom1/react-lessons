import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "../features/posts/postSlice";
import { commentReducer } from "../features/comments/commentSlice";

const store = configureStore({
	reducer: {
		post: postReducer,
		comment: commentReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
