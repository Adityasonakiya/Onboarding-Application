import React, { useState } from 'react';
import { FaSearch, FaCheck, FaBell, FaUser, FaTimes } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePopup, setActivePopup] = useState(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const togglePopup = (popup) => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  return (
    <div className='shadow-md w-full p-2 fixed top-0 left-0 bg-white'>
      <div className='flex items-center justify-between py-2 px-4 md:py-4 md:px-7'>
        <div className='flex items-center'>
          <img src={logo} alt='Logo' className='h-6 md:h-8 mr-2' />
        </div>
        <div className='text-center flex-grow'>
          <span className='font-bold text-lg md:text-2xl text-gray-800'>Selection Tracker</span>
        </div>
        <div className='flex items-center space-x-2 md:space-x-4'>
          <div className='flex items-center bg-gray-200 rounded-full px-2 py-1 md:px-3'>
            <input
              type='text'
              className='bg-transparent outline-none text-gray-800 text-sm md:text-base px-1 md:px-2'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch
              className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
              onClick={handleSearch}
            />
          </div>
          <div className='relative'>
            <div
              className='p-1 md:p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-300 cursor-pointer'
              onClick={() => togglePopup('tickMark')}
            >
              <FaCheck className='text-gray-800' />
            </div>
            {activePopup === 'tickMark' && (
              <div className='absolute right-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4'>
                <div className='flex justify-end'>
                  <FaTimes
                    className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
                    onClick={() => setActivePopup(null)}
                  />
                </div>
                <h1 className='text-lg md:text-xl font-bold mb-2'>Lorem Ipsum</h1>
                <p className='text-gray-700 mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className='text-gray-700'>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            )}
          </div>
          <div className='relative'>
            <div
              className='p-1 md:p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-300 cursor-pointer'
              onClick={() => togglePopup('notification')}
            >
              <FaBell className='text-gray-800' />
            </div>
            {activePopup === 'notification' && (
              <div className='absolute right-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4'>
                <div className='flex justify-end'>
                  <FaTimes
                    className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
                    onClick={() => setActivePopup(null)}
                  />
                </div>
                <h1 className='text-lg md:text-xl font-bold mb-2'>Lorem Ipsum</h1>
                <p className='text-gray-700 mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className='text-gray-700'>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            )}
          </div>
          <div className='relative'>
            <div
              className='p-1 md:p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-300 cursor-pointer'
              onClick={() => togglePopup('user')}
            >
              <FaUser className='text-gray-800' />
            </div>
            {activePopup === 'user' && (
              <div className='absolute right-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4'>
                <div className='flex justify-end'>
                  <FaTimes
                    className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
                    onClick={() => setActivePopup(null)}
                  />
                </div>
                <h1 className='text-lg md:text-xl font-bold mb-2'>Lorem Ipsum</h1>
                <p className='text-gray-700 mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className='text-gray-700'>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}