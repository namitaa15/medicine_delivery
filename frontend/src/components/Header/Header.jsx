import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header flex justify-center'>
      <div className="flex items-center justify-center flex-col gap-4 header-contents w-full md:px-4 md:w-3/5 h-full mx-auto">
        <h2 className='text-3xl'>Order Medicines Online</h2>
        <p className=' text-black text-start px-2  lg:text-center text-xl'>Choose from a wide variety of medicines and health products delivered straight to your doorstep. Take care of your health with ease and convenience, anytime, anywhere.</p>
        <a href="#explore-menu" className='w-full mx-auto'><button className='mx-auto'>Explore Medicines</button></a>
      </div>
    </div >
  );
}

export default Header;