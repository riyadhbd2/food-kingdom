import React from 'react'

const Header = () => {
  return (
    <div className='bg-[url(/header_img.png)] bg-cover bg-center w-full bg-no-repeat relative h-[34vw] mt-5'>
        <div className='absolute flex flex-col items-start gap-[1.5vw] max-w-1/2 bottom-[10%] left-[6vw]'>
            <h2 className='text-6xl font-semibold text-white'>Order your <br /> <span>favourite food here</span>  </h2>
            <p className='w-3/4 text-white text-md'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, praesentium accusamus. Vero veritatis numquam nam, dignissimos animi ex eligendi expedita!</p>
            <button className='bg-white px-5 py-1 rounded-full '>View Menu</button>
        </div>
    </div>
  )
}

export default Header