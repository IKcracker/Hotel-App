import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Auth } from "../Firebase/config";

function Protected() {
    const [loading, setLoading] = useState(true);
    const [isValid ,setIsvalid] = useState(false)
    const navigate = useNavigate();
   
    (async()=>{
    setTimeout(() => {
       const user = Auth?.currentUser?.emailVerified
       if(!user)
       {
        setLoading(false)
        navigate('/')
       }
       setLoading(false)
    }, 1000);
    
    })()
    
    return loading?<p>Loading....</p> :<Outlet />;  
}

export default Protected;
