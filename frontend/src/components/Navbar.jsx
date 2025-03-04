import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaBell, FaUser, FaTimes } from 'react-icons/fa';
import { FiAlignJustify } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import smallLogo from '../assets/images/logo2.png';
import { getAllCandidates, getAllEmployees, getEmployeeByPsid } from '../services/api';

export default function Navbar() {
  const [activePopup, setActivePopup] = useState(null);
  const [hoverPopup, setHoverPopup] = useState(null);
  const [errors, setErrors] = useState('');
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const suggestionsRef = useRef(null);
  const location = useLocation();


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === '') {
      setSuggestions([...allEmployees, ...allCandidates]); 
    } else {
      const filteredEmployees = allEmployees.filter(employee =>
        employee.psid.toString().includes(query)
      ).map(employee => ({ ...employee, type: 'employee' }));

      const filteredCandidates = allCandidates.filter(candidate =>
        candidate.candidateId.toString().includes(query)
      ).map(candidate => ({ ...candidate, type: 'candidate' }));

      const combinedSuggestions = [...filteredEmployees, ...filteredCandidates];
      setSuggestions(combinedSuggestions);
    }
  };



  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const allEmployees = await getAllEmployees();
        const allCandidates = await getAllCandidates();
        setAllEmployees(allEmployees);
        setAllCandidates(allCandidates);
        console.log("Employees: ", allEmployees);
        console.log("Candidates: ", allCandidates);
      } catch (error) {
        console.error('Error while fetching all data:', error);
      }
    };

    fetchAllData();
  }, []);



  const handleSuggestionClick = (psid) => {
    const currentRoute = location.pathname;
    if (currentRoute === '/selection-tracker') {
      navigate('/selection-tracker', { state: { id: psid } });
    } else {
      navigate('/landing-page', { state: { id: psid } });
    }
    setSuggestions([]); // Close the suggestion box
  };




  const togglePopup = (popup) => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const fetchEmployeeData = async (psid) => {
    try {
      const employee = await getEmployeeByPsid(psid);
      setForm((prevForm) => ({
        ...prevForm,
        psid: psid,
        fname: employee.firstName,
        lname: employee.lastName,
        grade: employee.grade,
        location: employee.location,
        pu: employee.pu,
        totalExp: employee.totalExperience,
        skill: employee.skill,
        email: employee.mailID,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')).psid;
    if (user) {
      fetchEmployeeData(user);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.popup') && !event.target.closest('.popup-trigger')) {
        setActivePopup(null);
      }
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };


    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <div className='flex items-center bg-gray-200 rounded-full px-2 py-1 md:px-3 relative'>
            <div className='relative'>
              <input
                type='text'
                className='bg-transparent outline-none text-gray-800 text-sm md:text-base px-1 md:px-2'
                placeholder='PSId/ CandidateId'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {suggestions.length > 0 && (
                <div ref={suggestionsRef} className='absolute top-9 left-1 bg-white p-1 w-56 border border-gray-300 rounded-md'>
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.psid || suggestion.candidateId}
                      className='cursor-pointer'
                      onClick={() => handleSuggestionClick(suggestion.psid || suggestion.candidateId)}
                    >
                      <p className='text-sm'>Name: {suggestion.firstName} {suggestion.lastName}</p>
                      <p className='text-sm'>PSId/ CandidateId: {suggestion.psid || suggestion.candidateId}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <FaSearch
              className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
            />
            <div id='afterSearch' className='absolute top-9 left-1 bg-white p-1 w-56 border border-gray-300 rounded-md hidden'>
              <p className='text-sm'>Name: </p>
              <p className='text-sm'>PSId/ CandidateId:</p>
            </div>
          </div>
          <div
            className='relative popup-trigger'
            onMouseEnter={() => setHoverPopup('notification')}
            onMouseLeave={() => setHoverPopup(null)}
            onClick={() => togglePopup('notification')}
          >
            <div
              className='p-1 md:p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-300 cursor-pointer'
            >
              <FaBell className='text-gray-800' />
            </div>
            {(activePopup === 'notification' || hoverPopup === 'notification') && (
              <div className='absolute right-0 mt-1 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300 popup'>
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
          <div
            className='relative popup-trigger'
            onMouseEnter={() => setHoverPopup('user')}
            onMouseLeave={() => setHoverPopup(null)}
            onClick={() => togglePopup('user')}
          >
            <div
              className='p-1 md:p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-300 cursor-pointer'
            >
              <FaUser className='text-gray-800' />
            </div>
            {(activePopup === 'user' || hoverPopup === 'user') && (
              <div className='absolute right-0 mt-1 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300 popup'>
                <div className='flex justify-end'>
                  <FaTimes
                    className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
                    onClick={() => setActivePopup(null)}
                  />
                </div>
                <div className='flex flex-col items-center mb-4'>
                  <FaUser className='text-gray-800 text-4xl mb-2' />
                  <h1 className='text-lg md:text-l font-bold'>{form.fname}</h1>
                  <p className='mb-2 text-gray-700'>PS ID: {form.psid}</p>
                  {/* <p className='text-gray-700'>Designation: {form.skill}</p> */}
                </div>
                <div className='flex flex-col'>
                  <p className='text-gray-700'><strong>Email:</strong> {form.email}</p>
                  <p className='text-gray-700'><strong>Grade:</strong> {form.grade}</p>
                  <p className='text-gray-700'><strong>Work Location:</strong> {form.location}</p>
                  <p className='text-gray-700'><strong>Work Mode:</strong> Hybrid</p>
                </div>
              </div>
            )}
          </div>
          <div
            className='relative popup-trigger'
            onMouseEnter={() => setHoverPopup('menu')}
            onMouseLeave={() => setHoverPopup(null)}
            onClick={() => togglePopup('menu')}
          >
            <div
              className='p-1 md:p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-300 cursor-pointer'
            >
              <FiAlignJustify className='text-gray-800' />
            </div>
            {(activePopup === 'menu' || hoverPopup === 'menu') && (
              <div className='absolute right-0 mt-1 w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300 popup'>
                <div className='flex justify-end'>
                  <FaTimes
                    className='text-gray-800 hover:text-gray-400 duration-300 cursor-pointer'
                    onClick={() => setActivePopup(null)}
                  />
                </div>
                <Link
                  to='/landing-page'
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