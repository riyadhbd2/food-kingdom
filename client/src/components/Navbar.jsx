import { Link } from "react-scroll";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between mt-3">
      <img className="w-28 sm:w-36" src={assets.logo} alt="Logo" />
      <ul className="hidden md:flex gap-4 sm:gap-6 text-[#49557e] text-sm sm:text-lg">
        <Link
          to="/"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          Home
        </Link>
        <Link to="menu" smooth={true} duration={500} className="cursor-pointer">
          Menu
        </Link>
        <Link to="app" smooth={true} duration={500} className="cursor-pointer">
          App
        </Link>
        <Link
          to="contact"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          Contact
        </Link>
      </ul>
      <div className="flex items-center gap-2 sm:gap-5">
        <img
          className="w-4 sm:w-5 cursor-pointer"
          src={assets.search_icon}
          alt="Search"
        />
        <div className="relative">
          <img
            className="w-4 sm:w-5 cursor-pointer"
            src={assets.basket_icon}
            alt="Basket"
          />
          <div className="absolute min-w-5 min-h-3 bg-orange-400 border rounded-full top-[-4px] sm:top-[-8px] right-[-4px] sm:right-[-8px] text-white text-[10px] text-center p-[1px]">
            1
          </div>
        </div>
        <button className="text-[#49557e] border border-orange-400 px-4 sm:px-7 py-1 rounded-full hover:bg-[#fff4f2] hover:scale-105 transition-all duration-700">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
