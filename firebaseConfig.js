// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZEsbfMEQ7ilsHp99GIGCYRNM8L5jT1J0",
    authDomain: "tripplanner-39ddb.firebaseapp.com",
    databaseURL: "https://tripplanner-39ddb-default-rtdb.firebaseio.com",
    projectId: "tripplanner-39ddb",
    storageBucket: "tripplanner-39ddb.firebasestorage.app",
    messagingSenderId: "560093812797",
    appId: "1:560093812797:web:e74ab3acce11ef26537254",
    measurementId: "G-YDTENMHTQG"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(app);