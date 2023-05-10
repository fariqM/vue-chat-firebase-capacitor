import { initializeApp } from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBUE11ylgoypZgC1aEwpyb9kVGYp-yFycI",
    authDomain: "vue-chat-mobile.firebaseapp.com",
    projectId: "vue-chat-mobile",
    storageBucket: "vue-chat-mobile.appspot.com",
    messagingSenderId: "336137214179",
    appId: "1:336137214179:web:20377f862072d5a5dc4dd6"
};

const database = initializeApp(firebaseConfig);

export default database;