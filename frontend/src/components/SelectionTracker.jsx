import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCandidateById,
  getEmployeeByPsid,
  getSelectionDetailsByCandidateId,
  getSelectionDetailsByPsId,
  fetchLobs,
  fetchSubLobs,
  fetchSubLob,
  getTaggingDetailsByPsId,
  //fetchLob
} from "../services/api";
//import UpdateDetails from "./UpdateDetails";
import moment from "moment";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SelectionTracker() {
  const [form, setForm] = useState({ bu: "", psId: "", candidateId: "" });
  const [errors, setErrors] = useState({});
  const [isInternal, setIsInternal] = useState(true);
  // const [selected, setSelected] = React.useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const navigate = useNavigate();
  const [lobs, setLobs] = useState([]);
  const [subLobs, setSubLobs] = useState([]);
  //const [Lob, setLob] = useState([]);
  const [subLob, setSubLob] = useState([]);
  const [selectedSubLobTemp,setSelectedSubLobTemp]=useState({});
  const location = useLocation();
  const { state } = location;
  // const id = state?.id;
  const { id, readOnly } = state || {};

  useEffect(() => {
    if (readOnly) {
      setIsReadOnly(true);
      toast.success("Selection details fetched successfully!", {
        position: "top-right",
      });
    }
  }, [readOnly]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          // Attempt to fetch employee data by psid
          const employee = await getEmployeeByPsid(id);
          if (employee && employee.psid) {
            // If employee data is found, set the form state with employee data
            setForm((prevForm) => ({
              ...prevForm,
              psId: employee.psid,
              fname: employee.firstName,
              lname: employee.lastName,
              pu: employee.pu,
              grade: employee.grade,
              location: employee.location,
              totalExp: employee.totalExperience,
              skill: employee.skill,
              email: employee.mailID,
              bu: employee.baseBU,
            }));
            setIsInternal(true); // Set isInternal to true for employees
            // Fetch selection details for the employee
            await fetchSelectionDetailsByPsid(employee.psid);
          }
        } catch (error) {
          // If error occurs (e.g., employee not found), attempt to fetch candidate data by candidateId
          try {
            const candidate = await getCandidateById(id);
            if (candidate && candidate.candidateId) {
              // Set the form state with candidate data
              setForm((prevForm) => ({
                ...prevForm,
                candidateId: candidate.candidateId,
                fname: candidate.firstName,
                lname: candidate.lastName,
                baseBU: "",
                grade: "", // Assuming grade is not available for candidate
                location: "", // Assuming location is not available for candidate
                pu: "", // Assuming pu is not available for candidate
                totalExp: "", // Assuming totalExperience is not available for candidate
                skill: "", // Assuming skill is not available for candidate
                email: "", // Assuming email is not available for candidate
              }));
              setIsInternal(false); // Set isInternal to false for candidates
              // Fetch selection details for the candidate
              await fetchSelectionDetailsByCandidateId(candidate.candidateId);
            }
          } catch (candidateError) {
            console.error("Error fetching candidate data:", candidateError);
          }
        }
      }
    };

    fetchData();
  }, [id]);

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
        console.error("There was an error fetching the LOBs!", error);
      }
    };

    getLobs();
  }, []);

    useEffect(() => {
        const getSubLobs = async () => {
          try {
            const data = await fetchSubLobs(form.lob.lobId);
            setSubLobs(data);         
            form.subLob = selectedSubLobTemp;
          } catch (error) {
                console.error("There was an error fetching the SubLOBs!", error);
          }
        };
        getSubLobs();
      
    }, [form.lob]);

  const handleLobChange = async (event) => {
      setSelectedSubLobTemp({});
      const lobId = event.target.value;
      console.log("LOB: ", lobId);
      form.lob.lobId = lobId;
    
      try {
        const data = await fetchSubLobs(lobId);
        setSubLobs(data);
      } catch (error) {
        console.error("There was an error fetching the SubLOBs!", error);
      }
    };
  
    const handleSubLobChange = async (event) => {
      const subLobId = event.target.value;
      console.log("subLOB: ", subLobId);
      form.subLob.subLOBid = subLobId;

      try {
        const data = await fetchSubLob(subLobId);
        setSubLob(data);
      } catch (error) {
        console.error("There was an error fetching the SubLOB!", error);
      }
    };
  

  const validate = () => {
    const errors = {};
    if (form.ctoolId && form.ctoolId.toString().length !== 6) {
      errors.ctoolId = "CTOOL ID must be 6 digits";
    }
    return errors;
  };

  const fetchEmployeeData = async (psid) => {
    try {
      const employee = await getEmployeeByPsid(psid);
      setForm((prevForm) => ({
        ...prevForm,
        fname: employee.firstName,
        lname: employee.lastName,
        pu: employee.pu,
        grade: employee.grade,
        location: employee.location,
        totalExp: employee.totalExperience,
        skill: employee.skill,
        email: employee.mailID,
        bu: employee.baseBU,
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
        baseBU: "",
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

  const formatDate = (date) => {
    if (!date) return "";
    return moment(date).format("YYYY-MM-DD");
  };

  const fetchSelectionDetailsByPsid = async (psid) => {
    try {
      const selectionDetails = await getSelectionDetailsByPsId(psid);
      const taggingDetails = await getTaggingDetailsByPsId(psid).catch((err) => {
                console.error("Error fetching tagging details:", err);
                return {}; // Fallback to an empty object
              })
        setForm((prevForm) => ({
          ...prevForm,
          selectionDate: formatDate(selectionDetails.hsbcselectionDate),
          bu: "BF",
          lob: selectionDetails.lob || "",
          subLob: selectionDetails.sublob || "",
          hiringManager: selectionDetails.hsbchiringManager,
          head: selectionDetails.hsbchead,
          deliveryManager: selectionDetails.deliveryManager,
          salespoc: selectionDetails.salesPOC,
          pricingModel: selectionDetails.pricingModel,
          irm: selectionDetails.irm,
          ctoolId: selectionDetails.hsbctoolId,
          ctoolRecDate: formatDate(selectionDetails.ctoolReceivedDate),
          ctoolJobCat: selectionDetails.ctoolJobCategory,
          ctoolLocation: selectionDetails.ctoolLocation,
          ctoolRate: selectionDetails.ctoolRate,
          ctoolPropRate: selectionDetails.ctoolProposedRate,
          recruiterName: selectionDetails.recruiterName,
          offerReleaseStatus: selectionDetails.offerReleaseStatus,
          ltiOnboardDate: formatDate(selectionDetails.ltionboardingDate),
        }));
        setSelectedSubLobTemp(selectionDetails.subLob);
        if(!readOnly && (taggingDetails.onboardingStatus.onboardingStatus !== 'Onboarding Completed')) {
        toast.error("Selection already exists for this ID.", {
          position: "top-right",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelectionDetailsByCandidateId = async (candidateId) => {
    try {
      const selectionDetails = await getSelectionDetailsByCandidateId(
        candidateId);
        const taggingDetails = await getTaggingDetailsByPsId(candidateId).catch((err) => {
          console.error("Error fetching tagging details:", err);
          return {}; // Fallback to an empty object
        })
        setForm((prevForm) => ({
          ...prevForm,
          selectionDate: formatDate(selectionDetails.hsbcselectionDate),
          bu: "BF",
          lob: selectionDetails.lob,
          subLob: selectionDetails.sublob,
          hiringManager: selectionDetails.hsbchiringManager,
          head: selectionDetails.hsbchead,
          deliveryManager: selectionDetails.deliveryManager,
          salespoc: selectionDetails.salesPOC,
          pricingModel: selectionDetails.pricingModel,
          irm: selectionDetails.irm,
          ctoolId: selectionDetails.hsbctoolId,
          ctoolRecDate: formatDate(selectionDetails.ctoolReceivedDate),
          ctoolJobCat: selectionDetails.ctoolJobCategory,
          ctoolLocation: selectionDetails.ctoolLocation,
          ctoolRate: selectionDetails.ctoolRate,
          ctoolPropRate: selectionDetails.ctoolProposedRate,
          recruiterName: selectionDetails.recruiterName,
          offerReleaseStatus: selectionDetails.offerReleaseStatus,
          ltiOnboardDate: formatDate(selectionDetails.ltionboardingDate),
        }));
        setSelectedSubLobTemp(selectionDetails.subLob);
        if(!readOnly && (taggingDetails.onboardingStatus.onboardingStatus !== 'Onboarding Completed')) {
          toast.error("Selection already exists for this ID.", {
            position: "top-right",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        }
    } catch (error) {
      console.error(error);
    }
  };

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
          baseBU: form.bu,
          lob: subLob.lob,
          subLob: subLob,
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
        console.log(requestBody);
        if (form.psId) {
          requestBody.employee = { psid: form.psId };
          const response = await fetch(
            "http://localhost:8080/selection-details/create/employee",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            }
          );
          console.log(response);
          if (response.ok) {
            // Simulate successful creation of selection details for the employee or candidate
            toast.success("Details updated successfully!", {
              position: "top-right",
            });
            localStorage.setItem(
              "selectionDetails",
              JSON.stringify(requestBody)
            );
            console.log(requestBody);
            setTimeout(() => {
              navigate("/landing-page");
            }, 2000); // Navigate to the dashboard after successful creation
          } else {
            const errorData = await response.json();
            setErrors({ submit: errorData.message });
            toast.error("Error adding details:", {
              position: "top-right",
            });
          }
        } else if (form.candidateId) {
          requestBody.candidate = { candidateId: form.candidateId };
          const response = await fetch(
            "http://localhost:8080/selection-details/create/candidate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            }
          );

          if (response.ok) {
            // Simulate successful creation of selection details for the employee or candidate
            toast.success("Details updated successfully!", {
              position: "top-right",
            });
            localStorage.setItem(
              "selectionDetails",
              JSON.stringify(requestBody)
            );
            setTimeout(() => {
              navigate("/landing-page");
            }, 2000); // Navigate to the dashboard after successful creation
          } else {
            const errorData = await response.json();
            setErrors({ submit: errorData.message });
            toast.error("Error adding details:", {
              position: "top-right",
            });
          }
        }
      } catch (error) {
        setErrors({ submit: "An error occurred while submitting the form" });
        toast.error("Error adding details:", {
          position: "top-right",
        });
      }
    } else {
      setErrors(errors);
      toast.error("Error adding details:", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="py-2 flex items-center justify-center bg-blue-300 font-bold text-lg md:text-xl">
        HSBC Selection Tracker Form
      </h1>
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
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap ">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    PS ID:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="number"
                    name="psId"
                    value={form.psId || ""}
                    onChange={handleChange}
                    required
                    className={`p-2 border rounded w-full ${
                      errors.psId ? "border-red-500" : ""
                    }`}
                    disabled={!isInternal || readOnly}
                    pattern="\d*"
                  />
                  {errors.psId && (
                    <p className="text-red-500 text-sm mb-4">{errors.psId}</p>
                  )}
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    Candidate ID:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="number"
                    name="candidateId"
                    value={form.candidateId || ""}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) =>
                      fetchSelectionDetailsByCandidateId(e.target.value)
                    }
                    className={`p-2 border rounded w-full ${
                      errors.candidateId ? "border-red-500" : ""
                    }`}
                    disabled={isInternal}
                  />
                  {errors.candidateId && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.candidateId}
                    </p>
                  )}
                </td>
              </tr>
              <h4 className="bg-gray-200 font-bold px-2 py-1 mt-4">
                Basic Info
              </h4>
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
                  <label className="font-semibold">
                    Selection Date:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="selectionDate"
                    required
                    value={form.selectionDate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={readOnly}
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
                    disabled={isReadOnly}
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    LOB:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    value={form.lob?.lobId || ""}
                    onChange={handleLobChange}
                    name="lob"
                    className="p-2 bordered w-full"
                    disabled={isReadOnly}
                  >
                    <option value="">Choose...</option>
                    {lobs.map((lob) => (
                      <option key={lob.lobId} value={lob.lobId}>
                        {lob.lobName}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    Sub LOB:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="subLob"
                    value={form.subLob?.subLOBid ||''}
                    className="p-2 bordered w-full"
                    onChange={handleSubLobChange}
                    disabled={isReadOnly}
                  >
                    <option value="0">Choose...</option>
                    {subLobs.map((subLob) => (
                      <option key={subLob.subLOBid} value={subLob.subLOBid}>
                        {subLob.subLobName}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    HSBC Hiring Manager:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="hiringManager"
                    required
                    value={form.hiringManager || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    HSBC Head:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="head"
                    required
                    value={form.head || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    Delivery Manager:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="deliveryManager"
                    value={form.deliveryManager || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
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
                    value={form.salespoc || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
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
                    value={form.pricingModel || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  >
                    <option value="0">Choose..</option>
                    <option value="T&M">T&M</option>
                    <option value="FP">FP</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    IRM:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="irm"
                    value={form.irm || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
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
                    minLength={6}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    required
                    pattern="\d{6}"
                    title="HSBC CTOOL ID must be 6 digits"
                    disabled={isReadOnly}
                  />
                  {errors.ctoolId && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.ctoolId}
                    </div>
                  )}
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
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
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
                    value={form.offerReleaseStatus || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
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
              {/* <tr>
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
                </td>
              </tr> */}

              {!isReadOnly && (
                <tr>
                  <td colSpan="4" className="p-2">
                    <div className="flex justify-center space-x-4">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-2 px-10 rounded"
                        disabled={form.invalid}
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
              )}
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
