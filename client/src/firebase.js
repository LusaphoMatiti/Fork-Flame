import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyx8vCQIkOCYVQIphfJ8-t5tNIjebxhD0",
  authDomain: "fork-flame.firebaseapp.com",
  projectId: "fork-flame",
  storageBucket: "fork-flame.firebasestorage.app",
  messagingSenderId: "787176407195",
  appId: "1:787176407195:web:9038bdad03a09fa0fac63e",
  measurementId: "G-CFDZ1K2C34",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
