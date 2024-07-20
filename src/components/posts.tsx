import React, { useEffect } from 'react';
import { useCustomAppDispatch, useCustomAppSelector } from '../hooks';
import { fetchCustomPosts } from '../store/postSlice';

const CustomPosts: React.FC = () => {
  const dispatch = useCustomAppDispatch();
  const customPosts = useCustomAppSelector((state) => state.customPosts.customPosts);
  const postStatus = useCustomAppSelector((state) => state.customPosts.status);
  const error = useCustomAppSelector((state) => state.customPosts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchCustomPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postStatus === 'succeeded') {
    content = (
      <ul>
        {customPosts.map((post) => (
          <li key={post.id}>
            <p>User ID: {post.userId}</p>
            <p>Title: {post.title}</p>
            <p>Completed: {post.completed ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    );
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default CustomPosts;
