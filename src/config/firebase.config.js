const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./config.json");

const firebaseConfig = {
    apiKey: "AIzaSyC6jl-lYnpmp5CjQzG9_NyIRoCBxRlrwXM",
    authDomain: "just-cake-8fae1.firebaseapp.com",
    projectId: "just-cake-8fae1",
    storageBucket: "just-cake-8fae1.appspot.com",
    messagingSenderId: "190225303274",
    appId: "1:190225303274:web:6441cfa0fdd466c5e7f993",
    measurementId: "G-9XBHLQ1PPE"
  };

initializeApp(firebaseConfig);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket, // Replace with your bucket name
});

// Initialize Firebase
const bucket = admin.storage().bucket();
module.exports = { bucket };