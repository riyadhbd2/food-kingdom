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

  // status handle function

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status: e.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  // Fetch orders when the page loads
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col flex-1 p-4 bg-gray-100">
      <h3 className="text-3xl font-semibold text-center mb-8">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between"
          >
            {/* Order Image */}
            <div className="flex-shrink-0">
              <img
                src={assets.parcel_icon}
                alt="Parcel"
                className="w-16 h-16 object-cover rounded-md"
              />
            </div>

            {/* Order Details */}
            <div className="w-full sm:w-1/4">
              <div className="flex flex-col gap-2">
                {/* Order Items */}
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-lg font-semibold">
                    {idx + 1}. {item.name} x {item.quantity}
                  </p>
                ))}
              </div>

              {/* Order Address */}
              <div className="mt-4 text-sm text-gray-600">
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

            {/* Order Info: Items, Total, and Status */}
            <div className="w-full sm:w-1/2 flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 sm:gap-6">
              {/* Item Count */}
              <div className="flex-1 min-w-[120px]">
                <p className="font-medium text-gray-700">Items</p>
                <p className="text-lg font-semibold">{order.items.length}</p>
              </div>

              {/* Order Total */}
              <div className="flex-1 min-w-[120px]">
                <p className="font-medium text-gray-700">Total</p>
                <p className="text-xl font-semibold">${order.amount}</p>
              </div>

              {/* Order Status */}
              <div className="flex-1 min-w-[160px]">
                <p className="font-medium text-gray-700">Status</p>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="p-2 border rounded-md text-sm focus:outline-none w-full mt-1"
                  defaultValue={order.status}
                >
                  <option value="food processing">Food Processing</option>
                  <option value="out for delivery">Out for delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
