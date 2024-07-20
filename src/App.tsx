import React from 'react';
import './App.css';
import CustomPosts from './components/posts';
import CustomAddPost from './components/addPost';

const CustomApp: React.FC = () => {
  return (
    <div className="CustomApp">
      <header className="CustomApp-header">
        <h1>Posts App</h1>
      </header>
      <main>
        <CustomAddPost />
        <CustomPosts />
      </main>
    </div>
  );
};

export default CustomApp;
