import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } =
    useContext(StoreContext);

  // State for user delivery details
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Handle input change
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle order placement
  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];

    // Extract only items in the cart
    foodList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    // Order data to be sent to the backend
    let orderData = {
      address: {...data},
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Including delivery fee
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success && response.data.session_url) {
        window.location.replace(response.data.session_url); // Redirect to Stripe
      } else {
        alert("Error: Payment session not created.");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const naviagte = useNavigate();

  // logic not to enter payment without login or empty cart
  useEffect(()=>{
    if (!token) {
      naviagte('/cart')
    }
    else if(getTotalCartAmount() === 0){
      naviagte('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="flex flex-wrap items-start justify-center gap-12 mt-24 px-4">
      {/* Left Side - Delivery Information */}
      <div className="w-full md:w-2/4 lg:w-2/5 bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-4">Delivery Information</p>

        <div className="flex flex-wrap">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} className="input-style" type="text" placeholder="First Name" required />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} className="input-style" type="text" placeholder="Last Name" required />
        </div>

        <input name="email" onChange={onChangeHandler} value={data.email} className="input-style" type="email" placeholder="Email Address" required />
        <input name="street" onChange={onChangeHandler} value={data.street} className="input-style" type="text" placeholder="Street" required />

        <div className="flex gap-4">
          <input name="city" onChange={onChangeHandler} value={data.city} className="input-style flex-1" type="text" placeholder="City" required />
          <input name="state" onChange={onChangeHandler} value={data.state} className="input-style flex-1" type="text" placeholder="State" required />
        </div>

        <div className="flex gap-4">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} className="input-style flex-1" type="text" placeholder="Zip Code" required />
          <input name="country" onChange={onChangeHandler} value={data.country} className="input-style flex-1" type="text" placeholder="Country" required />
        </div>

        <input name="phone" onChange={onChangeHandler} value={data.phone} className="input-style" type="text" placeholder="Phone" required />
      </div>

      {/* Right Side - Cart Summary */}
      <div className="w-full md:w-2/4 lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>

        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="flex justify-between text-gray-600">
            <p>Delivery Fee</p>
            <p>$2</p>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-gray-800">
            <p>Total</p>
            <p>${getTotalCartAmount() + 2}</p>
          </div>
        </div>

        <button type="submit" className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition mt-4">
          PAYMENT
        </button>
      </div>

      {/* Tailwind Input Styling */}
      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 8px;
          margin-top: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      `}</style>
    </form>
  );
};

export default PlaceOrder;
