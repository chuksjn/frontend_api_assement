import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CustomApp from './App';
import { Provider } from 'react-redux';
import { customStore } from './store/configureStore';

ReactDOM.render(
  <Provider store={customStore}>
    <CustomApp />
  </Provider>,
  document.getElementById('root')
);
