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
  const [irmName, setIrmName] = useState("");

  const handleIrmChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "irm" && value.trim().length > 7) {
      try {
        const data = await getEmployeeByPsid(value.trim());
        const fullName = [data.firstName, data.middleName, data.lastName]
          .filter(Boolean)
          .join(" ");

        setIrmName(fullName); // assuming API returns { name: "Aditya Sonakiya" }
      } catch (error) {
        setIrmName(""); // clear if not found or error
        console.error("Error fetching employee:", error);
      }
    }
  };

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
  const handleSelect = (roleTitle, ref, grade) => {
    setSearchTerm(roleTitle); // Populate the input with the selected role
    setForm((prevForm) => ({
      ...prevForm,
      hsbcRoles: { ref: ref, roleTitle: roleTitle },
      ctoolGrade: grade,
    }));
    setShowDropdown(false); // Hide dropdown after selection
  };

  const handleCancel = () => {
    navigate("/landing-page");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setShowDropdown(false); // Close dropdown if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    // Find the full LOB object from the lobs array
    const selectedLob = lobs.find((lob) => lob.lobId === Number(value));

    setForm((prevForm) => ({
      ...prevForm,
      lob: selectedLob ? selectedLob : { lobId: value },
      head: selectedLob?.hsbchead || "",
      deliveryManager: selectedLob?.deliveryManager || "",
      salespoc: selectedLob?.salesPOC || "",
    }));
    if (selectedLob) {
      console.log(
        selectedLob.hsbchead,
        selectedLob.deliveryManager,
        selectedLob.salesPOC
      );
    } else {
      console.log("No LOB selected or LOB not found.");
    }
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
        selectionDate: formatDate(selectionDetails.hsbcselectionDate),
        bu: selectionDetails.baseBu || "BF",
        lob: selectionDetails.lob,
        subLob: selectionDetails.sublob,
        hiringManager: selectionDetails.hsbchiringManager,
        head: selectionDetails.hsbchead || selectionDetails.lob?.hsbchead,
        deliveryManager:
          selectionDetails.deliveryManager ||
          selectionDetails.lob?.deliveryManager,
        salespoc: selectionDetails.salesPOC || selectionDetails.lob?.salesPOC,
        pricingModel: selectionDetails.pricingModel,
        irm: selectionDetails.irm,
        ctoolId: selectionDetails.hsbctoolId,
        ctoolRecDate: formatDate(selectionDetails.ctoolReceivedDate),
        ctoolLocation: selectionDetails.ctoolLocation,
        hsbcRoles: selectionDetails.hsbcRoles || "",
        ctoolGrade: selectionDetails.hsbcRoles?.grade || "",
        ctoolTaggingRate: selectionDetails.ctoolTaggingRate,
        proposedRate: selectionDetails.ctoolProposedRate,
        recruiterName: selectionDetails.recruiterName,
        offerReleaseStatus: selectionDetails.offerReleaseStatus,
        ltiOnboardDate: formatDate(selectionDetails.ltionboardingDate),
      }));
      setSearchTerm(selectionDetails.hsbcRoles?.roleTitle || "");
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
        bu: selectionDetails.baseBu || "BF",
        lob: selectionDetails.lob,
        subLob: selectionDetails.sublob,
        hiringManager: selectionDetails.hsbchiringManager,
        head: selectionDetails.hsbchead || selectionDetails.lob?.hsbchead,
        deliveryManager:
          selectionDetails.deliveryManager ||
          selectionDetails.lob?.deliveryManager,
        salespoc: selectionDetails.salesPOC || selectionDetails.lob?.salesPOC,
        pricingModel: selectionDetails.pricingModel,
        irm: selectionDetails.irm,
        ctoolId: selectionDetails.hsbctoolId,
        ctoolRecDate: formatDate(selectionDetails.ctoolReceivedDate),
        ctoolLocation: selectionDetails.ctoolLocation,
        hsbcRoles: selectionDetails.hsbcRoles || "",
        ctoolGrade: selectionDetails.hsbcRoles?.grade || "",
        ctoolTaggingRate: selectionDetails.ctoolTaggingRate,
        proposedRate: selectionDetails.ctoolProposedRate,
        recruiterName: selectionDetails.recruiterName,
        offerReleaseStatus: selectionDetails.offerReleaseStatus,
        ltiOnboardDate: formatDate(selectionDetails.ltionboardingDate),
      }));
      setSearchTerm(selectionDetails.hsbcRoles?.roleTitle || "");
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
        bu: selectionDetails.baseBu || "BF",
        lob: selectionDetails.lob,
        subLob: selectionDetails.sublob,
        hiringManager: selectionDetails.hsbchiringManager,
        head: selectionDetails.hsbchead || selectionDetails.lob?.hsbchead,
        deliveryManager:
          selectionDetails.deliveryManager ||
          selectionDetails.lob?.deliveryManager,
        salespoc: selectionDetails.salesPOC || selectionDetails.lob?.salesPOC,
        pricingModel: selectionDetails.pricingModel,
        irm: selectionDetails.irm,
        ctoolId: selectionDetails.hsbctoolId,
        ctoolRecDate: formatDate(selectionDetails.ctoolReceivedDate),
        ctoolLocation: selectionDetails.ctoolLocation,
        hsbcRoles: selectionDetails.hsbcRoles || "",
        ctoolGrade: selectionDetails.hsbcRoles?.grade || "",
        ctoolTaggingRate: selectionDetails.ctoolTaggingRate,
        proposedRate: selectionDetails.ctoolProposedRate,
        recruiterName: selectionDetails.recruiterName,
        offerReleaseStatus: selectionDetails.offerReleaseStatus,
        ltiOnboardDate: formatDate(selectionDetails.ltionboardingDate),
      }));
      setSearchTerm(selectionDetails.hsbcRoles?.roleTitle || "");
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
  const refetchForm = (type) => {
    if (type === "internal") {
      setIsInternal(true);
      setIsExternal(false);
      setForm({
        internalPsid: "",
        externalPsid: "",
        phone: "",
        // reset other fields if needed
      });
    } else if (type === "external") {
      setIsInternal(false);
      setIsExternal(true);
      setForm({
        internalPsid: "",
        externalPsid: "",
        phone: "",
        // reset other fields if needed
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio") {
      setIsInternal(name === "internal" ? checked : !checked);
      setIsExternal(name === "external" ? checked : !checked);
    } else if (name === "phone") {
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
            hsbcRoles: form.hsbcRoles,
            ctoolLocation: form.ctoolLocation,
            ctoolGrade: form.ctoolGrade,
            ctoolTaggingRate: form.ctoolTaggingRate,
            ctoolProposedRate: form.proposedRate,
            recruiterName: form.recruiterName,
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
    <div className="max-w-10xl mx-auto bg-white shadow-lg rounded-lg p-4">
      <h1 className="text-2xl font-bold text-left text-black mb-6">
        HSBC Selection Tracker Form
      </h1>
      <form onSubmit={handleSubmit}>
        <h4 className="text-base font-bold text-black-700 border-b pb-2 mb-5 mt-6">
          Employee Type
        </h4>
        <div className="overflow-x-auto -mt-2">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/8" colSpan={2}>
                  <label className="font-semobold">Internal</label>
                </td>
                <td className="p-2 w-full md:w-1/8">
                  <input
                    type="radio"
                    name="psidType"
                    value="internal"
                    checked={isInternal}
                    onChange={() => refetchForm("internal")}
                    className="p-2"
                    disabled={isReadOnly}
                  />
                </td>
                <td className="p-2 w-full md:w-1/8">
                  <label className="font-semobold">External</label>
                </td>
                <td className="p-2 w-full md:w-1/8">
                  <input
                    type="radio"
                    name="psidType"
                    value="external"
                    checked={!isInternal}
                    onChange={() => refetchForm("external")}
                    className="p-2"
                    disabled={isReadOnly}
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap md:flex-nowrap ">
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semobold">
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
                    className={`p-2 border rounded w-full ${errors.psId ? "border-red-500" : ""
                      }`}
                    disabled={!isInternal || readOnly}
                    pattern="\d*"
                  />
                  {errors.psId && (
                    <p className="text-red-500 text-sm mb-4">{errors.psId}</p>
                  )}
                </td>
                <td className="p-2 w-full md:w-1/4">
                  <label className="font-semobold" htmlFor="vendor-select">
                    Vendor:
                  </label>
                </td>
                <td className="p-2 w-full md:w-1/4" colSpan="2">
                  <select
                    name="vendors"
                    id="vendor-select"
                    value={form.vendors?.vendorId || ""}
                    onChange={handleVendorChange}
                    className={`p-2 border rounded w-full ${errors.vendorId ? "border-red-500" : ""
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
              <h4 className="text-lg font-bold px-2 py-1 mt-4">Basic Info</h4>
              <div className="flex flex-wrap md:flex-nowrap">
                <div className="p-2 w-full md:w-1/4">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="fname"
                    value={form.fname || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isInternal || readOnly}
                  />
                </div>
                <div className="p-2 w-full md:w-1/4">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lname"
                    value={form.lname || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isInternal || readOnly}
                  />
                </div>
                <div className="p-2 w-full md:w-1/4">
                  <label>Grade:</label>
                  <input
                    type="text"
                    name="grade"
                    value={form.grade || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled
                  />
                </div>
                <div className="p-2 w-full md:w-1/4">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled
                  />
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap">
                <div className="p-2 w-full md:w-1/4">
                  <label>PU:</label>
                  <input
                    type="text"
                    name="pu"
                    value={form.pu || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled
                  />
                </div>
                <div className="p-2 w-full md:w-1/4">
                  <label>Total Exp:</label>
                  <input
                    type="number"
                    name="totalExp"
                    value={form.tot || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled
                  />
                </div>
                <div className="p-2 w-full md:w-1/4">
                  <label>Skill:</label>
                  <input
                    type="text"
                    name="skill"
                    value={form.skill || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled
                  />
                </div>
                <div className="p-2 w-full md:w-1/4">
                  <label>Mail ID:</label>
                  <input
                    type="text"
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled
                  />
                </div>
              </div>
              <div className="flex-wrap md:flex-nowrap">
                <div className="p-2 w-full md:w-1/4">
                  <label>
                    Phone Number:
                    <span className="text-red-500" hidden={isInternal}>
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleChange}
                    className={`p-2 border rounded w-full ${errors.phone ? "border-red-500" : ""
                      }`}
                    disabled={isInternal || readOnly}
                    maxLength="10"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>
            </tbody>
          </table>
        </div>
        <h4 className="font-bold px-2 py-1 mt-4">
          Selection Details
        </h4>
        <div className="overflow-x-auto max-h-[600px] pb-24">
          <table className="w-full border-collapse">
            <tbody>
              <div className="flex flex-wrap md:flex-nowrap items-center">
                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="selectionDate">Selection Date:</label>
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
                  {errors.selectionDate && (
                    <p className="text-red-500 text-sm">{errors.selectionDate}</p>
                  )}
                </div>

                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="bu">Base BU:</label>
                  <input
                    type="text"
                    name="bu"
                    value={form.bu || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="lob-select">
                    LOB:<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.lob?.lobId || ""}
                    onChange={handleLobChange}
                    name="lob"
                    id="lob-select"
                    className={`p-2 border rounded w-full ${errors.lob ? "border-red-500" : ""
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
                  {errors.lob && <p className="text-red-500 text-sm">{errors.lob}</p>}
                </div>

                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="sub-lob-select">
                    Sub LOB:<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subLob"
                    id="sub-lob-select"
                    value={form.subLob?.subLOBid || ""}
                    className={`p-2 border rounded w-full ${errors.subLob ? "border-red-500" : ""
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
                  {errors.subLob && <p className="text-red-500 text-sm">{errors.subLob}</p>}
                </div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap">
                {/* HSBC Hiring Manager */}
                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="hiringManager">
                    HSBC Hiring Manager:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hiringManager"
                    required
                    value={form.hiringManager || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </div>

                {/* HSBC Head */}
                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="head">
                    HSBC Head:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="head"
                    required
                    value={form.head || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </div>

                {/* Delivery Manager */}
                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="deliveryManager">
                    Delivery Manager:<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="deliveryManager"
                    value={form.deliveryManager || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  >
                    <option value="0">Choose..</option>
                    <option value="Abhijeet Sureshchandra More">Abhijeet Sureshchandra More</option>
                    <option value="Aniruddha Deshpande">Aniruddha Deshpande</option>
                    <option value="Arvind Deogade">Arvind Deogade</option>
                    <option value="Chinni Krishna Nakka">Chinni Krishna Nakka</option>
                    <option value="Mayuresh Nirantar">Mayuresh Nirantar</option>
                    <option value="Rupali Khedekar">Rupali Khedekar</option>
                    <option value="Saber Sarode">Saber Sarode</option>
                    <option value="Sachin Shaha">Sachin Shaha</option>
                  </select>
                </div>

                {/* Sales POC */}
                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="salespoc">Sales POC:</label>
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
                    <option value="Rajiv Lakhanpal">Rajiv Lakhanpal</option>
                    <option value="Kinshuk Awasthi">Kinshuk Awasthi</option>
                    <option value="Ajay Pillai">Ajay Pillai</option>
                  </select>
                </div>
              </div>

              <tr className="flex flex-wrap md:flex-nowrap">
                {/* Pricing Model */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="pricingModel">Pricing Model:</label>
                  <select
                    name="pricingModel"
                    value={form.pricingModel || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  >
                    <option value="0">Choose..</option>
                    <option value="Time & Material">Time & Material</option>
                    <option value="Fixed Price">Fixed Price</option>
                    <option value="Buffer">Buffer</option>
                  </select>
                </td>

                {/* IRM */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="irm">
                    IRM:<span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="irm"
                      value={
                        irmName && form.irm ? `${form.irm} (${irmName})` : form.irm || ""
                      }
                      onChange={handleIrmChange}
                      className={`p-2 border rounded w-full pr-10 ${errors.irm ? "border-red-500" : ""
                        }`}
                      disabled={isReadOnly}
                    />
                    {/* Clear button */}
                    {irmName && (
                      <button
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, irm: "" }));
                          setIrmName("");
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  {errors.irm && (
                    <p className="text-red-500 text-sm">{errors.irm}</p>
                  )}
                </td>

                {/* HSBC CTOOL ID */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="ctoolId">HSBC CTOOL ID:</label>
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

                {/* CTOOL Received Date */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="ctoolRecDate">CTOOL Received Date:</label>
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
                  {errors.ctoolRecDate && (
                    <p className="text-red-500 text-sm">
                      {errors.ctoolRecDate}
                    </p>
                  )}
                </td>
              </tr>

              <tr className="flex flex-wrap md:flex-nowrap">
                {/* HSBC Roles */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="hsbcRoles">HSBC Roles:</label>
                  <div ref={comboboxRef} className="relative w-full">
                    <input
                      type="text"
                      name="hsbcRoles"
                      placeholder="Search or select a role..."
                      value={searchTerm}
                      className={`p-2 border rounded w-full ${errors.hsbcRoles ? "border-red-500" : ""}`}
                      disabled={isReadOnly}
                      onChange={handleSearch}
                      onFocus={() => setShowDropdown(true)}
                    />
                    {/* Dropdown options */}
                    {showDropdown && filteredRoles.length > 0 && (
                      <ul className="absolute top-full left-0 w-full max-h-52 overflow-y-auto bg-white border border-gray-300 rounded z-10">
                        {filteredRoles.map((role) => (
                          <li
                            key={role.ref}
                            onClick={() => handleSelect(role.roleTitle, role.ref, role.grade)}
                            className="px-2 py-1 cursor-pointer hover:bg-gray-100 border-b border-gray-100"
                          >
                            {role.roleTitle}
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* No matches fallback */}
                    {showDropdown && filteredRoles.length === 0 && (
                      <div className="mt-1 p-2 bg-white border border-gray-300 rounded">
                        No matching roles found
                      </div>
                    )}
                  </div>
                  {errors.hsbcRoles && (
                    <p className="text-red-500 text-sm">{errors.hsbcRoles}</p>
                  )}
                </td>

                {/* CTOOL Location */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="ctoolLocation">CTOOL Location:</label>
                  <input
                    type="text"
                    name="ctoolLocation"
                    value={form.ctoolLocation || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </td>

                {/* CTOOL Grade */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="ctoolGrade">CTOOL Grade:</label>
                  <input
                    type="number"
                    name="ctoolGrade"
                    value={form.ctoolGrade || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </td>

                {/* CTOOL Tagging Rate */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="ctoolTaggingRate">CTOOL Tagging Rate:</label>
                  <input
                    type="number"
                    name="ctoolTaggingRate"
                    value={form.ctoolTaggingRate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </td>
              </tr>

              <tr className="flex flex-wrap md:flex-nowrap">
                {/* Recruiter Name */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="recruiterName">Recruiter Name:</label>
                  <input
                    type="text"
                    name="recruiterName"
                    value={form.recruiterName || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </td>

                {/* Proposed Rate */}
                <td className="p-2 w-full md:w-1/4">
                  <label htmlFor="proposedRate">Proposed Rate:</label>
                  <input
                    type="number"
                    name="proposedRate"
                    value={form.proposedRate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    disabled={isReadOnly}
                  />
                </td>
              </tr>
              {!isReadOnly && (
                <tr>
                  <td colSpan="4" className="p-2">
                    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50 p-4 pl-16 flex justify-start space-x-4 shadow-md">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-900 text-white py-2 px-10 rounded hover:bg-gray-500"
                        disabled={form.invalid}
                      // disabled={isSubmitting}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="text-blue-900 border border-blue-900 bg-transparent py-2 px-10 rounded hover:bg-gray-500"
                        onClick={handleCancel}
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
