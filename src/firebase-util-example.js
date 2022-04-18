import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database"
/* file should rename to - firebase-util.js and add your own configutations */
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const database = getDatabase(app);

export { auth, provider, db, database };