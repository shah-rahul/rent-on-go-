import { createSlice,nanoid } from "@reduxjs/toolkit";
import {auth, provider} from '../../dbservice/firebase';
import { signInWithPopup } from "firebase/auth";
import { register} from "../../dbservice/api/apiservice";

const initialState = {
    user: null,
}

export const authSlice = createSlice( {
name: 'auth',
    initialState,
    reducers : {
        registerUser: (state, action) => {
          state.isAuth = true;
          state.user = action.payload;
           state.isSuper = action.payload['isSuper'];
          register(action.payload);
        //   console.log(action.payload);
        },
        logoutUser: (state, action) => {  
            state.isAuth = false;
            localStorage.clear();
            window.location.reload();
        },
        
    }
})

export const { registerUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;




