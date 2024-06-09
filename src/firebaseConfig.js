// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW5HJx95Hzx8XzSn9jWXQF3M5beoWDL_U",
  authDomain: "da-menu-restaurant.firebaseapp.com",
  projectId: "da-menu-restaurant",
  databaseURL: "https://da-menu-restaurant-default-rtdb.firebaseio.com/",
  storageBucket: "da-menu-restaurant.appspot.com",
  messagingSenderId: "765318612235",
  appId: "1:765318612235:web:738fb8cc37cc31a8d1ce0e",
  measurementId: "G-NTP10EBKSD"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };