import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchEmployeeCandidates, getCandidateById, getEmployeeByPsid, getEmployeeCandidateByPsid } from '../services/api';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const id = state?.id;
  const [employeeCandidates, setEmployeeCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const searchType = state?.searchType;
  const status = state?.status;
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log('State object:', state); // Log the state object to debug
    console.log('ID:', id);
    console.log('Search Type:', searchType);
    console.log('Status:', status);
  }, [state]);

  useEffect(() => {
    setCurrentPage(0);
  }, [rowsPerPage]);

  const addNewSelection = () => {
    navigate('/selection-tracker');
  };

  const handleEdit = (id) => {
    navigate('/update-details', { state: { id } });
  };

  const handleRefresh = () => {
    navigate('/landing-page');
  };

  const handleViewOnly = (id) => {
    navigate('/selection-tracker', { state: { id, readOnly: true } }); // Pass the readOnly flag
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`py-2 px-4 ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }

    return pageNumbers;
  };

  useEffect(() => {
    const getEmployeeCandidates = async () => {
      const user = JSON.parse(localStorage.getItem('user')).psid;
      try {
        const { content, totalPages } = await fetchEmployeeCandidates(user, currentPage, rowsPerPage);
        setEmployeeCandidates(content);
        setTotalPages(totalPages);
        console.log('dashboard data: ', content);

        if (id) {
          const employee = await getEmployeeCandidateByPsid(id);
          if (employee && employee.id) {
            setFilteredCandidates([employee]);
            console.log("searched emp2:",employee);
          }
        } else if (searchType && status) {
          const filtered = content.filter(candidate => {
            if (searchType === 'ctool') {
              return candidate.onboardingStatus === status;
            } else if (searchType === 'bgv') {
              return candidate.bgvStatus === status;
            }
            return false;
          });
          setFilteredCandidates(filtered);
          console.log('displaying filtered by status');
        } else {
          setFilteredCandidates(content);
          console.log('displaying All');
        }
      } catch (error) {
        console.error('There was an error fetching the employee candidates!', error);
      }
    };
    getEmployeeCandidates();
  }, [id, searchType, status, currentPage, rowsPerPage]);

  return (
    <div className='w-full px-4 py-6'>
      <div className='mx-4'>
        <div className='flex justify-between flex-wrap'>
          <h2 className='py-2 font-bold text-lg'>My Selections</h2>
          <div className='flex'>
            <button
              className='bg-blue-500 text-white py-2 px-4 rounded mt-2 md:mt-0 mr-2'
              onClick={addNewSelection}
            >
              Add New Selection
            </button>
            <button
              className='bg-gray-500 text-white py-2 px-4 rounded mt-2 md:mt-0'
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="rowsPerPage">Select rows: </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="select-button"
          >
            {[5, 10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className='overflow-x-auto mt-4'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='p-2 text-center'>PSID/External</th>
                <th className='p-2 text-center'>Name</th>
                <th className='p-2 text-center'>LOB</th>
                <th className='p-2 text-center'>Client Name</th>
                <th className='p-2 text-center'>CTool Status</th>
                <th className='p-2 text-center'>BGV Status</th>
                <th className='p-2 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td className='p-2 border text-center'>
                    {/* Link for view-only page */}
                    <button
                      className='text-blue-500 underline'
                      onClick={() => handleViewOnly(candidate.id)}
                    >
                      {candidate.id}
                    </button>
                  </td>
                  <td className='p-2 border text-center'>
                    {candidate.firstName} {candidate.lastName}
                  </td>
                  <td className='p-2 border text-center'>{candidate.lobName}</td>
                  <td className='p-2 border text-center'>{candidate.hsbchiringManager}</td>
                  <td className='p-2 border text-center'>{candidate.onboardingStatus || '-'}</td>
                  <td className='p-2 border text-center'>{candidate.bgvStatus || '-'}</td>
                  <td className='p-2 border text-center'>
                    <div className='flex justify-center'>
                      <button
                        className='bg-blue-500 text-white py-1 px-2 rounded mr-2'
                        onClick={() => handleEdit(candidate.id)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className='flex justify-center mt-4 space-x-2'>
          <button
            className='bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600'
            onClick={() => handlePageChange(0)}
            disabled={currentPage === 0}
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            className='bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600'
            onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
            disabled={currentPage === 0}
          >
            <FaAngleLeft />
          </button>
          {renderPageNumbers()}
          <button
            className='bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600'
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
          >
            <FaAngleRight />
          </button>
          <button
            className='bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600'
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
