import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import Navbar from './Navbar';
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa6";
import { HiRefresh } from "react-icons/hi";

const SelectionTrackerDashboard = ({ user }) => {
  const [selections, setSelections] = useState([]);
  const [ctool, setCtool] = useState([]);
  const [awaitedCases, setAwaitedCases] = useState([]);
  const [filter, setFilter] = useState('7days'); // State for selected filter
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  const handleExportToExcel = (data, sheetName, fileName) => {
    if (!data || data.length === 0) {
      alert("No data to export!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    XLSX.writeFile(workbook, fileName);
  };

  const fetchData = () => {
    // Fetch selections data
    fetch('http://localhost:8080/selection-details/selections')
      .then(response => response.json())
      .then(data => {
        console.log('Selections data:', data); // Check if data is fetched correctly

        // Process data to map counts based on pricing model
        const lobCounts = data.reduce((acc, selection) => {
          const { lobName, pricingModel, selectionCount, hsbcselectionDate } = selection;
          if (!acc[lobName]) {
            acc[lobName] = { FP: 0, TnM: 0, total: 0, hsbcselectionDate };
          }
          if (pricingModel === 'FP') {
            acc[lobName].FP = selectionCount;
          } else if (pricingModel === 'T&M') {
            acc[lobName].TnM = selectionCount;
          }
          acc[lobName].total += selectionCount;
          return acc;
        }, {});

        // Convert the counts object to an array for rendering
        const processedSelections = Object.keys(lobCounts).map(lobName => ({
          lobName,
          fp: lobCounts[lobName].FP,
          tnm: lobCounts[lobName].TnM,
          total: lobCounts[lobName].total,
          hsbcselectionDate: lobCounts[lobName].hsbcselectionDate,
        }));

        const filteredSelections = applyFilter(processedSelections, filter, fromDate, toDate, 'hsbcselectionDate');
        setSelections(filteredSelections);
        const pieChartData = {
          labels: filteredSelections.map(selection => selection.lobName),
          values: filteredSelections.map(selection => selection.total),
        };
        setChartData(pieChartData);
      })
      .catch(error => {
        console.error('Error fetching selections data:', error);
      });

    // Fetch awaited cases data
    fetch('http://localhost:8080/selection-details/awaited-cases')
      .then(response => response.json())
      .then(data => {
        console.log('Awaited Cases data:', data); // Check if data is fetched correctly

        const counts = data.reduce((acc, item) => {
          const { delivery_manager, pricing_model, bgv_status, onboarding_status, awaited_count, updateDate } = item;

          if (!acc[delivery_manager]) {
            acc[delivery_manager] = {
              pricingModel: pricing_model,
              bgvCompleted: 0,
              inProgressCompleted: 0,
              inProgressNotCompleted: 0,
              offerYetToBeReleased: 0,
              total: 0,
              updateDate
            };
          }

          if (bgv_status === 'BGV Completed') {
            acc[delivery_manager].bgvCompleted += awaited_count;
            acc[delivery_manager].total += awaited_count;
          }
          if (onboarding_status === 'Onboarding Completed' && bgv_status === 'In progress') {
            acc[delivery_manager].inProgressCompleted += awaited_count;
            acc[delivery_manager].total += awaited_count;
          }
          if (onboarding_status !== 'Onboarding Completed' && bgv_status === 'In progress') {
            acc[delivery_manager].inProgressNotCompleted += awaited_count;
            acc[delivery_manager].total += awaited_count;
          }
          if (bgv_status === 'Offer yet to be released') {
            acc[delivery_manager].offerYetToBeReleased += awaited_count;
            acc[delivery_manager].total += awaited_count;
          }

          return acc;
        }, {});

        const processedData = Object.keys(counts).map(dm => ({
          delivery_manager: dm,
          pricing_model: counts[dm].pricingModel,
          bgvCompleted: counts[dm].bgvCompleted,
          inProgressCompleted: counts[dm].inProgressCompleted,
          inProgressNotCompleted: counts[dm].inProgressNotCompleted,
          offerYetToBeReleased: counts[dm].offerYetToBeReleased,
          total: counts[dm].total,
          updateDate: counts[dm].updateDate
        }));

        const filteredAwaitedCases = applyFilter(processedData, filter, fromDate, toDate, 'updateDate');
        setAwaitedCases(filteredAwaitedCases);
      })
      .catch(error => {
        console.error('Error fetching awaited cases data:', error);
      });

    // Fetch ctool data
    fetch('http://localhost:8080/selection-details/ctool')
      .then(response => response.json())
      .then(data => {
        console.log('CTool data:', data); // Check if data is fetched correctly

        const counts = data.reduce((acc, item) => {
          const { lobName, onboarding_status, bgv_status, updateDate } = item;

          if (!acc[lobName]) {
            acc[lobName] = {
              taggingPending: 0,
              techSelectPending: 0,
              bgvPending: 0,
              hsbcDojAwaited: 0,
              hsbcDojConfirmed: 0,
              total: 0,
              updateDate
            };
          }

          if (onboarding_status === 'CTool Pending' || onboarding_status === 'CTool Recieved') {
            acc[lobName].taggingPending++;
            acc[lobName].total++;
          }
          if (onboarding_status === 'Tagging Completed') {
            acc[lobName].techSelectPending++;
            acc[lobName].total++;
          }
          if (bgv_status === "In progress" || bgv_status === 'BGV Initiated') {
            acc[lobName].bgvPending++;
            acc[lobName].total++;
          }
          if (onboarding_status === 'Tech Selection Done') {
            acc[lobName].hsbcDojAwaited++;
            acc[lobName].total++;
          }
          if (onboarding_status === 'DOJ Recieved') {
            acc[lobName].hsbcDojConfirmed++;
            acc[lobName].total++;
          }

          return acc;
        }, {});

        const processedData = Object.keys(counts).map(lobName => ({
          lobName,
          ...counts[lobName]
        }));

        const filteredCtool = applyFilter(processedData, filter, fromDate, toDate, 'updateDate');
        setCtool(filteredCtool);
      })
      .catch(error => {
        console.error('Error fetching ctool data:', error);
      });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Poll every 60 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [filter, fromDate, toDate]);

  const applyFilter = (data, filter, fromDate, toDate, dateField) => {
    if (!filter && !fromDate && !toDate) {
      return data; // Return all data if no filter is selected
    }

    const currentDate = new Date();
    return data.filter(item => {
      const itemDate = new Date(item[dateField]); // Use the specified date field for filtering
      if (filter === '7days') {
        const past7Days = new Date(currentDate);
        past7Days.setDate(currentDate.getDate() - 7);
        return itemDate >= past7Days && itemDate <= currentDate;
      } else if (filter === 'currentMonth') {
        return itemDate.getMonth() === currentDate.getMonth() && itemDate.getFullYear() === currentDate.getFullYear();
      } else if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        return itemDate >= from && itemDate <= to;
      }
      return true;
    });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.id);
    setFromDate('');
    setToDate('');
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'fromDate') {
      setFromDate(value);
      setToDate(''); // Reset toDate when fromDate changes
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      setFilter('custom');
    }
  }, [fromDate, toDate]);

  const handleRefresh = () => {
    setFilter('');
    setFromDate('');
    setToDate('');
    fetchData();
  };

  return (
    <div>
      <Navbar user={user} />
      <div className="w-full px-8 py-16">
        <h1 className="mt-8 py-2 flex items-center justify-center bg-blue-300 font-bold text-lg md:text-xl">
          HSBC Selection Tracker Dashboard
        </h1>
        <div className="mx-4">
          <div className="flex items-center mt-9 mb-3">
            <div className="flex items-center gap-[1vw]">
              <h2 className="font-semibold text-lg">Current Selections</h2>
              <button
                onClick={() =>
                  handleExportToExcel(
                    selections,
                    "FilteredSelections",
                    "FilteredSelections.xlsx"
                  )
                }
                className=" px-2 py-2 bg-green-700 text-white rounded-full flex justify-center items-center" title='Export Selections'
              >
                <FaFileExcel />
              </button>
              <button onClick={handleRefresh} className=" px-2 py-2 bg-blue-500 text-white rounded-full" title='Refresh'><HiRefresh /></button>


              <div className="flex items-center font-medium text-sm">
                <input type="checkbox" id="7days" className="hidden" onChange={handleFilterChange} checked={filter === '7days'} />
                <label htmlFor="7days" className="flex items-center cursor-pointer text-black font-semibold">
                  <span className={`w-3 h-3 inline-block border border-gray-400 rounded-full mr-2 ${filter === '7days' ? 'bg-blue-500' : ''}`}></span>
                  7 Days
                </label>
              </div>
              <div className="flex items-center font-medium text-sm ">
                <input type="checkbox" id="currentMonth" className="hidden" onChange={handleFilterChange} checked={filter === 'currentMonth'} />
                <label htmlFor="currentMonth" className="flex items-center cursor-pointer text-black font-semibold">
                  <span className={`w-3 h-3 inline-block border border-gray-400 rounded-full mr-2 ${filter === 'currentMonth' ? 'bg-blue-500' : ''}`}></span>
                  Current Month
                </label>
              </div>
              <div className="flex items-center font-medium text-sm">
                <label className="flex items-center cursor-pointer text-black font-semibold">
                  <span className="mr-2">From:</span>
                  <input type="date" name="fromDate" value={fromDate} onChange={handleDateChange} className="p-2 border h-[2.2vw] border-gray-400 rounded-full" />
                </label>
                <label className="flex items-center cursor-pointer text-black font-semibold ml-4">
                  <span className="mr-2">To:</span>
                  <input type="date" name="toDate" value={toDate} onChange={handleDateChange} className="p-2 border h-[2.2vw] border-gray-400 rounded-full" disabled={!fromDate} />
                </label>
              </div>
              
            </div>
          </div>
        </div>
        <div className="mx-2">
          <div className="flex">
            <section className="mb-4 w-1/2">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-400 text-center">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="p-1 border border-gray-500">LOB</th>
                      <th className="p-1 border border-gray-500">FP</th>
                      <th className="p-1 border border-gray-500">TnM</th>
                      <th className="p-1 border border-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selections.length > 0 ? (
                      selections.map((selection, index) => (
                        <tr key={index}>
                          <td className="p-1 border border-gray-500 text-left">{selection.lobName}</td>
                          <td className="p-1 border border-gray-500">{selection.fp}</td>
                          <td className="p-1 border border-gray-500">{selection.tnm}</td>
                          <td className="p-1 border border-gray-500">{selection.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-1 border border-gray-500" colSpan="4">No data available</td>
                      </tr>
                    )}
                    <tr className="bg-blue-100">
                      <td className="p-1 border font-semibold ">Total</td>
                      <td className="p-1 border">{selections.reduce((acc, selection) => acc + selection.fp, 0)}</td>
                      <td className="p-1 border">{selections.reduce((acc, selection) => acc + selection.tnm, 0)}</td>
                      <td className="p-1 border">{selections.reduce((acc, selection) => acc + selection.total, 0)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <div className="flex-grow"></div> {/* Spacer */}
            <section className="w-1/3">
              <PieChart data={chartData} />
            </section>
          </div>
          <section className="mb-8">
            <div className="flex items-center py-2 gap-[1vw]">
              
              <h2 className="font-semibold text-lg">CTool Clear Cases</h2>
              <button
                onClick={() =>
                  handleExportToExcel(ctool, "CTool", "CTool.xlsx")
                }
                className="px-2 py-2 bg-green-700 text-white rounded-full flex justify-center items-center" title='Export Ctool Clear Cases'
              >
                <FaFileExcel />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-gray-400 text-center">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-1 border border-gray-500">LOB</th>
                    <th className="p-1 border border-gray-500">Tagging Pending</th>
                    <th className="p-1 border border-gray-500">Tech Select Pending</th>
                    <th className="p-1 border border-gray-500">BGV Pending</th>
                    <th className="p-1 border border-gray-500">HSBC DOJ Awaited</th>
                    <th className="p-1 border border-gray-500">HSBC DOJ Confirmed</th>
                    <th className="p-1 border border-gray-500">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ctool.length > 0 ? (
                    ctool.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 border border-gray-500 text-left">{item.lobName}</td>
                        <td className="p-3 border border-gray-500">{item.taggingPending}</td>
                        <td className="p-3 border border-gray-500">{item.techSelectPending}</td>
                        <td className="p-3 border border-gray-500">{item.bgvPending}</td>
                        <td className="p-3 border border-gray-500">{item.hsbcDojAwaited}</td>
                        <td className="p-3 border border-gray-500">{item.hsbcDojConfirmed}</td>
                        <td className="p-3 border border-gray-500">{item.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-1 border border-gray-500" colSpan="7">No data available</td>
                    </tr>
                  )}
                  <tr>
                    <td className="p-1 border border-gray-500 bg-blue-100 font-semibold text-left">Total</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{ctool.reduce((acc, item) => acc + item.taggingPending, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{ctool.reduce((acc, item) => acc + item.techSelectPending, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{ctool.reduce((acc, item) => acc + item.bgvPending, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{ctool.reduce((acc, item) => acc + item.hsbcDojAwaited, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{ctool.reduce((acc, item) => acc + item.hsbcDojConfirmed, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{ctool.reduce((acc, item) => acc + item.total, 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <div className="flex items-center py-2 gap-[1vw]">
              <h2 className="font-semibold text-lg">CTool Awaited Cases</h2>
              <button
                onClick={() =>
                  handleExportToExcel(
                    awaitedCases,
                    "AwaitedCases",
                    "AwaitedCases.xlsx"
                  )
                }
                className="px-2 py-2 bg-green-700 text-white rounded-full flex justify-center items-center" title='Export Ctool Awaited Cases'
              >
                <FaFileExcel />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-gray-400 text-center">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-1 border border-gray-500"></th>
                    <th className="p-1 border border-gray-500"></th>
                    <th colSpan="2" className="p-1 border border-gray-500">Joined</th>
                    <th colSpan="2" className="p-1 border border-gray-500">YTJ</th>
                    <th className="p-1 border border-gray-500 ">Grand Total</th>
                  </tr>
                  <tr className="bg-blue-100">
                    <th className="p-1 border border-gray-500">DM</th>
                    <th className="p-1 border border-gray-500">Pricing Model</th>
                    <th className="p-1 border border-gray-500">BGV Completed</th>
                    <th className="p-1 border border-gray-500">In progress</th>
                    <th className="p-1 border border-gray-500">In progress</th>
                    <th className="p-1 border border-gray-500">Offer Yet to be Released</th>
                    <th className="p-1 border border-gray-500 ">Grand Total</th>
                  </tr>
                </thead>
                <tbody>
                  {awaitedCases.length > 0 ? (
                    awaitedCases.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 border border-gray-500 text-left">{item.delivery_manager}</td>
                        <td className="p-3 border border-gray-500">{item.pricing_model}</td>
                        <td className="p-3 border border-gray-500">{item.bgvCompleted}</td>
                        <td className="p-3 border border-gray-500">{item.inProgressCompleted}</td>
                        <td className="p-3 border border-gray-500">{item.inProgressNotCompleted}</td>
                        <td className="p-3 border border-gray-500">{item.offerYetToBeReleased}</td>
                        <td className="p-3 border border-gray-500">{item.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-1 border border-gray-500" colSpan="7">No data available</td>
                    </tr>
                  )}
                  <tr>
                    <td className="p-1 border border-gray-500 bg-blue-100 font-semibold text-left">Grand Total</td>
                    <td className="p-1 border border-gray-500 bg-blue-100"></td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.bgvCompleted, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.inProgressCompleted, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.inProgressNotCompleted, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.offerYetToBeReleased, 0)}</td>
                    <td className="p-1 border border-gray-500 bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.total, 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SelectionTrackerDashboard;