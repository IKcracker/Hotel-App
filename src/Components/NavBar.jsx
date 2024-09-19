import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate()
    return ( 
        <div className="bottom-nav">
        <ul>
            <li><a>About</a></li>
            <select aria-label="My Account">
                <option value="account" onClick={()=> navigate('/Acount')}>My Account</option>
                <option value="cart" onClick={()=> navigate('/Cart')}>Cart</option>
                <option value="checkout" onClick={()=> navigate('/checkout')}>Checkout</option>
            </select>
            <li onClick={()=>navigate('/rooms')}><a>Rooms</a></li>
            <li><a>Contact Us</a></li>
        </ul>
    </div>
     );
}

export default NavBar;