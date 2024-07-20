import { configureStore } from '@reduxjs/toolkit';
import customPostsReducer from './postSlice'

export const customStore = configureStore({
  reducer: {
    customPosts: customPostsReducer,
  },
});

export type RootState = ReturnType<typeof customStore.getState>;
export type AppDispatch = typeof customStore.dispatch;
