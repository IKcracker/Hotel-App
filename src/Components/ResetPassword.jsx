import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { Auth } from "../Firebase/config";

function ResetPassword({setResetPassword , resetPassword}) {
    const [email ,setEmail] = useState('')
    const [isCancel , setIsCancel] = useState(true)
    const reset = async()=>{
      try{
        const res = await sendPasswordResetEmail(Auth,email)
        console.log(res)
      }
      catch(error){
       console.log(error)
      }
    }
    return ( 

      <div className="reset-pass" style={{display:!resetPassword && 'none'}}>
      <div>
      <GiCancel className="cancel-icon" onClick={()=> setResetPassword(()=>false)} />
      <h1 className="title">Reset Password</h1>
        <input type="email" name="email" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <br/>
        <button className="btn" onClick={reset}>Restart</button>
        </div>
      </div>
);
}

export default ResetPassword;