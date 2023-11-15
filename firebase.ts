import firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: "AIzaSyCmNu1LLMMj-WaKjyW2rF3rvLoP7SlxwT8",
  authDomain: "apprendu-test-f6d33.firebaseapp.com",
  projectId: "apprendu-test-f6d33",
  storageBucket: "apprendu-test-f6d33.appspot.com",
  messagingSenderId: "1050596534094",
  appId: "1:1050596534094:web:7f71a922cb09727b41a01f",
  measurementId: "G-DRTSRHD67Y",
};

firebase.initializeApp(config);

export default firebase.database();
