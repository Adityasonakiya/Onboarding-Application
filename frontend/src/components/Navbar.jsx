import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaBell, FaUser, FaTimes } from 'react-icons/fa';
import { FiAlignJustify } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import smallLogo from '../assets/images/logo2.png';
import { getAllCandidates, getAllEmployees, getBgvStatuses, getCToolStatuses, getEmployeeByPsid } from '../services/api';

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
  const [selectedOption, setSelectedOption] = useState('PSID');
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearchChangeDebounced(query);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearchChangeDebounced = debounce(async (query) => {
    if (query.length > 3) {
      try {
        let response;
        if (selectedOption === 'PSID') {
          response = await fetch(`http://localhost:8080/employees/search?query=${query}`);
        } else if (selectedOption === 'CandidateName') {
          response = await fetch(`http://localhost:8080/candidates/api/candidates/search?query=${query}`);
        }

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        } else {
          console.error("Error fetching search results:", response.statusText);
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setSearchQuery('');
    setSuggestions([]);
    setSelectedStatus('');
    console.log('Selected Option Changed:', e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    console.log('Selected Status Changed:', e.target.value);
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

  useEffect(() => {
    const fetchStatusOptions = async () => {
      if (selectedOption === 'CTool Status') {
        const statuses = await getCToolStatuses();
        setStatusOptions(statuses.map(status => status.onboardingStatus));
      } else if (selectedOption === 'BgvStatus') {
        const statuses = await getBgvStatuses();
        setStatusOptions(statuses.map(status => status.bgvStatus));
      } else {
        setStatusOptions([]);
      }
    };
    fetchStatusOptions();
  }, [selectedOption]);

  useEffect(() => {
    if (selectedOption !== 'PSID' && selectedOption !== 'CandidateName' && selectedStatus) {
      handleSearch(); // Ensure handleSearch triggers only after selectedStatus updates
    }
  }, [selectedStatus, selectedOption]);

  const handleSuggestionClick = (value) => {
    console.log('Suggestion clicked:', value);
    if (selectedOption === 'PSID') {
      setSearchQuery(value); // Update the input value
      navigate('/landing-page', { state: { id: value } });
      setSuggestions([]); 
    } else if(selectedOption === 'CandidateName')  {
      // setSearchQuery(value); // Update the input value
      navigate('/landing-page', { state: { phoneNumber: value } });
      setSuggestions([]); 
    }else {
      setSelectedStatus(value); // Update the selected status for statuses
    }
  };


  const handleSearch = () => {
    const searchType = selectedOption === 'CTool Status' ? 'ctool' : 'bgv';
    console.log('Navigating with searchType:', searchType, 'and status:', selectedStatus);
    navigate('/landing-page', { state: { searchType, status: selectedStatus } });
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
    <div className='shadow-md w-full p-2 fixed top-0 left-0 bg-white' style={{ zIndex: 2 }}>
      <div className='flex items-center justify-between py-2 px-4 md:py-4 md:px-7'>
        <div className='flex items-center'>
          <Link to="/landing-page">
            <img src={logo} alt='Logo' className='hidden md:block h-8 mr-2' />
            <img src={smallLogo} alt='Logo' className='block md:hidden h-6 mr-2' />
          </Link>
        </div>
        <div className='flex items-center space-x-2 md:space-x-4'>
          <div className='flex items-center bg-gray-200 rounded-full px-2 py-1 md:px-3 relative w-full md:w-auto'>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className='bg-transparent outline-none text-gray-800 text-sm md:text-base px-1 md:px-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto'
            >
              <option value='PSID'>PSID</option>
              <option value='CandidateName'>Candidate Name</option>
              <option value='CTool Status'>CTool Status</option>
              <option value='BgvStatus'>BgvStatus</option>
            </select>
            <div className='relative w-2/3 md:w-auto'>
              {(selectedOption === 'PSID' || selectedOption === 'CandidateName') && (
                <input
                  type="text"
                  className="bg-transparent outline-none text-gray-800 text-sm md:text-base px-1 md:px-2 w-full"
                  placeholder={selectedOption}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  disabled={selectedOption !== 'PSID' && selectedOption !== 'CandidateName'}
                />
              )}
              {selectedOption !== 'PSID' && selectedOption !== 'CandidateName' && (
                <>
                  <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className='bg-transparent outline-none text-gray-800 text-sm md:text-base px-1 md:px-2 w-full'
                  >
                    <option value=''>Select Status</option>
                    {statusOptions.map((status, index) => (
                      <option key={index} value={status}>{status}</option>
                    ))}
                  </select>
                </>
              )}
              {suggestions.length > 0 && (
                <div ref={suggestionsRef} className='absolute top-9 left-1 bg-white p-1 w-full md:w-56 border border-gray-300 rounded-md'>
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className='cursor-pointer border-b-2 border-gray-400 p-1'
                      onClick={() => {
                        if (selectedOption === 'PSID') {
                          handleSuggestionClick(suggestion.id);
                        } else if (selectedOption === 'CandidateName') {
                          handleSuggestionClick(`${suggestion.phoneNumber}`);
                        } else {
                          handleSuggestionClick(suggestion.onboardingStatus || suggestion.bgvStatus); // Update state for status
                          handleSearch(); // Trigger search only for statuses
                        }
                      }}
                    >
                      <p className='text-sm'>Name: {suggestion.firstName} {suggestion.lastName}</p>
                      {selectedOption === 'PSID' && (
                        <p className='text-sm'>PSID: {suggestion.id}</p>
                      )}
                      {selectedOption === 'CandidateName' && (
                        <p className='text-sm'>Phone number: {suggestion.phoneNumber}</p>
                      )}
                      {(selectedOption === 'CTool Status' || selectedOption === 'BgvStatus') && (
                        <p className='text-sm'>Status: {suggestion.onboardingStatus}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <FaSearch
              className={`text-gray-800 hover:text-gray-400 duration-300 cursor-pointer ${(selectedOption === 'PSID' || selectedOption === 'CandidateName') && 'cursor-not-allowed'}`}
              onClick={(selectedOption === 'PSID' || selectedOption === 'CandidateName') ? null : handleSearch}
            />
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
              <div className='absolute right-[-1vw] mt-[0.15vw] w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300 popup'>
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
              <div className='absolute right-[-1vw] mt-[0.15vw] w-48 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-300 popup'>
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
                  Add new Selection
                </Link>
                <Link
                  to='/selection-tracker-dashboard'
                  className='text-gray-700 hover:text-gray-900 duration-300 cursor-pointer mb-2 block'
                >
                  Selection Tracker Dashboard
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