import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from "redux";
import {
  firebaseReducer,
} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
const rootReducer = combineReducers({
  productData: productReducer,
  cartData: cartReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
