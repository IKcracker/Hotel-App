import { useEffect, useState } from "react";
import PaypalCheckoutButton from "../Components/paypalCheckoutButton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { MdOutlineArrowForward } from "react-icons/md";
import { updateRoom } from "../Redux/roomSlice";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";


function Cart() {
  let data = useSelector((state) => state.temp[0]);
  const [zoom, setZoom] = useState(null);
  const [room , setRoom ] = useState(data)
  const [filter, setFilter] = useState({
    checkIn: room?.checkIn,
    checkOut: room?.checkOut,
    adult: room?.adult,
    children: room?.children,
    type: room?.type,
  });
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    room?.img?.length > 0 && setZoom(room?.img[0]);
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const { checkIn, checkOut, adult, children, type } = filter;
    if (!checkIn || !checkOut || adult === null || children === null) {
      alert("Please fill all fields");
      return;
    }
    
    const updated = { ...room,checkIn,checkOut};
 
    dispatch(updateRoom(updated));
    setConfirm(true);
    setRoom(old => ({...old , updated}))
    toast("You are ready to go!");
  };

  return room ? (
    <div className="container card-container">
      <Link className="back" to={"/"}>
        <FaArrowLeftLong className="back-arrow" /> Go Back
      </Link>
      <div key={room.id} className="room">
        <div>
          <img src={zoom || room.img[0]} width={"100%"} height={"260px"} alt="Room" />
        </div>
        <div>
          <h2>{room.category}</h2>
          <h4>Size: {room.size}</h4>
          <div className="visitors-box">
            <p>Adults: {room.adult}</p>
            <p>Children: {room.children}</p>
          </div>
          <p>Price: R<span>{room.price}</span></p>
          <div className="rating-box">
            <p>
              {(
                room?.rating.reduce((total, current) => total + (current?.rate || 0), 0) / 
                room.rating.length || 0
              ).toFixed(1)}
            </p>
            <ReactStars
              count={5}
              value={(
                room?.rating.reduce((total, current) => total + (current?.rate || 0), 0) / 
                room.rating.length || 0
              ).toFixed(1)}
              size={28}
              isHalf={true}
              edit={false}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          </div>
         
                  <PaypalCheckoutButton product={room} />
     
        </div>
      </div>
      <form className="booking" onSubmit={handleFilter}>
        <div className="input-box">
          <label htmlFor="checkIn">Check In</label>
          <input
            type="date"
            name="checkIn"
            id="checkIn"
            value={filter.checkIn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="checkOut">Check Out</label>
          <input
            type="date"
            name="checkOut"
            id="checkOut"
            value={filter.checkOut}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="adult">Adults</label>
          <input
            type="number"
            min={0}
            max={4}
            name="adult"
            value={filter.adult}
            onChange={handleChange}
            id="adult"
            readOnly
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="children">Children</label>
          <input
            type="number"
            min={0}
            max={4}
            name="children"
            value={filter.children}
            onChange={handleChange}
            id="children"
            readOnly
            required
          />
        </div>
        {!confirm && (
          <button className="input-box book-now" type="submit">
            <span>Confirm</span>
            <MdOutlineArrowForward className="book-icon" />
          </button>
        )}
      </form>
    </div>
    
  ) : (
    <div className="container container-flex">
      <h1>You haven't selected any room</h1>
      <button onClick={()=> navigate('/rooms')}>Go to rooms</button>
    </div>
  );
}

export default Cart;
