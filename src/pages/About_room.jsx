import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTemp } from "../Redux/tempSlide";
import ReactStars from "react-rating-stars-component";

function AboutRoom({ room = {} }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBackClick = () => {
        dispatch(getTemp());
    };

    const handleBook = (room) => {
        dispatch(getTemp(room));
        navigate('/booking');
    };

    const { status, category, size, adult = 0, children = 0, img = [], rating = [] } = room;

    return (
        <div className="container about-container">
            <div className="top-container">
                <div className="options">
                    <Link className='back' style={{ color: '#ea2430' }} to="/rooms" onClick={handleBackClick}>
                        <FaArrowLeftLong className='back-arrow' /> Go Back
                    </Link>
                    <button 
                        style={{ backgroundColor: status === 'available' ? '#ea2430' : 'gray' }} 
                        disabled={status !== 'available'}
                        onClick={() => handleBook(room)}
                    >
                        {status === 'available' ? "Book Now" : "Room is not available"}
                    </button>
                </div>
                <div>
                    <h1>{category} {size}</h1>
                    <h3>Room</h3>
                </div>
            </div>
            <div>
                <h4>What people say</h4>
                {rating.length > 0 ? (
                    rating.map((rate, index) => (
                        <div>
                                 <ReactStars
                                        count={5}
                                        onChange={rate?.rate}
                                        edit={false}
                                        value={(
                                        room?.rating.reduce((total, current) => total + (current?.rate || 0), 0) / room.rating.length).toFixed(1) || 0}
                                          size={28}
                                         isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor={"#ffd700"}
                                        
                                    />
                                             
                            <p key={index}>"{rate?.reviewText}"</p>
                        </div>
                        
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
            <div className="bottom-container">
                <div className="about">
                    <h1>About Room</h1>
                    <div>
                        <p>We offer an exquisite blend of elegance and comfort, designed for the discerning guest seeking a refined experience. 
                        The room features plush furnishings, including a king-sized bed draped in premium linens, a spacious seating area with designer armchairs, 
                        and modern artwork that adds a sophisticated touch.</p>
                        <p>The décor balances contemporary style with classic opulence, using rich textures and a neutral color palette. 
                        Large windows allow natural light to flood the room, offering stunning views. High-end amenities such as a flat-screen TV, minibar, 
                        and marble en-suite bathroom with a rain shower complete the luxurious ambiance.</p>
                    </div>
                </div>

                <div className="amenities">
                    <h1>Amenities</h1>
                    <div>
                        <div>
                            <p>Size</p>
                            <p>Connectivity</p>
                            <p>Guests</p>
                            <p>Occupancy</p>
                            <p>Status</p>
                        </div>
                        <div>
                            <p>175 square feet</p>
                            <p>Free Wi-Fi</p>
                            <p>Up to {adult + children} guests</p>
                            <p>{adult} adults and {children} children</p>
                            <p>{status}</p>
                        </div>
                    </div>
                </div>

                <div className="last-container">
                    <h1>Images</h1>
                    {img.length > 0 ? img.map((imgURL, index) => (
                        <div key={index}>
                            <img src={imgURL} alt={`Room Image ${index + 1}`} />
                        </div>
                    )) : <p>No images available</p>}
                </div>
            </div>
        </div>
    );
}

export default AboutRoom;
