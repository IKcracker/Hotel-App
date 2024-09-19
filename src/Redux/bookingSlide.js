import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBookings, getBooking } from "../Database/Bookings";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import { toast } from "react-toastify";

const initialState = {
    loading:false,
   booking:null,
    error:null
   }
export const createBookings = createAsyncThunk(
    "Bookings/createBookings",
    async (Booking,{rejectWith}) => {
    console.log(Booking)
    try{
        let res = await addBookings(Booking)
        return res
    }
    catch(error)
    {
       rejectWith(error)
    }
})
export const getBookings = createAsyncThunk(
    "Bookings/getBookings",
    async (id ,{rejectWith}) => {
    
    try{
        let res = await getBooking('/booking' , id)
        console.log(res)
    }
    catch(error)
    {
       rejectWith(error)
    }
})
export const updateBooking = createAsyncThunk(
    'Booking/update',
    async( Booking)=>{
        const ref = doc(db , `/booking`, Booking.id)
        console.log(ref)
        try{
            const res =await updateDoc(ref,Booking)
            console.log(res)
        }
        catch(error){
           console.log(error.message)
        }
        
    }
)
const bookingSlice = createSlice({
       name :'Bookings',
       initialState,
       reducers:{

       },
       extraReducers:(builder)=>{
            builder
            .addCase(createBookings.pending , (state , action)=>{
                  state.loading = true;
                  state.error= null; 
            })
            .addCase(createBookings.fulfilled , (state , action)=>{
                state.loading = false;
                state.Bookings = action.payload;
                state.error= false; 
          })
          .addCase(createBookings.rejected , (state , action)=>{
            state.loading = false;
            state.error= action.payload; 
            })
            .addCase(updateBooking.pending , (state , action)=>{
                    state.loading = true;
            })
            .addCase(updateBooking.fulfilled , (state , action)=>{
                    state.loading = false ;
                    state.booking = action.payload;

            })
            .addCase(updateBooking.rejected , (state , action)=>{
                   state.error = action.payload
            })
            
        }
}
    
)

export default bookingSlice.reducer