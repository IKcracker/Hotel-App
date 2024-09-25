import { createSlice } from "@reduxjs/toolkit";


const tempSlide = createSlice({
    name:'temp',
    initialState:[],
    reducers:{
        getTemp:(state , action)=>{
             state.push(action.payload)
        }
    }
})

export const {getTemp} = tempSlide.actions

export default tempSlide.reducer