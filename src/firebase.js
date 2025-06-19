// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIX4FxbDwHj12mfro28SiAs7cFAy4dwos",
  authDomain: "food-delivery-app-db-638c6.firebaseapp.com",
  databaseURL: "https://food-delivery-app-db-638c6-default-rtdb.firebaseio.com",
  projectId: "food-delivery-app-db-638c6",
  storageBucket: "food-delivery-app-db-638c6.firebasestorage.app",
  messagingSenderId: "71970003476",
  appId: "1:71970003476:web:a0cb824711818c767e2501"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);