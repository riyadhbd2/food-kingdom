import React from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between mt-3'>
      <img className='w-28 sm:w-36' src={assets.logo} alt='Logo' />
      <ul className='hidden md:flex gap-4 sm:gap-6 text-[#49557e] text-sm sm:text-md cursor-pointer'>
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div className='flex items-center gap-6 sm:gap-10'>
        <img className='w-5 sm:w-6' src={assets.search_icon} alt='Search' />
        <div className='relative'>
          <img className='w-5 sm:w-6' src={assets.basket_icon} alt='Basket' />
          <div className='absolute min-w-3 min-h-3 bg-orange-400 border rounded-full top-[-4px] sm:top-[-8px] right-[-4px] sm:right-[-8px]'></div>
        </div>
        <button className='text-[#49557e] border border-orange-400 px-4 sm:px-5 py-1 rounded-full hover:bg-[#fff4f2] hover:scale-105 transition-all duration-700'>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;