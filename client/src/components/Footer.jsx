import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div id="contact" className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 px-5 py-10 mt-24">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start gap-5">
          <h1 className="text-orange-400 text-bold text-xl">FOOD<span className="text-white ml-1">PACK </span></h1>
          <p className="max-w-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, dolores.
          </p>
          <div className="flex gap-3">
            <img src={assets.facebook_icon} alt="Facebook" className="w-6 cursor-pointer" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-6 cursor-pointer" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-6 cursor-pointer" />
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center md:items-start gap-5">
          <h2 className="text-lg font-semibold">COMPANY</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">About Us</li>
            <li className="cursor-pointer hover:text-white">Delivery</li>
            <li className="cursor-pointer hover:text-white">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start gap-5">
          <h2 className="text-lg font-semibold">GET IN TOUCH</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-white">+4915143570768</li>
            <li className="cursor-pointer hover:text-white">riyadhbd2@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full border-gray-500" />

      {/* Copyright */}
      <p className="text-sm text-center">
        Copyright 2025 @ Easir Arafat - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
