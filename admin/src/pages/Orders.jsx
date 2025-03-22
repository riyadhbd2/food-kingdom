import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  // Fetch orders when the page loads
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col flex-1 p-4 bg-gray-100">
      <h3 className="text-3xl font-semibold text-center mb-8">Order Page</h3>
      <div className="">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border flex flex-col md:flex-row gap-4 items-start justify-around"
          >
            {/* Order Image */}
            <div>
              <img
                src={assets.parcel_icon}
                alt="Parcel"
                className="w-16 h-16 object-cover rounded-md"
              />
            </div>
            <div className="">
              {/* Order Items */}
              <p className="text-lg font-semibold">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>

              {/* Order Address */}
              <div className="mt-2">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="mt-2">
              <p>Items: {order.items.length}</p>
            </div>

            <div>
              <p className="text-xl font-semibold">Total: ${order.amount}</p>
            </div>

            {/* Order Status */}
            <div className="flex flex-col items-center mt-4 md:mt-0">
              <select
                className="p-2 border rounded-md text-sm focus:outline-none"
                defaultValue={order.status}
              >
                <option value="food processing">Food Processing</option>
                <option value="out for delivery">Out for delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
