import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getTemp } from "../Redux/tempSlide";
import { useDispatch } from 'react-redux';
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdFastfood, MdNetworkWifi3Bar, MdOutlineArrowForward, MdOutlineStarPurple500, MdSecurity } from "react-icons/md";
import { FaPersonSwimming } from "react-icons/fa6";

function Landing() {
    const [bg, setBg] = useState('/src/imgs/bg1.jpg'); 
    const [count, setCount] = useState(1); 
    const [isLogged, setIsLogged] = useState(false);
    const [isActive, setIsActive] = useState(false); 
    const [filter, setFilter] = useState({ checkIn: '', checkOut: '', adult: 0, children: 0, type: 'deluxe' });
    
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Check if the user is logged in and active
    useEffect(() => {
        const currentUser = auth?.currentUser;
        if (currentUser?.emailVerified) {
            setIsLogged(true);
        } else if (currentUser?.email) {
            setIsLogged(false);
            setIsActive(true);
        }
    }, [auth]);

    // Background image slideshow
    useEffect(() => {
        const timer = setTimeout(() => {
            setCount(prevCount => (prevCount < 5 ? prevCount + 1 : 1));
            setBg(`/src/imgs/bg${count}.jpg`);
        }, 10000);
        return () => clearTimeout(timer);
    }, [count]);

    // Logout function
    const handleLogout = async () => {
        await signOut(auth);
        setIsLogged(false);
        setIsActive(false);
        navigate('/login');
    };

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
    };

    // Handle form submission for booking
    const handleFilter = () => {
        const { checkIn, checkOut, adult, children } = filter;

        if (!checkIn || !checkOut || adult === null || children === null) {
            alert("Please fill all fields");
            return;
        }

        dispatch(getTemp(filter));
        navigate('/rooms');
    };

    return (
        <div className="landing">
            {/* Navigation Bar */}
            <nav className="nav">
                <div className="top-nav">
                    <div className="location">
                        <IoLocationSharp className="icon" />
                        <p>South Africa , Limpopo , Tzaneen , The Oaks</p>
                    </div>
                    <div className="email-us">
                        <div style={{ display: 'flex', gap: '.6rem' }}>
                            <MdEmail className="icon" />
                            <p>moropneki@gmail.com</p>
                        </div>
                        <p>Call on: +27 76 869 9754</p>
                        <p onClick={() => navigate('/adminlogin')}>Admin</p>
                    </div>
                </div>
                <div className="bottom-nav">
                    <div>
                        {isLogged ? (
                            <p>{auth?.currentUser?.email}</p>
                        ) : isActive && (
                            <p style={{ cursor: 'pointer' }}>Your account is not activated! Check your email</p>
                        )}
                    </div>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <select aria-label="My Account">
                            <option value="account" onClick={() => navigate('/account')}>My Account</option>
                            <option value="cart" onClick={() => navigate('/booking')}>Cart</option>
                        </select>
                        <li onClick={() => navigate('/rooms')}><a>Rooms</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                        {(isLogged || isActive) ? (
                            <button className="btn" onClick={handleLogout}>
                                Log out
                            </button>
                        ) : (
                            <button className="btn" onClick={() => navigate('/login')}>
                                Log in
                            </button>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero">
                <div className="imgs">
                    <img src={bg} alt="Hotel background" />
                </div>
                <div className="hero-content">
                    <div className="star-box">
                        {[...Array(5)].map((_, index) => (
                            <MdOutlineStarPurple500 className="star" key={index} />
                        ))}
                    </div>
                    <p>THE BEST 5 STAR HOTEL</p>
                    <h1 className="title">MOROPANE LUXURY HOTEL</h1>
                </div>
            </div>

            {/* Booking Form */}
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
                <div className="input-box book-now" type="submit" onClick={handleFilter}>
                    <label>Book Now</label>
                    <MdOutlineArrowForward className="book-icon" />
                </div>
            </form>

            {/* Rooms Display */}
            <div className="rooms">
                <p className="sub-title">EXTRAORDINARY HOTEL</p>
                <h1 className="title">Choose Your Type of Room</h1>
                <div className="type-of-rooms">
                    <div>
                        <img src="src/imgs/hotel-room-5858069.jpg" alt="deluxe room" />
                        <h1>Deluxe</h1>
                    </div>
                    <div>
                        <img src="src/imgs/hotel-room-1447201.jpg" alt="luxury room" />
                        <h1>Luxury</h1>
                    </div>
                    <div>
                        <img src="src/imgs/hotel-951594.jpg" alt="general room" />
                        <h1>General</h1>
                    </div>
                </div>
                <div className="services-title">
                    <h1><span>S</span>ervices</h1>
                </div>
            </div>

         
            <div className="services">
                <div className="service-items">
                    <div>
                        <MdNetworkWifi3Bar />
                        <p>Wifi</p>
                    </div>
                    <div>
                        <MdFastfood />
                        <p>Food</p>
                    </div>
                    <div>
                        <FaPersonSwimming />
                        <p>Swimming</p>
                    </div>
                    <div>
                        <MdSecurity />
                        <p>Security</p>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div>
                    <h1><span>M</span>LH</h1>
                    <p>@Dev by Kutullo Innocent Moropane</p>
                </div>
                <div>
                    <h4>Rooms</h4>
                    <p>Deluxe</p>
                    <p>Luxury</p>
                    <p>General</p>
                </div>
                <div>
                    <h4>Other</h4>
                    <p onClick={() => navigate('/terms')}>Terms and Condition</p>
                    <p>Developer</p>
                    <p onClick={() => navigate('/policy')}>Use Policy</p>
                </div>
                <div>
                    <h4>Support</h4>
                    <p>Moropneki@gmail.com</p>
                    <p>+27 76 869 9754</p>
                </div>
            </footer>
        </div>
    );
}

export default Landing;
