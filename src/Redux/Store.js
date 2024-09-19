// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomsReducer from './roomSlice'
import tempReducer from './tempSlide'
import bookingReducer from './bookingSlide'
const store = configureStore({
  reducer: {
    auth: authReducer,  
    rooms: roomsReducer,
    temp: tempReducer,
    booking:bookingReducer
  },
});

export default store;
