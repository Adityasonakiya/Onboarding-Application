import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import usePagination from "@mui/material/usePagination";
import { useLocation, useNavigate } from "react-router-dom";
import {
  // fetchEmployeeCandidatesByEmployee,
  // fetchEmployeeCandidatesByCandidate,
  fetchEmployeeCandidatesBySelections,
  getCandidateById,
  getEmployeeByPsid,
  getEmployeeCandidateByBgv,
  getEmployeeCandidateByCtool,
  getEmployeeCandidateByPsid,
  getEmployeeCandidateByCandidateId,

} from "../services/api";
import zIndex from "@mui/material/styles/zIndex";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const id = state?.id;
  const [employeeCandidates, setEmployeeCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const searchType = state?.searchType;
  const status = state?.status;

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [rowsPerPage]);

  const addNewSelection = () => {
    navigate("/selection-tracker");
  };

  const handleEdit = (id) => {
    navigate("/update-details", { state: { id } });
  };

  const handleRefresh = () => {
    navigate("/landing-page");
  };

  const handleViewOnly = (id) => {
    navigate("/selection-tracker", { state: { id, readOnly: true } }); // Pass the readOnly flag
  };

  useEffect(() => {
    const getEmployeeCandidates = async () => {
      const user = JSON.parse(localStorage.getItem("user")).psid;
      try {
        let content = [];
        let totalPages = 0;
  
        if (searchType === "ctool" && status) {
          const response = await getEmployeeCandidateByCtool(status);
          content = response;
          totalPages = response.totalPages;
        } else if (searchType === "bgv" && status) {
          const response = await getEmployeeCandidateByBgv(status);
          content = response;
          totalPages = response.totalPages;
        } else {
          const response = await fetchEmployeeCandidatesBySelections(user, currentPage, rowsPerPage);
          content = response.content;
          totalPages = response.totalPages;
        }
  
        setEmployeeCandidates(content);
        setTotalPages(totalPages);
        setFilteredCandidates(content);
        console.log("dashboard data: ", content);
  
        if (id) {
          const filtered = content.filter((candidate) => candidate.id === id);
          console.log("displaying filtered by ID");
          const employee = await getEmployeeCandidateByPsid(id);
          const candidate = await getEmployeeCandidateByCandidateId(id);
          if (employee && employee.id) {
            setFilteredCandidates([employee]);
            setTotalPages(1);
            console.log("searched emp2:", employee);
          } if (candidate && candidate.id) {
            setFilteredCandidates([candidate]);
            candidate.id = null;
            //setTotalPages(1);
            console.log("searched candidate:", candidate);
          }
        } 
        else {
          setFilteredCandidates(content);
          console.log("displaying All");
        }
      } catch (error) {
        console.error("There was an error fetching the employee candidates!", error);
      }
    };
    getEmployeeCandidates();
  }, [id, searchType, status, currentPage, rowsPerPage]);

  const handlePageClick = (page) => {
    if (page !== 0) {
      setCurrentPage(page - 1);
    }
  };

  useEffect(() => {
    if (currentPage >= totalPages) {
      if (currentPage !== 0) {
        setCurrentPage(totalPages - 1);
      }
    }
    console.log("CurrentPage", currentPage);
    console.log("TotalPages", totalPages);
  }, [totalPages, currentPage]);

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 ${
            i === currentPage
              ? "bg-gray-500 text-white rounded-full"
              : "text-gray-700"
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-4 h-full flex flex-col">
        <div className="flex justify-between flex-wrap">
          <h2 className="py-2 font-bold text-lg">My Selections</h2>
          <div className="flex">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-2 md:mt-0 mr-2"
              onClick={addNewSelection}
            >
              Add New Selection
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded mt-2 md:mt-0"
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
        </div>
        <div
          className=" overflow-x-auto mt-4 flex-grow"
          style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
        >
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 top-0 sticky" style={{ zIndex: 1 }}>
              <tr>
                <th className="p-2 text-center">PSID/External</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">LOB</th>
                <th className="p-2 text-center">Client Name</th>
                <th className="p-2 text-center">CTool Status</th>
                <th className="p-2 text-center">BGV Status</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((emp) => (
                <tr key={emp.id}>
                  <td className="p-2 border text-center">
                    <button
                      className="text-blue-500 underline"
                      onClick={() => handleViewOnly(emp.id)}
                    >
                      {emp.id || 'EXTERNAL'} 
                    </button>
                  </td>
                  <td className="p-2 border text-center">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="p-2 border text-center">{emp.lobName}</td>
                  <td className="p-2 border text-center">
                    {emp.hsbchiringManager}
                  </td>
                  <td className="p-2 border text-center">
                    {emp.onboardingStatus || "-"}
                  </td>
                  <td className="p-2 border text-center">
                    {emp.bgvStatus || "-"}
                  </td>
                  <td className="p-2 border text-center">
                    <div className="flex justify-center">
                      <button
                        className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                        onClick={() => handleEdit(emp.id)}
                      >
                        Edit
                      </button>
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
    </div>
  );
};

export default LandingPage;
