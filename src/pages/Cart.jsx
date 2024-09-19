import { useEffect, useState } from "react";
import PaypalCheckoutButton from "../Components/paypalCheckoutButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { MdOutlineArrowForward } from "react-icons/md";
import { updateRoom } from "../Redux/roomSlice";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";



function Cart() {
  const room = useSelector(state => state.temp[0])
  const [zoom, setZoom] = useState(null);
  const [filter, setFilter] = useState({ checkIn: room.checkIn, checkOut: room.checkOut, adult: room.adult, children: room.children, type: room.type });
  const [confirm , setConfirm] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    room?.img?.length > 0 && setZoom(room?.img[0]);
  }, [room]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
};

const handleFilter = () => {
    const { checkIn, checkOut, adult, children , type } = filter;
    const updated = {...room, status:'not available' , checkIn , checkIn , adult , children , type}
    if (!checkIn || !checkOut || adult === null || children === null) {
        alert("Please fill all fields");
        return;
    }
    
    dispatch(updateRoom(updated));
    setConfirm(true)
    toast('you are ready to go!')
};


  return(
    room ?  
    <div className="container card-container">
      <Link className='back' style={{color:'#ea2430'}} to={"/"}> <FaArrowLeftLong className='back-arrow'/> Go Back </Link>
    <div key={room.id} className="room ">
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
                  value={(room?.rating.reduce((total, current) => {
                      return (total + (current?.rate || 0)); 
                  }, 0)/room.rating.length || 0).toFixed(1)}
                  size={28}
                  isHalf={true}
                  edit={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                  
              />
              </div>
              <div className="btn-box">
              <PaypalCheckoutButton product={room}/>
              <Link to={`/rooms/${room.id}`} onClick={()=> setPath(room.id)}>Read More</Link>
              </div>
              
              </div>
              
              </div>
              <form className="booking" onChange={handleChange}>
                <div className="input-box">
                    <label htmlFor="checkIn">Check In</label>
                    <input type="date" name="checkIn" id="checkIn" value={filter.checkIn} placeholder="YYYY-MM-DD" required />
                </div>
                <div className="input-box">
                    <label htmlFor="checkOut">Check Out</label>
                    <input type="date" name="checkOut" id="checkOut" value={filter.checkOut} placeholder="YYYY-MM-DD" required />
                </div>
                <div className="input-box">
                    <label htmlFor="adult">Adults</label>
                    <input type="number" min={0} max={4} name="adult" value={filter.adult} id="adult" required />
                </div>
                <div className="input-box">
                    <label htmlFor="children">Children</label>
                    <input type="number" min={0} max={4} name="children" value={filter.children} id="children" required />
                </div>
                <div className="input-box">
                    <label>Room Type</label>
                    <select required name="type" value={filter.type}>
                        <option value="deluxe">Deluxe</option>
                        <option value="luxury">Luxury</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>
                {!confirm && <div className="input-box book-now" type="submit" onClick={handleFilter}>
                    <label>Confirm</label>
                    <MdOutlineArrowForward className="book-icon" />
                </div>}
            </form>
              </div> :<div>
      <h1>You haven't Selected any room</h1>
      
   </div>
       
   )
 
}

export default Cart;