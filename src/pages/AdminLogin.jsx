import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { getCode } from "../util/Admin";
import { toast } from "react-toastify";

function AdminLogin() {
    const [code , setCode] = useState(null)
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const res = await getCode();
    
            if( res.code == code)
            {
                 
                navigate('/admin')
               return localStorage.setItem('code',JSON.stringify(res.code))
            }
            toast.error('Wrong code')
            
            
        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }

    }

    return ( 
    <div className="container admin-login">
        <form onSubmit={handleSubmit}>
            <h1>Login For Admin</h1> 
            <div>
                <button type="submit" className="btn">Login</button>
                <input type="text" placeholder="Enter Secret Code" onChange={(e)=> setCode(()=> e.target.value)} value={code}/>
            </div> 
            <Link className='back' style={{color:'#ea2430'}} to={"/"}> <FaArrowLeftLong className='back-arrow'/> Go Back </Link>
        </form>
    </div> );
}

export default AdminLogin;