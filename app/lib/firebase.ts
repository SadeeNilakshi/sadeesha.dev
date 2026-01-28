import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCynkD5Uk3M7unJ75OIhT2y9oVBNU6igAI",
  authDomain: "sadeesha-dev.firebaseapp.com",
  projectId: "sadeesha-dev",
  storageBucket: "sadeesha-dev.appspot.com",
  messagingSenderId: "859735925778",
  appId: "1:859735925778:web:83fbe671404c616a81e4cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Firestore
export const db = getFirestore(app);