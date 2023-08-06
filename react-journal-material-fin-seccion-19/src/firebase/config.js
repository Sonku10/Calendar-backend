// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdckz0f_lCsMWVdgFRHCtgMWTEfLpqDSE",
  authDomain: "test-stuff-3a5f3.firebaseapp.com",
  projectId: "test-stuff-3a5f3",
  storageBucket: "test-stuff-3a5f3.appspot.com",
  messagingSenderId: "937604045760",
  appId: "1:937604045760:web:0a6135a8a4df7127014625"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );