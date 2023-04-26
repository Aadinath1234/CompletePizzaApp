const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51Myn5iSGJdfzqXs7Halzr3DQFxn0jBgMLx90BjOs4mUyCY0vPQMJBIDqwnzbs373YcxqrZlrAXYIsp2eB0gS8INs00mXPuyV6I");
const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
    const { token, subTotal, currentUser, cartItems } = req.body;
    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: subTotal * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        payment_method_types: ["card"],
        payment_method_options: {
          card: {
            request_three_d_secure: "any",
          },
        },
        metadata: {
          orderId: uuidv4(),
        },
      });
  
      if (paymentIntent.status === "requires_action" &&
          paymentIntent.next_action.type === "use_stripe_sdk") {
        // Send the client secret to the client-side to handle the payment
        res.send({
          requiresAction: true,
          clientSecret: paymentIntent.client_secret,
        });
      } else if (paymentIntent.status === "succeeded") {
        // Handle successful payment
        const order = new Order({
          user: currentUser._id,
          orderItems: cartItems,
          shippingAddress: {
            fullName: token.card.name,
            address: token.card.address_line1,
            city: token.card.address_city,
            pincode: token.card.address_zip,
            country: token.card.address_country,
          },
          paymentMethod: "card",
          itemsPrice: subTotal,
          totalPrice: subTotal,
          isPaid: true,
          paidAt: Date.now(),
          isDelivered: false,
        });
        await order.save();
        res.send({ success: true });
      } else {
        res.status(400).json({
          message: "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  });

  router.post("/getuserorder", async (req, res) => {
    const { userid } = req.body;
    try {
      const orders = await Order.find({ userid }).sort({ _id: "-1" });
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).json({
        message: "Something Went Wront",
        error: error.stack,
      });
    }
  });

  router.get("/alluserorder", async (req, res) => {
    
    try {
      const orders = await Order.find({});
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).json({
        message: "Something Went Wront",
        error: error.stack,
      });
    }
  });
  

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDeliverd = true;
    await order.save();
    res.status(200).send("Order deliverd success");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});
  



module.exports = router;