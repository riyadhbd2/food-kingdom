import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  // Filter only items in the cart
  const cartProducts = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="mt-24 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Shopping Cart</h2>

      {cartProducts.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto mt-10">
          {/* Header Row */}
          <div className="grid grid-cols-6 items-center text-gray-600 font-semibold border-b pb-2 text-center">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p className="flex justify-center">Remove</p>
          </div>

          {/* Cart Items */}
          {cartProducts.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-6 items-center text-gray-700 py-4 border-b text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mx-auto"
              />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <p>{cartItems[item._id]}</p>
              <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
              <div className="flex justify-center">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold text-xl"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* cart bottom */}
      <div className="mt-20 flex flex-col md:flex-row justify-between gap-8 px-5">
        {/* Left Section: Cart Totals (Slightly Larger) */}
        <div className="w-full md:2/4 lg:w-2/5 bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">Cart Totals</h2>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>${0}</p>
            </div>
            <hr />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-gray-800">
              <p>Total</p>
              <p>${0}</p>
            </div>
          </div>

          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Right Section: Promo Code */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <p className="mb-3 text-gray-700">
            If you have a promo code, enter it here:
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Promo code"
              className="w-full border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
