import React, { useState } from 'react';
import { FaSearch, FaCheck, FaBell, FaUser, FaTimes } from 'react-icons/fa';
import { FiAlignJustify } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import smallLogo from '../assets/images/logo2.png';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePopup, setActivePopup] = useState(null);
  const [errors,setErrors] = useState('');
  const navigate=useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const togglePopup = (popup) => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  
  const handleLogout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch('http://localhost:8080/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ psid: user.psid }),
      });

      if (response.ok) {
        localStorage.removeItem('user'); // Remove user info from local storage
        navigate('/login'); // Navigate back to the login page
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred while logging out' });
    }
  };

  return (
    <div className='shadow-md w-full p-2 fixed top-0 left-0 bg-white'>
      <div className='flex items-center justify-between py-2 px-4 md:py-4 md:px-7'>
        <div className='flex items-center'>
          <img src={logo} alt='Logo' className='hidden md:block h-8 mr-2' />
          <img src={smallLogo} alt='Logo' className='block md:hidden h-6 mr-2' />
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
              <div className='absolute right-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300'>
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
              <div className='absolute right-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300'>
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
              <div className='absolute right-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300'>
                <div className='flex justify-end'>
                  <FaTimes
                    className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
                    onClick={() => setActivePopup(null)}
                  />
                </div>
                <div className='flex flex-col items-center mb-4'>
                  <FaUser className='text-gray-800 text-4xl mb-2' />
                  <h1 className='text-lg md:text-xl font-bold'>John Doe</h1>
                  <p className='mb-2 text-gray-700'>PS ID: 123456</p>
                  <p className='text-gray-700'>Designation: Software Engineer</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-gray-700'><strong>Email:</strong> john.doe@example.com</p>
                  <p className='text-gray-700'><strong>Phone:</strong> +1 234 567 890</p>
                  <p className='text-gray-700'><strong>Work Location:</strong> Pune</p>
                  <p className='text-gray-700'><strong>Work Mode:</strong> Hybrid</p>
                </div>
              </div>
            )}
          </div>
          <div className='relative'>
            <div
              className='p-1 md:p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-300 cursor-pointer'
              onClick={() => togglePopup('menu')}
            >
              <FiAlignJustify className='text-gray-800' />
            </div>
            {activePopup === 'menu' && (
              <div className='absolute right-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300'>
                <div className='flex justify-end'>
                  <FaTimes
                    className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
                    onClick={() => setActivePopup(null)}
                  />
                </div>
                <Link
                  to='/dashboard'
                  className='text-gray-700 hover:text-gray-900 duration-300 cursor-pointer mb-2 block'
                >
                  Dashboard
                </Link>
                <Link
                  to='/selection-tracker'
                  className='text-gray-700 hover:text-gray-900 duration-300 cursor-pointer mb-2 block'
                >
                  Selection Tracker
                </Link>
                <Link
                  to='/update-details'
                  className='text-gray-700 hover:text-gray-900 duration-300 cursor-pointer mb-2 block'
                >
                  Update
                </Link>
                <Link
                  to='/login'
                  className='text-gray-700 hover:text-gray-900 duration-300 cursor-pointer mb-2 block'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}