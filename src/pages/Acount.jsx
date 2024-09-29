import { useEffect, useState } from "react";
import ResetPassword from "../Components/ResetPassword";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../Redux/bookingSlide";
import { getAll, getMyBooked } from "../Database/Bookings";
import { Auth } from "../Firebase/config";

function Account({setPath}) {
   const [update , setUpdate] = useState()
   const [bookings , setBookings] = useState([])
   const dispatch = useDispatch()
   const navigate = useNavigate()
   useEffect(()=>{
      (async()=>{
      const res =await  getAll()
      res.forEach(data => setBookings((old) => ([...old, data.data()])));

   })()
   },[])

   
    return ( 
        <div className="Account-box container">
           <h1>Account</h1>
           <div>
            <p>Update your Password <span onClick={()=>setUpdate(true)}>Click here</span></p>
            {update && <ResetPassword setResetPassword={setUpdate} resetPassword={update}/>}
            <div>
            <h4>Bookings</h4>
            {bookings.map((book , index) =>{ 
               return book.uid ==Auth.currentUser.uid && <p onClick={()=> {setPath(book) ; navigate(`/rooms/${book?.id}`)}}> <button>click to view</button> - Room {Number(index) + 1}</p>
               })}
               
            <div>
            </div>  
            </div>
            <Link className='back' style={{color:'#ea2430'}} to={"/"}> <FaArrowLeftLong className='back-arrow'/> Go Back </Link>
           </div>
        </div>
     );
}

export default Account;