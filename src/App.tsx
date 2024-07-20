import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import PostList from './components/posts';
import AddPostForm from './components/addPost';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Posts App</h1>
        <AddPostForm />
        <PostList />
      </div>
    </Provider>
  );
}

export default App;