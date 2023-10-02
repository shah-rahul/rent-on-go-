import React, { useEffect, useState  } from "react";
import Home from "./home/home";
import {useDispatch, useSelector} from 'react-redux';
import { registerUser,  } from "../redux/auth/authParameters";
import {auth,provider} from '../dbservice/firebase';
import { signInWithPopup } from "firebase/auth";
import AdminPage from "./super/admin";
import { getUser } from "../dbservice/api/apiservice";
// import { getUser } from "../dbservice/api/apiservice";


function Signup () {
  const dispatch = useDispatch();
 const user =  useSelector(state => state.auth.user); 
  useEffect(() => {
    auth.onAuthStateChanged( async(firebaseUser) => {
      // const user = await getUser(firebaseUser)
      if (firebaseUser) {
      const data = await  getUser(firebaseUser);
      // console.log(data['itemData']);
      dispatch(registerUser(data));
      } else {
        console.log("No user logged in");
      }
    });
  }, []);
  const handleLogin = (e,status) => {
    e.preventDefault(); 
     signInWithPopup(auth, provider) 
     .then((data) => {
      const tempUser = {
        id: data.user.uid,
        name: data.user.displayName,
        photo: data.user.photoURL,
        isSuper: status,
       }
      dispatch(registerUser(tempUser));

       }).catch((error) => {
           console.log(error.message);
         });
     
    
  }   
  return (
    // console.log(user),
    <div>
   {
      user != null ? user.isSuper ? <AdminPage/> : <Home/> : <div>
      <button onClick = {(e) => 
        handleLogin(e,false)}>Login</button> 
       <br/>
       <button onClick = {(e) => 
        handleLogin(e,true)}>super</button> 
       <br/>
     </div>
   }
    </div>
  );  
}
export default Signup;