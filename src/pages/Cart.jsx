import { useEffect, useState } from "react";
import PaypalCheckoutButton from "../Components/paypalCheckoutButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


function Cart() {
  const [zoom, setZoom] = useState(null);

  const room = useSelector(state => state.temp[0])
  console.log(room)

  useEffect(() => {
    room?.img?.length > 0 && setZoom(room?.img[0]);
  }, [room]);

  return(
    room ?  
    <div className="container card-container">
      <Link to={'/rooms'}>Select Room now</Link>
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
              </div> :<div>
      <h1>You haven't Selected any room</h1>
      
   </div>
       
   )
 
}

export default Cart;