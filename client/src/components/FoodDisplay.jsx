import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  return (
    <div className='mt-7 px-4'>
      <h2 className='text-2xl font-semibold text-center sm:text-left'>Top dishes near you</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5'>
        {foodList.map((item, index) => {
            if (category === 'All' || category === item.category) {
                return <FoodItem item={item} key={index} />;
            }
          
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;