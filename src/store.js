import { composeWithDevTools } from 'redux-devtools-extension';
import 'regenerator-runtime/runtime';
import reducer from './redux/reducers/rootReducer';
import { save, load } from "redux-localstorage-simple";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const middleware = composeWithDevTools(applyMiddleware( thunk,save()));

export default createStore(reducer,load(),middleware);