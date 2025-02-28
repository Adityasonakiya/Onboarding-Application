import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployeeCandidates } from '../services/api'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const [employeeCandidates, setEmployeeCandidates] = useState([]);

  const addNewSelection = () => {
    navigate('/selection-tracker');
  };

  const handleEdit = (id) => {
    navigate('/update-details', { state: { id } });
  };
  

  useEffect(() => {
    const getEmployeeCandidates = async () => {
      try {
        const data = await fetchEmployeeCandidates();
        setEmployeeCandidates(data);
      } catch (error) {
        console.error('There was an error fetching the employee candidates!', error);
      }
    };

    getEmployeeCandidates();
  }, []);

  return (
    <div className='w-full px-4 py-6'>
      <div className='mx-4'>
        <div className='flex justify-between flex-wrap'>
          <h2 className="py-2 font-bold text-lg">My Selections</h2>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 md:mt-0" onClick={addNewSelection}>Add New Selection</button>
        </div>
        <div className='overflow-x-auto mt-4'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='p-2 text-center'>PSId/External</th>
                <th className='p-2 text-center'>Name</th>
                <th className='p-2 text-center'>LOB</th>
                <th className='p-2 text-center'>Client Name</th>
                <th className='p-2 text-center'>CTool Status</th>
                <th className='p-2 text-center'>BVG Status</th>
                <th className='p-2 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeCandidates.map(candidate => (
                <tr key={candidate.id}>
                  <td className='p-2 border text-center'>{candidate.id}</td>
                  <td className='p-2 border text-center'>{candidate.firstName} {candidate.lastName}</td>
                  <td className='p-2 border text-center'>{candidate.lobName}</td>
                  <td className='p-2 border text-center'>{candidate.hsbchiringManager}</td>
                  <td className='p-2 border text-center'>{candidate.onboardingStatus || '-'}</td>
                  <td className='p-2 border text-center'>{candidate.bgvStatus || '-'}</td>
                  <td className='p-2 border text-center'>
                    <div className="flex justify-center">
                      <button className="bg-blue-500 text-white py-1 px-2 rounded mr-2" onClick={() => handleEdit(candidate.id)}>Edit</button>
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
}

export default LandingPage;