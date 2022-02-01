// v8: import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWcWJF5VeONb-2yKyjiwEOfF-xkRZFiZc",
    authDomain: "fir-v9-b3b1b.firebaseapp.com",
    projectId: "fir-v9-b3b1b",
    storageBucket: "fir-v9-b3b1b.appspot.com",
    messagingSenderId: "548578442574",
    appId: "1:548578442574:web:1eb67199b04c22efe3321f",
};

// v8: firebaseConfig.initializeApp(firebaseConfig)
// init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "books");

//get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });
        console.log(books);
    })
    .catch((error) => {
        console.log(error);
    });
