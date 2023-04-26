import React from "react";
import { Button } from "react-bootstrap";
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from "../actions/orderAction";

import { useDispatch } from "react-redux";



const Checkout = ({ subTotal }) => {
     const tokenHandler = (token) => {
      dispatch(placeOrder(token,subTotal))
      console.log(token);
     }
     
    const  dispatch = useDispatch()
  
    return (
    <StripeCheckout
       amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51Myn5iSGJdfzqXs7R7McsGG3srup3G49ZYvkFSqNsj8U7VRYzqj7H9vHhaa5yOoBZhXkzP0XQkrb2uw3g0yRIZUr00o4wfTbKQ"
        currency="INR"
    >
      <Button>Pay Now</Button>
      </StripeCheckout>
  )
  };

 


export default Checkout;
