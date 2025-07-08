// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

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
    appId: "1:560093812797:web:f08db0b5d8bc69c3537254",
    measurementId: "G-ECTT0SS5K0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);