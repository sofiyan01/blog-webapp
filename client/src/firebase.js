// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8e13e.firebaseapp.com",
  projectId: "mern-blog-8e13e",
  storageBucket: "mern-blog-8e13e.appspot.com",
  messagingSenderId: "310877588492",
  appId: "1:310877588492:web:4397eee788c71cb002f229"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
