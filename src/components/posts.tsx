import React from 'react';
import { useGetPostsQuery } from '../store/postApi';

const PostList: React.FC = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as any).message}</div>;

  return (
    <div className="post-list">
      <h2>Posts</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;