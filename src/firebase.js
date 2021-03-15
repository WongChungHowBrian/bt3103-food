import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA81f_m9TYs1P9VLliqK_y010SMotaJcP8",
    authDomain: "bt3103-week-6-c6dc8.firebaseapp.com",
    projectId: "bt3103-week-6-c6dc8",
    storageBucket: "bt3103-week-6-c6dc8.appspot.com",
    messagingSenderId: "770413221936",
    appId: "1:770413221936:web:ef47c92970e771517d75f5",
    measurementId: "G-2Z2TD2GBML"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.firestore();
export default database;