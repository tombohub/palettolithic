import { configureStore } from "@reduxjs/toolkit";
import colorPickReducer from "./slices/colorPickSlice";

export const store = configureStore({
  reducer: {
    colorPick: colorPickReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
