import { initializeApp } from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBUE11ylgoypZgC1aEwpyb9kVGYp-yFycI",
    authDomain: "vue-chat-mobile.firebaseapp.com",
    projectId: "vue-chat-mobile",
    storageBucket: "vue-chat-mobile.appspot.com",
    messagingSenderId: "336137214179",
    appId: "1:336137214179:web:20377f862072d5a5dc4dd6",
    databaseURL: "https://vue-chat-mobile-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const database = initializeApp(firebaseConfig);

export default database;