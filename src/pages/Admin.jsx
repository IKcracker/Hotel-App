import { useEffect, useState } from "react";
import AddRoom from '../Components/AddRoom'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { MdExpandCircleDown, MdPowerSettingsNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import View from "../Components/View";

function Admin() {
    const [more , setMore] = useState({rooms:false , bookings:false })
    const [room , setRoom] = useState({view:true ,add:false , delete:false , update:false})
    const [isActive , setIsAtive] = useState(false)
    const [target , setTarget]  = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        isActive && navigate('/adminlogin')
    },[isActive])
    return ( 
    <div className="container admin-container">
        <nav className="side-menu">
           <h1><span>M</span>LH</h1>
           <div className="options">
                <ul>
                    <div onClick={()=> setMore(old => ({...old , rooms:!more.rooms}))}>
                    <li>Rooms</li>
                    {!more.rooms ? <IoMdArrowDropdownCircle  className="c-icons"/>:
                    <IoMdArrowDropupCircle className="c-icons"/>}
                    </div>
                    
                    <ul className={more.rooms && 'more-options'}>
                        <li onClick={()=> setRoom(old => ({...old,['add']:false , ['delete']:false , ['update']:false, ['view']:true}))}>View All</li>
                        <li onClick={()=> setRoom(old => ({...old,['add']:true , ['delete']:false , ['update']:false, ['view']:false}))}>Add</li>
                        <li onClick={()=> setRoom(old => ({...old,['add']:false , ['delete']:true , ['update']:false , ['view']:true}))}>Delete</li>
                        <li  onClick={()=> setRoom(old => ({...old,['add']:false , ['delete']:false , ['update']:true , ['view']:true}))}>Update</li>
                    </ul>
                </ul>
           </div>
           <div className="control" >
           <MdPowerSettingsNew className="power-icon"/>
           {!isActive && <p onClick={()=> {localStorage.clear() , setIsAtive(()=>true)}}>Log out</p>}
           </div>
        </nav>
       {(more.rooms && room.add) && <div className="admin-display">
          <AddRoom target={target} rooms={room}/>   
        </div>}
        {
           room.view && <div className="view">
                        <View setRoom={setRoom} Room={room} setTarget={setTarget}/>
            </div>
        }
    </div> 
    );
}

export default Admin;