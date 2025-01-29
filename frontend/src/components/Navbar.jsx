import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
          LTIMindtree
        </div>
        <div onClick={toggleMenu} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          {isOpen ? '✖' : '☰'}
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-20 ' : 'top-[-490px]'}`}>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
            <Link to='/navbar' className='text-gray-800 hover:text-gray-400 duration-500'>Home</Link>
          </li>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
            <Link to='/login' className='text-gray-800 hover:text-gray-400 duration-500'>Login/Register</Link>
          </li>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
            <Link to='/selection-tracker' className='text-gray-800 hover:text-gray-400 duration-500'>Selection Tracker</Link>
          </li>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
            <Link to='/updateDetails' className='text-gray-800 hover:text-gray-400 duration-500'>Update Details</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
