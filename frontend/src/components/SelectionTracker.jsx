import React, { useState, useEffect } from 'react';
import { getCandidateById, getEmployeeByPsid, getSelectionDetailsByCandidateId, getSelectionDetailsByPsId } from '../services/api';

function SelectionTracker() {
  const [form, setForm] = useState({});
  const [isInternal, setIsInternal] = useState(false);
  const [selected, setSelected] = React.useState("");

  useEffect(() => {
    if (form.psId) {
      fetchEmployeeData(form.psId);
      fetchSelectionDetailsByPsid(form.psId);
    }
  }, [form.psId]);

  useEffect(() => {
    if (form.candidateId) {
      fetchCandidateData(form.candidateId);
      fetchSelectionDetailsByCandidateId(form.candidateId);
    }
  }, [form.candidateId]);

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  const fetchEmployeeData = async (psid) => {
    try {
      const employee = await getEmployeeByPsid(psid);
      setForm((prevForm) => ({
        ...prevForm,
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

  const fetchCandidateData = async (candidateId) => {
    try {
      const candidate = await getCandidateById(candidateId);
      setForm((prevForm) => ({
        ...prevForm,
        fname: candidate.firstName,
        lname: candidate.lastName,
        grade: "", // Assuming grade is not available for candidate
        location: "", // Assuming location is not available for candidate
        pu: "", // Assuming pu is not available for candidate
        totalExp: "", // Assuming totalExperience is not available for candidate
        skill: "", // Assuming skill is not available for candidate
        email: "", // Assuming email is not available for candidate
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelectionDetailsByPsid = async (psid) => {
    try {
      const selectionDetails = await getSelectionDetailsByPsId(psid);
      setForm((prevForm) => ({
        ...prevForm,
        selectionDate: selectionDetails.HSBCSelectionDate,
        bu: selectionDetails.baseBU,
        lob: selectionDetails.lob,
        subLob: selectionDetails.subLob,
        hiringManager: selectionDetails.HSBCHiringManager,
        head: selectionDetails.HSBCHead,
        deliveryManager: selectionDetails.deliveryManager,
        salesSpoc: selectionDetails.salesPOC,
        pricingModel: selectionDetails.PricingModel,
        irm: selectionDetails.irm,
        ctoolId: selectionDetails.HSBCToolId,
        ctoolRecDate: selectionDetails.CToolReceivedDate,
        ctoolJobCat: selectionDetails.CToolJobCategory,
        ctoolLocation: selectionDetails.CToolLocation,
        ctoolRate: selectionDetails.CToolRate,
        ctoolPropRate: selectionDetails.CToolProposedRate,
        recruiterName: selectionDetails.recruiterName,
        offerReleaseStatus: selectionDetails.offerReleaseStatus,
        ltiOnboardDate: selectionDetails.LTIOnboardingDate,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelectionDetailsByCandidateId = async (candidateId) => {
    try {
      const selectionDetails = await getSelectionDetailsByCandidateId(
        candidateId
      );
      setForm((prevForm) => ({
        ...prevForm,
        selectionDate: selectionDetails.HSBCSelectionDate,
        bu: selectionDetails.baseBU,
        lob: selectionDetails.lob,
        subLob: selectionDetails.subLob,
        hiringManager: selectionDetails.HSBCHiringManager,
        head: selectionDetails.HSBCHead,
        deliveryManager: selectionDetails.deliveryManager,
        salesSpoc: selectionDetails.salesPOC,
        pricingModel: selectionDetails.PricingModel,
        irm: selectionDetails.irm,
        ctoolId: selectionDetails.HSBCToolId,
        ctoolRecDate: selectionDetails.CToolReceivedDate,
        ctoolJobCat: selectionDetails.CToolJobCategory,
        ctoolLocation: selectionDetails.CToolLocation,
        ctoolRate: selectionDetails.CToolRate,
        ctoolPropRate: selectionDetails.CToolProposedRate,
        recruiterName: selectionDetails.recruiterName,
        offerReleaseStatus: selectionDetails.offerReleaseStatus,
        ltiOnboardDate: selectionDetails.LTIOnboardingDate,
      }));
    } catch (error) {
      console.error(error);
    }
  };
 
  //Selection for LOB and SubLOB
  const bdArch = ["Architecture Stds & Gov"];
  const cto = ["Colleague & Collaboration","Dev Ops Services","Engineering & PE","Enterprise Infrastructure"];
  const cybersecurity = ["Cyber Assessment & Testing"];
  const enterprise = ["Colleague Experience Tech","Core Banking","Cross Functions Technology","Finance Technology","Risk & Compliance Technology","Risk-Compliance Technology"];
  const globalOps = ["Automation Platforms","Ops Management","Tech Change Delivery" ];
  const groupData = ["GDT BI & Visualization Tech","GDT Data Asset Tech & Control","GDT Data Management Tech","GDT Data Provisioning Tech",
    "GDT ET","GDT MENAT, EU & UK","GDT WPB","GDT WS, MSS and ESG"];
  const hdpi = ["HDPI"];
  const inm = ["INM"];
  const marketServ = ["Equities Technology","Fin Data & Reg Reporting Tech","Global Debt Markets Tech","Markets Treasury Tech","MSS Central Services",
    "MSS Operations Technology","Securities Financing Tech","Securities Services Tech","Surveillance & Supervision","Traded Risk"];
  const mds = ["ESG Data & Analytics"];
  const cio_eur = ["Regional Tech - Europe"];
  const sab = ["SAB Tech"];
  const strataserv = ["SST Group Enterprise Arch"];
  const coo = ["Tech COO - Enterprise Tech","Tech Third Party Mgmt"];
  const wholesale = ["WS Global Payment Solutions","WS Tech Client Services","WS Tech Credit & Lending","WS Tech Digital","WS Tech FEM&S",
    "WS Tech General","WS Tech Global Banking","WS Tech Global Trade and RF","WS Tech Regional","WS Tech Shared Services","WSIT General"];
  const wpb = ["Enabler Platforms","GPBW and AMG Tech","Insurance",
    "Retail Banking Technology","WPB Technology Management","WPB UK Tech"];
   /** Type variable to store different array for different dropdown */
   let type = null;

   /** This will be used to create set of options that user will see */
   let options = null;
   /** Setting Type variable according to dropdown */
   if (selected === "1") {
     type = bdArch;
   } else if (selected === "2") {
     type = cto;
   } else if (selected === "3") {
     type = cybersecurity;
   }
   else if (selected === "4") {
    type = enterprise;
  }
  else if (selected === "5") {
    type = globalOps;
  }
  else if (selected === "6") {
    type = groupData;
  }
  else if (selected === "7") {
    type = hdpi;
  }
  else if (selected === "8") {
    type = inm;
  }
  else if (selected === "9") {
    type = marketServ;
  }
  else if (selected === "10") {
    type = mds;
  }
  else if (selected === "11") {
    type = cio_eur;
  }
  else if (selected === "12") {
    type = sab;
  }
  else if (selected === "13") {
    type = strataserv;
  }
  else if (selected === "14") {
    type = coo;
  }
  else if (selected === "15") {
    type = wholesale;
  }
  else if (selected === "16") {
    type = wpb;
  }
//defining type for the options
  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }
//handle changes in form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setIsInternal(name === "internal" ? checked : !checked);
    } else {
      setForm({ ...form, [name]: value });
    }
  };
//for submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="py-2 flex items-center justify-center bg-blue-300 font-bold text-lg md:text-xl">
        HSBC Selection Tracker Form
      </h1>

      <h4 className="bg-gray-200 font-bold px-2 py-1 mt-4">Basic Info</h4>
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">Internal</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="checkbox"
                    name="internal"
                    checked={isInternal}
                    onChange={handleChange}
                    className="p-2"
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">External</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="checkbox"
                    name="external"
                    checked={!isInternal}
                    onChange={handleChange}
                    className="p-2"
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">PS ID:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="number"
                    name="psId"
                    value={form.psId || ""}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded w-full"
                    disabled={!isInternal}
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Candidate ID:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="number"
                    name="candidateId"
                    value={form.candidateId || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isInternal}
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">First Name:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="fname"
                    value={form.fname || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Last Name:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="lname"
                    value={form.lname || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Grade:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="grade"
                    value={form.grade || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Location:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="location"
                    value={form.location || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">PU:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="pu"
                    value={form.pu || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Total Exp:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="number"
                    name="totalExp"
                    value={form.totalExp || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Skill:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="skill"
                    value={form.skill || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Mail ID:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="bg-gray-200 font-bold px-2 py-1 mt-4">
          Selection Details
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Selection Date:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="selectionDate"
                    required
                    value={form.selectionDate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Base BU:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="bu"
                    value={form.bu || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">LOB:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    onChange={changeSelectOptionHandler}
                    name="lob"
                    className="p-2 bordered w-full"
                  >
                    <option value="">Select LOB</option>
                    <option value="1">Business & Data Architecture</option>
                    <option value="2">CTO</option>
                    <option value="3">Cybersecurity</option>
                    <option value="4">Enterprise Technology</option>
                    <option value="5">Global Ops & Automation Tech</option>
                    <option value="6">Group Data Technology</option>
                    <option value="7">HDPI</option>
                    <option value="8">INM</option>
                    <option value="9">Markets & Sec Services Tech</option>
                    <option value="10">MDS & DAO ESG</option>
                    <option value="11">Regional CIO - Europe</option>
                    <option value="12">SAB Technology</option>
                    <option value="13">Strategic Services Technology</option>
                    <option value="14">Technology COO</option>
                    <option value="15">Wholesale Technology</option>
                    <option value="16">WPB Technology</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Sub LOB:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select className="p-2 bordered w-full" onChange={handleChange}>
                    <option value="0">Choose SubLOB</option>
                    {options}
                  </select>
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">HSBC Hiring Manager:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="hiringManager"
                    required
                    value={form.hiringManager || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">HSBC Head:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="head"
                    required
                    value={form.head || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Delivery Manager:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="deliveryManager"
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="1">Abhijeet Sureshchandra More</option>
                    <option value="2">Aniruddha Deshpande</option>
                    <option value="3">Arvind Deogade</option>
                    <option value="4">Chinni Krishna Nakka</option>
                    <option value="5">Mayuresh Nirantar</option>
                    <option value="6">Saber Sarode</option>
                    <option value="7">Sachin Shaha</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Sales SPOC:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="salesSpoc"
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="1">Anand Devi</option>
                    <option value="2">Nishant sharma</option>
                    <option value="3">Indranil Moolay</option>
                    <option value="4">Ajay Pillai</option>
                  </select>
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Pricing Model:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="pricingModel"
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="1">T&M</option>
                    <option value="2">FP</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">IRM:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="irm"
                    value={form.irm || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">HSBC CTOOL ID:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="number"
                    name="ctoolId"
                    value={form.ctoolId || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">CTOOL Received Date:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="ctoolRecDate"
                    value={form.ctoolRecDate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">CTOOL Job Category:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="ctoolJobCat"
                    value={form.ctoolJobCat || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">CTOOL Location:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="ctoolLocation"
                    value={form.ctoolLocation || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">CTOOL Rate:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="number"
                    name="ctoolRate"
                    value={form.ctoolRate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">CTOOL Proposed Rate:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="number"
                    name="ctoolPropRate"
                    value={form.ctoolPropRate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Recruiter Name:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="recruiterName"
                    value={form.recruiterName || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Interview Evidences</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="file"
                    name="evidence"
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Offer Release Status:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="offerReleaseStatus"
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="1">Pending</option>
                    <option value="2">On Hold</option>
                    <option value="3">Release</option>
                    <option value="4">WIP</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">LTI Onboarding Date:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="ltiOnboardDate"
                    value={form.ltiOnboardDate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="p-2">
                  <div className="flex justify-center space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-10 rounded"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white py-2 px-10 rounded"
                    >
                      Cancel
                    </button>
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

export default SelectionTracker;
