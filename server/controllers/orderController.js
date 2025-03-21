import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174"; // Your frontend URL
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // for stripe payment
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "eur", // Changed to EUR if you're processing payments in Euros
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Amount in cents (no need for 100*80 unless specifically required)
            },
            quantity: item.quantity
        }));

        // Adding Delivery Charge
        line_items.push({
            price_data: {
                currency: "eur", // Changed to EUR if you're processing payments in Euros
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 200 // Delivery charge in cents (2 EUR)
            },
            quantity: 1
        });

        // Create session for Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder };
