import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCandidateById,
  getEmployeeByPsid,
  getSelectionDetailsByCandidateId,
  getSelectionDetailsByPsId,
  fetchLobs,
  fetchSubLobs
} from "../services/api";
import UpdateDetails from "./UpdateDetails";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SelectionTracker() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isInternal, setIsInternal] = useState(false);
  // const [selected, setSelected] = React.useState("");
  const navigate = useNavigate();
  const [lobs, setLobs] = useState([]);
  const [subLobs, setSubLobs] = useState([]);
  const [selectedLob, setSelectedLob] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

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

  useEffect(() => {
    const getLobs = async () => {
      try {
        const data = await fetchLobs();
        setLobs(data);
      } catch (error) {
        console.error('There was an error fetching the LOBs!', error);
      }
    };

    getLobs();
  }, []);

  // const changeSelectOptionHandler = (event) => {
  //   setSelected(event.target.value);
  // };

  const handleLobChange = async (event) => {
    const lobId = event.target.value;
    setSelectedLob(lobId);

    try {
      const data = await fetchSubLobs(lobId);
      setSubLobs(data);
    } catch (error) {
      console.error('There was an error fetching the SubLOBs!', error);
    }
  };

  const validate = () => {
    const errors = {};
    return errors;
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
        selectionDate: selectionDetails.hsbcSelectionDate,
        bu: selectionDetails.baseBU,
        lob: selectionDetails.lob,
        subLob: selectionDetails.subLob,
        hiringManager: selectionDetails.hsbchiringManager,
        head: selectionDetails.hsbchead,
        deliveryManager: selectionDetails.deliveryManager,
        salespoc: selectionDetails.salesPOC,
        pricingModel: selectionDetails.pricingModel,
        irm: selectionDetails.irm,
        ctoolId: selectionDetails.hsbctoolId,
        ctoolRecDate: selectionDetails.ctoolReceivedDate,
        ctoolJobCat: selectionDetails.ctoolJobCategory,
        ctoolLocation: selectionDetails.ctoolLocation,
        ctoolRate: selectionDetails.ctoolRate,
        ctoolPropRate: selectionDetails.ctoolProposedRate,
        recruiterName: selectionDetails.recruiterName,
        offerReleaseStatus: selectionDetails.offerReleaseStatus,
        ltiOnboardDate: selectionDetails.ltionboardingDate,
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
        selectionDate: selectionDetails.hsbcSelectionDate,
        bu: selectionDetails.baseBU,
        lob: selectionDetails.lob,
        subLob: selectionDetails.subLob,
        hiringManager: selectionDetails.hsbchiringManager,
        head: selectionDetails.hsbchead,
        deliveryManager: selectionDetails.deliveryManager,
        salespoc: selectionDetails.salesPOC,
        pricingModel: selectionDetails.pricingModel,
        irm: selectionDetails.irm,
        ctoolId: selectionDetails.hsbctoolId,
        ctoolRecDate: selectionDetails.ctoolReceivedDate,
        ctoolJobCat: selectionDetails.ctoolJobCategory,
        ctoolLocation: selectionDetails.ctoolLocation,
        ctoolRate: selectionDetails.ctoolRate,
        ctoolPropRate: selectionDetails.ctoolProposedRate,
        recruiterName: selectionDetails.recruiterName,
        offerReleaseStatus: selectionDetails.offerReleaseStatus,
        ltiOnboardDate: selectionDetails.ltionboardingDate,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // //Selection for LOB and SubLOB
  // const bdArch = ["Architecture Stds & Gov"];
  // const cto = [
  //   "Colleague & Collaboration",
  //   "Dev Ops Services",
  //   "Engineering & PE",
  //   "Enterprise Infrastructure",
  // ];
  // const cybersecurity = ["Cyber Assessment & Testing"];
  // const enterprise = [
  //   "Colleague Experience Tech",
  //   "Core Banking",
  //   "Cross Functions Technology",
  //   "Finance Technology",
  //   "Risk & Compliance Technology",
  //   "Risk-Compliance Technology",
  // ];
  // const globalOps = [
  //   "Automation Platforms",
  //   "Ops Management",
  //   "Tech Change Delivery",
  // ];
  // const groupData = [
  //   "GDT BI & Visualization Tech",
  //   "GDT Data Asset Tech & Control",
  //   "GDT Data Management Tech",
  //   "GDT Data Provisioning Tech",
  //   "GDT ET",
  //   "GDT MENAT, EU & UK",
  //   "GDT WPB",
  //   "GDT WS, MSS and ESG",
  // ];
  // const hdpi = ["HDPI"];
  // const inm = ["INM"];
  // const marketServ = [
  //   "Equities Technology",
  //   "Fin Data & Reg Reporting Tech",
  //   "Global Debt Markets Tech",
  //   "Markets Treasury Tech",
  //   "MSS Central Services",
  //   "MSS Operations Technology",
  //   "Securities Financing Tech",
  //   "Securities Services Tech",
  //   "Surveillance & Supervision",
  //   "Traded Risk",
  // ];
  // const mds = ["ESG Data & Analytics"];
  // const cio_eur = ["Regional Tech - Europe"];
  // const sab = ["SAB Tech"];
  // const strataserv = ["SST Group Enterprise Arch"];
  // const coo = ["Tech COO - Enterprise Tech", "Tech Third Party Mgmt"];
  // const wholesale = [
  //   "WS Global Payment Solutions",
  //   "WS Tech Client Services",
  //   "WS Tech Credit & Lending",
  //   "WS Tech Digital",
  //   "WS Tech FEM&S",
  //   "WS Tech General",
  //   "WS Tech Global Banking",
  //   "WS Tech Global Trade and RF",
  //   "WS Tech Regional",
  //   "WS Tech Shared Services",
  //   "WSIT General",
  // ];
  // const wpb = [
  //   "Enabler Platforms",
  //   "GPBW and AMG Tech",
  //   "Insurance",
  //   "Retail Banking Technology",
  //   "WPB Technology Management",
  //   "WPB UK Tech",
  // ];
  // /** Type variable to store different array for different dropdown */
  // let type = null;

  // /** This will be used to create set of options that user will see */
  // let options = null;
  // /** Setting Type variable according to dropdown */
  // if (selected === "1") {
  //   type = bdArch;
  // } else if (selected === "2") {
  //   type = cto;
  // } else if (selected === "3") {
  //   type = cybersecurity;
  // } else if (selected === "4") {
  //   type = enterprise;
  // } else if (selected === "5") {
  //   type = globalOps;
  // } else if (selected === "6") {
  //   type = groupData;
  // } else if (selected === "7") {
  //   type = hdpi;
  // } else if (selected === "8") {
  //   type = inm;
  // } else if (selected === "9") {
  //   type = marketServ;
  // } else if (selected === "10") {
  //   type = mds;
  // } else if (selected === "11") {
  //   type = cio_eur;
  // } else if (selected === "12") {
  //   type = sab;
  // } else if (selected === "13") {
  //   type = strataserv;
  // } else if (selected === "14") {
  //   type = coo;
  // } else if (selected === "15") {
  //   type = wholesale;
  // } else if (selected === "16") {
  //   type = wpb;
  // }
  // //defining type for the options
  // if (type) {
  //   options = type.map((el) => <option key={el}>{el}</option>);
  // }

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        const requestBody = {
          hsbcselectionDate: form.selectionDate,
          baseBU: "BF",
          lob: form.lob,
          sublob: form.subLob,
          hsbchiringManager: form.hiringManager,
          hsbchead: form.head,
          deliveryManager: form.deliveryManager,
          salesPOC: form.salespoc,
          pricingModel: form.pricingModel,
          irm: form.irm,
          hsbctoolId: form.ctoolId,
          ctoolReceivedDate: form.ctoolRecDate,
          ctoolJobCategory: form.ctoolJobCat,
          ctoolLocation: form.ctoolLocation,
          ctoolRate: form.ctoolRate,
          ctoolProposedRate: form.ctoolPropRate,
          recruiterName: form.recruiterName,
          interviewEvidence: form.evidence,
          offerReleaseStatus: form.offerReleaseStatus,
          ltionboardingDate: form.ltiOnboardDate,
        };

        if (form.psId) {
          requestBody.employee = { psid: form.psId };
        } else if (form.candidateId) {
          requestBody.candidate = { candidateId: form.candidateId };
        }

        const response = await fetch("http://localhost:8080/selection-details/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          // Simulate successful creation of selection details for the employee or candidate
          toast.success('Details added successfully!', {
            position: 'top-right',
          });
          localStorage.setItem("selectionDetails", JSON.stringify(requestBody));
          navigate("/landing-page"); // Navigate to the dashboard after successful creation
        } else {
          const errorData = await response.json();
          toast.error('Error adding details:', {
            position: 'top-right',
          });
          setErrors({ submit: errorData.message });
        }
      } catch (error) {
        toast.error('Error adding details:', {
          position: 'top-right',
        });
        setErrors({ submit: "An error occurred while submitting the form" });
      }
    } else {
      setErrors(errors);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const errors = validate();
  //   if (Object.keys(errors).length === 0) {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8080/selection-details/create",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             employee:{psid:form.psId}||null,
  //             candidate:{candidateId:form.candidateId||null},
  //             hsbcselectionDate: form.selectionDate,
  //             baseBU: "BF",
  //             lob: form.lob,
  //             sublob: form.subLob,
  //             hsbchiringManager: form.hiringManager,
  //             hsbchead: form.head,
  //             deliveryManager: form.deliveryManager,
  //             salesPOC: form.salespoc,
  //             pricingModel: form.pricingModel,
  //             irm: form.irm,
  //             hsbctoolId: form.ctoolId,
  //             ctoolReceivedDate: form.ctoolRecDate,
  //             ctoolJobCategory: form.ctoolJobCat,
  //             ctoolLocation: form.ctoolLocation,
  //             ctoolRate: form.ctoolRate,
  //             ctoolProposedRate: form.ctoolPropRate,
  //             recruiterName: form.recruiterName,
  //             interviewEvidence: form.evidence,
  //             offerReleaseStatus: form.offerReleaseStatus,
  //             ltionboardingDate: form.ltiOnboardDate,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         // Simulate successful creation of selection details for the employee
  //         localStorage.setItem(
  //           "selectionDetails",
  //           JSON.stringify({
  //             hsbcselectionDate: form.selectionDate,
  //             baseBU: "BF",
  //             lob: form.lob,
  //             subLob: form.subLob,
  //             hsbchiringManager: form.hiringManager,
  //             hsbchead: form.head,
  //             deliveryManager: form.deliveryManager,
  //             salesPOC: form.salespoc,
  //             pricingModel: form.pricingModel,
  //             irm: form.irm,
  //             hsbctoolId: form.ctoolId,
  //             ctoolReceivedDate: form.ctoolRecDate,
  //             ctoolJobCategory: form.ctoolJobCat,
  //             ctoolLocation: form.ctoolLocation,
  //             ctoolRate: form.ctoolRate,
  //             ctoolProposedRate: form.ctoolPropRate,
  //             recruiterName: form.recruiterName,
  //             interviewEvidence: form.evidence,
  //             offerReleaseStatus: form.offerReleaseStatus,
  //             ltionboardingDate: form.ltiOnboardDate,
  //           })
  //         );

  //         navigate("/selection-tracker"); // Navigate to the dashboard after successful creation
  //       } else {
  //         const errorData = await response.json();
  //         setErrors({ submit: errorData.message });
  //       }
  //     } catch (error) {
  //       setErrors({ submit: "An error occurred while submitting the form" });
  //     }
  //   } else {
  //     setErrors(errors);
  //   }
  // };

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
                  <label className="font-semibold">PS ID:<span className="text-red-500">*</span></label>
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
                  <label className="font-semibold">Candidate ID:<span className="text-red-500">*</span></label>
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
                  <label className="font-semibold">Selection Date:<span className="text-red-500">*</span></label>
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
                  <label className="font-semibold">LOB:<span className="text-red-500">*</span></label>
                </td>
                {/* <td className="p-2 w-full md:w-1/4">
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
                </td> */}
                <td className="p-2 w-full md:w-1/4">
                  <select
                    onChange={handleLobChange}
                    name="lob"
                    className="p-2 bordered w-full"
                  >
                    <option value="">Select LOB</option>
                    {lobs.map(lob => (
                      <option key={lob.lobId} value={lob.lobId}>{lob.lobName}</option>
                    ))}
                  </select>
                </td>
                {/* <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Sub LOB:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    className="p-2 bordered w-full"
                    name="subLob"
                    onChange={handleChange}
                  >
                    <option value="0">Choose SubLOB</option>
                    {options}
                  </select>
                </td> */}
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Sub LOB:<span className="text-red-500">*</span></label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    className="p-2 bordered w-full"
                    name="subLob"
                    onChange={handleChange}
                  >
                    <option value="0">Choose SubLOB</option>
                    {subLobs.map(subLob => (
                      <option key={subLob.subLOBid} value={subLob.subLOBid}>{subLob.subLobName}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">HSBC Hiring Manager:<span className="text-red-500">*</span></label>
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
                  <label className="font-semibold">HSBC Head:<span className="text-red-500">*</span></label>
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
                  <label className="font-semibold">Delivery Manager:<span className="text-red-500">*</span></label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="deliveryManager"
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="0">Choose..</option>
                    <option value="Abhijeet Sureshchandra More">
                      Abhijeet Sureshchandra More
                    </option>
                    <option value="Aniruddha Deshpande">
                      Aniruddha Deshpande
                    </option>
                    <option value="Arvind Deogade">Arvind Deogade</option>
                    <option value="Chinni Krishna Nakka">
                      Chinni Krishna Nakka
                    </option>
                    <option value="Mayuresh Nirantar">Mayuresh Nirantar</option>
                    <option value="Saber Sarode">Saber Sarode</option>
                    <option value="Sachin Shaha">Sachin Shaha</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Sales POC:</label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="salespoc"
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="0">Choose..</option>
                    <option value="Anand Devi">Anand Devi</option>
                    <option value="Nishant sharma">Nishant sharma</option>
                    <option value="Indranil Moolay">Indranil Moolay</option>
                    <option value="Ajay Pillai">Ajay Pillai</option>
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
                    <option value="0">Choose..</option>
                    <option value="T&M">T&M</option>
                    <option value="FP">FP</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">IRM:<span className="text-red-500">*</span></label>
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
                    required
                    pattern="\d{6}"
                    title="HSBC CTOOL ID must be 6 digits"
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
                    <option value="">Choose...</option>
                    <option value="Pending">Pending</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Release">Release</option>
                    <option value="WIP">WIP</option>
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
                      onClick={handleSubmit}
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
                  <div className="mt-4">
                    <div className="bg-gray-200 p-4 rounded-lg w-full">
                      <button
                        type="button"
                        onClick={toggleAccordion}
                        className="w-full flex items-center justify-between bg-gray-500 text-white py-2 px-4 rounded focus:outline-none"
                      >
                        <span className="flex items-center">
                          <span
                            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                          >
                            ▲
                          </span>
                          <span className="ml-2">Update Tagging and Onboarding details</span>
                        </span>
                      </button>
                      {isOpen && (
                        <div className="mt-2 p-4 border-t border-gray-300 bg-white rounded">
                          <UpdateDetails />
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </div>
  );
}

export default SelectionTracker;
