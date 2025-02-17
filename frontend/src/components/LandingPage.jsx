import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const addNewSelection = () => {
    navigate('/selection-tracker'); // Navigate to the Selection Tracker form
  };

  const handleEdit = () => {
    navigate('/update-details'); // Navigate to the UpdateDetails page
  };

  return (
    <div className='w-full px-4 py-6'>
      <div className='mx-4'>
        <div className='flex justify-between flex-wrap'>
          <h2 className="py-2 font-bold text-lg">My Selection</h2>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 md:mt-0" onClick={addNewSelection}>Add New Selection</button>
        </div>
        <div className='overflow-x-auto mt-4'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='p-2 text-center'>PsId/External</th>
                <th className='p-2 text-center'>Name</th>
                <th className='p-2 text-center'>LOB</th>
                <th className='p-2 text-center'>Client Name</th>
                <th className='p-2 text-center'>CTool Status</th>
                <th className='p-2 text-center'>BVG Status</th>
                <th className='p-2 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2 border text-center'>Example PSID</td>
                <td className='p-2 border text-center'>John Doe</td>
                <td className='p-2 border text-center'>Example LOB</td>
                <td className='p-2 border text-center'>Cleint Name</td>
                <td className='p-2 border text-center'>CTool Pending</td>
                <td className='p-2 border text-center'>BGV Initiated</td>
                <td className='p-2 border text-center'>
                  <div className="flex justify-center">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded mr-2" onClick={handleEdit}>Edit</button>
                    {/* <button className="bg-red-500 text-white py-1 px-2 rounded">Delete</button> */}
                  </div>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
