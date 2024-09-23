import { useEffect, useState } from "react";
import { getRooms } from "../Database/rooms";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { updateRoom } from "../Redux/roomSlice";
import { getTemp } from "../Redux/tempSlide";
import Filter from "../Components/filter";
import Pagination from "../Components/pagination"; 
import Spinner from "../Components/spinner";
import { FaArrowLeftLong } from "react-icons/fa6";

function ViewAll({ setPath }) {
    const [rooms, setRooms] = useState([]); 
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [rate, setRate] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [currentRoom, setCurrentRoom] = useState(null);
    const [currentPage, setCurrentPage] = useState({});
    const [roomsPerPage] = useState(3); 
    const filterData = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            const deluxe = await getRooms('Deluxe');
            const luxury = await getRooms('Luxury');
            const general = await getRooms('General');
            const allRooms = [...deluxe, ...luxury, ...general];
            setRooms(allRooms);
            setFilteredRooms(allRooms);
            setCurrentPage({ 'Deluxe': 1, 'Luxury': 1, 'General': 1 });
        })();
    }, [filterData]);

    const ratingChanged = (rating) => {
        setRate(rating);
    };

    const handleRating = (e, room) => {
        e.preventDefault();
        room.rating.push({ reviewText, rate });
        const res = dispatch(updateRoom(room));
         console.log(res)
        setRate(null);
        setReviewText("");
        setCurrentRoom(null);
    };

    const handleBook = (room) => {
        dispatch(getTemp(room));
        navigate('/booking');
    };

    const handleFilter = (filters) => {
        const { category, priceRange, size } = filters;
        let filtered = rooms;
        if (category) filtered = filtered.filter(room => room.category === category);
        if (priceRange) filtered = filtered.filter(room => room.price >= priceRange[0] && room.price <= priceRange[1]);
        if (size) filtered = filtered.filter(room => room.size === size);

        setFilteredRooms(filtered);
        setCurrentPage({ ...currentPage, [category]: 1 }); 
    };

    const groupedRooms = filteredRooms.reduce((acc, room) => {
        acc[room.category] = acc[room.category] ? [...acc[room.category], room] : [room];
        return acc;
    }, {});


    const handlePageChange = (category, pageNumber) => {
        setCurrentPage(prevState => ({
            ...prevState,
            [category]: pageNumber,
        }));
    };

    return (
        <div className="all-rooms">
            <div className="options-nav">
                <Link className='back' style={{ color: '#ea2430' }} to="/">
                    <FaArrowLeftLong className='back-arrow' /> Go Back
                </Link>
                <Filter onFilter={handleFilter} />
            </div>

            {rooms.length > 0 ? (
                <div className="rooms-container">
                    {Object.keys(groupedRooms).map((category, catIndex) => {
                        const indexOfLastRoom = currentPage[category] * roomsPerPage;
                        const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
                        const currentCategoryRooms = groupedRooms[category].slice(indexOfFirstRoom, indexOfLastRoom);

                        return (
                            <div key={catIndex} className="category-section">
                                <h2>{category} Rooms</h2>
                                <div className="room-grid">
                                    {currentCategoryRooms.map((room, index) => (
                                        <div key={index} className="room">
                                            <div className="room-image">
                                                <img src={room.img[0]} width="100%" height="260px" alt="Room" />
                                            </div>
                                            <div className="room-details">
                                                <h2>{room.category}</h2>
                                                <h4>Size: {room.size}</h4>
                                                <div className="visitors-box">
                                                    <p>Adult: {room.adult}</p>
                                                    <p>Children: {room.children}</p>
                                                </div>
                                                <p>Price: R<span>{room.price}</span></p>
                                               

                                                <div className="rating-box" onClick={() => setCurrentRoom(room)}>
                                                    <p>
                                                    {(room?.rating.reduce((total, current) => total + (current?.rate || 0), 0) / room.rating.length || 0).toFixed(1)}
                                                    </p>
                                                    <ReactStars
                                                        count={5}
                                                        onChange={ratingChanged}
                                                        value={(
                                                            room?.rating.reduce((total, current) => total + (current?.rate || 0), 0) / room.rating.length
                                                        ).toFixed(1) || 0}
                                                        size={28}
                                                        isHalf={true}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>

                                                <div className={"btn-box"}>
                                              
                                                {room.status != "available" ?<div><p>not available till</p><p> {room.checkOut}</p></div>:
                                                <button className="book-now" onClick={() => handleBook(room)}>Book Now</button>
                                                }
                                                    
                                                    <Link to={`/rooms/${room.id}`} onClick={() => setPath(room)}>Read More</Link>
                                                </div>

                                                {currentRoom === room && rate && (
                                                    <form className="rating-form" onSubmit={(e) => handleRating(e, room)}>
                                                        <MdCancel className="cancel-icon" onClick={() => setRate(null)} />
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
                                                        <button type="submit">Submit</button>
                                                    </form>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Pagination
                                    totalRooms={groupedRooms[category].length}
                                    roomsPerPage={roomsPerPage}
                                    currentPage={currentPage[category] || 1}
                                    setCurrentPage={(pageNumber) => handlePageChange(category, pageNumber)}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default ViewAll;
