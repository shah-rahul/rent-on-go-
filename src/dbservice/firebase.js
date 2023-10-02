
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc, } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDG6jaZ99HwImOBMcfvQOhQfmiTgjPun7Q",
    authDomain: "rent-on-go-786e9.firebaseapp.com",
    projectId: "rent-on-go-786e9",
    storageBucket: "rent-on-go-786e9.appspot.com",
    messagingSenderId: "98657543008",
    appId: "1:98657543008:web:ede50e7cd00ff0b0ce3405"
};


const app = initializeApp(firebaseConfig);//initialized firebase
const db = getFirestore(app); //initialized  cloud firestore and get the referance to the service
const storage = getStorage(app); //initialized firebase storage
const auth = getAuth(); //
const provider = new GoogleAuthProvider();




export { auth, provider,db, storage };