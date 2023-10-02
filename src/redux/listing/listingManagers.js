// storeReducder.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addItemToFirestore } from '../../dbservice/api/apiservice';
import { db } from "../../dbservice/firebase";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";

// Define an async action creator using createAsyncThunk
export const fetchSomeData = createAsyncThunk('api/fetchSomeData', async () => {
  console.log('fetching some data');
  const res = [];
   try {
   const itemRef = collection(db, 'items');
   const data = await getDocs(itemRef);
  // console.log(data.docs.map((doc) => doc.data())); 
  data.docs.map((doc) => res.push(doc.data()));
} catch (error) {
  console.log(error);
 }
  return res;
});

const storeReducder = createSlice({
  name: 'storeManager',
  initialState: {
  someData: null,
    loading: false,
    error: null,
  },
  reducers: {
            addItem: (state, action) => {
                addItemToFirestore(action.payload);
            },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.someData = action.payload;
      })
      .addCase(fetchSomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { addItem } = storeReducder.actions;
export default storeReducder.reducer;
