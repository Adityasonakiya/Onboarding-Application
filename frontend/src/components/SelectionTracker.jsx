import React, { useState, useEffect, useRef } from "react";
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
  getHsbcRoles,
  //getHsbcRolesById,
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
  //const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubLobTemp, setSelectedSubLobTemp] = useState({});
  const [roles, setRoles] = useState([]); //hsbc roles
  const [searchTerm, setSearchTerm] = useState(""); // Search query for hsbc roles
  const [filteredRoles, setFilteredRoles] = useState([]); // Roles displayed after filtering
  const [showDropdown, setShowDropdown] = useState(false); // Show/Hide dropdown for hsbc roles
  const comboboxRef = useRef(null); // Reference for handling clicks outside
  const location = useLocation();
  const { state } = location;
  const { id, phoneNumber, readOnly } = state || {};

  const validateForm = () => {
    const newErrors = {};
    if (!form.lob.lobId) newErrors.lob = "This field is required.";
    if (!form.subLob.subLOBid || form.subLob.subLOBid === "0")
      newErrors.subLob = "This field is required.";
    if (!form.irm) newErrors.irm = "This field is required.";
    if (isExternal) {
      if (!form.phone) {
        newErrors.phone = "Phone number is required.";
      } else if (form.phone.length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits.";
      }
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
                vendors: { vendorId: 1 },
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
                vendors: { vendorId: id },
                phone: vendorCandidate.phoneNumber,
                fname: vendorCandidate.firstName,
                lname: vendorCandidate.lastName,
              }));
              setIsInternal(false);
              setIsExternal(false);
              setVendor(true); // Vendor applicable
              await fetchSelectionDetailsByVendorCandidateId(
                vendorCandidate.phoneNumber
              );
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
    const getRoles = async () => {
      try {
        const data = await getHsbcRoles();
        setRoles(data);
        setFilteredRoles(data);
      } catch (error) {
        console.error("There was an error fetching the Roles!", error);
      }
    };
    getRoles();
  }, []);

  // Filter roles as the user types
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue); // Update the input value
    if (searchValue.length >= 3) {
      const filtered = roles.filter((role) =>
        role.roleTitle.toLowerCase().includes(searchValue)
      );
      setFilteredRoles(filtered); // Update filtered roles
    } else {
      setFilteredRoles(roles); // Reset to all roles if fewer than 2 characters
    }
    setShowDropdown(true); // Show dropdown when typing
  };

  // Select an option and update the input
  const handleSelect = (roleTitle,ref) => {
    setSearchTerm(roleTitle); // Populate the input with the selected role
    setForm((prevForm) => ({
      ...prevForm,
      hsbcRoles: { ref: ref, roleTitle: roleTitle },
    }));
    setShowDropdown(false); // Hide dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target)
      ) {
        setShowDropdown(false); // Close dropdown if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
    if (form.vendors === "1") {
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
    return moment(startDate).isSameOrBefore(moment(endDate));
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
        bu: selectionDetails.baseBu || "BF",
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
        evidence: selectionDetails.interviewEvidence,
        hsbcRoles: selectionDetails.hsbcRoles,
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
      const selectionDetails = await getSelectionDetailsByCandidateId(phoneNumber);
      const taggingDetails = await getTaggingDetailsByPsId(phoneNumber).catch(
        (err) => {
          console.error("Error fetching tagging details:", err);
          return {}; // Fallback to an empty object
        }
      );
      setForm((prevForm) => ({
        ...prevForm,
        selectionDate: formatDate(selectionDetails.hsbcselectionDate),
        bu: selectionDetails.baseBu || "BF",
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
        evidence: selectionDetails.interviewEvidence,
        hsbcRoles: selectionDetails.hsbcRoles,
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
      const selectionDetails = await getSelectionDetailsByVendorCandidateId(phoneNumber);
      const taggingDetails = await getTaggingDetailsByVendorCandidateId(phoneNumber).catch(
        (err) => {
        console.error("Error fetching tagging details:", err);
        return {}; // Fallback to an empty object
      });
      setForm((prevForm) => ({
        ...prevForm,
        selectionDate: formatDate(selectionDetails.hsbcselectionDate),
        bu: selectionDetails.baseBu || "BF",
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
        evidence: selectionDetails.interviewEvidence,
        hsbcRoles: selectionDetails.hsbcRoles,
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
    } 
    else if (name === "phone") {
        const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (numericValue.length <= 10) {
          setForm((prevForm) => ({
            ...prevForm,
            [name]: numericValue,
          }));
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
      const errors = validate(); // Validate the form inputs
      // Additional required field validations
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
          // Validate file type and size
          const file = form.evidence;
          const validTypes = ["image/png", "image/jpeg", "application/msword"];
          if (!validTypes.includes(file.type)) {
            throw new Error(
              "Invalid file type. Only PNG, JPG, and DOC files are allowed."
            );
          }
          if (file.size > 10 * 1024 * 1024) {
            // 10MB
            throw new Error("File size exceeds the limit of 10MB.");
          }

          // Create FormData object for file upload
          const formData = new FormData();
          formData.append("files", file);

          // Upload file
          const uploadResponse = await fetch("http://localhost:8080/upload", {
            method: "POST",
            body: formData,
          });

          console.log("Upload response:", uploadResponse);

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload file.");
          }

          // Proceed with the rest of the form submission logic
          const requestBody = {
            hsbcselectionDate: form.selectionDate,
            baseBu: form.bu,
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
            interviewEvidence: form.evidence.name, // Save file name
            offerReleaseStatus: form.offerReleaseStatus,
            ltionboardingDate: form.ltiOnboardDate,
            hsbcRoles: form.hsbcRoles,
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
            console.log(isExternal, isVendor, form.vendors.vendorId);
            // Candidate logic
            const candidate = {
              phoneNumber: form.phone,
              vendorId: form.vendors.vendorId,
              firstName: form.fname,
              lastName: form.lname,
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
            console.log(isExternal, isVendor, form.vendors.vendorId);
            // Vendor logic
            const vendorCandidate = {
              phoneNumber: form.phone,
              vendor: form.vendors,
              firstName: form.fname,
              lastName: form.lname,
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
                  <label className="font-semibold">Vendor:</label>
                </td>
                <td className="p-2 w-full md:w-1/4" colSpan="2">
                  <select
                    name="vendors"
                    value={form.vendors?.vendorId || ""}
                    onChange={handleVendorChange}
                    className={`p-2 border rounded w-full ${
                      errors.vendorId ? "border-red-500" : ""
                    }`}
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
                    className={`p-2 border rounded w-full bg-slate-100 ${
                      errors.phone ? "border-red-500" : ""
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
                    className={`p-2 border rounded w-full ${
                      errors.selectionDate ? "border-red-500" : ""
                    }`}
                    disabled={readOnly}
                  />{" "}
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
                    className={`p-2 bordered w-full ${
                      errors.lob ? "border-red-500" : ""
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
                    className={`p-2 border w-full ${
                      errors.subLob ? "border-red-500" : ""
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
                    className={`p-2 border rounded w-full ${
                      errors.irm ? "border-red-500" : ""
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
                    className={`p-2 border rounded w-full ${
                      errors.ctoolRecDate ? "border-red-500" : ""
                    }`}
                    disabled={readOnly}
                  />{" "}
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
                    accept=".png,.jpg,.jpeg,.doc"
                    onChange={(e) =>
                      setForm({ ...form, evidence: e.target.files[0] })
                    }
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
                    className={`p-2 border rounded w-full ${
                      errors.ltiOnboardDate ? "border-red-500" : ""
                    }`}
                    disabled={readOnly}
                  />{" "}
                  {errors.ltiOnboardDate && (
                    <p className="text-red-500 text-sm">
                      {errors.ltiOnboardDate}
                    </p>
                  )}
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semibold">
                    HSBC Roles:<span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <div ref={comboboxRef} style={{ position: "relative"}}>
                    {/* Input field */}
                    <input
                      type="text"
                      name="hsbcRoles"
                      placeholder="Search or select a role..."
                      value={form.hsbcRoles?.roleTitle}
                      className={`p-2 border w-full ${
                        errors.hsbcRoles ? "border-red-500" : ""
                      }`}
                      disabled={isReadOnly}
                      onChange={handleSearch}
                      onFocus={() => setShowDropdown(true)} // Open dropdown on focus
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
              
                    {/* Dropdown options (conditionally rendered) */}
                    {showDropdown && filteredRoles.length > 0 && (
                      <ul
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          width: "100%",
                          maxHeight: "200px",
                          overflowY: "auto",
                          background: "#fff",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          zIndex: "1000",
                          padding: "0",
                          margin: "0",
                          listStyleType: "none",
                        }}
                      >
                        {filteredRoles.map((role) => (
                          <li
                            key={role.ref}
                            onClick={() => handleSelect(role.roleTitle,role.ref)} // Properly update input value
                            style={{
                              padding: "8px",
                              cursor: "pointer",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            {role.roleTitle}
                          </li>
                        ))}
                      </ul>
                    )}
              
                    {/* Fallback for no matches */}
                    {showDropdown && filteredRoles.length === 0 && (
                      <div
                        style={{
                          padding: "8px",
                          background: "#fff",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          marginTop: "4px",
                        }}
                      >
                        No matching roles found
                      </div>
                    )}
                  </div>

                  {errors.lob && (
                    <p className="text-red-500 text-sm">{errors.hsbcRoles}</p>
                  )}
                </td>
                <td></td>
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
