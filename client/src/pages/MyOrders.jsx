import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(StoreContext);

  // Fetch orders data from the database
  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // function

  // Fetch orders when the page loads or when token changes
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return <div className="text-center p-4">Loading orders...</div>;
  }

  return (
    <div className="h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-center mb-8">My Orders</h2>
      <div className="space-y-6">
        {data.length === 0 ? (
          <p className="text-center">You don't have any orders yet.</p>
        ) : (
          data.map((order, index) => {
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center"
              >
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel Icon"
                    className="w-12 h-12 object-contain mb-4 sm:mb-0"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x {item.quantity}
                          {idx === order.items.length - 1 ? "" : ", "}
                        </span>
                      ))}
                    </p>
                    <p className="text-gray-600">${order.amount}.00</p>
                    <p className="text-gray-500">
                      Items: {order.items.length}
                    </p>
                    <p className="text-sm">
                      <span className="text-green-500">&#x25cf;</span>
                      <b>{order.status}</b>
                    </p>
                  </div>
                </div>
                <button
                onClick={fetchOrders}
                  className="mt-4 sm:mt-0 bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition"
                >
                  Track Order
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;
