import { useEffect, useState } from "react";
import { deleteRoom, getRooms } from "../Database/rooms";
import { MdDelete, MdEdit } from "react-icons/md";

function View({ setRoom, Room, setTarget }) {
    const [rooms, setRooms] = useState({ deluxe: [], luxury: [], general: [] });
    const [deluxePage, setDeluxePage] = useState(1);
    const [luxuryPage, setLuxuryPage] = useState(1);
    const [generalPage, setGeneralPage] = useState(1);
    const [itemsPerPage] = useState(3); 

    useEffect(() => {
        const fetchRooms = async () => {
            const deluxe = await getRooms('Deluxe');
            const luxury = await getRooms('Luxury');
            const general = await getRooms('General');
            setRooms({ deluxe, luxury, general });
        };

        fetchRooms();
    }, []);

    const handleDelete = async (id, category) => {
        await deleteRoom(id, category);
        setRoom(old => ({ ...old, ['add']: false, ['delete']: false, ['update']: false, ['view']: true }));
    };

    const handleEdit = async (id, category) => {
        setTarget(old => ({ ...old, id, category }));
        setRoom(old => ({ ...old, ['add']: true, ['delete']: false, ['update']: true, ['view']: false }));
    };

    const paginatedRooms = (roomType, currentPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return roomType.slice(startIndex, startIndex + itemsPerPage);
    };

    return (
        <div className="view-rooms">
            <h1>All Rooms</h1>

            {['deluxe', 'luxury', 'general'].map((type) => (
                <div key={type} className={`${type}-display`}>
                    {rooms[type] && <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>}
                    <div>
                        {rooms[type].length ? (
                            paginatedRooms(rooms[type], type === 'deluxe' ? deluxePage : type === 'luxury' ? luxuryPage : generalPage).map((room, index) => (
                                <div key={index} className="room">
                                    <div>
                                        <img src={room.img[0]} width={'100%'} />
                                    </div>
                                    <div>
                                        <h4>Size: {room.size}</h4>
                                        <p>Visitors: {Number(room.adult) + Number(room.children)}</p>
                                        <p>Price: R<span>{room.price}</span></p>
                                        {Room.delete ? (
                                            <MdDelete className='room-delete' onClick={() => handleDelete(room.id, room.category)} />
                                        ) : Room.update && (
                                            <MdEdit className='room-delete' onClick={() => handleEdit(room.id, room.category)} />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{marginTop:"4rem"}}>Loading...</p>
                        )}
                    </div>

                    
                    <div className="pagination">
                        <button 
                            onClick={() => type === 'deluxe' ? setDeluxePage(prev => Math.max(prev - 1, 1)) : type === 'luxury' ? setLuxuryPage(prev => Math.max(prev - 1, 1)) : setGeneralPage(prev => Math.max(prev - 1, 1))}
                            disabled={type === 'deluxe' ? deluxePage === 1 : type === 'luxury' ? luxuryPage === 1 : generalPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {type === 'deluxe' ? deluxePage : type === 'luxury' ? luxuryPage : generalPage} of {Math.ceil(rooms[type].length / itemsPerPage)}</span>
                        <button 
                            onClick={() => type === 'deluxe' ? setDeluxePage(prev => Math.min(prev + 1, Math.ceil(rooms.deluxe.length / itemsPerPage))) : type === 'luxury' ? setLuxuryPage(prev => Math.min(prev + 1, Math.ceil(rooms.luxury.length / itemsPerPage))) : setGeneralPage(prev => Math.min(prev + 1, Math.ceil(rooms.general.length / itemsPerPage)))}
                            disabled={type === 'deluxe' ? deluxePage === Math.ceil(rooms.deluxe.length / itemsPerPage) : type === 'luxury' ? luxuryPage === Math.ceil(rooms.luxury.length / itemsPerPage) : generalPage === Math.ceil(rooms.general.length / itemsPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default View;
