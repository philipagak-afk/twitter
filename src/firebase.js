import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4GkxvjzwSGR_6Q7d17kHgVDP9o68fbqs",
  authDomain: "twitter-clone-7903f.firebaseapp.com",
  projectId: "twitter-clone-7903f",
  storageBucket: "twitter-clone-7903f.firebasestorage.app",
  messagingSenderId: "336454299409",
  appId: "1:336454299409:web:0dd7a3ce6e54cd9ce766b0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);