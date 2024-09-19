import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";

function Message({ content }) {
    return <p>{content}</p>;
}

function PaypalCheckoutButton({ product }) {
    const [paidFor, setPaidFor] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const style = {
        shape: "pill",
        layout: "vertical",
        color: "gold",
        label: "paypal",
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code:'USD',
                        value: 1234,
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        const res = await actions.order.capture();
        toast('Transaction completed by ' + res.payer.name.given_name);
        setPaidFor(true);
    };

    const onCancel = (data) => {
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
            {paidFor ? (
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
