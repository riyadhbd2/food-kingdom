import React from 'react';
import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div id='menu' className="flex flex-col gap-5 mt-10 px-4 md:px-10">
      <h1 className="text-2xl font-semibold text-[#262626] text-center md:text-left">Explore Our Menu</h1>
      <p className="max-w-full md:max-w-[60%] text-center md:text-left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, quae.
      </p>
      <div className="flex justify-start md:justify-between items-center gap-5 md:gap-7 text-center overflow-auto scrollbar-none py-2">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 rounded-lg border-2 transition-all duration-300 ease-in-out ${
              category === item.menu_name ? 'border-orange-500 rounded-full' : 'border-transparent'
            }`}
            onClick={() => {
              console.log("Previous:", category);
              setCategory(prev => (prev === item.menu_name ? 'All' : item.menu_name));
              console.log("New:", item.menu_name);
            }}
          >
            <img className="w-[20vw] min-w-[80px] md:w-[7.5vw]" src={item.menu_image} alt={item.menu_name} />
            <p className="mt-2 text-sm md:text-base">{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className="mx-3 h-1 bg-[#e2e2e2] border-none" />
    </div>
  );
};

export default ExploreMenu;