import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ item }) => {

  const { _id, name, price, description, image } = item;


  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

  return (
    <div className="w-full p-5
     bg-white rounded-lg shadow-md sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] mx-auto ">
      <div className="w-full relative">
        <img
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
          src={image}
          alt={name}
        />
        {!cartItems[_id] ? (
          <img
            className="w-9 absolute bottom-2 right-2 rounded-full"
            onClick={()=> addToCart(_id)}
            src={assets.add_icon_white}
          ></img>
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center gap-3 p-[6px] rounded-full bg-white">
            <img className="w-6" onClick={()=> removeFromCart(_id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[_id]}</p>
            <img className="w-6" onClick={()=> addToCart(_id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-base sm:text-lg md:text-xl">
            {name}
          </p>
          <img
            className="w-12 sm:w-14 md:w-16"
            src={assets.rating_starts}
            alt="Rating"
          />
        </div>
        <p className="text-xs sm:text-sm md:text-md text-gray-600">
          {description}
        </p>
        <p className="text-sm text-orange-400 sm:text-lg md:text-xl font-bold">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
