import { configureStore } from "@reduxjs/toolkit";
import paletteReducer from "./slices/paletteSlice";
import frameworkReducer from "./slices/frameworkSlice";

export const store = configureStore({
  reducer: {
    palette: paletteReducer,
    framework: frameworkReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
