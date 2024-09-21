import { useState } from "react";
import { registerAuth } from "../util/Register";
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { registerUser, } from "../Redux/authSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
function Register() {

    const [inputs,setInputs]= useState({email:'',password:'' ,confirm_password:''})
    const [isValid , setIsValid] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const res = useSelector(state => state.auth)

    let handleSubmit=async (e)=>{
         e.preventDefault()
         await dispatch( registerUser(inputs))

           setIsValid(()=>true)
            setTimeout(()=>{
                navigate('/login')
             },5000)

      
          setInputs(old =>({...old  , ["email"]:'' , ["password"]:'' ,['confirm_password']:'' }))
    }
    let resendEmail = async()=>{
       const auth = getAuth()
       let user = auth.currentUser
       await sendEmailVerification(user)
       toast.update('Email Sent')
    }
    const logout =async()=>{
           const auth = getAuth()
          const use = await signOut(auth)
         
    }
    return ( <>
    <div className="form">
    
    <div>
    <h1>Registeration Form</h1>

    <input type="email" placeholder="Email" name="email" onChange={(data)=> setInputs(old=> ({...old , [data.target.name]:data.target.value}))} value={inputs.email}/>

    <input type="password" placeholder="Password" name="password" onChange={(data)=> setInputs(old=> ({...old , [data.target.name]:data.target.value}))} value={inputs.password}/>

    <input type="password" placeholder="Confirm Password" name="confirm_password" onChange={(data)=> setInputs(old=> ({...old , [data.target.name]:data.target.value}))} value={inputs.confirm_password}/>

    <button type="submit" onClick={handleSubmit}>Register</button>

 
       <Link onClick={resendEmail}>Resend the link to activate account</Link>
       <Link to={'/login'}>Already have account?Click here</Link>
       <Link className='back' to={"/"}> <FaArrowLeftLong className='back-arrow' /> Go Back </Link>
    </div>
    </div>
       
    </> );
}

export default Register;