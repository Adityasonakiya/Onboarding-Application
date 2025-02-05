import React, { useState } from 'react'

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
    <div className='w-full'>
      <h1 className="h-100 py-2 flex items-center justify-center bg-blue-300 font-bold">HSBC Selection Tracker Form </h1>
      <h4 className='bg-gray-200 font-bold'> Tagging and Onboarding Details</h4>
      <form onSubmit={handleSubmit}>
        <table border="1" className='w-full m-2'>
          <tbody>
            <tr>
            <td><label>Status: </label></td>
              <td>
              <select onChange={handleChange} className="p-2 mb-2 border rounded">
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
              <td><label>BGV Status: </label></td>
              <td>
              <select onChange={handleChange} className="p-2 mb-2 border rounded">
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
            <tr>
              <td><label>Status Additional Remark: </label></td><td>
                <textarea name='addRemark' value={form.addRemark} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
                <td><label>BGV Additional Remark: </label></td><td>
                <textarea name='bgvRemark' value={form.bgvRemark} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
            </tr>
            <tr>
              <td><label>Tagging date: </label></td><td>
                <input type='date' name='tagDate' value={form.tagDate} required onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>Tech Selection Date: </label></td><td>
                <input type='date' name='techSelectDate' required value={form.techSelectDate} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>DOJ Recieved Date: </label></td><td>
                <input type='date' name='dojRecDate' value={form.dojRecDate} required onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>Onboarding Date: </label></td><td>
                <input type='date' name='onboardingDate' value={form.onboardingDate} required onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td className='flex items-center justify-center'><button type='submit' className="bg-blue-500 text-white py-2 px-10 rounded">Update</button></td>

              <td><button className="bg-gray-500 text-white py-2 px-10 rounded">Cancel</button></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
      </form>
    </div>
  )
}

export default UpdateDetails;