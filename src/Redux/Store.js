
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomsReducer from './roomSlice'
import tempReducer from './tempSlide'
import bookingsReducer from './bookingSlide'
const store = configureStore({
  reducer: {
    auth: authReducer,  
    rooms: roomsReducer,
    temp: tempReducer,
    bookings: bookingsReducer
  },
});

export default store;
