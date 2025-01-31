import React, { useState } from 'react';

function UpdateDetails() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='w-full px-4 py-6'>
      <h1 className="py-2 flex items-center justify-center bg-blue-300 font-bold text-lg md:text-xl">HSBC Selection Tracker Form</h1>
      <h4 className='bg-gray-200 font-bold px-2 py-1'>Tagging and Onboarding Details</h4>
      <form onSubmit={handleSubmit}>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <tbody>
              <tr className='flex flex-wrap md:flex-nowrap'>
                <td className='p-2 w-full md:w-1/4'><label>Status:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <select onChange={handleChange} className="p-2 mb-2 border rounded w-full">
                    <option value="CTool Pending">CTool Pending</option>
                    <option value="CTool Recieved">CTool Recieved</option>
                    <option value="Tagging Completed">Tagging Completed</option>
                    <option value="Tech Selection Done">Tech Selection Done</option>
                    <option value="DOJ Recieved">DOJ Recieved</option>
                    <option value="Onboarding Completed">Onboarding Completed</option>
                    <option value="Tagging Error">Tagging Error</option>
                    <option value="Rate Approval Pending">Rate Approval Pending</option>
                    <option value="Rate to be changed">Rate To Be Changed</option>
                    <option value="Candidate not yet joined">Candidate not yet joined</option>
                    <option value="Drop out case">Drop Out Case</option>
                  </select>
                </td>
                <td className='p-2 w-full md:w-1/4'><label>BGV Status:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <select onChange={handleChange} className="p-2 mb-2 border rounded w-full">
                    <option value="BGV Initiated">BGV Initiated</option>
                    <option value="In progress">In progress</option>
                    <option value="Minor Discrepancy">Minor Discrepancy</option>
                    <option value="Major Discrepancy">Major Discrepancy</option>
                    <option value="Offer yet to be released">Offer Yet to be Released</option>
                    <option value="Interim Cleared">Interim Cleared</option>
                    <option value="Pending with Employee">Pending with Employee</option>
                  </select>
                </td>
              </tr>
              <tr className='flex flex-wrap md:flex-nowrap'>
                <td className='p-2 w-full md:w-1/4'><label>Status Additional Remark:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <textarea name='addRemark' value={form.addRemark} onChange={handleChange} className="p-2 mb-2 border rounded w-full resize-none" />
                </td>
                <td className='p-2 w-full md:w-1/4'><label>BGV Additional Remark:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <textarea name='bgvRemark' value={form.bgvRemark} onChange={handleChange} className="p-2 mb-2 border rounded w-full resize-none" />
                </td>
              </tr>
              <tr className='flex flex-wrap md:flex-nowrap'>
                <td className='p-2 w-full md:w-1/4'><label>Tagging date:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='date' name='tagDate' value={form.tagDate} required onChange={handleChange} className="p-2 mb-2 border rounded w-full" />
                </td>
                <td className='p-2 w-full md:w-1/4'><label>Tech Selection Date:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='date' name='techSelectDate' required value={form.techSelectDate} onChange={handleChange} className="p-2 mb-2 border rounded w-full" />
                </td>
              </tr>
              <tr className='flex flex-wrap md:flex-nowrap'>
                <td className='p-2 w-full md:w-1/4'><label>DOJ Recieved Date:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='date' name='dojRecDate' value={form.dojRecDate} required onChange={handleChange} className="p-2 mb-2 border rounded w-full" />
                </td>
                <td className='p-2 w-full md:w-1/4'><label>Onboarding Date:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='date' name='onboardingDate' value={form.onboardingDate} required onChange={handleChange} className="p-2 mb-2 border rounded w-full" />
                </td>
              </tr>
              <tr>
                <td colSpan="4" className='p-2'>
                  <div className='flex justify-center space-x-4'>
                    <button type='submit' className="bg-blue-500 text-white py-2 px-10 rounded">Update</button>
                    <button type='button' className="bg-gray-500 text-white py-2 px-10 rounded">Cancel</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default UpdateDetails;
