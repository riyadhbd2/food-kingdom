import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className="flex flex-wrap items-start justify-center gap-12 mt-24 px-4">
      {/* Left Side - Delivery Information */}
      <div className="w-full md:w-2/4 lg:w-2/5 bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-4">Delivery Information</p>

        <div className="flex flex-wrap">
          <input className="input-style" type="text" placeholder="First Name" />
          <input className="input-style" type="text" placeholder="Last Name" />
        </div>

        <input
          className="input-style"
          type="email"
          placeholder="Email Address"
        />
        <input className="input-style" type="text" placeholder="Street" />

        {/* City & State Flex Container */}
        <div className="flex gap-4">
          <input
            className="input-style flex-1"
            type="text"
            placeholder="City"
          />
          <input
            className="input-style flex-1"
            type="text"
            placeholder="State"
          />
        </div>

        {/* Zip Code & Country Flex Container */}
        <div className="flex gap-4">
          <input
            className="input-style flex-1"
            type="text"
            placeholder="Zip Code"
          />
          <input
            className="input-style flex-1"
            type="text"
            placeholder="Country"
          />
        </div>

        <input className="input-style" type="text" placeholder="Phone" />
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

        <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition mt-4">
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
