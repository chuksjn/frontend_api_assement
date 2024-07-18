import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Post interface
interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Define the PostsState interface
interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Asynchronous thunk to fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  // Adding a mock 'completed' field
  return response.data.map((post: Omit<Post, 'completed'>) => ({ ...post, completed: false }));
});

// Asynchronous thunk to add a post
export const addPost = createAsyncThunk('posts/addPost', async (newPost: Omit<Post, 'id'>) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return { ...response.data, completed: newPost.completed }; // Adding 'completed' field to the new post
});

// Create the posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

// Export the reducer
export default postsSlice.reducer;
