import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authSlice";
import ResetPassword from "../Components/ResetPassword";
import { Auth } from "../Firebase/config";
import { FaArrowLeftLong } from "react-icons/fa6";

function Login() {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [resetPassword, setResetPassword] = useState(false);
    const [verified ,setVerified] = useState(false)
    useEffect(()=>{
            setVerified(Auth?.currentUser?.emailVerified || true)
            console.log(Auth?.currentUser)
    },[],[Auth])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.auth);
    
    const handleSubmit = async () => {
        let res = await  dispatch(loginUser(inputs));
        if(res)
        {
        setTimeout(()=>{
            navigate('/')
        },5001)
            
        }
    };
    let resendEmail = async()=>{
        const auth = getAuth()
        let user = auth?.currentUser
        await sendEmailVerification(user)
        toast.update('Email Sent')
     }
    return (
         
            <>
                {resetPassword && <ResetPassword setResetPassword={setResetPassword} resetPassword={resetPassword}/>}
                <div className="form">
                
                    <div>
                    
                        <h1>Login Form</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(data) => setInputs(old => ({ ...old, [data.target.name]: data.target.value }))}
                            value={inputs.email}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(data) => setInputs(old => ({ ...old, [data.target.name]: data.target.value }))}
                            value={inputs.password}
                        />
                        
                        {verified ?<button type="submit" onClick={handleSubmit}>Log in</button>: <Link onClick={resendEmail}>Resend the link to activate account</Link>}
                        <Link onClick={() => setResetPassword(true)}>Forgot password? Click here</Link>
                        <Link to={'/register'}>Don't have an account? Click here</Link>
                        <Link className='back' to={"/"}> <FaArrowLeftLong className='back-arrow'/> Go Back </Link>
                    </div>
                </div>
            </>
          
            
        
    );
}

export default Login;
