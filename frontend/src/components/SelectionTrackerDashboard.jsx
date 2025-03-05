import React from 'react';
import Navbar from './Navbar';

const SelectionTrackerDashboard = ({ user }) => {
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
                    <tr>
                      <td className="p-1 border">WSIT</td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                    </tr>
                    <tr>
                      <td className="p-1 border">WPB</td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                    </tr>
                    <tr>
                      <td className="p-1 border">ET</td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                    </tr>
                    <tr>
                      <td className="p-1 border">MSS</td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                    </tr>
                    <tr className="bg-blue-100">
                      <td className="p-1 border font-semibold ">Total</td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
                      <td className="p-1 border"></td>
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
                  <tr>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                  </tr>
                  <tr>
                    <td className="p-1 border bg-blue-100 font-semibold">Total</td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
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
                    <th  className="p-1 border ">Grand Total</th>
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
                  <tr>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border"></td>
                  </tr>
                  <tr>
                    <td className="p-1 border bg-blue-100 font-semibold">Grand Total</td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-1 border bg-blue-100"></td>
                    <td className="p-3 border bg-blue-100"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SelectionTrackerDashboard;
