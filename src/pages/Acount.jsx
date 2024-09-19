import { useEffect, useState } from "react";
import ResetPassword from "../Components/ResetPassword";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../Redux/bookingSlide";
import { Auth } from "../Firebase/config";

function Account() {
   const [update , setUpdate] = useState()
   const bookings = useSelector(state => state)
   const dispatch = useDispatch()
   useEffect(()=>{
     dispatch(getBooking(Auth.currentUser.uid))
   },[])
    return ( 
        <div className="Account-box container">
           <h1>Account</h1>
           <div>
            <p>Update your Password <span onClick={()=>setUpdate(true)}>Click here</span></p>
            {update && <ResetPassword setResetPassword={setUpdate} resetPassword={update}/>}
            <Link className='back' style={{color:'#ea2430'}} to={"/"}> <FaArrowLeftLong className='back-arrow'/> Go Back </Link>
           </div>
           <div>
            <h4>Booking history</h4>
            <div>
{console.log(bookings)}
            </div>
           </div>
        </div>
     );
}

export default Account;