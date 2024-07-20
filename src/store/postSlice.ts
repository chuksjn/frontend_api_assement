import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

export const fetchCustomPosts = createAsyncThunk<CustomPost[], void, { rejectValue: string }>(
  'customPosts/fetchCustomPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Omit<CustomPost, 'completed'>[]>('https://jsonplaceholder.typicode.com/posts');
      return response.data.map(post => ({ ...post, completed: false }));
    } catch (error) {
      return rejectWithValue('Failed to fetch posts');
    }
  }
);

export const addCustomPost = createAsyncThunk<CustomPost, Omit<CustomPost, 'id'>, { rejectValue: string }>(
  'customPosts/addCustomPost',
  async (newPost, { rejectWithValue }) => {
    try {
      const response = await axios.post<Omit<CustomPost, 'completed'>>('https://jsonplaceholder.typicode.com/posts', newPost);
      return { ...response.data, completed: newPost.completed };
    } catch (error) {
      return rejectWithValue('Failed to add post');
    }
  }
);

const customPostsSlice = createSlice({
  name: 'customPosts',
  initialState: initialCustomPostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomPosts.fulfilled, (state, action: PayloadAction<CustomPost[]>) => {
        state.status = 'succeeded';
        state.customPosts = action.payload;
      })
      .addCase(fetchCustomPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch posts';
      })
      .addCase(addCustomPost.fulfilled, (state, action: PayloadAction<CustomPost>) => {
        state.customPosts.push(action.payload);
      });
  },
});

export default customPostsSlice.reducer;


