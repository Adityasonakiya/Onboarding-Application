import React, { useState, useEffect, useRef } from "react";
import { FaEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaDownload } from "react-icons/fa6";
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
  getHsbcRoles,
  getEvidenceBySelectionId,
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
  const [roles, setRoles] = useState([]); //hsbc roles
  const [searchTerm, setSearchTerm] = useState(""); // Search query for hsbc roles
  const [filteredRoles, setFilteredRoles] = useState([]); // Roles displayed after filtering
  const [showDropdown, setShowDropdown] = useState(false); // Show/Hide dropdown for hsbc roles
  const comboboxRef = useRef(null); // Reference for handling clicks outside
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const id = state?.id;
  const phoneNumber = state?.phoneNumber;
  const today = new Date().toISOString().split("T")[0];
  const [candidateStatuses, setCandidateStatuses] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [selectionId, setSelectionId] = useState(null);
  const [irmName, setIrmName] = useState("");

  const handleIrmChange = async (e) => {
    const inputValue = e.target.value;
    const psid = inputValue.split(" ")[0];
    setForm((prev) => ({ ...prev, irm: psid }));

    if (psid.trim().length > 7) {
      try {
        const data = await getEmployeeByPsid(psid.trim());
        const fullName = [data.firstName, data.middleName, data.lastName]
          .filter(Boolean)
          .join(" ");
        setIrmName(fullName);
      } catch (error) {
        setIrmName("");
        console.error("Error fetching employee:", error);
      }
    } else {
      setIrmName("");
    }
  };

  useEffect(() => {
    const fetchIrmName = async () => {
      if (form.irm && form.irm.trim().length > 7) {
        try {
          const data = await getEmployeeByPsid(form.irm);
          const fullName = [data.firstName, data.middleName, data.lastName]
            .filter(Boolean)
            .join(" ");
          setIrmName(fullName);
        } catch (error) {
          console.error("Failed to fetch IRM name on load:", error);
        }
      }
    };

    fetchIrmName();
  }, [form.irm]);

  useEffect(() => {
    fetch("http://localhost:8080/candidate-status/all")
      .then((response) => response.json())
      .then((data) => {
        // Use a Set to store unique statuses
        const uniqueStatusesMap = new Map();

        data.forEach((status) => {
          uniqueStatusesMap.set(status.candidateStatus, status);
        });

        setCandidateStatuses(Array.from(uniqueStatusesMap.values()));
      })
      .catch((error) =>
        console.error("Error fetching candidate statuses:", error)
      );
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Combine with already uploaded files
    const totalFiles = uploadedFiles.length + files.length;
    if (totalFiles > 3) {
      toast.error("You can upload a maximum of 3 files.", {
        position: "top-right",
      });
      return;
    }
    const evidenceObjects = files.map((file) => ({
      fileName: file.name,
      fileObject: file,
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...evidenceObjects]);
  };

  // Populate uploadedFiles state with file names from backend
  useEffect(() => {
    if (Array.isArray(evidence)) {
      setUploadedFiles(
        evidence.map((evidenceObj) => ({
          fileName: evidenceObj.fileName,
          fileObject: new File([], evidenceObj.fileName), // Placeholder File object
        }))
      );
    }
  }, [evidence]);

  const handleCancel = () => {
    navigate("/landing-page");
  };

  const handleFileRemove = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio") {
      setIsInternal(name === "internal" ? checked : !checked);
      setIsExternal(name === "external" ? checked : !checked);
      //setVendor(name === "vendor" ? checked : !checked);
    } else {
      setForm({ ...form, [name]: value });
    }

    if (name === "tagDate" && value && form.status !== "Tagging Completed") {
      setForm((prevForm) => ({
        ...prevForm,
        status: "Tagging Completed",
        tagDate: value,
      }));
    }
    if (
      name === "techSelectDate" &&
      value &&
      form.status != "Tech Selection Done"
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        status: "Tech Selection Done",
        techSelectDate: value,
      }));
    } else if (
      name === "dojRecDate" &&
      value &&
      form.status != "DOJ Recieved"
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        status: "DOJ Recieved",
        dojRecDate: value,
      }));
    } else if (
      name === "onboardingDate" &&
      value &&
      form.status != "Onboarding Completed"
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        status: "Onboarding Completed",
        onboardingDate: value,
      }));
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
    setForm((prevState) => ({
      ...prevState,
      hsbcRoles: { ref: ref, roleTitle: roleTitle },
      ctoolGrade: grade,
    }));
    setShowDropdown(false); // Hide dropdown after selection
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
    const selectedLob = lobs.find((lob) => lob.lobId === Number(value));
    setForm((prevForm) => ({
      ...prevForm,
      lob: selectedLob ? selectedLob : { lobId: value },
      head: selectedLob?.hsbchead || "",
      deliveryManager: selectedLob?.deliveryManager || "",
      salespoc: selectedLob?.salesPOC || "",
    }));
    setSelectedSubLobTemp({});

    try {
      const data = await fetchSubLobs(value);
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

    const formattedTagDate = moment(form.tagDate, "YYYY-MM-DD").toISOString();
    console.log("Formatted tagDate value:", formattedTagDate);

    const updateDate = new Date().toISOString();

    // Check if there are any new files (real File objects with size > 0)
    const hasNewFiles = uploadedFiles.some(
      (file) => file.fileObject instanceof File && file.fileObject.size > 0
    );

    let uploadedEvidence = [];

    if (hasNewFiles) {
      // Only upload new files
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        if (file.fileObject instanceof File && file.fileObject.size > 0) {
          formData.append("files", file.fileObject);
          formData.append("selectionId", selectionId);
        }
      });

      try {
        const uploadResponse = await fetch("http://localhost:8080/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload files.");
        }

        uploadedEvidence = await uploadResponse.json();
      } catch (error) {
        console.error("An error occurred:", error.message);
        toast.error(error.message, { position: "top-right" });
        return;
      }
    } else {
      // No new files, use the already uploaded evidence
      uploadedEvidence = uploadedFiles.map((file) => ({
        fileName: file.fileName,
        selectionId: selectionId,
      }));
    }

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
      updateDate: updateDate,
    };

    const selectionDetails = {
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
      ctoolLocation: form.ctoolLocation,
      ctoolGrade: form.ctoolGrade,
      ctoolTaggingRate: form.ctoolTaggingRate,
      ctoolProposedRate: form.proposedRate,
      recruiterName: form.recruiterName,
      interviewEvidence: uploadedEvidence, // Always send the current evidence list
      offerReleaseStatus: form.offerReleaseStatus,
      ltionboardingDate: form.ltiOnboardDate,
      techSelectionDate: form.techSelectDate,
      candidateStatusDate: form.candidateStatusDate,
      billingStartDate: form.billingStartDate,
      hsbcId: form.hsbcId,
      bgvInitiatedDate: form.bgvInitiatedDate,
      dojreceivedDate: form.dojRecDate,
      hsbconboardingDate: form.onboardingDate,
      ctoolStartDate: form.ctoolStartDate,
      hsbcRoles: form.hsbcRoles,
    };

    console.log("tagging details: ", taggingDetails);
    console.log("selection details Payload: ", selectionDetails);

    try {
      if (isInternal && psId) {
        await updateSelectionDetailsByPsId(psId, selectionDetails);
        await updateTaggingDetailsByPsId(psId, taggingDetails);
        toast.success("Details updated successfully!", {
          position: "top-right",
        });
      } else if (isExternal && phone) {
        await updateSelectionDetailsByCandidateId(phone, selectionDetails);
        await updateTaggingDetailsByCandidateId(phone, taggingDetails);
        toast.success("Details updated successfully!", {
          position: "top-right",
        });
      } else if (isVendor && phone) {
        await updateSelectionDetailsByVendorCandidateId(
          phone,
          selectionDetails
        );
        await updateTaggingDetailsByVendorCandidateId(phone, taggingDetails);
        toast.success("Details updated successfully!", {
          position: "top-right",
        });
      }

      setTimeout(() => {
        navigate("/landing-page");
      }, 2000);
    } catch (error) {
      console.error("An error occurred:", error.message);
      toast.error(error.message, { position: "top-right" });
    }
  };

  useEffect(() => {
    // Determine the type of user (Internal, External, Vendor) based on `id`
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
      // Fetch data for internal users
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
          // Set selectionId from selectionData
          setSelectionId(selectionData.selectionId);
          console.log("Selection ID:", selectionData.selectionId);
          // Fetch evidence after setting selectionId
          return getEvidenceBySelectionId(selectionData.selectionId)
            .then((evidenceDto) => {
              return { employee, selectionData, taggingData, evidenceDto };
            })
            .catch((err) => {
              console.error("Error fetching evidence:", err);
              return { employee, selectionData, taggingData, evidenceDto: [] }; // Fallback to an empty array
            });
        })
        .then(({ employee, selectionData, taggingData, evidenceDto }) => {
          console.log("evidenceDto response:", evidenceDto);

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
            selectionDate: formatDate(selectionData.hsbcselectionDate) || "",
            bu: selectionData.baseBu || "BF",
            lob: selectionData.lob || "",
            subLob: selectionData.sublob || "",
            hiringManager: selectionData.hsbchiringManager || "",
            head: selectionData.hsbchead || selectionData.lob.hsbchead,
            deliveryManager:
              selectionData.deliveryManager ||
              selectionData.lob.deliveryManager,
            salespoc: selectionData.salesPOC || selectionData.lob.salesPOC,
            pricingModel: selectionData.pricingModel || "",
            irm: selectionData.irm || "",
            ctoolId: selectionData.hsbctoolId || "",
            ctoolRecDate: formatDate(selectionData.ctoolReceivedDate) || "",
            ctoolLocation: selectionData.ctoolLocation || "",
            hsbcRoles: selectionData.hsbcRoles || "",
            ctoolGrade:
              selectionData.hsbcRoles?.grade || selectionData.ctoolGrade,
            ctoolTaggingRate: selectionData.ctoolTaggingRate || "",
            proposedRate: selectionData.ctoolProposedRate || "",
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
            candidateStatusDate:
              formatDate(selectionData.candidateStatusDate) || "",
            billingStartDate: formatDate(selectionData.billingStartDate) || "",
            hsbcId: selectionData.hsbcId || "",
            bgvInitiatedDate: formatDate(selectionData.bgvInitiatedDate) || "",
            ctoolStartDate: formatDate(selectionData.ctoolStartDate) || "",
            evidence:
              evidenceDto.map((evidence) => ({
                fileName: evidence.fileName,
                fileObject: new File([], evidence.fileName), // Placeholder File object
              })) || [],
          });
          setSearchTerm(selectionData.hsbcRoles?.roleTitle || "");
          setUploadedFiles(
            evidenceDto.map((evidence) => ({
              fileName: evidence.fileName,
              fileObject: new File([], evidence.fileName), // Placeholder File object
            }))
          );

          setSelectedSubLobTemp(selectionData.subLob);
        })
        .catch((error) => {
          console.error("Error in Promise.all:", error);
        });
    } else if (isExternal && phone) {
      Promise.all([
        (async () => {
          try {
            return await getCandidateById(phone);
          } catch (err) {
            console.error("Error fetching candidate data:", err);
            return {};
          }
        })(),
        (async () => {
          try {
            return await getSelectionDetailsByCandidateId(phone);
          } catch (err) {
            console.error("Error fetching selection details:", err);
            return {};
          }
        })(),
        (async () => {
          try {
            return await getTaggingDetailsByPsId(psId);
          } catch (err) {
            console.error("Error fetching tagging details:", err);
            return {};
          }
        })(),
      ])
        .then(([candidate, selectionData, taggingData]) => {
          setSelectionId(selectionData.selectionId);
          console.log("Selection ID:", selectionData.selectionId);

          return getEvidenceBySelectionId(selectionData.selectionId)
            .then((evidenceDto) => {
              return { candidate, selectionData, taggingData, evidenceDto };
            })
            .catch((err) => {
              console.error("Error fetching evidence:", err);
              return { candidate, selectionData, taggingData, evidenceDto: [] };
            });
        })
        .then(({ candidate, selectionData, taggingData, evidenceDto }) => {
          console.log("evidenceDto response:", evidenceDto);

          setForm({
            vendors: { vendorId: 1 },
            phone: candidate.phoneNumber,
            fname: candidate.firstName,
            lname: candidate.lastName,
            grade: "",
            location: "",
            pu: "",
            totalExp: "",
            skill: "",
            email: "",
            selectionDate: formatDate(selectionData.hsbcselectionDate) || "",
            bu: selectionData.baseBu || "BF",
            lob: selectionData.lob || "",
            subLob: selectionData.sublob || "",
            hiringManager: selectionData.hsbchiringManager || "",
            head: selectionData.hsbchead || selectionData.lob?.hsbchead,
            deliveryManager:
              selectionData.deliveryManager ||
              selectionData.lob?.deliveryManager,
            salespoc: selectionData.salesPOC || selectionData.lob?.salesPOC,
            pricingModel: selectionData.pricingModel || "",
            irm: selectionData.irm || "",
            ctoolId: selectionData.hsbctoolId || "",
            ctoolRecDate: formatDate(selectionData.ctoolReceivedDate) || "",
            ctoolLocation: selectionData.ctoolLocation || "",
            hsbcRoles: selectionData.hsbcRoles || "",
            ctoolGrade:
              selectionData.hsbcRoles?.grade || selectionData.ctoolGrade,
            ctoolTaggingRate: selectionData.ctoolTaggingRate || "",
            proposedRate: selectionData.ctoolProposedRate || "",
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
            candidateStatusDate:
              formatDate(selectionData.candidateStatusDate) || "",
            billingStartDate: formatDate(selectionData.billingStartDate) || "",
            hsbcId: selectionData.hsbcId || "",
            bgvInitiatedDate: formatDate(selectionData.bgvInitiatedDate) || "",
            ctoolStartDate: formatDate(selectionData.ctoolStartDate) || "",
            evidence:
              evidenceDto.map((evidence) => ({
                fileName: evidence.fileName,
                fileObject: new File([], evidence.fileName),
              })) || [],
          });

          setSearchTerm(selectionData.hsbcRoles?.roleTitle || "");
          setSelectedSubLobTemp(selectionData.subLob);

          setUploadedFiles(
            evidenceDto.map((evidence) => ({
              fileName: evidence.fileName,
              fileObject: new File([], evidence.fileName),
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching data by CandidateId:", error);
        });
    } else if (isVendor && phone) {
      // Fetch data for vendor users
      Promise.all([
        getVendorCandidateById(phone).catch((err) => {
          console.error("Error fetching vendor data:", err);
          return {}; // Fallback to an empty object
        }),
        getSelectionDetailsByVendorCandidateId(phone).catch((err) => {
          console.error("Error fetching selection details:", err);
          return {}; // Fallback to an empty object
        }),
        getTaggingDetailsByPsId(psId).catch((err) => {
          console.error("Error fetching tagging details:", err);
          return {}; // Fallback to an empty object
        }),
      ])
        .then(([vendorCandidate, selectionData, taggingData]) => {
          // Set selectionId from selectionData
          setSelectionId(selectionData.selectionId);
          console.log("Selection ID:", selectionData.selectionId);
          // Fetch evidence after setting selectionId
          return getEvidenceBySelectionId(selectionData.selectionId)
            .then((evidenceDto) => {
              return {
                vendorCandidate,
                selectionData,
                taggingData,
                evidenceDto,
              };
            })
            .catch((err) => {
              console.error("Error fetching evidence:", err);
              return {
                vendorCandidate,
                selectionData,
                taggingData,
                evidenceDto: [],
              }; // Fallback to an empty array
            });
        })
        .then(
          ({ vendorCandidate, selectionData, taggingData, evidenceDto }) => {
            console.log("evidenceDto response:", evidenceDto);

            setForm({
              vendors: { vendorId: id },
              phone: vendorCandidate.phoneNumber,
              fname: vendorCandidate.firstName,
              lname: vendorCandidate.lastName,
              grade: selectionData.baseBu, // Assuming grade is not available for candidate
              location: "", // Assuming location is not available for candidate
              pu: "", // Assuming pu is not available for candidate
              totalExp: "", // Assuming totalExperience is not available for candidate
              skill: "", // Assuming skill is not available for candidate
              email: "", // Assuming email is not available for candidate
              selectionDate: formatDate(selectionData.hsbcselectionDate) || "",
              bu: selectionData.baseBu || "BF",
              lob: selectionData.lob || "",
              subLob: selectionData.sublob || "",
              hiringManager: selectionData.hsbchiringManager || "",
              head: selectionData.hsbchead || selectionData.lob.hsbchead,
              deliveryManager:
                selectionData.deliveryManager ||
                selectionData.lob.deliveryManager,
              salespoc: selectionData.salesPOC || selectionData.lob.salesPOC,
              pricingModel: selectionData.pricingModel || "",
              irm: selectionData.irm || "",
              ctoolId: selectionData.hsbctoolId || "",
              ctoolRecDate: formatDate(selectionData.ctoolReceivedDate) || "",
              ctoolLocation: selectionData.ctoolLocation || "",
              hsbcRoles: selectionData.hsbcRoles || "",
              ctoolGrade:
                selectionData.hsbcRoles?.grade || selectionData.ctoolGrade,
              ctoolTaggingRate: selectionData.ctoolTaggingRate || "",
              proposedRate: selectionData.ctoolProposedRate || "",
              recruiterName: selectionData.recruiterName || "",
              offerReleaseStatus: selectionData.offerReleaseStatus || "",
              ltiOnboardDate: formatDate(selectionData.ltionboardingDate),
              status: taggingData.onboardingStatus?.onboardingStatus || "",
              addRemark: taggingData.onboardingStatus?.remarks || "",
              bgvStatus: taggingData.bgvStatus?.bgvStatus || "",
              bgvRemark: taggingData.bgvStatus?.remarks || "",
              candidateStatus:
                taggingData.candidateStatus?.candidateStatus || "",
              candidateRemark: taggingData.candidateStatus?.remarks || "",
              tagDate: formatDate(taggingData.createDate) || "",
              techSelectDate: formatDate(selectionData.techSelectionDate) || "",
              dojRecDate: formatDate(selectionData.dojreceivedDate) || "",
              onboardingDate:
                formatDate(selectionData.hsbconboardingDate) || "",
              candidateStatusDate:
                formatDate(selectionData.candidateStatusDate) || "",
              billingStartDate:
                formatDate(selectionData.billingStartDate) || "",
              hsbcId: selectionData.hsbcId || "",
              bgvInitiatedDate:
                formatDate(selectionData.bgvInitiatedDate) || "",
              ctoolStartDate: formatDate(selectionData.ctoolStartDate) || "",
              evidence:
                evidenceDto.map((evidence) => ({
                  fileName: evidence.fileName,
                  fileObject: new File([], evidence.fileName), // Placeholder File object
                })) || [],
            });
            setSearchTerm(selectionData.hsbcRoles?.roleTitle || "");
            setSelectedSubLobTemp(selectionData.subLob);

            setUploadedFiles(
              evidenceDto.map((evidence) => ({
                fileName: evidence.fileName,
                fileObject: new File([], evidence.fileName), // Placeholder File object
              }))
            );
          }
        )
        .catch((error) => {
          console.error("Error fetching data by VendorCandidateId:", error);
        });
    } else {
      setErrors(errors);
    }
  }, [psId, phone, isInternal, isExternal, isVendor]);
  return (
    <div className="w-full px-4 py-8 pt-8">
      <h1 className="text-2xl font-bold text-left text-black mb-6">
        HSBC Updation Form
      </h1>
      <form onSubmit={handleSubmit}>
        <h4 className="text-base font-bold text-black-700 border-b pb-2 mb-5 mt-6">
          Employee Type
        </h4>
        <div className="overflow-x-auto -mt-2">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="flex flex-wrap md:flex-nowrap">
                <td
                  className="p-2 w-full md:w-1/4 flex items-center gap-4"
                  colSpan={2}
                >
                  <label htmlFor="internal" className="font-semibold">
                    Internal
                  </label>
                  <input
                    id="internal"
                    type="radio"
                    name="psidType"
                    checked={isInternal}
                    onChange={handleChange}
                    className="p-2"
                  />
                  <div className="mx-8" />
                  <label htmlFor="external" className="font-semibold">
                    External
                  </label>
                  <input
                    id="external"
                    type="radio"
                    name="psidType"
                    checked={!isInternal}
                    onChange={handleChange}
                    className="p-2"
                  />
                </td>
              </tr>

              <tr className="flex flex-wrap md:flex-nowrap">
                <td className="p-2 w-full md:w-1/4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* PS ID Field */}
                    <div className="flex-1">
                      <label className="font-semibold">
                        PS ID:<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="psId"
                        value={psId}
                        onChange={handlePsIdChange}
                        required
                        className={`p-2 h-10 border rounded w-full md:w-[300px] ${
                          errors.psId ? "border-red-500" : ""
                        }`}
                        disabled={!isInternal}
                      />
                      {errors.psId && (
                        <p className="text-red-500 text-sm mb-4">
                          {errors.psId}
                        </p>
                      )}
                    </div>

                    {/* Vendor Dropdown */}
                    <div className="flex-1">
                      <label className="font-semibold">Vendor:</label>
                      <select
                        name="vendors"
                        value={form.vendors?.vendorId || ""}
                        onChange={handleVendorChange}
                        required
                        className={`p-2 h-10 border rounded w-full md:w-[300px] ${
                          errors.vendorId ? "border-red-500" : ""
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
                    </div>
                  </div>
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
                    disabled
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
                    disabled
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
                    value={form.totalExp || ""}
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
                    onChange={handlePhoneChange}
                    className="p-2 border rounded w-full "
                    disabled
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>
            </tbody>
          </table>
        </div>
        <h4 className="font-bold px-2 py-1 mt-8">Selection Details</h4>
        <div className="overflow-x-auto max-h-[900px] pb-28  -mb-1">
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
                    className="p-2 border rounded w-full"
                  />
                </div>

                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="bu">Base BU:</label>
                  <input
                    type="text"
                    name="bu"
                    value={form.bu || ""}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
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
                    className="p-2 border rounded w-full"
                    required
                  >
                    <option value="">Choose...</option>
                    {lobs.map((lob) => (
                      <option key={lob.lobId} value={lob.lobId}>
                        {lob.lobName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-2 w-full md:w-1/4">
                  <label htmlFor="sub-lob-select">
                    Sub LOB:<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subLob"
                    id="sub-lob-select"
                    value={form.subLob?.subLOBid || ""}
                    className="p-2 border rounded w-full"
                    onChange={handleSubLobChange}
                  >
                    <option value="0">Choose...</option>
                    {subLobs.map((subLob) => (
                      <option key={subLob.subLOBid} value={subLob.subLOBid}>
                        {subLob.subLobName}
                      </option>
                    ))}
                  </select>
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
                        irmName && form.irm
                          ? `${form.irm} (${irmName})`
                          : form.irm || ""
                      }
                      onChange={handleIrmChange}
                      className={`p-2 border rounded w-full pr-10 ${
                        errors.irm ? "border-red-500" : ""
                      }`}
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
                    className={`p-2 border rounded w-full ${
                      errors.ctoolRecDate ? "border-red-500" : ""
                    }`}
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
                      className={`p-2 border rounded w-full ${
                        errors.hsbcRoles ? "border-red-500" : ""
                      }`}
                      onChange={handleSearch}
                      onFocus={() => setShowDropdown(true)}
                    />
                    {/* Dropdown options */}
                    {showDropdown && filteredRoles.length > 0 && (
                      <ul className="absolute top-full left-0 w-full max-h-52 overflow-y-auto bg-white border border-gray-300 rounded z-10">
                        {filteredRoles.map((role) => (
                          <li
                            key={role.ref}
                            onClick={() =>
                              handleSelect(role.roleTitle, role.ref, role.grade)
                            }
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
                  />
                </td>
                <div className="p-2 w-full md:w-1/4">
                  <label className="block mb-1">Interview Evidences</label>
                  <input
                    type="file"
                    name="evidence"
                    data-testid="evidence-upload"
                    accept=".png,.jpg,.jpeg,.doc,.docx"
                    multiple
                    onChange={handleFileChange}
                    className="p-2 border rounded w-full"
                  />
                  <div className="mt-2">
                    <p className="font-bold">
                      Uploaded Files ({uploadedFiles.length}):
                    </p>
                    <ul>
                      {uploadedFiles.map((file, index) => {
                        const isRealFile =
                          file.fileObject instanceof File &&
                          file.fileObject.size > 0;
                        const backendUrl = `http://localhost:8080/uploads/${encodeURIComponent(
                          file.fileName
                        )}`;
                        return (
                          <li
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <span>{file.fileName || file.name}</span>
                            {/* Download Button */}
                            <button
                              type="button"
                              className="text-green-500 border border-green-500 rounded-full flex justify-center items-center p-1"
                              onClick={async () => {
                                if (isRealFile) {
                                  const url = URL.createObjectURL(
                                    file.fileObject
                                  );
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.download = file.fileName || file.name;
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);
                                  URL.revokeObjectURL(url);
                                } else {
                                  try {
                                    const response = await fetch(backendUrl);
                                    const blob = await response.blob();
                                    const url =
                                      window.URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = file.fileName || file.name;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    window.URL.revokeObjectURL(url);
                                  } catch (err) {
                                    toast.error("Failed to download file.", {
                                      position: "top-right",
                                    });
                                  }
                                }
                              }}
                            >
                              <FaDownload />
                            </button>

                            {/* View Button */}
                            <button
                              type="button"
                              className="text-green-500 border border-green-500 rounded-full flex justify-center items-center p-1"
                              onClick={() => {
                                if (isRealFile) {
                                  const url = URL.createObjectURL(
                                    file.fileObject
                                  );
                                  window.open(url, "_blank");
                                  setTimeout(
                                    () => URL.revokeObjectURL(url),
                                    60 * 1000
                                  );
                                } else {
                                  window.open(backendUrl, "_blank");
                                }
                              }}
                            >
                              <FaEye />
                            </button>

                            {/* Remove Button */}
                            <button
                              type="button"
                              className="text-red-500 border border-red-500 rounded-full flex justify-center items-center p-1"
                              onClick={async () => {
                                if (!isRealFile) {
                                  try {
                                    const response = await fetch(
                                      `http://localhost:8080/evidence/delete?fileName=${encodeURIComponent(
                                        file.fileName
                                      )}&selectionId=${selectionId}`,
                                      { method: "DELETE" }
                                    );
                                    if (response.ok) {
                                      handleFileRemove(index);
                                      toast.success(
                                        "File deleted successfully.",
                                        { position: "top-right" }
                                      );
                                    } else {
                                      toast.error("Failed to delete file.", {
                                        position: "top-right",
                                      });
                                    }
                                  } catch (err) {
                                    toast.error("Error deleting file.", {
                                      position: "top-right",
                                    });
                                  }
                                } else {
                                  handleFileRemove(index);
                                }
                              }}
                            >
                              <ImCross />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-bold px-2 py-1 -mt-12 text-lg">
          Tagging and Onboarding Details
        </h4>
        <div>
          <tr className="flex flex-wrap md:flex-nowrap">
            <td className="p-2 w-full md:w-1/4">
              <label className="font-semobold block mb-1">
                Status:<span className="text-red-500">*</span>
              </label>
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
                <option value="Tech Selection Done">Tech Selection Done</option>
                <option value="DOJ Recieved">DOJ Recieved</option>
                <option value="Onboarding Completed">
                  Onboarding Completed
                </option>
                <option value="Tagging Error">Tagging Error</option>
                <option value="Rate Approval Pending">
                  Rate Approval Pending
                </option>
                <option value="Rate To Be Changed">Rate To Be Changed</option>
                <option value="Candidate not yet joined">
                  Candidate not yet joined
                </option>
                <option value="Drop Out Case">Drop Out Case</option>
              </select>
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className="font-semobold block mb-1">
                BGV Status:<span className="text-red-500">*</span>
              </label>
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

            <td className="p-2 w-full md:w-1/4">
              <label className="font-semobold block mb-1">
                Status Additional Remark:<span className="text-red-500">*</span>
              </label>
              <textarea
                name="addRemark"
                value={form.addRemark || ""}
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full resize-none h-[40px]"
                required
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className=" block mb-1">
                BGV Additional Remark:<span className="text-red-500">*</span>
              </label>
              <textarea
                name="bgvRemark"
                value={form.bgvRemark || ""}
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full resize-none h-[40px]"
                required
              />
            </td>
          </tr>
          <tr className="flex flex-wrap md:flex-nowrap">
            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">
                CTool Start Date:<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="ctoolStartDate"
                value={form.ctoolStartDate || ""}
                required
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full"
                min={form.dojRecDate}
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">
                BGV Initiated Date:<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="bgvInitiatedDate"
                value={form.bgvInitiatedDate || ""}
                required
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full"
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">Tagging date:</label>
              <input
                type="date"
                name="tagDate"
                value={form.tagDate || ""}
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full"
                min={today}
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">Tech Selection Date:</label>
              <input
                type="date"
                name="techSelectDate"
                value={form.techSelectDate || ""}
                disabled={!form.tagDate}
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full"
                min={today}
              />
            </td>
          </tr>

          <tr className="flex flex-wrap md:flex-nowrap">
            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">DOJ Received Date:</label>
              <input
                type="date"
                name="dojRecDate"
                value={form.dojRecDate || ""}
                disabled={!form.techSelectDate}
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full"
                min={today}
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className=" block mb-1">Onboarding Date:</label>
              <input
                type="date"
                name="onboardingDate"
                value={form.onboardingDate || ""}
                disabled={!form.dojRecDate}
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full"
                min={today}
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">
                Billing Start Date:<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="billingStartDate"
                value={form.billingStartDate || ""}
                required
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full"
                disabled={!form.onboardingDate}
                min={form.onboardingDate}
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">HSBC ID:</label>
              <input
                type="number"
                name="hsbcId"
                value={form.hsbcId || ""}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            </td>
          </tr>
        </div>

        <div className="border border-gray-300 rounded-md shadow mb-28  space-y-3">
          <h1 className="font-bold px-2 py-1 mt-4">For External Only</h1>

          <tr className="flex flex-wrap md:flex-nowrap">
            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">Offer Release Status:</label>
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
              <label className="block mb-1">LTI Onboarding Date:</label>
              <input
                type="date"
                name="ltiOnboardDate"
                value={form.ltiOnboardDate || ""}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className=" block mb-1">
                Candidate Status:<span className="text-red-500">*</span>
              </label>
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
                  <option
                    key={status.candidateStatusId}
                    value={status.candidateStatus}
                  >
                    {status.candidateStatus}
                  </option>
                ))}
              </select>
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">
                Candidate Additional Remark:
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="candidateRemark"
                value={form.candidateRemark || ""}
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full resize-none h-[40px]"
                disabled={isInternal}
                required
              />
            </td>

            <td className="p-2 w-full md:w-1/4">
              <label className="block mb-1">
                Candidate Selection Date:<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="candidateStatusDate"
                value={form.candidateStatusDate || ""}
                required
                onChange={handleChange}
                className="p-2 mb-2 border rounded w-full"
                disabled={isInternal}
                min={today}
              />
            </td>
          </tr>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50 p-4 pl-16 flex justify-start space-x-4 shadow-md">
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-10 rounded hover:bg-gray-500"
            >
              Update
            </button>
            <button
              type="button"
              className="text-blue-900 border border-blue-900 bg-transparent py-2 px-10 rounded hover:bg-gray-500"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
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
