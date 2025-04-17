import React, { useState, useEffect } from "react";
import {
  getCandidateById,
  getEmployeeByPsid,
  getTaggingDetailsByCandidateId,
  getTaggingDetailsByPsId,
  updateTaggingDetailsByPsId,
  updateTaggingDetailsByCandidateId,
  updateSelectionDetailsByPsId,
  updateSelectionDetailsByCandidateId,
  getSelectionDetailsByCandidateId,
  getSelectionDetailsByPsId,
  fetchSubLob,
  fetchLobs,
  fetchSubLobs,
  getAllVendors,
  getTaggingDetailsByVendorCandidateId,
  getSelectionDetailsByVendorCandidateId,
  updateSelectionDetailsByVendorCandidateId,
  updateTaggingDetailsByVendorCandidateId,
  getVendorCandidateById,
} from "../services/api";
import moment from "moment";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateDetails() {
  const [form, setForm] = useState({});
  const [isInternal, setIsInternal] = useState(true);
  const [isExternal, setIsExternal] = useState(false);
  const [isVendor, setVendor] = useState(false);
  const [psId, setPsId] = useState("");
  const [phone, setPhone] = useState("");
  const [lobs, setLobs] = useState([]);
  const [errors, setErrors] = useState({});
  const [subLobs, setSubLobs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [subLob, setSubLob] = useState([]);
  const [selectedSubLobTemp, setSelectedSubLobTemp] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const id = state?.id;
  const phoneNumber = state?.phoneNumber;
  const today = new Date().toISOString().split("T")[0];
  const [candidateStatuses, setCandidateStatuses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/candidate-status/all')
      .then(response => response.json())
      .then(data => {
        // Use a Set to store unique statuses
        const uniqueStatusesMap = new Map();
  
        data.forEach(status => {
          uniqueStatusesMap.set(status.candidateStatus, status);
        });
  
        setCandidateStatuses(Array.from(uniqueStatusesMap.values()));
      })
      .catch(error => 
        console.error("Error fetching candidate statuses:", error)
      );
  }, []);
  


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio") {
      setIsInternal(name === "internal" ? checked : !checked);
      setIsExternal(name === "external" ? checked : !checked);
      //setVendor(name === "vendor" ? checked : !checked);
    } else {
      setForm({ ...form, [name]: value });
    }
    if (name === "status") {
      if (value === "Tagging Completed") {
        setForm((prevForm) => ({ ...prevForm, tagDateEnabled: true }));
      } else if (value === "Tech Selection Done") {
        setForm((prevForm) => ({ ...prevForm, techSelectDateEnabled: true }));
      } else if (value === "DOJ Recieved") {
        setForm((prevForm) => ({ ...prevForm, dojRecDateEnabled: true }));
      } else if (value === "Onboarding Completed") {
        setForm((prevForm) => ({ ...prevForm, onboardingDateEnabled: true }));
      }
    }
  };

  useEffect(() => {
    if (form.vendors && form.vendors !== 1) {
      setVendor(true);
    }
  });

  useEffect(() => {
    const getVendors = async () => {
      try {
        const data = await getAllVendors();
        setVendors(data);
      } catch (error) {
        console.error("There was an error fetching the Vendors!", error);
      }
    };

    getVendors();
  }, []);

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
    form.lob.lobId = event.target.value;

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
    form.subLob.subLOBid = event.target.value;

    try {
      const data = await fetchSubLob(subLobId);
      setSubLob(data);
    } catch (error) {
      console.error("There was an error fetching the SubLOB!", error);
    }
  };

  const handleVendorChange = async (event) => {
    const vendorId = event.target.value;
    console.log(vendorId);

    setForm((prevState) => ({
      ...prevState,
      vendors: { vendorId: vendorId },
    }));
    setVendor(true);
    if (form.vendors === 1) {
      setVendor(false);
      setIsExternal(true);
    }
  };

  const validate = () => {
    const errors = {};
    if (form.ctoolId && form.ctoolId.toString().length !== 6) {
      errors.ctoolId = "CTOOL ID must be 6 digits";
    }
    return errors;
  };

  const handlePsIdChange = (e) => {
    setPsId(e.target.value);
  };
  const handlePhoneChange = (e) => {
    console.log(phone);
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const isValidDate = (dateString) => {
    //   return moment(dateString, "YYYY-MM-DD", true).isValid();
    // };

    // if (!isValidDate(form.tagDate)) {
    //   console.error("Invalid date format for tagDate");
    //   return;
    // }

    const formattedTagDate = moment(form.tagDate, "YYYY-MM-DD").toISOString();
    console.log("Formatted tagDate value:", formattedTagDate);

    //const createDate = formattedTagDate;
    const updateDate = new Date().toISOString();

    const taggingDetails = {
      onboardingStatus: {
        onboardingStatus: form.status,
        remarks: form.addRemark,
      },
      bgvStatus: {
        bgvStatus: form.bgvStatus,
        remarks: form.bgvRemark,
      },
      candidateStatus: {
        candidateStatus: form.candidateStatus,
        remarks: form.candidateRemark,
      },
      //createDate: createDate,
      updateDate: updateDate,
    };
    const selectionDetails = {
      hsbcselectionDate: form.selectionDate,
      baseBU: form.bu,
      lob: form.lob,
      subLob: form.subLob,
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
      techSelectionDate: form.techSelectDate,
      candidateStatusDate: form.candidateStatusDate,
      dojreceivedDate: form.dojRecDate,
      hsbconboardingDate: form.onboardingDate,
    };

    console.log("tagging details: ", taggingDetails);
    console.log("selection details: ", selectionDetails);
    if (isInternal && psId) {
      updateSelectionDetailsByPsId(psId, selectionDetails)
        .then(() => {
          updateTaggingDetailsByPsId(psId, taggingDetails) &&
            toast.success("Details updated successfully!", {
              position: "top-right",
            });
          setTimeout(() => {
            navigate("/landing-page");
          }, 2000);
        })
        .catch((error) => {
          toast.error("Error updating details:", {
            position: "top-right",
          });
          console.error("Error updating details by PsId:", error);
        });
    } else if (isExternal && phone) {
      updateSelectionDetailsByCandidateId(phone, selectionDetails)
        .then(() => {
          updateTaggingDetailsByCandidateId(phone, taggingDetails) &&
            toast.success("Details updated successfully!", {
              position: "top-right",
            });
          setTimeout(() => {
            navigate("/landing-page");
          }, 2000);
        })
        .catch((error) => {
          toast.error("Error updating details:", {
            position: "top-right",
          });
          console.error("Error updating details by CandidateId:", error);
        });
    } else if (isVendor && phone) {
      updateSelectionDetailsByVendorCandidateId(phone, selectionDetails)
        .then(() => {
          updateTaggingDetailsByVendorCandidateId(phone, taggingDetails)
            &&
            toast.success("Details updated successfully!", {
              position: "top-right",
            });
          setTimeout(() => {
            navigate("/landing-page");
          }, 2000);
        })
        .catch((error) => {
          toast.error("Error updating details:", {
            position: "top-right",
          });
          console.error("Error updating details by VendorId:", error);
        });
    }
  };

  useEffect(() => {
    if (id === 1) {
      setIsInternal(false);
      setIsExternal(true);
      setPhone(phoneNumber);
    } else if (id < 100) {
      setIsInternal(false);
      setVendor(true);
      setPhone(phoneNumber);
    } else {
      setIsInternal(true);
      setPsId(id);
    }
    const errors = validate();
    const formatDate = (date) => {
      if (!date) return "";
      return moment(date).format("YYYY-MM-DD");
    };
    if (isInternal && psId) {
      Promise.all([
        getEmployeeByPsid(psId).catch((err) => {
          console.error("Error fetching employee data:", err);
          return {}; // Fallback to an empty object
        }),
        getSelectionDetailsByPsId(psId).catch((err) => {
          console.error("Error fetching selection details:", err);
          return {}; // Fallback to an empty object
        }),
        getTaggingDetailsByPsId(psId).catch((err) => {
          console.error("Error fetching tagging details:", err);
          return {}; // Fallback to an empty object
        }),
      ])
        .then(([employee, selectionData, taggingData]) => {
          setForm({
            fname: employee.firstName || "",
            lname: employee.lastName || "",
            pu: employee.pu || "",
            grade: employee.grade || "",
            location: employee.location || "",
            totalExp: employee.totalExperience || "",
            skill: employee.skill || "",
            email: employee.mailID || "",
            phone: employee.phoneNumber,
            selectionDate: formatDate(selectionData.hsbcselectionDate),
            bu: "BF",
            lob: selectionData.lob || "",
            subLob: selectionData.sublob || "",
            hiringManager: selectionData.hsbchiringManager || "",
            head: selectionData.hsbchead || "",
            deliveryManager: selectionData.deliveryManager || "",
            salespoc: selectionData.salesPOC || "",
            pricingModel: selectionData.pricingModel || "",
            irm: selectionData.irm || "",
            ctoolId: selectionData.hsbctoolId || "",
            ctoolRecDate: formatDate(selectionData.ctoolReceivedDate),
            ctoolJobCat: selectionData.ctoolJobCategory || "",
            ctoolLocation: selectionData.ctoolLocation || "",
            ctoolRate: selectionData.ctoolRate || "",
            ctoolPropRate: selectionData.ctoolProposedRate || "",
            recruiterName: selectionData.recruiterName || "",
            offerReleaseStatus: selectionData.offerReleaseStatus || "",
            ltiOnboardDate: formatDate(selectionData.ltionboardingDate),
            status: taggingData.onboardingStatus?.onboardingStatus || "",
            addRemark: taggingData.onboardingStatus?.remarks || "",
            bgvStatus: taggingData.bgvStatus?.bgvStatus || "",
            bgvRemark: taggingData.bgvStatus?.remarks || "",
            candidateStatus: taggingData.candidateStatus?.candidateStatus || "",
            candidateRemark: taggingData.candidateStatus?.remarks || "",
            tagDate: formatDate(taggingData.createDate) || "",
            techSelectDate: formatDate(selectionData.techSelectionDate) || "",
            dojRecDate: formatDate(selectionData.dojreceivedDate) || "",
            onboardingDate: formatDate(selectionData.hsbconboardingDate) || "",
            candidateStatusDate: formatDate(selectionData.candidateStatusDate) || "",
          });
          console.log(selectionData);
          setSelectedSubLobTemp(selectionData.subLob);
        })
        .catch((error) => {
          console.error("Error in Promise.all:", error);
        });
    } else if (isExternal && phone) {
      Promise.all([
        getCandidateById(phone).catch((err) => {
          console.error("Error fetching candidate data:", err);
          return {}; // Fallback to an empty object
        }),
        getSelectionDetailsByCandidateId(phone).catch((err) => {
          console.error("Error fetching candidate data:", err);
          return {}; // Fallback to an empty object
        }),
        getTaggingDetailsByCandidateId(phone).catch((err) => {
          console.error("Error fetching candidate data:", err);
          return {}; // Fallback to an empty object
        }),
      ])
        .then(([candidate, selectionData, taggingData]) => {
          setForm({
            vendors: { vendorId: 1 },
            phone: candidate.phoneNumber,
            fname: candidate.firstName,
            lname: candidate.lastName,
            grade: "", // Assuming grade is not available for candidate
            location: "", // Assuming location is not available for candidate
            pu: "", // Assuming pu is not available for candidate
            totalExp: "", // Assuming totalExperience is not available for candidate
            skill: "", // Assuming skill is not available for candidate
            email: "", // Assuming email is not available for candidate
            selectionDate: formatDate(selectionData.hsbcselectionDate),
            bu: "BF",
            lob: selectionData.lob || "",
            subLob: selectionData.sublob || "",
            hiringManager: selectionData.hsbchiringManager || "",
            head: selectionData.hsbchead || "",
            deliveryManager: selectionData.deliveryManager || "",
            salespoc: selectionData.salesPOC || "",
            pricingModel: selectionData.pricingModel || "",
            irm: selectionData.irm || "",
            ctoolId: selectionData.hsbctoolId || "",
            ctoolRecDate: formatDate(selectionData.ctoolReceivedDate),
            ctoolJobCat: selectionData.ctoolJobCategory || "",
            ctoolLocation: selectionData.ctoolLocation || "",
            ctoolRate: selectionData.ctoolRate || "",
            ctoolPropRate: selectionData.ctoolProposedRate || "",
            recruiterName: selectionData.recruiterName || "",
            offerReleaseStatus: selectionData.offerReleaseStatus || "",
            ltiOnboardDate: formatDate(selectionData.ltionboardingDate),
            status: taggingData.onboardingStatus?.onboardingStatus || "",
            addRemark: taggingData.onboardingStatus?.remarks || "",
            bgvStatus: taggingData.bgvStatus?.bgvStatus || "",
            bgvRemark: taggingData.bgvStatus?.remarks || "",
            tagDate: formatDate(taggingData.createDate) || "",
            techSelectDate: formatDate(selectionData.techSelectionDate) || "",
            dojRecDate: formatDate(selectionData.dojreceivedDate) || "",
            onboardingDate: formatDate(selectionData.hsbconboardingDate) || "",
            candidateStatus: taggingData.candidateStatus?.candidateStatus || "",
            candidateRemark: taggingData.candidateStatus?.remarks || "",
            candidateStatusDate: formatDate(selectionData.candidateStatusDate) || "",
          });
          setSelectedSubLobTemp(selectionData.subLob);
        })
        .catch((error) => {
          console.error("Error fetching data by CandidateId:", error);
        });
    } else if (isVendor && phone) {
      Promise.all([
        getVendorCandidateById(phone).catch((err) => {
          console.error("Error fetching vendor data:", err);
          return {}; // Fallback to an empty object
        }),
        getSelectionDetailsByVendorCandidateId(phone).catch((err) => {
          console.error("Error fetching vendor data:", err);
          return {}; // Fallback to an empty object
        }),
        getTaggingDetailsByVendorCandidateId(phone).catch((err) => {
          console.error("Error fetching vendor data:", err);
          return {}; // Fallback to an empty object
        }),
      ])
        .then(([vendorCandidate, selectionData, taggingData]) => {
          setForm({
            vendors: { vendorId: id },
            phone: vendorCandidate.phoneNumber,
            fname: vendorCandidate.firstName,
            lname: vendorCandidate.lastName,
            grade: "", // Assuming grade is not available for candidate
            location: "", // Assuming location is not available for candidate
            pu: "", // Assuming pu is not available for candidate
            totalExp: "", // Assuming totalExperience is not available for candidate
            skill: "", // Assuming skill is not available for candidate
            email: "", // Assuming email is not available for candidate
            selectionDate: formatDate(selectionData.hsbcselectionDate),
            bu: "BF",
            lob: selectionData.lob || "",
            subLob: selectionData.sublob || "",
            hiringManager: selectionData.hsbchiringManager || "",
            head: selectionData.hsbchead || "",
            deliveryManager: selectionData.deliveryManager || "",
            salespoc: selectionData.salesPOC || "",
            pricingModel: selectionData.pricingModel || "",
            irm: selectionData.irm || "",
            ctoolId: selectionData.hsbctoolId || "",
            ctoolRecDate: formatDate(selectionData.ctoolReceivedDate),
            ctoolJobCat: selectionData.ctoolJobCategory || "",
            ctoolLocation: selectionData.ctoolLocation || "",
            ctoolRate: selectionData.ctoolRate || "",
            ctoolPropRate: selectionData.ctoolProposedRate || "",
            recruiterName: selectionData.recruiterName || "",
            offerReleaseStatus: selectionData.offerReleaseStatus || "",
            ltiOnboardDate: formatDate(selectionData.ltionboardingDate),
            status: taggingData.onboardingStatus?.onboardingStatus || "",
            addRemark: taggingData.onboardingStatus?.remarks || "",
            bgvStatus: taggingData.bgvStatus?.bgvStatus || "",
            bgvRemark: taggingData.bgvStatus?.remarks || "",
            tagDate: formatDate(taggingData.createDate) || "",
            techSelectDate: formatDate(selectionData.techSelectionDate) || "",
            dojRecDate: formatDate(selectionData.dojreceivedDate) || "",
            onboardingDate: formatDate(selectionData.hsbconboardingDate) || "",
            candidateStatus: taggingData.candidateStatus?.candidateStatus || "",
            candidateRemark: taggingData.candidateStatus?.remarks || "",
            candidateStatusDate: formatDate(selectionData.candidateStatusDate) || "",
          });
          setSelectedSubLobTemp(selectionData.subLob);
        })
        .catch((error) => {
          console.error("Error fetching data by VendorCandidateId:", error);
        });
    } else {
      setErrors(errors);
    }
  }, [psId, phone, isInternal, isExternal, isVendor]);

  return (
    <div className="w-full px-4 py-6">
      <h1 className="py-2 flex items-center justify-center bg-blue-300 font-bold text-lg md:text-xl">
        HSBC Updation Form
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
                    type="radio"
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
                    type="radio"
                    name="external"
                    checked={!isInternal}
                    onChange={handleChange}
                    className="p-2"
                  />
                </td>
                {/* <td className="p-2 w-full md:w-1/3">
                  <label className="font-bold">Vendor</label>
                </td>
                <td className="p-2 w-full md:w-1/3">
                  <input
                    type="checkbox"
                    name="vendor"
                    checked={isVendor}
                    onChange={handleChange}
                    className="p-2"
                  />
                </td> */}
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    PS ID:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="psId"
                    value={psId}
                    onChange={handlePsIdChange}
                    required
                    className="p-2 border rounded w-full"
                    disabled={!isInternal}
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Vendor:</label>
                </td>
                <td className="p-2 w-full md:w-1/4" colSpan="2">
                  <select
                    name="vendors"
                    value={form.vendors?.vendorId || ""}
                    onChange={handleVendorChange}
                    required
                    className={`p-2 border rounded w-full ${errors.vendorId ? "border-red-500" : ""
                      }`}
                    disabled={isInternal}
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.vendorId} value={vendor.vendorId}>
                        {vendor.vendorName}
                      </option>
                    ))}
                  </select>
                  {errors.vendorId && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.vendorId}
                    </p>
                  )}
                </td>
                {/* <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    Candidate ID:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="text"
                    name="candidateId"
                    value={candidateId}
                    onChange={handleCandidateIdChange}
                    className="p-2 border rounded w-full"
                    disabled={isInternal || isVendor}
                  />
                </td>
                <td className="p-2 w-full md:w-1/3">
                  <label className="font-semibold">
                    Vendor Candidate ID:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    name="vendorCandidateId"
                    value={form.vendorCandidateId || ""}
                    onChange={handleVendorCandidateIdChange}
                    required
                    className={`p-2 border rounded w-full ${errors.vendorCandidateId ? "border-red-500" : ""
                      }`}
                    disabled={isInternal || isExternal}
                    pattern="\d*"
                  />
                  {errors.vendorCandidateId && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.vendorCandidateId}
                    </p>
                  )}
                </td> */}
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
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    Phone Number:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4" colSpan="2">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone || ""}
                    onChange={handlePhoneChange}
                    className="p-2 border rounded w-full bg-slate-100"
                    disabled
                  />
                </td>
              </tr>

              <h4 className="bg-gray-200 font-bold px-2 py-1 mt-4">
                Selection Details
              </h4>
              <div className="overflow-x-auto">
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
                      value={form.subLob?.subLOBid || ""}
                      className="p-2 bordered w-full"
                      onChange={handleSubLobChange}
                    >
                      <option value="">Choose...</option>
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
                      HSBC Hiring Manager:
                      <span className="text-red-500">*</span>
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
                      <option value="Mayuresh Nirantar">
                        Mayuresh Nirantar
                      </option>
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
                    >
                      <option value="">Choose..</option>
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
                    >
                      <option value="">Choose..</option>
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
                    />
                    {errors.ctoolId && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.ctoolId}
                      </div>
                    )}
                  </td>
                  <td className="p-2 w-full md:w-1/4">
                    <label className="font-semibold">
                      CTOOL Received Date:
                    </label>
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
                    <label className="font-semibold">
                      CTOOL Proposed Rate:
                    </label>
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
                    <label className="font-semibold">
                      Offer Release Status:
                    </label>
                  </td>
                  <td className="p-2 w-full md:w-1/4">
                    <select
                      name="offerReleaseStatus"
                      onChange={handleChange}
                      value={form.offerReleaseStatus || ""}
                      className="p-2 border rounded w-full"
                    >
                      <option value="">Choose...</option>
                      <option value="Pending">Pending</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Released">Released</option>
                      <option value="WIP">WIP</option>
                    </select>
                  </td>
                  <td className="p-2 w-full md:w-1/4">
                    <label className="font-semibold">
                      LTI Onboarding Date:
                    </label>
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
              </div>

              <h4 className="bg-gray-200 font-bold px-2 py-1 mt-4">
                Tagging and Onboarding Details
              </h4>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    Status:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="status"
                    value={form.status || ""}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                    required
                  >
                    <option value="">Choose..</option>
                    <option value="CTool Pending">CTool Pending</option>
                    <option value="CTool Recieved">CTool Recieved</option>
                    <option value="Tagging Completed">Tagging Completed</option>
                    <option value="Tech Selection Done">
                      Tech Selection Done
                    </option>
                    <option value="DOJ Recieved">DOJ Recieved</option>
                    <option value="Onboarding Completed">
                      Onboarding Completed
                    </option>
                    <option value="Tagging Error">Tagging Error</option>
                    <option value="Rate Approval Pending">
                      Rate Approval Pending
                    </option>
                    <option value="Rate To Be Changed">
                      Rate To Be Changed
                    </option>
                    <option value="Candidate not yet joined">
                      Candidate not yet joined
                    </option>
                    <option value="Drop Out Case">Drop Out Case</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    BGV Status:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <select
                    name="bgvStatus"
                    value={form.bgvStatus || ""}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                    required
                  >
                    <option value="">Choose..</option>
                    <option value="BGV Initiated">BGV Initiated</option>
                    <option value="In progress">In progress</option>
                    <option value="Minor Discrepancy">Minor Discrepancy</option>
                    <option value="Major Discrepancy">Major Discrepancy</option>
                    <option value="Offer yet to be released">
                      Offer Yet to be Released
                    </option>
                    <option value="Interim Cleared">Interim Cleared</option>
                    <option value="BGV Completed">BGV Completed</option>
                    <option value="Pending with Employee">
                      Pending with Employee
                    </option>
                  </select>
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    Status Additional Remark:
                    <span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <textarea
                    name="addRemark"
                    value={form.addRemark || ""}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full resize-none"
                    required
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    BGV Additional Remark:
                    <span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <textarea
                    name="bgvRemark"
                    value={form.bgvRemark || ""}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full resize-none"
                    required
                  />
                </td>
              </tr>

              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    Candidate Selection Date:
                    <span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="candidateStatusDate"
                    value={form.candidateStatusDate || ""}
                    required
                    // disabled={!form.candSelectDateEnabled}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                    disabled={isInternal}
                    min={today}
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    Onboarding Date:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="onboardingDate"
                    value={form.onboardingDate || ""}
                    required
                    disabled={!form.onboardingDateEnabled}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                    min={today}
                  />
                </td>
              </tr>

              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    Tagging date:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="tagDate"
                    value={form.tagDate || ""}
                    required
                    disabled={!form.tagDateEnabled}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                    min={today}
                  />
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    Tech Selection Date:
                    <span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="techSelectDate"
                    value={form.techSelectDate || ""}
                    required
                    disabled={!form.techSelectDateEnabled}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                    min={today}
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-bold">
                    DOJ Recieved Date:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <input
                    type="date"
                    name="dojRecDate"
                    value={form.dojRecDate || ""}
                    required
                    disabled={!form.dojRecDateEnabled}
                    onChange={handleChange}
                    className="p-2 mb-2 border rounded w-full"
                    min={today}
                  />
                </td>

              </tr>
              <div className="border border-gray-300 rounded-md shadow">
                <tr className="flex flex-wrap md:flex-nowrap">
                  <td className="p-2 w-full md:w-1/4">
                    <label className="font-bold">
                      Candidate Status:<span className="text-red-500">*</span>
                    </label>
                  </td>
                  <td className="p-2 w-full md:w-1/4">
                    <select
                      name="candidateStatus"
                      value={form.candidateStatus || ""}
                      onChange={handleChange}
                      className="p-2 mb-2 border rounded w-full"
                      disabled={isInternal}
                      required
                    >
                      <option value="">Choose..</option>
                      {candidateStatuses.map((status) => (
                        <option key={status.candidateStatusId} value={status.candidateStatus}>
                          {status.candidateStatus}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 w-full md:w-1/4">
                    <label className="font-bold">
                      Candidate Additional Remark:<span className="text-red-500">*</span>
                    </label>
                  </td>
                  <td className="p-2 w-full md:w-1/4">
                    <textarea
                      name="candidateRemark"
                      value={form.candidateRemark || ""}
                      onChange={handleChange}
                      className="p-2 mb-2 border rounded w-full resize-none"
                      disabled={isInternal}
                      required
                    />
                  </td>
                </tr>
              </div>

              <tr>
                <td colSpan="4" className="p-2">
                  <div className="flex justify-center space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-10 rounded"
                    >
                      Update
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

export default UpdateDetails;
