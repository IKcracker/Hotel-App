import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAuth } from "../util/Register";
import { getData, storingUser } from "../Database/Firestore";
import { logIn } from "../util/Login";
import { toast } from "react-toastify";
import { useState } from "react";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {

    const newUser = { email, password };

    try {

      const user = await registerAuth(newUser)
      if(user)
      {
        try{
          const data = await getData()
          if(data){
            let res = data.forEach(e => {
              if(e.email == email){
                return true
              }  
            });
           !res && storingUser({"id":user.uid , "email":email });  
            toast("Successfully registerd")
          }


        }
        catch(error){
          return rejectWithValue(error)
        }
        
      }   

      return { uid: user.uid, email };

    } catch (err) {

      return rejectWithValue(err.message);

    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async ({ email, password }) => {

   
    try {
      const res = await logIn({email , password})
      }
      
     catch (err) {
      return { error: true, msg: err.message };
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
   
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


     
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export const { logoutUser, printUser } = authSlice.actions;

export default authSlice.reducer;
