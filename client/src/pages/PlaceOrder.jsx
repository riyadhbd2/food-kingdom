import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="">
      {/* left side */}
      <div>
        <p>Delivery Information</p>
        <div>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name " />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />
        <div>
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div>
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      {/* right side */}
      <div>
        <div className="w-full md:2/4 lg:w-2/5 bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">Cart Totals</h2>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-gray-800">
              <p>Total</p>
              <p>${getTotalCartAmount() + 2}</p>
            </div>
          </div>

          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
