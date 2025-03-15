import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { assets } from "../assets/assets";
// import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

  // const { cartItems, food_list} = useContext(StoreContext);

   // Filter only items in the cart
  // const cartProducts = food_list.filter(item => cartItems[item._id] > 0);

  return (
    <div className="flex items-center justify-between mt-3">
      <Link to="/">
        <h1 className="text-3xl text-orange-400 font-bold">
          FOOD <span className="text-black ">PACK</span>
        </h1>
      </Link>
      <ul className="hidden md:flex gap-4 sm:gap-6 text-[#49557e] text-sm sm:text-lg">
        <ScrollLink
          to="/"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          Home
        </ScrollLink>
        <ScrollLink
          to="menu"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          Menu
        </ScrollLink>
        <ScrollLink
          to="app"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          App
        </ScrollLink>
        <ScrollLink
          to="contact"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          Contact
        </ScrollLink>
      </ul>
      <div className="flex items-center gap-2 sm:gap-5">
        <img
          className="w-4 sm:w-5 cursor-pointer"
          src={assets.search_icon}
          alt="Search"
        />
        <div className="relative">
          <Link to="/cart">
            <img
              className="w-4 sm:w-5 cursor-pointer"
              src={assets.basket_icon}
              alt="Basket"
            />
          </Link>
          {

          }
          <div className="absolute min-w-5 min-h-3 bg-orange-400 border rounded-full top-[-4px] sm:top-[-8px] right-[-4px] sm:right-[-8px] text-white text-[10px] text-center p-[1px]">
            1
          </div>
        </div>
        <button
          onClick={() => setShowLogin(true)}
          className="text-black border border-orange-400 px-4 sm:px-7 py-1 rounded-full hover:bg-[#fff4f2] hover:scale-105 transition-all duration-700"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
