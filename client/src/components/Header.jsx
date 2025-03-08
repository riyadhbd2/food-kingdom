import React from 'react';

const Header = () => {
  return (
    <div className='bg-[url(/header_img.png)] bg-cover bg-center w-full bg-no-repeat relative h-[34vw] min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[500px] mt-7 flex items-center rounded-lg'>
      <div className='absolute flex flex-col items-start gap-4 sm:gap-6 max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[40%] bottom-[10%] left-4 sm:left-10 md:left-16'>
        <h2 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight sm:leading-snug'>
          Order your <br /> <span className='text-white'>favourite food here</span>
        </h2>
        <p className='w-full sm:w-3/4 text-white text-sm sm:text-base md:text-lg'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, praesentium accusamus. Vero veritatis numquam nam, dignissimos animi ex eligendi expedita!
        </p>
        <button className='bg-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-[#fff4f2] transition duration-300'>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;