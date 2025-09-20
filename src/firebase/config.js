import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
// Replace with your actual Firebase config

const firebaseConfig = {
  apiKey: "AIzaSyCue3OGDwQausn51c9Q74FWnXHKoFZocgk",
  authDomain: "medical-b88b1.firebaseapp.com",
  projectId: "medical-b88b1",
  storageBucket: "medical-b88b1.firebasestorage.app",
  messagingSenderId: "457601945829",
  appId: "1:457601945829:web:2eacaae80b7ea353e5040c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
