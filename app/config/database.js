import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOc8QabnusJGnKhLJWekBnrSEyHxOl0Qo",
  authDomain: "ida-vault.firebaseapp.com",
  projectId: "ida-vault",
  storageBucket: "ida-vault.appspot.com",
  messagingSenderId: "362595962532",
  appId: "1:362595962532:web:e0ad3c5cbba60acbc5a031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export { app, getApp };