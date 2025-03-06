import React from 'react';
import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <h1 className="text-2xl font-semibold text-[#262626]">Explore Our Menu</h1>
      <p className="max-w-[60%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, quae.</p>
      <div className="flex justify-between items-center gap-7 text-center overflow-auto scrollbar-none">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 rounded-lg border-2 ${
              category === item.menu_name ? 'border-orange-500 border-2 rounded-full' : 'border-transparent'
            }`}
            onClick={() => {
              console.log("Previous:", category);
              setCategory(prev => (prev === item.menu_name ? 'All' : item.menu_name));
              console.log("New:", item.menu_name);
            }}
          >
            <img className="w-[7.5vw] min-w-[80%]" src={item.menu_image} alt={item.menu_name} />
            <p className="mt-2">{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className="mx-3 h-1 bg-[#e2e2e2] border-none" />
    </div>
  );
};

export default ExploreMenu;
