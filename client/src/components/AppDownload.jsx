import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='mx-auto mt-24 text-3xl text-center font-bold'>
        <p>For Better Experience Download <br />Tomato App</p>
        <div className='flex items-center justify-center gap-5 mt-5'>
            <img className='w-44 cursor-pointer hover:scale-105 transition-all duration-700' src={assets.play_store} alt="" />
            <img className='w-44 cursor-pointer hover:scale-105 transition-all duration-700' src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload