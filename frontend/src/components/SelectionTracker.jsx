import React, { useState } from 'react'

function SelectionTracker() {
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
      <h4 className='bg-gray-200 font-bold'> Basic Info</h4>
      <form onSubmit={handleSubmit}>
        <table border="1" className='w-full m-2'>
          <tbody>
            <tr>
              <td><label className='font-bold'>Internal</label></td><td>
                <input type='checkbox' name="internal" onChange={handleChange} className='p-2 mb-2' /></td>
              <td>
                <label className='font-bold'>External</label></td><td>
                <input type='checkbox' name="external" onChange={handleChange} className='p-2 mb-2' />
              </td>
            </tr>
            <tr>
              <td>
                <label>PS ID: </label></td><td>
                <input type="number" name="psId" value={form.psId} onChange={handleChange} required className='p-2 mb-2 border rounded' />
              </td>
              <td>
                <label>Candidate ID: </label></td><td>
                <input type="number" name="candidateId" value={form.candidateId} onChange={handleChange} className='p-2 mb-2 border rounded' />
              </td>
            </tr>
            <tr>
              <td><label>First Name: </label></td><td>
                <input type='text' name='fname' value={form.fname} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>Last Name: </label></td><td>
                <input type='text' name='lname' value={form.lname} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>Grade: </label></td><td>
                <input type='text' name='grade' value={form.grade} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>Location: </label></td><td>
                <input type='text' name='location' value={form.location} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>PU: </label></td><td>
                <input type='text' name='pu' value={form.pu} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>Total Exp: </label></td><td>
                <input type='number' name='totalExp' value={form.totalExp} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>Skill: </label></td><td>
                <input type='text' name='skill' value={form.skill} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>Mail ID: </label></td><td>
                <input type='text' name='email' value={form.email} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
            </tr>
          </tbody>
        </table>

        <h4 className='bg-gray-200 font-bold'>   Selection Details</h4>

        <table border="1" className='w-full m-2'>
          <tbody>
            <tr>
              <td><label>Selection Date: </label></td><td>
                <input type='date' name='selectionDate' required value={form.selectionDate} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
              <td>
                <label>Base BU: </label></td><td>
                <input type='text' name='bu' value={form.bu} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>LOB: </label></td><td>
                <select onChange={handleChange} className="p-2 mb-2 border rounded">
                  <option value="0">0</option>
                </select></td>
              <td>
                <label>Sub LOB: </label></td><td>
                <select onChange={handleChange} className="p-2 mb-2 border rounded">
                  <option value="0">0</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>HSBC Hiring Manager: </label></td><td>
                <input type='text' name='hiringManager' required value={form.hiringManager} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>HSBC Head: </label></td><td>
                <input type='text' name='head' value={form.head} required onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>Delivery Manager: </label></td><td>
                <select onChange={handleChange} className="p-2 mb-2 border rounded">
                  <option value="0">0</option>
                </select></td>
              <td><label>Sales SPOC: </label></td><td>
                <select onChange={handleChange} className="p-2 mb-2 border rounded">
                  <option value="0">0</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Pricing Model: </label></td><td>
                <select onChange={handleChange} className="p-2 mb-2 border rounded">
                  <option value="0">0</option>
                </select></td>
              <td>
                <label>IRM: </label></td><td>
                <input type='text' name='irm' value={form.irm} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>HSBC CTOOL ID: </label></td><td>
                <input type='number' name='ctoolId' value={form.ctoolId} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>CTOOL Recieved Date: </label></td><td>
                <input type='date' name='ctoolRecDate' value={form.ctoolRecDate} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>CTOOL Job Category: </label></td><td>
                <input type='text' name='ctoolJobCat' value={form.ctoolJobCat} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>CTOOL Location: </label></td><td>
                <input type='text' name='ctoolLocation' value={form.ctoolLocation} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>CTOOL Rate: </label></td><td>
                <input type='number' name='ctoolRate' value={form.ctoolRate} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>CTOOL Propose Rate: </label></td><td>
                <input type='number' name='ctoolPropRate' value={form.ctoolPropRate} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>Recruiter Name: </label></td><td>
                <input type='text' name='recruiterName' value={form.recruiterName} onChange={handleChange} className="p-2 mb-2 border rounded" /></td>
              <td>
                <label>Interview Evidences: </label></td><td>
                <input type='file' name='evidence' value={form.evidence} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td><label>Offer Release Status: </label></td><td>
                <select onChange={handleChange} className="p-2 mb-2 border rounded">
                  <option value="0">0</option>
                </select></td>
              <td>
                <label>LTI Onboarding Date: </label></td><td>
                <input type='date' name='ltiOnboardDate' value={form.ltiOnboardDate} onChange={handleChange} className="p-2 mb-2 border rounded" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td className='flex items-center justify-center'><button type='submit' className="bg-blue-500 text-white py-2 px-10 rounded">Submit</button></td>

              <td><button className="bg-gray-500 text-white py-2 px-10 rounded">Cancel</button></td>
              <td></td>
            </tr>
          </tbody>
        </table>

      </form>
    </div>
  )
}

export default SelectionTracker;