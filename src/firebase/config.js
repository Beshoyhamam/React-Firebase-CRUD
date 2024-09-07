import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDXyu8qFiQuecYXeKtw7oDEeEzvdlOPqao",
    authDomain: "crud-user-32cb5.firebaseapp.com",
    projectId: "crud-user-32cb5",
    storageBucket: "crud-user-32cb5.appspot.com",
    messagingSenderId: "868377058829",
    appId: "1:868377058829:web:07bc4c89601e701aedbf44"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);