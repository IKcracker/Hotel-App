import { useEffect, useState } from "react";
import { deleteRoom, getRooms } from "../Database/rooms";
import { MdDelete, MdEdit } from "react-icons/md";

function View({setRoom ,Room ,setTarget}) {
    const [rooms , setRooms] = useState(null)
    useEffect(()=>{
       (async()=>{
          const deluxe = await getRooms('Deluxe')
      
          const luxury = await getRooms('Luxury')
    
          const general = await getRooms('General')
    
          setRooms(old => ({...old ,'deluxe':deluxe ,'luxury':luxury , 'general':general }))
       })()
    },[])

    useEffect(()=>{
        
        (async()=>{
            const deluxe = await getRooms('Deluxe')
            const luxury = await getRooms('Luxury')
            const general = await getRooms('General')
            const data = {'deluxe':deluxe ,'luxury':luxury , 'general':general }
            console.log(data)
            (rooms !=data ) && setRooms(old => ({...old ,'deluxe':deluxe ,'luxury':luxury , 'general':general }))
         })()
    },[rooms])
    
    const handleDelete =async(id , category)=>{
            await deleteRoom(id , category)
            setRoom(old => ({...old,['add']:false , ['delete']:false , ['update']:false , ['view']:true}))
    } 
    const handleEdit =async(id,category)=>{
        setTarget((old)=>({...old , id , category}))
        setRoom(old => ({...old,['add']:true , ['delete']:false , ['update']:true , ['view']:false}))
    }     
    return ( 
        <div className="view-rooms">
        <h1>All Rooms</h1>
    
        <div className="deluxe-display">
            {rooms?.deluxe && <p>Deluxe</p>}
            <div>
                {
                    rooms?.deluxe ? rooms.deluxe.map((room, index) =>
                    {
                        return <div key={index} className="room">
                            <div>
                                <img src={room.img[0]} width={'100%'}/>
                            </div>
                            <div>
                             <h4>Size:{room.size}</h4>
                             <p>Visitors:{Number(room.adult) + Number(room.children)}</p>
                             <p>Price:R<span>{room.price}</span></p>
                             {Room.delete ? <MdDelete className='room-delete' onClick={() => handleDelete(room.id, room.category)} /> :
                             Room.update && <MdEdit className='room-delete' onClick={() => handleEdit(room.id, room.category)} />}
                            </div>
                        </div>
                    })  : <p>Loading...</p>
                }
            </div>
        </div>
    
        <div className="luxury-display">
            {rooms?.luxury && <p>Luxury</p>}
            <div>
                {
                    rooms?.luxury ? rooms.luxury.map((room, index) =>
                    {
                        return <div key={index} className="room">
                            <div>
                                <img src={room.img[0]} width={'100%'}/>
                            </div>
                            <div>
                             <h4>Size:{room.size}</h4>
                             <p>Visitors:{Number(room.adult) + Number(room.children)}</p>
                             <p>Price:R<span>{room.price}</span></p>
                             {Room.delete ? <MdDelete className='room-delete' onClick={() => handleDelete(room.id, room.category)} /> :
                             Room.update && <MdEdit className='room-delete' onClick={() => handleEdit(room.id, room.category)} />}
                            </div>
                        </div>
                    }) : <p>Loading...</p>
                }
             </div>
        </div>
    
        <div className="general-display">
            {rooms?.general && <p>General</p>}
            <div>
                {
                    rooms?.general ? rooms.general.map((room, index) =>
                    {
                        return <div key={index} className="room">
                            <div>
                                <img src={room.img[0]} width={'100%'} height={'200px'} />
                            </div>
                            <div>
                             <h4>Size:{room.size}</h4>
                             <p>Visitors:{Number(room.adult) + Number(room.children)}</p>
                             <p>Price:R<span>{room.price}</span></p>
                             {Room.delete ? <MdDelete className='room-delete' onClick={() => handleDelete(room.id, room.category)} /> :
                             Room.update && <MdEdit className='room-delete' onClick={() => handleEdit(room.id, room.category)} />}
                            </div>
                        </div>
                    }) : <p>Loading...</p>
                }
            </div>
        </div>
    </div>
    
     );
}

export default View;