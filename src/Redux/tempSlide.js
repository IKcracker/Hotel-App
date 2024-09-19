import { createSlice } from "@reduxjs/toolkit";


const tempSlide = createSlice({
    name:'temp',
    initialState:[],
    reducers:{
        getTemp:(state , action)=>{
             state.push(action.payload)
        },
        setView:(state , action)=>{
            state.push(action.payload)
        },
        getView:(state , action)=>{
            return state
        }
    }
})

export const {getTemp , setView , getView} = tempSlide.actions

export default tempSlide.reducer