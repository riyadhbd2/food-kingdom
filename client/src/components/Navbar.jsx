import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken, cartCount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Logout function
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between mt-3">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-3xl text-orange-400 font-bold">
          FOOD <span className="text-black">PACK</span>
        </h1>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-4 sm:gap-6 text-[#49557e] text-sm sm:text-lg">
        <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">
          Home
        </ScrollLink>
        <ScrollLink to="menu" smooth={true} duration={500} className="cursor-pointer">
          Menu
        </ScrollLink>
        <ScrollLink to="app" smooth={true} duration={500} className="cursor-pointer">
          App
        </ScrollLink>
        <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer">
          Contact
        </ScrollLink>
      </ul>

      {/* Right-side Icons */}
      <div className="flex items-center gap-2 sm:gap-5">
        {/* Search Icon */}
        <img className="w-4 sm:w-5 cursor-pointer" src={assets.search_icon} alt="Search" />

        {/* Cart Icon */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img className="w-4 sm:w-5" src={assets.basket_icon} alt="Basket" />
          {getTotalCartAmount() > 0 && (
            <div className="absolute min-w-5 min-h-3 bg-orange-400 border rounded-full top-[-4px] sm:top-[-8px] right-[-4px] sm:right-[-8px] text-white text-[10px] text-center p-[1px]">
              {cartCount}
            </div>
          )}
        </div>

        {/* User Authentication */}
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="text-black border border-orange-400 px-4 sm:px-7 py-1 rounded-full hover:bg-[#fff4f2] hover:scale-105 transition-all duration-700"
          >
            Sign In
          </button>
        ) : (
          <div className="relative">
            {/* Profile Icon */}
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            />

            {/* Dropdown Menu */}
            {showDropdown && (
              <ul className="absolute z-10 right-0 bg-white shadow-lg border rounded-md w-32 text-sm text-gray-700">
                <li onClick={()=>navigate("/myorders")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <img src={assets.bag_icon} alt="Orders" className="w-4 mr-2" />
                  Orders
                </li>
                <hr />
                <li
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer flex items-center text-red-500"
                  onClick={handleLogout}
                >
                  <img src={assets.logout_icon} alt="Logout" className="w-4 mr-2" />
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
