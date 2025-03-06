import React from 'react'
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div className='px-5 flex items-center justify-between mt-3'>
      <img className='w-36' src={assets.logo} alt="" />
      <ul className='flex gap-5 text-[#49557e] text-md cursor-pointer'>
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div className='flex items-center gap-10'>
        <img src={assets.search_icon} alt="" />
        <div className='relative'>
          <img src={assets.basket_icon} alt="" />
          <div className='absolute min-w-3 min-h-3 bg-orange-400 border rounded-full top-[-8px] right-[-8px]'></div>
        </div>
        <button className='text-[#49557e] border  border-orange-400 px-5 py-1 rounded-full hover:bg-[#fff4f2] hover:scale-105 transition-all duration-700'>Sign in</button>
      </div>
    </div>
  )
}

export default Navbar