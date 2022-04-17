import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyB4XJcg3HeEvrQOd12Zdo1AD_34t5DGRTM",
  authDomain: "discord-2-53fab.firebaseapp.com",
  projectId: "discord-2-53fab",
  storageBucket: "discord-2-53fab.appspot.com",
  messagingSenderId: "729298462162",
  appId: "1:729298462162:web:8111a1e3e2be505d93140b",
  measurementId: "G-JJ59EB4B6K"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const database = getDatabase(app);

export { auth, provider, db, database };