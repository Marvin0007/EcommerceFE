import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import App from "./Components/App";
import rootReducer from "./Reducers";
import {composeWithDevTools} from 'redux-devtools-extension';

// Store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.querySelector('#root')
);
