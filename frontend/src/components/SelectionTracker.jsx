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
  getAllVendors,
  getTaggingDetailsByVendorCandidateId,
  getSelectionDetailsByVendorCandidateId,
  getVendorCandidateById,
} from "../services/api";
import moment from "moment";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SelectionTracker() {
  const [form, setForm] = useState({
    bu: "BF",
    psId: "",
    lob: {},
    subLob: {},
    irm: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    lob: "",
    subLob: "",
    irm: "",
    phone: "",
  });
  const [isInternal, setIsInternal] = useState(true);
  const [isExternal, setIsExternal] = useState(false);
  const [isVendor, setVendor] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [lobs, setLobs] = useState([]);
  const [subLobs, setSubLobs] = useState([]);
  const [subLob, setSubLob] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubLobTemp, setSelectedSubLobTemp] = useState({});
  const location = useLocation();
  const { state } = location;
  const { id, phoneNumber, readOnly } = state || {};

  const validateForm = () => {
    const newErrors = {};
    if (!form.lob.lobId) newErrors.lob = "This field is required.";
    if (!form.subLob.subLOBid || form.subLob.subLOBid === "0")
      newErrors.subLob = "This field is required.";
    if (!form.irm) newErrors.irm = "This field is required.";
    if (!form.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (form.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      if (id || phoneNumber) {
        try {
          if (id && id >= 100) {
            // Internal candidate
            const employee = await getEmployeeByPsid(id);
            if (employee) {
              setForm((prevForm) => ({
                ...prevForm,
                psId: employee.psid,
                fname: employee.firstName,
                lname: employee.lastName,
                phone: employee.phoneNumber,
              }));
              setIsInternal(true);
              setIsExternal(false);
              setVendor(false);
              await fetchSelectionDetailsByPsid(employee.psid);
            }
          } else if (id === 1) {
            // External candidate
            const candidate = await getCandidateById(phoneNumber);
            if (candidate) {
              setForm((prevForm) => ({
                ...prevForm,
                vendors:{vendorId:1},
                phone: candidate.phoneNumber,
                fname: candidate.firstName,
                lname: candidate.lastName,
              }));
              setIsInternal(false);
              setIsExternal(true);
              setVendor(false); // Vendor not applicable
              await fetchSelectionDetailsByCandidateId(candidate.phoneNumber);
            }
          } else if (id && id < 100 && id !== 1) {
            // Vendor candidate
            const vendorCandidate = await getVendorCandidateById(phoneNumber);
            if (vendorCandidate) {
              setForm((prevForm) => ({
                ...prevForm,
                vendors:{vendorId:id},
                phone: vendorCandidate.phoneNumber,
                fname: vendorCandidate.firstName,
                lname: vendorCandidate.lastName,
              }));
              setIsInternal(false);
              setIsExternal(false);
              setVendor(true); // Vendor applicable
              await fetchSelectionDetailsByVendorCandidateId(vendorCandidate.phoneNumber);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [id, phoneNumber]);

  useEffect(() => {
    if (form.psId) {
      fetchEmployeeData(form.psId);
      fetchSelectionDetailsByPsid(form.psId);
    }
  }, [form.psId]);

  useEffect(() => {
    if (form.phoneNumber && form.vendors === 1) {
      fetchCandidateData(form.phoneNumber);
      fetchSelectionDetailsByCandidateId(form.phoneNumber);
    }
  }, [form.phoneNumber]);

  useEffect(() => {
    if (form.vendors !== 1) {
      setVendor(true);
    }
  });
  useEffect(() => {
    if (isVendor) {
      fetchVendorData(form.phoneNumber);
      fetchSelectionDetailsByVendorCandidateId(form.phoneNumber);
    }
  }, [form.phoneNumber]);

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
    const { value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      lob: { lobId: value },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      lob: value ? "" : "This field is required.",
    }));

    setSelectedSubLobTemp({});
    const lobId = event.target.value;
    console.log("LOB: ", lobId);
    try {
      const data = await fetchSubLobs(lobId);
      setSubLobs(data);
    } catch (error) {
      console.error("There was an error fetching the SubLOBs!", error);
    }
  };

  const handleSubLobChange = async (event) => {
    const { value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      subLob: { subLOBid: value },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      subLob: value && value !== "0" ? "" : "This field is required.",
    }));
    const subLobId = event.target.value;
    console.log("subLOB: ", subLobId);
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
    console.log(form.vendors);
    if (form.vendors === '1') {
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
        baseBU: "BF",
        phone: employee.phoneNumber,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCandidateData = async (phoneNumber) => {
    try {
      const candidate = await getCandidateById(phoneNumber);
      setForm((prevForm) => ({
        ...prevForm,
        vendors: { vendorId: 1 },
        phone: candidate.phoneNumber,
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
  const fetchVendorData = async (phoneNumber) => {
    try {
      const vendorCandidate = await getVendorCandidateById(phoneNumber);
      setForm((prevForm) => ({
        ...prevForm,
        vendors: vendorCandidate.vendor,
        phone: vendorCandidate.phoneNumber,
        fname: vendorCandidate.firstName,
        lname: vendorCandidate.lastName,
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
    if (!date) return null;
    return moment(date).format("YYYY-MM-DD");
  };

  const isValidDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return false; // Return false if either date is missing
    return moment(startDate).isBefore(moment(endDate));
  };

  const validateDates = (selectionDate, ctoolRecDate, ltiOnboardDate) => {
    const errors = {};

    if (
      ltiOnboardDate &&
      selectionDate &&
      !isValidDateRange(ltiOnboardDate, selectionDate)
    ) {
      errors.ltiOnboardDate =
        "LTI Onboarding Date must be before Selection Date";
    }

    if (
      selectionDate &&
      ctoolRecDate &&
      !isValidDateRange(selectionDate, ctoolRecDate)
    ) {
      errors.selectionDate =
        "Selection Date must be before CTool Received Date";
    }

    return errors;
  };

  const fetchSelectionDetailsByPsid = async (psid) => {
    try {
      const selectionDetails = await getSelectionDetailsByPsId(psid);
      const taggingDetails = await getTaggingDetailsByPsId(psid).catch(
        (err) => {
          console.error("Error fetching tagging details:", err);
          return {}; // Fallback to an empty object
        }
      );

      const selectionDate = formatDate(selectionDetails.hsbcselectionDate);
      const ctoolRecDate = formatDate(selectionDetails.ctoolReceivedDate);
      const ltiOnboardDate = formatDate(selectionDetails.ltionboardingDate);

      console.log("Selection Date:", selectionDate);
      console.log("CTool Received Date:", ctoolRecDate);
      console.log("LTI Onboarding Date:", ltiOnboardDate);

      const errors = validateDates(selectionDate, ctoolRecDate, ltiOnboardDate);

      if (Object.keys(errors).length > 0) {
        console.error("Validation errors:", errors);
        alert(Object.values(errors).join("\n"));
        return; // Exit function if validation fails
      }

      setForm((prevForm) => ({
        ...prevForm,
        selectionDate: selectionDate,
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
        ctoolRecDate: ctoolRecDate,
        ctoolJobCat: selectionDetails.ctoolJobCategory,
        ctoolLocation: selectionDetails.ctoolLocation,
        ctoolRate: selectionDetails.ctoolRate,
        ctoolPropRate: selectionDetails.ctoolProposedRate,
        recruiterName: selectionDetails.recruiterName,
        offerReleaseStatus: selectionDetails.offerReleaseStatus,
        ltiOnboardDate: ltiOnboardDate,
      }));

      setSelectedSubLobTemp(selectionDetails.subLob);

      if (
        !readOnly &&
        taggingDetails.onboardingStatus.onboardingStatus !==
        "Onboarding Completed"
      ) {
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

  const fetchSelectionDetailsByCandidateId = async (phoneNumber) => {
    try {
      const selectionDetails = await getSelectionDetailsByCandidateId(
        phoneNumber
      );
      const taggingDetails = await getTaggingDetailsByPsId(phoneNumber).catch(
        (err) => {
          console.error("Error fetching tagging details:", err);
          return {}; // Fallback to an empty object
        }
      );
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
      if (
        !readOnly ||
        taggingDetails.onboardingStatus.onboardingStatus !==
        "Onboarding Completed"
      ) {
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

  const fetchSelectionDetailsByVendorCandidateId = async (phoneNumber) => {
    try {
      const selectionDetails = await getSelectionDetailsByVendorCandidateId(
        phoneNumber
      );
      const taggingDetails = await getTaggingDetailsByVendorCandidateId(
        phoneNumber
      ).catch((err) => {
        console.error("Error fetching tagging details:", err);
        return {}; // Fallback to an empty object
      });
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
      if (
        !readOnly ||
        taggingDetails.onboardingStatus.onboardingStatus !==
        "Onboarding Completed"
      ) {
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
    if (type === "radio") {
      setIsInternal(name === "internal" ? checked : !checked);
      setIsExternal(name === "external" ? checked : !checked);
      //setVendor(name === "vendor" ? checked : !checked);
    } else if (name === "phone") {
      if (name === "phone") {
        const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (numericValue.length <= 10) {
          setForm((prevForm) => ({
            ...prevForm,
            [name]: numericValue,
          }));
        }
      }

      // Clear errors if the input is valid
      if (name === "phone" && value.length === 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "",
        }));
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value ? "" : "This field is required.",
      }));
    }
  };

  //for submit
  const handleResponse = async (response, requestBody) => {
    if (response.ok) {
      toast.success("Details updated successfully!", {
        position: "top-right",
      });
      localStorage.setItem("selectionDetails", JSON.stringify(requestBody));
      setTimeout(() => {
        navigate("/landing-page");
      }, 2000);
    } else {
      const errorData = await response.json();
      setErrors({ submit: errorData.message });
      toast.error(`Error adding details: ${errorData.message}`, {
        position: "top-right",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const errors = validate(); // Validate the form inputs // Additional required field validations
      if (!form.lob || !form.lob.lobId) {
        errors.lob = "LOB is required";
      }
      if (!form.subLob || !form.subLob.subLOBid) {
        errors.subLob = "Sub LOB is required";
      }
      if (!form.irm) {
        errors.irm = "IRM is required";
      }
      if (!form.head) {
        errors.head = "HSBC Head is required";
      }
      if (!form.deliveryManager) {
        errors.deliveryManager = "Delivery Manager is required";
      }

      const dateErrors = validateDates(
        form.selectionDate,
        form.ctoolRecDate,
        form.ltiOnboardDate
      ); // Validate the dates

      if (
        Object.keys(errors).length === 0 &&
        Object.keys(dateErrors).length === 0
      ) {
        try {
          // Common request body for selection details
          const requestBody = {
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
          };

          if (form.psId) {
            // Employee logic
            requestBody.employee = { psid: form.psId };

            const response = await fetch(
              "http://localhost:8080/selection-details/create/employee",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
              }
            );

            await handleResponse(response, requestBody);
          } else if (isExternal && form.vendors.vendorId === 1) {
            console.log(isExternal,isVendor, form.vendors.vendorId);
            // Candidate logic
            const candidate = {
              phoneNumber: form.phone,
              vendorId: form.vendors.vendorId,
              firstName: form.fname,
              lastName: form.lname,
              baseBU: "BF",
            };

            console.log("Candidate Payload:", candidate); // Step 1: Create vendor candidate

            const candidateResponse = await fetch(
              "http://localhost:8080/candidates/create",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(candidate), // JSON payload for VendorCandidate
              }
            );

            console.log("Candidate Response:", candidateResponse);

            if (!candidateResponse.ok) {
              const errorData = await candidateResponse.json();
              console.error("Vendor creation failed:", errorData.message);
              toast.error("Failed to create Candidate!", {
                position: "top-right",
              });
              return; // Stop execution if vendor creation fails
            } // Step 3
            const candidateData = await candidateResponse.json(); // Ensure JSON parsing
            console.log("Saved Candidate:", candidateData);

            requestBody.candidate = {
              phoneNumber: form.phone,
              candidateId: candidateData.candidateId, // Extract newly generated ID
            };
            console.log(requestBody);
            const response = await fetch(
              "http://localhost:8080/selection-details/create/candidate",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
              }
            );

            await handleResponse(response, requestBody);
          } else if (isVendor && form.vendors.vendorId !== 1) {
            console.log(isExternal,isVendor, form.vendors.vendorId);
            // Vendor logic
            const vendorCandidate = {
              phoneNumber: form.phone,
              vendor: form.vendors,
              firstName: form.fname,
              lastName: form.lname,
              baseBU: "BF",
            };

            console.log("VendorCandidate Payload:", vendorCandidate); // Step 1: Create vendor candidate

            const vendorResponse = await fetch(
              "http://localhost:8080/vendors/vendor-candidates/create",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(vendorCandidate), // JSON payload for VendorCandidate
              }
            );

            console.log("Vendor Response:", vendorResponse);

            if (!vendorResponse.ok) {
              const errorData = await vendorResponse.json();
              console.error("Vendor creation failed:", errorData.message);
              toast.error("Failed to create Vendor Candidate!", {
                position: "top-right",
              });
              return; // Stop execution if vendor creation fails
            } // Step 2: Attach vendorCandidate reference to requestBody for selection details
            const vendorData = await vendorResponse.json(); // Ensure JSON parsing
            console.log("Saved VendorCandidate:", vendorData);

            requestBody.vendorCandidate = {
              phoneNumber: form.phone,
              vendorCandidateId: vendorData.vendorCandidateId, // Extract newly generated ID
            };
            console.log("Request Body for Selection Details:", requestBody); // Post selection details

            const response = await fetch(
              "http://localhost:8080/selection-details/create/vendor",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody), // JSON payload for selection details
              }
            );

            console.log("Selection Details Response:", response); // Handle response

            await handleResponse(response, requestBody);
          }
        } catch (error) {
          // Generic error handling
          console.error("An error occurred:", error.message);
          setErrors({ submit: "An error occurred while submitting the form." });
          toast.error("Error adding details!", { position: "top-right" });
        }
      } else {
        // Validation errors
        setErrors({ ...errors, ...dateErrors });
        toast.error("Please fix the errors before submitting!", {
          position: "top-right",
        });
      }
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
                    type="radio"
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
                    type="radio"
                    name="external"
                    checked={!isInternal && isExternal}
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
                    className={`p-2 border rounded w-full ${errors.psId ? "border-red-500" : ""}`}
                    disabled={!isInternal || readOnly}
                    pattern="\d*"
                  />
                  {errors.psId && (
                    <p className="text-red-500 text-sm mb-4">{errors.psId}</p>
                  )}
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">Vendor:</label>
                </td>
                <td className="p-2 w-full md:w-1/4" colSpan="2">
                  {/* {isExternal && !isVendor ? (
                    <input
                      type="text"
                      value="Not Applicable"
                      className="p-2 border rounded w-full bg-gray-100"
                      disabled
                    />
                  ) : ( */}
                    <select
                      name="vendors"
                      value={form.vendors?.vendorId || ""}
                      onChange={handleVendorChange}
                      className={`p-2 border rounded w-full ${errors.vendorId ? "border-red-500" : ""}`}
                      disabled={isInternal || readOnly}
                    >
                      <option value="">Select Vendor</option>
                      {vendors.map((vendor) => (
                        <option key={vendor.vendorId} value={vendor.vendorId}>
                          {vendor.vendorName}
                        </option>
                      ))}
                    </select>
                  {/* )} */}
                  {errors.vendorId && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.vendorId}
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
                    disabled={isInternal || readOnly}
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
                    disabled={isInternal || readOnly}
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
                    onChange={handleChange}
                    className={`p-2 border rounded w-full bg-slate-100 ${errors.phone ? "border-red-500" : ""
                      }`}
                    disabled={isInternal || readOnly}
                    maxLength="10"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
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
              <tr className="flex flex-wrap md:flex-nowrap items-center">
                <td className="p-2 w-full md:w-1/4 flex items-center">
                  <label className="font-semibold">
                    Selection Date:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  {" "}
                  <input
                    type="date"
                    name="selectionDate"
                    required
                    value={form.selectionDate || ""}
                    onChange={handleChange}
                    className={`p-2 border rounded w-full ${errors.selectionDate ? "border-red-500" : ""
                      }`}
                    disabled={readOnly}
                  />
                  {" "}
                  {errors.selectionDate && (
                    <p className="text-red-500 text-sm">
                      {errors.selectionDate}
                    </p>
                  )}
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
                    className={`p-2 bordered w-full ${errors.lob ? "border-red-500" : ""
                      }`}
                    disabled={isReadOnly}
                    required
                  >
                    <option value="">Choose...</option>
                    {lobs.map((lob) => (
                      <option key={lob.lobId} value={lob.lobId}>
                        {lob.lobName}
                      </option>
                    ))}
                  </select>
                  {errors.lob && (
                    <p className="text-red-500 text-sm">{errors.lob}</p>
                  )}
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
                    className={`p-2 bordered w-full ${errors.subLob ? "border-red-500" : ""
                      }`}
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
                  {errors.subLob && (
                    <p className="text-red-500 text-sm">{errors.subLob}</p>
                  )}
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
                    className={`p-2 border rounded w-full ${errors.irm ? "border-red-500" : ""
                      }`}
                    disabled={isReadOnly}
                  />
                  {errors.irm && (
                    <p className="text-red-500 text-sm">{errors.irm}</p>
                  )}
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
                <td className="p-2 w-full md:w-1/4 items-center">
                  <label className="font-semibold">CTOOL Received Date:</label>
                </td>
                <td className="p-2 w-full md:w-1/4 flex items-center">
                  {" "}
                  <input
                    type="date"
                    name="ctoolRecDate"
                    required
                    value={form.ctoolRecDate || ""}
                    onChange={handleChange}
                    className={`p-2 border rounded w-full ${errors.ctoolRecDate ? "border-red-500" : ""
                      }`}
                    disabled={readOnly}
                  />
                  {" "}
                  {errors.ctoolRecDate && (
                    <p className="text-red-500 text-sm">
                      {errors.ctoolRecDate}
                    </p>
                  )}
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
                    <option value="Release">Released</option>
                    <option value="WIP">WIP</option>
                  </select>
                </td>
                <td className="p-2 w-full md:w-1/4 items-center">
                  <label className="font-semibold">LTI Onboarding Date:</label>
                </td>
                <td className="p-2 w-full md:w-1/4 flex items-center">
                  {" "}
                  <input
                    type="date"
                    name="ltiOnboardDate"
                    required
                    value={form.ltiOnboardDate || ""}
                    onChange={handleChange}
                    className={`p-2 border rounded w-full ${errors.ltiOnboardDate ? "border-red-500" : ""
                      }`}
                    disabled={readOnly}
                  />
                  {" "}
                  {errors.ltiOnboardDate && (
                    <p className="text-red-500 text-sm">
                      {errors.ltiOnboardDate}
                    </p>
                  )}
                </td>
              </tr>
              {!isReadOnly && (
                <tr>
                  <td colSpan="4" className="p-2">
                    <div className="flex justify-center space-x-4">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-2 px-10 rounded"
                        disabled={form.invalid}
                      // disabled={isSubmitting}
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
