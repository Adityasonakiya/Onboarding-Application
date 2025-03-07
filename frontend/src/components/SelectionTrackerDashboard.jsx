import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const SelectionTrackerDashboard = ({ user }) => {
  const [selections, setSelections] = useState([]);
  const [ctool, setCtool] = useState([]);
  const [awaitedCases, setAwaitedCases] = useState([]);

  useEffect(() => {
    // Fetch selections data
    fetch('http://localhost:8080/selection-details/selections')
      .then(response => response.json())
      .then(data => {
        console.log('Selections data:', data); // Check if data is fetched correctly

        // Process data to map counts based on pricing model
        const lobCounts = data.reduce((acc, selection) => {
          const { lobName, pricingModel, selectionCount } = selection;
          if (!acc[lobName]) {
            acc[lobName] = { FP: 0, TnM: 0, total: 0 };
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
        }));

        setSelections(processedSelections);
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
          const { delivery_manager, pricing_model, bgv_status, onboarding_status, awaited_count } = item;

          if (!acc[delivery_manager]) {
            acc[delivery_manager] = {
              pricingModel: pricing_model,
              bgvCompleted: 0,
              inProgressCompleted: 0,
              inProgressNotCompleted: 0,
              offerYetToBeReleased: 0,
              total: 0
            };
          }

          if (bgv_status === 'BGV Completed') {
            acc[delivery_manager].bgvCompleted += awaited_count;
            acc[delivery_manager].total += awaited_count;
          }
          if (onboarding_status === 'Onboarding Completed' && bgv_status === 'In progress'){
            acc[delivery_manager].inProgressCompleted += awaited_count;
            acc[delivery_manager].total += awaited_count;
          }
          if (onboarding_status !== 'Onboarding Completed' && bgv_status === 'In progress') {
            acc[delivery_manager].inProgressNotCompleted += awaited_count;
            acc[delivery_manager].total += awaited_count;
          }
          if (bgv_status === 'Offer Yet to be Released') {
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
          total: counts[dm].total
        }));

        setAwaitedCases(processedData);
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
          const { lobName, onboarding_status, bgv_status } = item;

          if (!acc[lobName]) {
            acc[lobName] = {
              taggingPending: 0,
              techSelectPending: 0,
              bgvPending: 0,
              hsbcDojAwaited: 0,
              hsbcDojConfirmed: 0,
              total: 0
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
          if (onboarding_status === 'DOJ Recieved'){ 
            acc[lobName].hsbcDojConfirmed++;
            acc[lobName].total++;
          }
          

          return acc;
        }, {});

        const processedData = Object.keys(counts).map(lobName => ({
          lobName,
          ...counts[lobName]
        }));

        setCtool(processedData);
      })
      .catch(error => {
        console.error('Error fetching ctool data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <div className="w-full px-8 py-16">
        <h1 className="mt-8 py-2 flex items-center justify-center bg-blue-300 font-bold text-lg md:text-xl">
          HSBC Selection Tracker Dashboard
        </h1>
        <div className="mx-4">
          <div className="flex items-center justify-between mt-9 mb-1">
            <div className="flex items-center">
              <h2 className=" font-semibold text-lg">Current Selections</h2>
              <div className="flex items-center ml-8 mx-4 font-medium text-sm">
                <input type="checkbox" id="30days" className="hidden" />
                <label htmlFor="30days" className="flex items-center cursor-pointer text-black font-semibold">
                  <span className="w-3 h-3 inline-block border border-gray-400 rounded-full mr-2"></span>
                  30 Days
                </label>
              </div>
              <div className="flex items-center ml-8 mx-4 font-medium text-sm">
                <input type="checkbox" id="currentMonth" className="hidden" />
                <label htmlFor="currentMonth" className="flex items-center cursor-pointer text-black font-semibold">
                  <span className="w-3 h-3 inline-block border border-gray-400 rounded-full mr-2"></span>
                  Current Month
                </label>
              </div>
              <div className="flex items-center ml-8 mx-4 font-medium text-sm">
                <input type="checkbox" id="currentQuarter" className="hidden" />
                <label htmlFor="currentQuarter" className="flex items-center cursor-pointer text-black font-semibold">
                  <span className="w-3 h-3 inline-block border border-gray-400 rounded-full mr-2"></span>
                  Current Quarter
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <div className="flex">
            <section className="mb-4 w-1/2">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="p-1 border">LOB</th>
                      <th className="p-1 border">FP</th>
                      <th className="p-1 border">TnM</th>
                      <th className="p-1 border">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selections.length > 0 ? (
                      selections.map((selection, index) => (
                        <tr key={index}>
                          <td className="p-1 border">{selection.lobName}</td>
                          <td className="p-1 border">{selection.fp}</td>
                          <td className="p-1 border">{selection.tnm}</td>
                          <td className="p-1 border">{selection.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-1 border" colSpan="4">No data available</td>
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
          </div>

          <section className="mb-8">
            <h2 className="py-2 font-semibold text-lg">CTool Clear Cases</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-1 border">LOB</th>
                    <th className="p-1 border">Tagging Pending</th>
                    <th className="p-1 border">Tech Select Pending</th>
                    <th className="p-1 border">BGV Pending</th>
                    <th className="p-1 border">HSBC DOJ Awaited</th>
                    <th className="p-1 border">HSBC DOJ Confirmed</th>
                    <th className="p-1 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ctool.length > 0 ? (
                    ctool.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 border">{item.lobName}</td>
                        <td className="p-3 border">{item.taggingPending}</td>
                        <td className="p-3 border">{item.techSelectPending}</td>
                        <td className="p-3 border">{item.bgvPending}</td>
                        <td className="p-3 border">{item.hsbcDojAwaited}</td>
                        <td className="p-3 border">{item.hsbcDojConfirmed}</td>
                        <td className="p-3 border">{item.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-1 border" colSpan="7">No data available</td>
                    </tr>
                  )}
                  <tr>
                    <td className="p-1 border bg-blue-100 font-semibold">Total</td>
                    <td className="p-1 border bg-blue-100">{ctool.reduce((acc, item) => acc + item.taggingPending, 0)}</td>
                    <td className="p-1 border bg-blue-100">{ctool.reduce((acc, item) => acc + item.techSelectPending, 0)}</td>
                    <td className="p-1 border bg-blue-100">{ctool.reduce((acc, item) => acc + item.bgvPending, 0)}</td>
                    <td className="p-1 border bg-blue-100">{ctool.reduce((acc, item) => acc + item.hsbcDojAwaited, 0)}</td>
                    <td className="p-1 border bg-blue-100">{ctool.reduce((acc, item) => acc + item.hsbcDojConfirmed, 0)}</td>
                    <td className="p-1 border bg-blue-100">{ctool.reduce((acc, item) => acc + item.total, 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="py-2 font-semibold text-lg">CTool Awaited Cases</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-1 border"></th>
                    <th className="p-1 border"></th>
                    <th colSpan="2" className="p-1 border">Joined</th>
                    <th colSpan="2" className="p-1 border">YTJ</th>
                    <th className="p-1 border ">Grand Total</th>
                  </tr>
                  <tr className="bg-blue-100">
                    <th className="p-1 border">DM</th>
                    <th className="p-1 border">Pricing Model</th>
                    <th className="p-1 border">BGV Completed</th>
                    <th className="p-1 border">In progress</th>
                    <th className="p-1 border">In progress</th>
                    <th className="p-1 border">Offer Yet to be Released</th>
                    <th className="p-1 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {awaitedCases.length > 0 ? (
                    awaitedCases.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 border">{item.delivery_manager}</td>
                        <td className="p-3 border">{item.pricing_model}</td>
                        <td className="p-3 border">{item.bgvCompleted}</td>
                        <td className="p-3 border">{item.inProgressCompleted}</td>
                        <td className="p-3 border">{item.inProgressNotCompleted}</td>
                        <td className="p-3 border">{item.offerYetToBeReleased}</td>
                        <td className="p-3 border">{item.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-1 border" colSpan="7">No data available</td>
                    </tr>
                  )}
                  <tr>
                    <td className="p-1 border bg-blue-100 font-semibold">Grand Total</td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.bgvCompleted, 0)}</td>
                    <td className="p-1 border bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.inProgressCompleted, 0)}</td>
                    <td className="p-1 border bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.inProgressNotCompleted, 0)}</td>
                    <td className="p-1 border bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.offerYetToBeReleased, 0)}</td>
                    <td className="p-1 border bg-blue-100">{awaitedCases.reduce((acc, item) => acc + item.total, 0)}</td>
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