import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnTqgTa6QE9OJtbyyfIUzSMv5fkAOpnuc",
  authDomain: "lb-library.firebaseapp.com",
  projectId: "lb-library",
  storageBucket: "lb-library.appspot.com",
  messagingSenderId: "153988738518",
  appId: "1:153988738518:web:8a859abf74c2bee4ef4877"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

export const signOut = () => {
  return auth.signOut();
}