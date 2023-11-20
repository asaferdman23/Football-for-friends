// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref } from "firebase/storage";
import '@firebase/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIU87gWYgqHaag6bpEJGptXGP2n_e_FhE",
  authDomain: "footballforfriends-21e9c.firebaseapp.com",
  projectId: "footballforfriends-21e9c",
  storageBucket: "footballforfriends-21e9c.appspot.com",
  messagingSenderId: "573770242419",
  appId: "1:573770242419:web:3f59d31f5ce2fff4990d06",
  measurementId: "G-81TR9K1MYQ"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();
export {firebase,storage,database,auth};