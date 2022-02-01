// v8: import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, getDoc, updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp } from "firebase/firestore";

var booksData = [];

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

//queries
// const q = query(colRef, where("author", "==", "Patel"), orderBy("createdAt"));
const q = query(colRef, orderBy("createdAt"));

//get collection data
// getDocs(colRef)
//     .then((snapshot) => {
//         let books = [];
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id });
//         });
//         console.log(books);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

//real time collection data
onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });
    booksData = books;
    listAdder();
});

//adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp(),
    }).then(() => {
        addBookForm.reset();
    });
});

//deleteing documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", deleteBookForm.id.value);
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    });
});

//get a single document
// const docRef = doc(db, "books", "HOiBLiq1th8pDZx9hb7G");
// getDoc(docRef).then((doc) => {
//     console.log(doc.data(), doc.id);
// });

// const docRef = doc(db, "books", "HOiBLiq1th8pDZx9hb7G");
// Get real time data of document
// onSnapshot(docRef, (doc) => {
//     console.log(doc.data(), doc.id);
// });

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", updateForm.id.value);
    updateDoc(docRef, {
        title: updateForm.title.value,
    }).then(() => {
        updateForm.reset();
    });
});

//Html modifer
const listAdder = () => {
    var ul = document.getElementById("list");
    ul.innerHTML = "";
    // li.appendChild(document.createTextNode("Four"));
    booksData.forEach((book) => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(book.title + " - " + book.author));
        ul.appendChild(li);
    });
};

listAdder();
