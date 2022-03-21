import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './Redux/reducers'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
   
const myStore = createStore(allReducers, composeWithDevTools(
  applyMiddleware(logger,thunk)
     
))   

ReactDOM.render(
    <Provider store={myStore}>
      <App />
    </Provider>,
  document.getElementById('root')
);

