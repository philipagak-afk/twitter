// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4GkxvjzwSGR_6Q7d17kHgVDP9o68fbqs",
  authDomain: "twitter-clone-7903f.firebaseapp.com",
  projectId: "twitter-clone-7903f",
  storageBucket: "twitter-clone-7903f.firebasestorage.app",
  messagingSenderId: "336454299409",
  appId: "1:336454299409:web:0dd7a3ce6e54cd9ce766b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()