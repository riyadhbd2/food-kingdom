import React from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-5 py-2 md:px-10 lg:px-20">
      <h1 className="text-2xl md:text-3xl text-orange-400 font-bold">
        FOOD <span className="text-black">PACK</span>
      </h1>
      <img className="w-8 md:w-10" src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;