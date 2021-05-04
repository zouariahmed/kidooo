import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { fetchProducts } from "./redux/actions/productActions";
import firebase from "firebase";
import store from "./store";
import { rrfProps } from "./rrf.config";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { Provider } from "react-redux";
store.dispatch(fetchProducts());

Modal.setAppElement("#root");

ReactDOM.render(
  <Provider store={store}>
  <ReactReduxFirebaseProvider {...rrfProps}>
  <App />
  </ReactReduxFirebaseProvider>
</Provider>,
  document.getElementById("root")
);
