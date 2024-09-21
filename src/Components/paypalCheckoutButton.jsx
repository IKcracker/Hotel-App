import { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateRoom } from "../Redux/roomSlice";
import { getRoom } from "../Database/rooms";

function Message({ content }) {
    return <p>{content}</p>;
}

function PaypalCheckoutButton({ product }) {
    const [paidFor, setPaidFor] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [room, setRoom] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
   
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await getRoom(product.category, product.id);
                setRoom(res);
            } catch (error) {
                console.error("Error fetching room:", error);
                setErrorMessage("Failed to fetch room details. Please try again.");
                toast.error("Failed to fetch room details.");
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [product]); 

    const style = {
        shape: "pill",
        layout: "vertical",
        color: "gold",
        label: "paypal",
    };
 
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: product.price,
                },
            }],
        });
    };

    const onApprove = async (data, actions) => {
        const res = await actions.order.capture();
        toast(`Transaction completed by ${res.payer.name.given_name}`); 
        const updated = { ...room, status: 'booked' };
        dispatch(updateRoom(updated));
        setPaidFor(true);
    };

    const onCancel = () => {
        setErrorMessage("Payment cancelled. Please try again.");
        toast("Payment was cancelled.");
    };

    const onError = (err) => {
        console.error("PayPal Checkout onError", err);
        setErrorMessage("An error occurred with the payment. Please try again later.");
        toast.error("An error occurred during the transaction.");
    };

    return (
        <div>
            {loading ? (
                <Message content="Loading..." />
            ) : paidFor ? (
                <Message content="Thank you for your purchase!" />
            ) : (
                <PayPalButtons
                    style={style}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onError={onError}   
                />
            )}
            {errorMessage && <Message content={errorMessage} />}
        </div>
    );
}

export default PaypalCheckoutButton;
