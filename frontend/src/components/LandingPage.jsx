import React, { useState, useEffect, useRef } from "react";
import Pagination from "@mui/material/Pagination";
import { FaSearch, FaEdit } from "react-icons/fa";
import { HiPlus, HiRefresh } from "react-icons/hi"; // ✅ Added HiPlus icon
import Navbar from "./Navbar"; // <-- Highlight: Import Navbar
import usePagination from "@mui/material/usePagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // adjust path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { searchAllByHiringManager } from "../services/api";

import {
  fetchEmployeeCandidatesBySelections,
  getCandidateById,
  getEmployeeByPsid,
  getEmployeeCandidateByBgv,
  getEmployeeCandidateByCtool,
  getEmployeeCandidateByPsid,
  getEmployeeCandidateByCandidateId,
  getBgvStatuses,
  getCToolStatuses,
  getVendorById,
  getCandidateByPhoneNumber,
  searchAllByClientName
} from "../services/api";
//import zIndex from "@mui/material/styles/zIndex";

const LandingPage = () => {
  const { permissions } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const id = state?.id;
  const phoneNumber = state?.phoneNumber;
  const [employeeCandidates, setEmployeeCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [hiringManagers, setHiringManagers] = useState([]);
  const searchType = state?.searchType;
  const status = state?.status;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vendorNames, setVendorNames] = useState({});

  console.log("Permissions", permissions);

  //search bar

  const [selectedOption, setSelectedOption] = useState("PSID");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const suggestionsRef = useRef(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
    const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearchChangeDebounced(query);
  };

  // const handleSearchChangeDebounced = debounce(async (query) => {
  //   if (query.length > 3) {
  //     try {
  //       let response;
  //       if (selectedOption === "PSID") {
  //         response = await fetch(
  //           `http://localhost:8080/employees/search?query=${query}`
  //         );
  //       } else if (selectedOption === "CandidateName") {
  //         response = await fetch(
  //           `http://localhost:8080/candidates/api/candidates/search?query=${query}`
  //         ); 
  //       } else if (selectedOption === "ClientName") {
  //         const results = await searchAllByHiringManager(query);
  //         setSuggestions(results);
  //         return;
  //       }
  //       if (response && response.ok) {
  //         const data = await response.json();
  //         setSuggestions(data);
  //       } else {
  //         setSuggestions([]);
  //       }
  //     } catch (error) {
  //       setSuggestions([]);
  //     }
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, 300);

  const handleSearchChangeDebounced = debounce(async (query) => {
  if (query.length > 3 && selectedOption === "ClientName") {
    // Filter hiringManagers locally for suggestions
    const filtered = hiringManagers
      .filter(name => name.toLowerCase().includes(query.toLowerCase()))
      .map(name => ({ hsbchiringManager: name }));
    setSuggestions(filtered);
    return;
  }
  try {
    let response;
    if (selectedOption === "PSID") {
      response = await fetch(
        `http://localhost:8080/employees/search?query=${query}`
      );
    } else if (selectedOption === "CandidateName") {
      response = await fetch(
        `http://localhost:8080/candidates/api/candidates/search?query=${query}`
      );
    }
    if (response && response.ok) {
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  } catch (error) {
    setSuggestions([]);
  }
}, 300);

useEffect(() => {
  const fetchHiringManagers = async () => {
    try {
      const response = await fetch("http://localhost:8080/selection-details/hiringManager");
      const data = await response.json();
      setHiringManagers(data);
    } catch (error) {
      setHiringManagers([]);
    }
  };
  fetchHiringManagers();
}, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setSearchQuery("");
    setSuggestions([]);
    setSelectedStatus("");
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSearch = () => {
    const searchType = selectedOption === "CTool Status" ? "ctool" : "bgv";
    navigate("/landing-page", {
      state: { searchType, status: selectedStatus },
    });
  };

  const handleSuggestionClick = (value) => {
    if (selectedOption === "PSID") {
      setSearchQuery(value);
      navigate("/landing-page", { state: { id: value } });
      setSuggestions([]);
    } else if (selectedOption === "CandidateName") {
      navigate("/landing-page", { state: { phoneNumber: value } });
      setSuggestions([]);
    } else if (selectedOption === "ClientName"){
      navigate("/landing-page", { state: { hsbchiringManager: value } });
      setSuggestions([]);
    }
     else {
      setSelectedStatus(value);
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchStatusOptions = async () => {
      if (selectedOption === "CTool Status") {
        const statuses = await getCToolStatuses();
        const uniqueStatuses = [
          ...new Set(statuses.map((status) => status.onboardingStatus)),
        ];
        setStatusOptions(uniqueStatuses);
      } else if (selectedOption === "BgvStatus") {
        const statuses = await getBgvStatuses();
        const uniqueStatuses = [
          ...new Set(statuses.map((status) => status.bgvStatus)),
        ];
        setStatusOptions(uniqueStatuses);
      } else {
        setStatusOptions([]);
      }
    };
    fetchStatusOptions();
  }, [selectedOption]);

  useEffect(() => {
    if (
      selectedOption !== "PSID" &&
      selectedOption !== "CandidateName" &&
      selectedOption !== "ClientName" &&
      selectedStatus
    ) {
      handleSearch(); // Ensure handleSearch triggers only after selectedStatus updates
    }
  }, [selectedStatus, selectedOption]);

  const [activeTab, setActiveTab] = useState("myselection");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "dashboard") {
      navigate("/selection-tracker-dashboard");
    } else if (tab === "admin") {
      navigate("/admin");
    }
  };
  const handleRowPerChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };
  useEffect(() => {
    console.log("State object:", state); // Log the state object to debug
    console.log("ID:", id);
    console.log("Search Type:", searchType);
    console.log("Status:", status);
  }, [state]);

  const addNewSelection = () => {
    navigate("/selection-tracker");
  };

  const handleEdit = (id, phoneNumber) => {
    navigate("/update-details", { state: { id, phoneNumber } });
  };

  const handleRefresh = () => {
    setCurrentPage(0);
    navigate("/landing-page");
  };

  const handleViewOnly = (id, phoneNumber) => {
    navigate("/selection-tracker", {
      state: { id, phoneNumber, readOnly: true },
    }); // Pass the readOnly flag
    console.log("ID:", id);
    console.log("Phone Number:", phoneNumber);
  };

  const handlePageClick = (page) => {
    console.log("Page clicked:", page);
    setCurrentPage(page - 1);
  };

  useEffect(() => {
    const getEmployeeCandidates = async () => {
      const user = JSON.parse(localStorage.getItem("user"))?.psid;
      if (user) {
        try {
          let content = [];
          let totalPages = 0;

        // ADD THIS BLOCK
      if (state?.hsbchiringManager) {
        const results = await searchAllByHiringManager(state.hsbchiringManager);
        // const response = await searchAllByHiringManager(state.hsbchiringManager);
        content = results;
        // content = response;
        totalPages = results.totalPages || 1;;
        setEmployeeCandidates(content);
        setFilteredCandidates(content);
        setTotalPages(totalPages);
        return; // Stop further execution
      }

          if (searchType === "ctool" && status) {
            const response = await getEmployeeCandidateByCtool(status);
            content = response;
            totalPages = response.totalPages;
          } else if (searchType === "bgv" && status) {
            const response = await getEmployeeCandidateByBgv(status);
            content = response;
            totalPages = response.totalPages;
          } else {
            const response = await fetchEmployeeCandidatesBySelections(
              user,
              currentPage,
              rowsPerPage
            );
            content = response.content;
            totalPages = response.totalPages;
          }
          setEmployeeCandidates(content);
          setTotalPages(totalPages);
          setFilteredCandidates(content);
          console.log("dashboard data: ", content);

          // Fetch vendor names
          let vendorNamesMap = {};
          for (const candidate of content) {
            if (candidate.id && candidate.id < 100) {
              const vendor = await getVendorById(candidate.id);
              console.log(`Vendor response for ID ${candidate.id}:`, vendor);
              vendorNamesMap[candidate.id] = vendor.vendorName;
            }
          }

          console.log("Vendor Names:", vendorNamesMap);
          setVendorNames(vendorNamesMap);
          console.log("Vendor Names:", vendorNamesMap);

          if (id) {
            const filtered = content.filter((candidate) => candidate.id === id);
            console.log("displaying filtered by ID");
            const employee = await getEmployeeCandidateByPsid(id);
            if (employee && employee.id) {
              setFilteredCandidates([employee]);
              setTotalPages(1);
              console.log("searched emp2:", employee);
            }
          } else if (phoneNumber) {
            const candidate = await getCandidateByPhoneNumber(phoneNumber);
            if (candidate && candidate.phoneNumber) {
              setFilteredCandidates([candidate]);
              setTotalPages(1);
              console.log("searched Candidate using phone:", candidate);
            }
          } else {
            setFilteredCandidates(content);
            console.log("displaying All");
          }
        } catch (error) {
          console.error(
            "There was an error fetching the employee candidates!",
            error
          );
        }
      } else {
        navigate("/unauthorized");
        return;
      }
    };
    getEmployeeCandidates();
  }, [id, phoneNumber, searchType, status, currentPage, rowsPerPage, state?.hsbchiringManager, location.key]);

  useEffect(() => {
    if (currentPage >= totalPages) {
      if (currentPage !== 0) {
        setCurrentPage(totalPages - 1);
      }
    }
    console.log("CurrentPage", currentPage);
    console.log("TotalPages", totalPages);
  }, [totalPages, currentPage]);

  return (
    <>
    <Navbar />
      {permissions?.canViewLandingPage && (
            <div className="w-full px-4 py-6 mt-0">
              {/* Tabs code*/}
              <div className="flex mb-2 border-b">
                <button
                  className={`px-4 py-2 font-semibold focus:outline-none ${
                    activeTab === "myselection"
                      ? "border-b-2 border-blue-800 text-blue-800"
                      : "text-gray-600"
                  }`}
                  onClick={() => handleTabClick("myselection")}
                >
                  LOB Selection
                </button>
                <button
                  className={`px-4 py-2 font-semibold ml-2 focus:outline-none ${
                    activeTab === "dashboard"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  Dashboard
                </button>
                {permissions?.canAccessAdminDashboard && (
              <button
                className={`px-4 py-2 font-semibold ml-2 focus:outline-none ${
                  activeTab === "admin"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabClick("admin")}
              >
                Admin
              </button>
            )}
          </div>

          {/* Search Bar with Buttons */}
          <div className="w-full flex items-center gap-2 -mb-4 mt-10 pl-8">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-200 rounded-full px-2 py-1 md:px-3 relative w-full md:w-auto">
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="bg-transparent outline-none text-gray-800 text-sm md:text-base px-1 md:px-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto"
              >
                <option value="PSID">PSID</option>
                <option value="CandidateName">Candidate Name</option>
                <option value="ClientName">Client Name</option>
                <option value="CTool Status">CTool Status</option>
                <option value="BgvStatus">BgvStatus</option>
              </select>

              <div className="w-full relative w-2/3 md:w-auto">
                {(selectedOption === "PSID" ||
                  selectedOption === "CandidateName" ||
                  selectedOption === "ClientName") && (
                  <input
                    type="text"
                    className="bg-transparent outline-none text-gray-800 text-sm md:text-base px-1 md:px-2 w-full"
                    placeholder={selectedOption}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                )}
                {selectedOption !== "PSID" &&
                  selectedOption !== "CandidateName" &&
                  selectedOption !== "ClientName" && (
                    <select
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      className="bg-transparent outline-none text-gray-800 text-sm md:text-base px-1 md:px-2 w-full"
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  )}
                {suggestions.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute top-9 left-1 bg-white p-1 w-full md:w-56 border border-gray-300 rounded-md z-20"
                  >
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="cursor-pointer border-b-2 border-gray-400 p-1"
                        onClick={() => {
                          if (selectedOption === "PSID") {
                            handleSuggestionClick(suggestion.id);
                          } else if (selectedOption === "CandidateName") {
                            handleSuggestionClick(`${suggestion.phoneNumber}`);
                          } else if (selectedOption === "ClientName"){
                            handleSuggestionClick(`${suggestion.hsbchiringManager}`)
                          }
                           else {
                            handleSuggestionClick(
                              suggestion.onboardingStatus ||
                                suggestion.bgvStatus
                            );
                            handleSearch();
                          }
                        }}
                      >
                        <p className="text-sm">
                          Name: {suggestion.firstName} {suggestion.lastName}
                        </p>
                        {selectedOption === "PSID" && (
                          <p className="text-sm">PSID: {suggestion.id}</p>
                        )}
                        {selectedOption === "CandidateName" && (
                          <p className="text-sm">
                            Phone number: {suggestion.phoneNumber}
                          </p>
                        )}
                        {selectedOption === "ClientName" && (
                          <p className="text-sm">
                           Client Name: {suggestion.hsbchiringManager}
                          </p>
                        )}
                        {(selectedOption === "CTool Status" ||
                          selectedOption === "BgvStatus") && (
                          <p className="text-sm">
                            Status: {suggestion.onboardingStatus}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <FaSearch
                className={`text-gray-800 hover:text-gray-400 duration-300 cursor-pointer ${
                  (selectedOption === "PSID" ||
                    selectedOption === "CandidateName" ||
                    selectedOption === "ClientName") &&
                  "cursor-not-allowed"
                }`}
                onClick={
                  selectedOption === "PSID" ||
                  selectedOption === "CandidateName" ||
                  selectedOption === "ClientName"
                    ? null
                    : handleSearch
                }
              />
            </div>
            
            {/* Buttons on the left */}
            <div className="flex items-center gap-2">
              {permissions?.canAddSelection && (
                <div className="relative group">
                  <button
                    className="bg-blue-400 text-white py-2 px-4 hover:bg-blue-600 rounded mt-2 md:mt-0 mr-2"
                    onClick={addNewSelection}
                  >
                    Add New Selection
                  </button>
                  {/* <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              Add New Selection
            </div> */}
                </div>
              )}
              <div>
                <div className="relative group">
                  <button
                    className="bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-200"
                    onClick={handleRefresh}
                  >
                    <HiRefresh size={16} />
                  </button>
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    Refresh
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex justify-between flex-wrap">
          <div className="w-full flex justify-end mt-2 mb-0">
            <button
              className="bg-blue-400 text-white py-2 px-4 hover:bg-blue-600 rounded mt-2 md:mt-0 mr-2"
              onClick={addNewSelection}
            >
              Add New Selection
            </button>
            <div className="mt-2 mb-0 flex justify-end">
            <button
              className="bg-gray-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-200"
              onClick={handleRefresh}
            >
              <HiRefresh size={14}/>
            </button>
            </div>
          </div>
        </div> */}
          <div
            className="overflow-x-auto mt-10 flex-grow max-w-[95%] mx-auto"
            style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}
          >
            <table className="w-full border-collapse">
              <thead className="bg-blue-400 top-0 sticky" style={{ zIndex: 1 }}>
                <tr>
                  <th className="p-2 text-center">PSID/External</th>

                  <th
                    className="p-2 text-center cursor-pointer"
                    onClick={() => handleSort("firstName")}
                  >
                    Name
                    <span className="ml-1 text-[10px] inline-flex space-x-0.9">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        className={
                          sortConfig.key === "firstName" &&
                          sortConfig.direction === "asc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className={
                          sortConfig.key === "firstName" &&
                          sortConfig.direction === "desc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                    </span>
                  </th>

                  <th
                    className="p-2 text-center cursor-pointer"
                    onClick={() => handleSort("lobName")}
                  >
                    LOB
                    <span className="ml-1 text-[10px] inline-flex space-x-0.9">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        className={
                          sortConfig.key === "lobName" &&
                          sortConfig.direction === "asc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className={
                          sortConfig.key === "lobName" &&
                          sortConfig.direction === "desc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                    </span>
                  </th>

                  <th
                    className="p-2 text-center cursor-pointer"
                    onClick={() => handleSort("hsbchiringManager")}
                  >
                    Client Name
                    <span className="ml-1 text-[10px] inline-flex space-x-0.9">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        className={
                          sortConfig.key === "hsbchiringManager" &&
                          sortConfig.direction === "asc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className={
                          sortConfig.key === "hsbchiringManager" &&
                          sortConfig.direction === "desc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                    </span>
                  </th>

                  <th
                    className="p-2 text-center cursor-pointer"
                    onClick={() => handleSort("onboardingStatus")}
                  >
                    CTool Status
                    <span className="ml-1 text-[10px] inline-flex space-x-0.9">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        className={
                          sortConfig.key === "onboardingStatus" &&
                          sortConfig.direction === "asc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className={
                          sortConfig.key === "onboardingStatus" &&
                          sortConfig.direction === "desc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                    </span>
                  </th>

                  <th
                    className="p-2 text-center cursor-pointer"
                    onClick={() => handleSort("bgvStatus")}
                  >
                    BGV Status
                    <span className="ml-1 text-[10px] inline-flex space-x-0.9">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        className={
                          sortConfig.key === "bgvStatus" &&
                          sortConfig.direction === "asc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className={
                          sortConfig.key === "bgvStatus" &&
                          sortConfig.direction === "desc"
                            ? "text-black"
                            : "text-gray-600"
                        }
                      />
                    </span>
                  </th>

                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedCandidates.map((emp, index) => (
                  <tr key={`${emp.id}-${index}`}>
                    <td className="p-2 border text-center">
                      <button
                        className="text-blue-400 underline"
                        onClick={() => handleViewOnly(emp.id, emp.phoneNumber)}
                      >
                        {emp.id === 1
                          ? "EXTERNAL"
                          : emp.id < 100
                          ? vendorNames[emp.id]
                          : emp.id}
                      </button>
                    </td>
                    <td className="p-2 border text-left">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="p-2 border text-left">{emp.lobName}</td>
                    <td className="p-2 border text-left">
                      {emp.hsbchiringManager}
                    </td>
                    <td className="p-2 border text-left">
                      {emp.onboardingStatus || "-"}
                    </td>
                    <td className="p-2 border text-left">
                      {emp.bgvStatus || "-"}
                    </td>
                    <td className="p-2 border text-center">
                      <div className="flex justify-center">
                        {permissions?.canUpdateSelection && (
                          <button
                            className="bg-gray-400 text-white p-[4px] rounded mr-2 hover:bg-gray-800 transition duration-200"
                            onClick={() => handleEdit(emp.id, emp.phoneNumber)}
                          >
                            <FaEdit size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination and Select Rows Controls */}
          <div className="fixed bottom-0 left-0 w-full bg-white py-2 z-0 flex justify-between items-center px-4">
            <div className="flex justify-center flex-grow">
              <button
                className={`px-3 py-1 mx-1 ${
                  currentPage === 0 ? "text-black font-bold" : "text-gray-900"
                }`}
                onClick={() => handlePageClick(1)}
                disabled={currentPage === 0}
              >
                {"<<"}
              </button>
              <Pagination
                count={totalPages}
                page={currentPage + 1}
                onChange={(e, value) => handlePageClick(value)}
                siblingCount={1}
                boundaryCount={1}
              />
              <button
                className={`px-3 py-1 mx-1 ${
                  currentPage === totalPages - 1
                    ? " text-black font-bold"
                    : "text-gray-900"
                }`}
                onClick={() => handlePageClick(totalPages)}
                disabled={currentPage === totalPages - 1}
              >
                {">>"}
              </button>
            </div>
            <div className="flex items-center ml-auto mr-8">
              <label htmlFor="rowsPerPage" className="mr-5 font-bold">
                Select rows:
              </label>
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={handleRowPerChange}
                className="select-button p-1 border border-gray-300 rounded shadow"
              >
                {[5, 10, 20, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default LandingPage;
