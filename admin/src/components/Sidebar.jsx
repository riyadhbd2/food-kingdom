import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="min-h-screen border w-full md:w-1/6">
      <div className="pt-12 pl-5 flex flex-col gap-5">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 border p-2 cursor-pointer rounded-md transition duration-200 ${
              isActive
                ? "bg-gray-200 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.add_icon} alt="Add Item" className="w-5 h-5" />
          <p className="text-sm md:text-base">Add Item</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border p-2 cursor-pointer rounded-md transition duration-200 ${
              isActive
                ? "bg-gray-200 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.order_icon} alt="List Item" className="w-5 h-5" />
          <p className="text-sm md:text-base">List Item</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border p-2 cursor-pointer rounded-md transition duration-200 ${
              isActive
                ? "bg-gray-200 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.order_icon} alt="Orders" className="w-5 h-5" />
          <p className="text-sm md:text-base">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
