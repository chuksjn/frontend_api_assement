import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CustomPost {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface CustomPostsState {
  customPosts: CustomPost[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialCustomPostsState: CustomPostsState = {
  customPosts: [],
  status: 'idle',
  error: null,
};

export const fetchCustomPosts = createAsyncThunk('customPosts/fetchCustomPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data.map((post: Omit<CustomPost, 'completed'>) => ({ ...post, completed: false }));
});

export const addCustomPost = createAsyncThunk('customPosts/addCustomPost', async (newPost: Omit<CustomPost, 'id'>) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return { ...response.data, completed: newPost.completed };
});

const customPostsSlice = createSlice({
  name: 'customPosts',
  initialState: initialCustomPostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customPosts = action.payload;
      })
      .addCase(fetchCustomPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addCustomPost.fulfilled, (state, action) => {
        state.customPosts.push(action.payload);
      });
  },
});

export default customPostsSlice.reducer;
