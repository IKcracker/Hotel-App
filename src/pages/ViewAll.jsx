import { useEffect, useState } from "react";
import { getRooms } from "../Database/rooms";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { updateRoom } from "../Redux/roomSlice";
import { getTemp, setView } from "../Redux/tempSlide";
import { getBooking } from "../Redux/bookingSlide";

function ViewAll({setPath}) {
    const [rooms, setRooms] = useState(null);
    const [rate, setRate] = useState(null); 
    const [reviewText, setReviewText] = useState(""); 
    const [currentRoom, setCurrentRoom] = useState(null); 
    const [checkBooked , setCheckBooked] = useState(null)
    const filterData = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const deluxe = await getRooms('Deluxe');
            const luxury = await getRooms('Luxury');
            const general = await getRooms('General');
            console.log(filterData)
            dispatch(getBooking())
            setRooms((old) => [...(old || []), ...deluxe, ...luxury, ...general]);
        })();
    }, []);
    useEffect(()=>{
         
    },[rate,reviewText])

    const ratingChanged = (rating) => {
        setRate(rating);
    };

    const handleRating = (e, room) => {
        e.preventDefault();
        room.rating.push({reviewText , rate})
        const res = dispatch(updateRoom(room))
        console.log(res)
    };

    const handleBook = (room) => {
        console.log('Booking room:', room);
        dispatch( getTemp(room))
        setRate(null)
        navigate('/booking')
    };

    return (
        <div className="all-rooms">
            <div className="filter">
                <Link to={'/'}>Go Back</Link>
            </div>

            <div className="rooms-container">
                {rooms ? rooms.map((room, index) => {
                    return (
                        <div key={index} className="room">
                            <div>
                                <img src={room.img[0]} width={'100%'} height={'260px'} alt="Room" />
                            </div>
                            <div>
                                <h2>{room.category}</h2>
                                <h4>Size: {room.size}</h4>
                                <div className="visitors-box">
                                    <p>Adult: {room.adult}</p>
                                    <p>Children: {room.children}</p>
                                </div>
                                <p>Price: R<span>{room.price}</span></p>
                                <div className="rating-box" onClick={()=> setCurrentRoom(room)}>
                                <p>
                                    {(room?.rating.reduce((total, current) => {
                                       return (total + (current?.rate || 0)); 
                                    }, 0)/room.rating.length || 0).toFixed(1)}
                                 </p>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        value={(room?.rating.reduce((total, current) => {
                                            return (total + (current?.rate || 0)); 
                                         }, 0)/room.rating.length || 0).toFixed(1)}
                                        size={28}
                                        isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        
                                    />
                                     </div>
                                     <div className="btn-box">
                                     <button className="book-now" onClick={() => handleBook(room)}>Book Now</button>
                                     <p onClick={()=>{ dispatch(setView(room)) ;setPath(room); navigate(`/rooms/${room.id}`)}}>Read More</p>
                                     </div>
                                    
                               
                                
                                    <form className={(rate && currentRoom === room) ? "rating-form":"no-rating-form"} onSubmit={(e) => handleRating(e, room)}>
                                        <MdCancel className='cancel-icon' onClick={() => setRate(null)} />
                                        <div>
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                value={rate}
                                                size={28}
                                                isHalf={true}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                fullIcon={<i className="fa fa-star"></i>}
                                                activeColor="#ffd700"
                                            />
                                            <p>{rate}</p>
                                        </div>
                                        <label>Leave us your experience</label>
                                        <textarea
                                            className="text"
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                        />
                                        <button type="submit" disabled={room.status != 'available'}>Submit</button>
                                    </form>
                                
                            </div>
                        </div>
                    );
                }) : <p>Loading...</p>}
            </div>
        </div>
    );
}

export default ViewAll;
