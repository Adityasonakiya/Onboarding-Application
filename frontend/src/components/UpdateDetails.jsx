import React, { useState, useEffect } from 'react';
import { getTaggingDetailsByCandidateId, getTaggingDetailsByPsId, updateTaggingDetailsByPsId, updateTaggingDetailsByCandidateId, updateSelectionDetailsByPsId, updateSelectionDetailsByCandidateId, getSelectionDetailsByCandidateId, getSelectionDetailsByPsId } from '../services/api';
import moment from 'moment';

function UpdateDetails() {
  const [form, setForm] = useState({});
  const [isInternal, setIsInternal] = useState(false);
  const [psId, setPsId] = useState('');
  const [candidateId, setCandidateId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setIsInternal(name === 'internal' ? checked : !checked);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handlePsIdChange = (e) => {
    setPsId(e.target.value);
  };

  const handleCandidateIdChange = (e) => {
    setCandidateId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidDate = (dateString) => {
      return moment(dateString, 'YYYY-MM-DD', true).isValid();
    };

    const encodeToBase64 = (str) => {
      return btoa(unescape(encodeURIComponent(str)));
    };

    // Logging the raw tagDate value for debugging
    console.log("Raw tagDate value:", form.tagDate);

    // const formattedTagDate = moment(form.tagDate).toISOString();
    
    if (!isValidDate(form.tagDate)) {
      console.error("Invalid date format for tagDate");
      return;
    }
    
    // Correctly format tagDate
    const formattedTagDate = moment(form.tagDate, 'YYYY-MM-DD').toISOString();
    console.log("Formatted tagDate value:", formattedTagDate); // Log the formatted date
  
    const createDate = encodeToBase64(formattedTagDate);
    const updateDate = encodeToBase64(new Date().toISOString());

    const taggingDetails = {
      onboardingStatus: {
        onboardingStatus: form.status,
        remarks: form.addRemark,
      },
      bgvStatus: {
        bgvStatus: form.bgvStatus,
        remarks: form.bgvRemark,
      },
      createDate: createDate,
      updateDate: updateDate,

    };
    const selectionDetails = {
      techSelectionDate: form.techSelectDate,
      dojreceivedDate: form.dojRecDate,
      hsbconboardingDate: form.onboardingDate,

    };

    console.log("tagging details: ", taggingDetails);
    console.log("selection details: ", selectionDetails);
    if (isInternal && psId) {
      updateTaggingDetailsByPsId(psId, taggingDetails)
        .then(() => updateSelectionDetailsByPsId(psId, selectionDetails))
        .catch(error => {
          console.error('Error updating details by PsId:', error);
        });
    } else if (!isInternal && candidateId) {
      updateTaggingDetailsByCandidateId(candidateId, taggingDetails)
        .then(() => updateSelectionDetailsByCandidateId(candidateId, selectionDetails))
        .catch(error => {
          console.error('Error updating details by CandidateId:', error);
        });
    }
  };

  useEffect(() => {
    const formatDate = (date) => {
      if (!date) return '';
      return moment(date).format('YYYY-MM-DD');
    };

    if (isInternal && psId) {
      Promise.all([
        getSelectionDetailsByPsId(psId),
        getTaggingDetailsByPsId(psId)
      ]).then(([selectionData, taggingData]) => {
        setForm({
          status: taggingData.onboardingStatus?.onboardingStatus || '',
          addRemark: taggingData.onboardingStatus?.remarks || '',
          bgvStatus: taggingData.bgvStatus?.bgvStatus || '',
          bgvRemark: taggingData.bgvStatus?.remarks || '',
          tagDate: formatDate(taggingData.createDate) || '',
          techSelectDate: formatDate(selectionData.techSelectionDate),
          dojRecDate: formatDate(selectionData.dojreceivedDate),
          onboardingDate: formatDate(selectionData.hsbconboardingDate)
        });
      }).catch(error => {
        console.error('Error fetching data by PsId:', error);
      });
    } else if (!isInternal && candidateId) {
      Promise.all([
        getSelectionDetailsByCandidateId(candidateId),
        getTaggingDetailsByCandidateId(candidateId)
      ]).then(([selectionData, taggingData]) => {
        setForm({
          status: taggingData.onboardingStatus?.onboardingStatus || '',
          addRemark: taggingData.onboardingStatus?.remarks || '',
          bgvStatus: taggingData.bgvStatus?.bgvStatus || '',
          bgvRemark: taggingData.bgvStatus?.remarks || '',
          tagDate: formatDate(taggingData.createDate) || '',
          techSelectDate: formatDate(selectionData.techSelectionDate),
          dojRecDate: formatDate(selectionData.dojreceivedDate),
          onboardingDate: formatDate(selectionData.hsbconboardingDate)
        });
      }).catch(error => {
        console.error('Error fetching data by CandidateId:', error);
      });
    }
  }, [psId, candidateId, isInternal]);


  return (
    <div className='w-full px-4 py-6'>
      <h1 className="py-2 flex items-center justify-center bg-blue-300 font-bold text-lg md:text-xl">HSBC Selection Tracker Form</h1>
      <h4 className='bg-gray-200 font-bold px-2 py-1 mt-4'>Tagging and Onboarding Details</h4>
      <form onSubmit={handleSubmit}>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <tbody>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4"><label className="font-bold">Internal</label></td>
                <td className="p-2 w-full md:w-1/4">
                  <input type="checkbox"
                    name="internal"
                    checked={isInternal}
                    onChange={handleChange}
                    className="p-2" />
                </td>
                <td className="p-2 w-full md:w-1/4"><label className="font-bold">External</label></td>
                <td className="p-2 w-full md:w-1/4">
                  <input type="checkbox"
                    name="external"
                    checked={!isInternal}
                    onChange={handleChange}
                    className="p-2" />
                </td>
              </tr>
              <tr className='flex flex-wrap md:flex-nowrap'>
                <td className='p-2 w-full md:w-1/4'><label className="font-semibold">PS ID:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='number'
                    name='psId'
                    value={psId}
                    onChange={handlePsIdChange}
                    required
                    className='p-2 border rounded w-full'
                    disabled={!isInternal} />
                </td>
                <td className='p-2 w-full md:w-1/4'><label className="font-semibold">Candidate ID:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='number'
                    name='candidateId'
                    value={candidateId}
                    onChange={handleCandidateIdChange}
                    className='p-2 border rounded w-full'
                    disabled={isInternal} />
                </td>
              </tr>
              <tr className='flex flex-wrap md:flex-nowrap'>
                <td className='p-2 w-full md:w-1/4'><label className="font-bold">Status:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <select name='status' value={form.status || ''} onChange={handleChange} className="p-2 mb-2 border rounded w-full">
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
                <td className='p-2 w-full md:w-1/4'><label className="font-bold">BGV Status:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <select name='bgvStatus' value={form.bgvStatus || ''} onChange={handleChange} className="p-2 mb-2 border rounded w-full">
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
                <td className='p-2 w-full md:w-1/4'><label className="font-bold">Status Additional Remark:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <textarea name='addRemark' value={form.addRemark || ''} onChange={handleChange} className="p-2 mb-2 border rounded w-full resize-none" />
                </td>
                <td className='p-2 w-full md:w-1/4'><label className="font-bold">BGV Additional Remark:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <textarea name='bgvRemark' value={form.bgvRemark || ''} onChange={handleChange} className="p-2 mb-2 border rounded w-full resize-none" />
                </td>
              </tr>
              <tr className='flex flex-wrap md:flex-nowrap'>
                <td className='p-2 w-full md:w-1/4'><label className="font-bold">Tagging date:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='date' name='tagDate' value={form.tagDate || ''} required onChange={handleChange} className="p-2 mb-2 border rounded w-full" />
                </td>
                <td className='p-2 w-full md:w-1/4'><label className="font-bold">Tech Selection Date:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='date' name='techSelectDate' value={form.techSelectDate || ''} required onChange={handleChange} className="p-2 mb-2 border rounded w-full" />
                </td>
              </tr>
              <tr className='flex flex-wrap md:flex-nowrap'>
                <td className='p-2 w-full md:w-1/4'><label className="font-bold">DOJ Recieved Date:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='date' name='dojRecDate' value={form.dojRecDate || ''} required onChange={handleChange} className="p-2 mb-2 border rounded w-full" />
                </td>
                <td className='p-2 w-full md:w-1/4'><label className="font-bold">Onboarding Date:</label></td>
                <td className='p-2 w-full md:w-1/4'>
                  <input type='date' name='onboardingDate' value={form.onboardingDate || ''} required onChange={handleChange} className="p-2 mb-2 border rounded w-full" />
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
