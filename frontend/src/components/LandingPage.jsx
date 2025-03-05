import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchEmployeeCandidates } from '../services/api';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const id = state?.id;
  const [employeeCandidates, setEmployeeCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const addNewSelection = () => {
    navigate('/selection-tracker');
  };

  const handleEdit = (id) => {
    navigate('/update-details', { state: { id } });
  };

  const handleRefresh = () => {
    navigate('/landing-page'); 
  };

  useEffect(() => {
    const getEmployeeCandidates = async () => {
      console.log('id: ', id);
      try {
        const data = await fetchEmployeeCandidates();
        setEmployeeCandidates(data);
        console.log('dashboard data: ', data);
        if (id) {
          const filtered = data.filter(candidate => candidate.id === id);
          setFilteredCandidates(filtered);
          console.log('displaying filtered');
        } else {
          setFilteredCandidates(data);
          console.log('displaying All');
        }
      } catch (error) {
        console.error('There was an error fetching the employee candidates!', error);
      }
    };

    getEmployeeCandidates();
  }, [id]);

  return (
    <div className='w-full px-4 py-6'>
      <div className='mx-4'>
        <div className='flex justify-between flex-wrap'>
          <h2 className='py-2 font-bold text-lg'>My Selections</h2>
          <div className='flex'>
            <button className='bg-blue-500 text-white py-2 px-4 rounded mt-2 md:mt-0 mr-2' onClick={addNewSelection}>Add New Selection</button>
            <button className='bg-gray-500 text-white py-2 px-4 rounded mt-2 md:mt-0' onClick={handleRefresh}>Refresh</button>
          </div>
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
              {filteredCandidates.map(candidate => (
                <tr key={candidate.id}>
                  <td className='p-2 border text-center'>{candidate.id}</td>
                  <td className='p-2 border text-center'>{candidate.firstName} {candidate.lastName}</td>
                  <td className='p-2 border text-center'>{candidate.lobName}</td>
                  <td className='p-2 border text-center'>{candidate.hsbchiringManager}</td>
                  <td className='p-2 border text-center'>{candidate.onboardingStatus || '-'}</td>
                  <td className='p-2 border text-center'>{candidate.bgvStatus || '-'}</td>
                  <td className='p-2 border text-center'>
                    <div className='flex justify-center'>
                      <button className='bg-blue-500 text-white py-1 px-2 rounded mr-2' onClick={() => handleEdit(candidate.id)}>Edit</button>
                      {/* <button className="bg-red-500 text-white py-1 px-2 rounded">Delete</button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
