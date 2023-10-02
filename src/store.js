import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authParameters";
import storeReducder from "./redux/listing/listingManagers";

export const store = configureStore({
     reducer: {
          auth: authReducer,
          storeManager: storeReducder,  
     },
});





