import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCustomPosts } from '../store/postSlice';

const CustomPosts: React.FC = () => {
  const dispatch = useAppDispatch();
  const customPosts = useAppSelector(
    (state) => state.customPosts.customPosts
  );
  const postStatus = useAppSelector((state) => state.customPosts.status);
  const error = useAppSelector((state) => state.customPosts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchCustomPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <section>
      <h2>Posts</h2>
      {postStatus === 'loading' ? (
        <p>Loading...</p>
      ) : postStatus === 'failed' ? (
        <p>{error}</p>
      ) : (
        <ul>
          {customPosts.map((post:any) => (
            <li key={post.id}>
              <p>User ID: {post.userId}</p>
              <p>Title: {post.title}</p>
              <p>Completed: {post.completed ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CustomPosts;