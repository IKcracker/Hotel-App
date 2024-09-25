import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectAdmin() {

    const res = JSON.parse(localStorage.getItem('code'));
    const navigate = useNavigate()

    useEffect(()=>{
        if(!res)
        {
        navigate('/adminlogin')
        }
    },[])

    return <Outlet/>;
}

export default ProtectAdmin;