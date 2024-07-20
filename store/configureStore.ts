import { configureStore } from '@reduxjs/toolkit';
import customPostsReducer from '../src/store/postSlice';

export const customStore = configureStore({
  reducer: {
    customPosts: customPostsReducer,
  },
});

export type RootStateType = ReturnType<typeof customStore.getState>;
export type AppDispatchType = typeof customStore.dispatch;
