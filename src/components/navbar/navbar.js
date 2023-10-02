import React, { useState, useEffect } from 'react';
import './floating.css'; // Create a CSS file for styling
import {useDispatch, useSelector} from 'react-redux';
import { logoutUser } from "../../redux/auth/authParameters";
import { addItem } from '../../redux/listing/listingManagers';
import { signOut } from 'firebase/auth';
import {auth} from '../../dbservice/firebase';

function Navbar() {
  
  const [isSticky, setIsSticky] = useState(false);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser());
        signOut(auth);
    }
const additem = () => { 
  dispatch(addItem());
}
  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  const user = useSelector(state => state.auth.user);

  // Add event listener for scroll when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar__logo">
        <p className='starting'>Rent-on-go</p>
      </div>
  
      <div className="navbar__links">
        <a href="#">Home</a>
        <a href="#">TV Shows</a>
        <a href="#">Movies</a>
        <a className='text-black' href="#">{user? user.name  : " " }</a>
    
        {/* Add more navigation links as needed */}
      </div>
      <div className="navbar__user ">
        <img
          src= { user ? user.photo: " "}
          alt="User Avatar"
          className="navbar__userAvatar"
        />
         <div className="logout">
         <button className='logout' onClick={logout}>Logout</button>
         <br/>
         <button className='logout' onClick={additem}>addItem</button>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
