import { PayPalButtons } from '@paypal/react-paypal-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate()
  return (

      <div className='container checkout-container'>
      <div className='go-back' onClick={()=>navigate('/')}>
      <FaArrowLeftLong />
      <Link to={'/'}>Go back</Link>
      </div>
      
      <div className='checkout-box'>
      <h1>Let's finalize your room</h1>
      <PayPalButtons/>
      </div>

      </div>
  );
};

export default Checkout;