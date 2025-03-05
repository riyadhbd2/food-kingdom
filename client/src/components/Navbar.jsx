import React from 'react'
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div className='px-5 flex items-center justify-between'>
      <img className='w-36' src={assets.logo} alt="" />
      <ul className='flex gap-5 text-[#49557e] text-md'>
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div>
        <img src={assets.search_icon} alt="" />
        <div>
          <img src={assets.basket_icon} alt="" />
          <div>
            <button>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar