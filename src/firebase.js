// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDrteXe28HENw5oMKVR0O4UAS0V0yCqvCc",
  authDomain: "codengelina.firebaseapp.com",
  databaseURL: "https://codengelina-default-rtdb.firebaseio.com",
  projectId: "codengelina",
  storageBucket: "codengelina.firebasestorage.app",
  messagingSenderId: "11884663209",
  appId: "1:11884663209:web:242a5d362af60c7aaef4b8",
  measurementId: "G-Z0SS1BKZ01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Debug logging
console.log("Firebase initialized successfully");
console.log("Database URL:", firebaseConfig.databaseURL);