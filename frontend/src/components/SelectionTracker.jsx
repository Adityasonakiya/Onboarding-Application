import React, { useState } from 'react';

function SelectionTracker() {
  const [form, setForm] = useState({});
  const [status, setStatus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setStatus(prevState => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="py-4 flex items-center justify-center bg-blue-500 text-white font-bold text-2xl rounded">HSBC Selection Tracker Form</h1>
      <h4 className="bg-gray-300 font-bold p-2 rounded mt-4 mb-4">Basic Info</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <label className="font-bold w-1/3">Internal</label>
            <input type="checkbox"
              name="internal"
              checked={status}
              onChange={handleChange}
              className="p-2" />
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold w-1/3">External</label>
            <input type="checkbox"
              name="external"
              checked={!status}
              onChange={handleChange}
              className="p-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">PS ID:</label>
            <input type="number"
              name="psId"
              value={form.psId || ''}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Candidate ID:</label>
            <input type="number"
              name="candidateId"
              value={form.candidateId || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">First Name:</label>
            <input type="text"
              name="fname"
              value={form.fname || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full bg-slate-100"
              disabled />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Last Name:</label>
            <input type="text"
              name="lname"
              value={form.lname || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full bg-slate-100"
              disabled />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Grade:</label>
            <input type="text"
              name="grade"
              value={form.grade || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full bg-slate-100"
              disabled />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Location:</label>
            <input type="text"
              name="location"
              value={form.location || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full bg-slate-100"
              disabled />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">PU:</label>
            <input type="text"
              name="pu"
              value={form.pu || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full bg-slate-100"
              disabled />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Total Exp:</label>
            <input type="number"
              name="totalExp"
              value={form.totalExp || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full bg-slate-100"
              disabled />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Skill:</label>
            <input type="text"
              name="skill"
              value={form.skill || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full bg-slate-100"
              disabled />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Mail ID:</label>
            <input type="text"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full bg-slate-100"
              disabled />
          </div>
        </div>

        <h4 className="bg-gray-300 font-bold p-2 rounded mt-4">Selection Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Selection Date:</label>
            <input type="date"
              name="selectionDate"
              required
              value={form.selectionDate || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Base BU:</label>
            <input type="text"
              name="bu"
              value={form.bu || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">LOB:</label>
            <select name="lob"
              onChange={handleChange}
              className="p-2 border rounded w-full">
              <option value="0">0</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Sub LOB:</label>
            <select name="subLob"
              onChange={handleChange}
              className="p-2 border rounded w-full">
              <option value="0">0</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">HSBC Hiring Manager:</label>
            <input type="text"
              name="hiringManager"
              required
              value={form.hiringManager || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">HSBC Head:</label>
            <input type="text"
              name="head"
              required
              value={form.head || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Delivery Manager:</label>
            <select name="deliveryManager"
              onChange={handleChange}
              className="p-2 border rounded w-full">
              <option value="0">0</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Sales SPOC:</label>
            <select name="salesSpoc"
              onChange={handleChange}
              className="p-2 border rounded w-full">
              <option value="0">0</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Pricing Model:</label>
            <select name="pricingModel"
              onChange={handleChange}
              className="p-2 border rounded w-full">
              <option value="0">0</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">IRM:</label>
            <input type="text"
              name="irm"
              value={form.irm || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">HSBC CTOOL ID:</label>
            <input type="number"
              name="ctoolId"
              value={form.ctoolId || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">CTOOL Received Date:</label>
            <input type="date"
              name="ctoolRecDate"
              value={form.ctoolRecDate || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">CTOOL Job Category:</label>
            <input type="text"
              name="ctoolJobCat"
              value={form.ctoolJobCat || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">CTOOL Location:</label>
            <input type="text"
              name="ctoolLocation"
              value={form.ctoolLocation || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">CTOOL Rate:</label>
            <input type="number"
              name="ctoolRate"
              value={form.ctoolRate || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">CTOOL Proposed Rate:</label>
            <input type="number"
              name="ctoolPropRate"
              value={form.ctoolPropRate || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Recruiter Name:</label>
            <input type="text"
              name="recruiterName"
              value={form.recruiterName || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Interview Evidences</label>
            <input type="file"
              name="evidence"
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">Offer Release Status:</label>
            <select name="offerReleaseStatus"
              onChange={handleChange}
              className="p-2 border rounded w-full">
              <option value="0">0</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 font-semibold">LTI Onboarding Date:</label>
            <input type="date"
              name="ltiOnboardDate"
              value={form.ltiOnboardDate || ''}
              onChange={handleChange}
              className="p-2 border rounded w-full" />
          </div>
          <div className='flex items-center justify-center m-4'>
            <button type='submit' className="bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-600">Submit</button>
          </div>
          <div className='flex items-center justify-center'>
            <button className="bg-gray-500 text-white py-2 px-10 rounded hover:bg-gray-600">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SelectionTracker;