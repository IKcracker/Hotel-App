import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addRooms, getRoom } from "../Database/rooms";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import { toast } from "react-toastify";

const initialState = {
    loading:false,
    rooms:null,
    error:null
   }
export const createRooms = createAsyncThunk(
    "rooms/createRooms",
    async (room,{rejectWith}) => {
   
    try{
        let res = await addRooms(room)
        return res
    }
    catch(error)
    {
       rejectWith(error)
    }
})
export const getRooms = createAsyncThunk(
    "rooms/getRooms",
    async (id , category,{rejectWith}) => {
    
    try{
        let res = await getRoom(category , id)
        return res
    }
    catch(error)
    {
       rejectWith(error)
    }
})
export const updateRoom = createAsyncThunk(
    'room/update',
    async( room)=>{
        const ref = doc(db , `/${room.category}`, room.id)
       
        try{
            const res =await updateDoc(ref,room)
            return res
        }
        catch(error){
           return error.message
        }
        
    }
)
const roomsSlice = createSlice({
       name :'rooms',
       initialState,
       reducers:{

       },
       extraReducers:(builder)=>{
            builder
            .addCase(createRooms.pending , (state , action)=>{
                  state.loading = true;
                  state.error= null; 
            })
            .addCase(createRooms.fulfilled , (state , action)=>{
                state.loading = false;
                state.rooms = action.payload;
                state.error= false; 
          })
          .addCase(createRooms.rejected , (state , action)=>{
            state.loading = false;
            state.error= action.payload; 
            })
            .addCase(updateRoom.pending , (state , action)=>{
                    state.loading = true;
            })
            .addCase(updateRoom.fulfilled , (state , action)=>{
                    state.loading = false ;
                    state.rooms = action.payload;

            })
            .addCase(updateRoom.rejected , (state , action)=>{
                   state.error = action.payload
            })
            
        }
}
    
)

export default roomsSlice.reducer