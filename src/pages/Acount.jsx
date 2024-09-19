import { useState } from "react";
import ResetPassword from "../Components/ResetPassword";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Account() {
   const [update , setUpdate] = useState()
    return ( 
        <div className="Account-box container">
           <h1>Account</h1>
           <div>
            <p>Update your Password <span onClick={()=>setUpdate(true)}>Click here</span></p>
            {update && <ResetPassword setResetPassword={setUpdate} resetPassword={update}/>}
            <Link className='back' style={{color:'#ea2430'}} to={"/"}> <FaArrowLeftLong className='back-arrow'/> Go Back </Link>
           </div>
        </div>
     );
}

export default Account;