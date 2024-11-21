// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZljfUQachr_0xQtAxeFKzuDzLcvn1onE",
  authDomain: "invoice-app-657ac.firebaseapp.com",
  projectId: "invoice-app-657ac",
  storageBucket: "invoice-app-657ac.firebasestorage.app",
  messagingSenderId: "248393038238",
  appId: "1:248393038238:web:318b60d916bedbaf7bbe8f",
  measurementId: "G-D4FSVQ5BZT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage =getStorage();
export const db = getFirestore(app);


//const analytics = getAnalytics(app);