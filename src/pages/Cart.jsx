import { useEffect, useState } from "react";
import PaypalCheckoutButton from "../Components/paypalCheckoutButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { MdOutlineArrowForward } from "react-icons/md";
import { updateRoom } from "../Redux/roomSlice";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getTemp } from "../Redux/tempSlide";

function Cart() {
  const room = useSelector(state => state.temp[0]);
  const [zoom, setZoom] = useState(null);
  const [filter, setFilter] = useState({
    checkIn: room.checkIn,
    checkOut: room.checkOut,
    adult: room.adult,
    children: room.children,
    type: room.type
  });
  const [updatedRoom, setUpdatedRoom] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    room?.img?.length > 0 && setZoom(room?.img[0]);
  }, [room]);

  useEffect(() => {
    if (confirm) {
      dispatch(getTemp());
    }
  }, [confirm, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const { checkIn, checkOut, adult, children, type } = filter;
    if (!checkIn || !checkOut || adult === null || children === null) {
      toast.error("Please fill all fields");
      return;
    }

    const updated = { ...room, status: 'booked', checkIn, checkOut, adult, children, type };
    dispatch(updateRoom(updated));
    dispatch(getTemp(updated));
    setUpdatedRoom(()=>updated);
    setConfirm(true);
    toast.success('You are ready to go!');
  };

  return (
    room ?  
      <div className="container card-container">
        <Link className='back' style={{ color: '#ea2430' }} to={"/"}>
          <FaArrowLeftLong className='back-arrow' /> Go Back
        </Link>
        <div key={room.id} className="room">
          <div>
            <img src={room.img[0]} width='100%' height='260px' alt="Room" />
          </div>
          <div>
            <h2>{room.category}</h2>
            <h4>Size: {room.size}</h4>
            <div className="visitors-box">
              <p>Adult: {room.adult}</p>
              <p>Children: {room.children}</p>
            </div>
            <p>Price: R<span>{room.price}</span></p>
            <div className="rating-box">
              <p>
                {(room?.rating.reduce((total, current) => total + (current?.rate || 0), 0) / room.rating.length || 0).toFixed(1)}
              </p>
              <ReactStars
                count={5}
                value={(room?.rating.reduce((total, current) => total + (current?.rate || 0), 0) / room.rating.length || 0).toFixed(1)}
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
              <PaypalCheckoutButton product={updatedRoom} /> 
              <Link to={`/rooms/${room.id}`}>Read More</Link>
            </div>
          </div>
        </div>
        <form className="booking" onSubmit={handleFilter}>
          <div className="input-box">
            <label htmlFor="checkIn">Check In</label>
            <input type="date" name="checkIn" id="checkIn" value={filter.checkIn} onChange={handleChange} placeholder="YYYY-MM-DD" required />
          </div>
          <div className="input-box">
            <label htmlFor="checkOut">Check Out</label>
            <input type="date" name="checkOut" id="checkOut" value={filter.checkOut} onChange={handleChange} placeholder="YYYY-MM-DD" required />
          </div>
          <div className="input-box">
            <label htmlFor="adult">Adults</label>
            <input type="number" min={0} max={4} name="adult" value={filter.adult} id="adult" onChange={handleChange} required />
          </div>
          <div className="input-box">
            <label htmlFor="children">Children</label>
            <input type="number" min={0} max={4} name="children" value={filter.children} id="children" onChange={handleChange} required />
          </div>
          <div className="input-box">
            <label>Room Type</label>
            <select name="type" value={filter.type} onChange={handleChange} required>
              <option value="deluxe">Deluxe</option>
              <option value="luxury">Luxury</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          {!confirm && <button type="submit" className="input-box book-now">
            <label>Confirm</label>
            <MdOutlineArrowForward className="book-icon" />
          </button>}
        </form>
      </div> :
      <div>
        <h1>You haven't Selected any room</h1>
      </div>
  );
}

export default Cart;
