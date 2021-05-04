import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/functions';
import { createFirestoreInstance } from 'redux-firestore';
import store from './store';

// Firebase Init
const firebaseConfig = {
    apiKey: "AIzaSyAROfIdjxTCV655LWuHJZ4gQSYZzy_gozM",
    authDomain: "kido-74755.firebaseapp.com",
    projectId: "kido-74755",
    storageBucket: "kido-74755.appspot.com",
    messagingSenderId: "253552253869",
    appId: "253552253869:web:a0ba81fdbd86566732df24",
    measurementId: "G-ZZEMH5QG6P"
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableClaims:true,
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
