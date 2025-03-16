import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYQXuVxtmeutGOXC0tbpM7FHmY-FNy_TA",
  authDomain: "yetimtakip.firebaseapp.com",
  projectId: "yetimtakip",
  storageBucket: "yetimtakip.firebasestorage.app",
  messagingSenderId: "867551429764",
  appId: "1:867551429764:web:d17bd26275f8cc3354aed1"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini al
export const auth = getAuth(app);
export const db = getFirestore(app);

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYQXuVxtmeutGOXC0tbpM7FHmY-FNy_TA",
  authDomain: "yetimtakip.firebaseapp.com",
  projectId: "yetimtakip",
  storageBucket: "yetimtakip.firebasestorage.app",
  messagingSenderId: "867551429764",
  appId: "1:867551429764:web:d17bd26275f8cc3354aed1",
  measurementId: "G-Z1PMW8Q8XG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/