import React, { useState } from 'react';
import { useAddPostMutation } from '../store/postApi';

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [addPost, { isLoading }] = useAddPostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPost({ title, body, userId: 1 }).unwrap();
      setTitle('');
      setBody('');
      alert('Post added successfully!');
    } catch (error) {
      console.error('Failed to add the post: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h2>Add New Post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Post'}
      </button>
    </form>
  );
};

export default AddPostForm;