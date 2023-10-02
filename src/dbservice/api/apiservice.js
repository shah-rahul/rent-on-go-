import { db, storage } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";

const addItemToFirestore = async (itemData) => {
    const id = nanoid();
    itemData = {...itemData,id:id}
    try {
      
      await setDoc(doc(db, 'items', id ), {
        ...itemData,
       },);
     } catch (error) {
      console.error('Error writing new message to database', error);
    }
  };

const getUser = async (itemData) => {
    return new Promise((resolve, reject) => {
      getDoc(doc(db, 'users', itemData['uid'] ),).then((doc) => { 
        if (doc.exists()) {
          resolve(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          reject();
        }
      }
      );
     }
    );

 }
  const register = async (itemData) => {
    try {
      await setDoc(doc(db, 'users', itemData['id'] ), {
        ...itemData,
       },);
     } catch (error) {
      console.error('Error writing new message to database', error);
    }
  };

  
  export {addItemToFirestore, register, getUser};