import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/reducer'
import Main from "./components/Main";


const app = document.getElementById('root')
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>
  , app);
