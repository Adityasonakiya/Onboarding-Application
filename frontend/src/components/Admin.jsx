import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Slide, ToastContainer, toast } from "react-toastify";
//import { useAuth } from './AuthContext';
import {
  createVendor,
  getAllVendors,
  getVendorById,
  changeVendorStatus,
  editVendor,
  countVendorCandidates,
  createRole,
  getRoleById,
  updateRole,
  getAllRoles,
  countByRoles,
  getEmployeeByPsid,
  fetchLob,
  fetchLobs,
  fetchAllLobs,
  countByLob,
  changeLobStatus,
  updateLob,
  updateEmployee,
  getSelectionDetailsByPsId,
} from "../services/api";

export default function Admin() {
  const navigate = useNavigate();
  //const {auth} = useAuth()
  const [activeTab, setActiveTab] = useState("admin");
  const [adminActiveTab, setAdminActiveTab] = useState("employee");
  const [lobs, setLobs] = useState([]);
  const [allLobs, setAllLobs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [roles, setRoles] = useState([]);
  const [empForm, setEmpForm] = useState({
    psId: "",
    name: "",
    roles: { roleName: "", roleId: "" },
    lob: [{ lobName: "", lobId: "" }],
  });
  const [vendorForm, setVendorForm] = useState({
    vendorId: "",
    vendorName: "",
  });
  const [roleForm, setRoleForm] = useState({
    roleId: "",
    roleName: "",
    roleFunctions: "",
    // remarks: "",
  });
  const [lobForm, setLobForm] = useState({
    lobId: "",
    lobName: "",
    deliveryManager: "",
    salesSpoc: "",
    hsbcHead: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Tab click handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "dashboard") {
      navigate("/selection-tracker-dashboard");
    } else if (tab === "myselection") {
      navigate("/landing-page");
    }
  };

  const handleAdminTabClick = (tab) => {
    setAdminActiveTab(tab);
  };

  const SELECT_ALL_VALUE = "*";

  const enhancedLobOptions = [
    { value: SELECT_ALL_VALUE, label: "Select All" },
    ...lobs.map((lob) => ({
      value: lob.lobName,
      label: lob.lobName,
    })),
  ];

  const fetchVendors = async () => {
    try {
      const vendorsList = await getAllVendors();
      // Fetch counts for each vendor in parallel
      const vendorsWithCounts = await Promise.all(
        vendorsList.map(async (vendor) => {
          const countObj = await countVendorCandidates(vendor.vendorId);
          // If your API returns {count: 5}, use countObj.count
          return { ...vendor, count: countObj };
        })
      );
      setVendors(vendorsWithCounts);
    } catch (error) {
      alert("Error fetching vendors");
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesList = await getAllRoles();
      // Fetch counts for each role in parallel
      const rolesWithCounts = await Promise.all(
        rolesList.map(async (role) => {
          const countObj = await countByRoles(role.roleId);
          // If your API returns {count: 5}, use countObj.count
          return { ...role, count: countObj };
        })
      );
      setRoles(rolesWithCounts);
    } catch {
      alert("Error fetching roles");
    }
  };

  const getLobs = async () => {
    try {
      setLobs(await fetchLobs());
    } catch {
      alert("Error fetching LOBs");
    }
  };

  const getAllLobs = async () => {
    try {
      const allLobs = await fetchAllLobs();
      const lobCounts = await Promise.all(
        allLobs.map(async (lob) => {
          const countObj = await countByLob(lob.lobId);
          return { ...lob, count: countObj };
        })
      );
      setAllLobs(lobCounts);
    } catch {
      alert("Error fetching LOBs");
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    getLobs();
  }, []);

  useEffect(() => {
    getAllLobs();
  }, []);

  const handleFormChange = (e) => {
    setEmpForm({ ...empForm, [e.target.name]: e.target.value });
    setVendorForm({ ...vendorForm, [e.target.name]: e.target.value });
    setRoleForm({ ...roleForm, [e.target.name]: e.target.value });
    setLobForm({ ...lobForm, [e.target.name]: e.target.value });
  };

  const handlePsIdChange = async (e) => {
    const psId = e.target.value;
    setEmpForm((prev) => ({ ...prev, psId }));

    // Only proceed if length is at least 6 characters
    try {
      const emp = await getEmployeeByPsid(psId);
      const selection = await getSelectionDetailsByPsId(psId);

      if (emp) {
        setEmpForm((prev) => ({
          ...prev,
          name: emp.firstName + " " + emp.lastName || "",
          roles: {
            roleId: emp.roles?.roleId,
            roleName: emp.roles?.roleName,
            roleFunctions: emp.roles?.roleFunctions,
          },
          lob: selection.lob ? [selection.lob.lobName] : [],
        }));
        console.log(emp);
      }
    } catch {} // Wait 500ms after typing stops
  };

  const handleEdit = async (id) => {
    if (adminActiveTab === "vendor") {
      try {
        const vendor = await getVendorById(id);
        setVendorForm({
          vendorId: vendor.vendorId,
          vendorName: vendor.vendorName,
          status: true,
        });
        setEditMode(true);
      } catch {
        alert("Error fetching vendor details");
      }
    } else if (adminActiveTab === "roles") {
      try {
        const role = await getRoleById(id);
        setRoleForm({
          roleId: role.roleId,
          roleName: role.roleName,
          roleFunctions: role.roleFunctions,
        });
        setEditMode(true);
      } catch {
        alert("Error editing details");
      }
    } else if (adminActiveTab === "lob") {
      try {
        const lob = await fetchLob(id);
        setLobForm({
          lobId: id,
          lobName: lob.lobName,
          deliveryManager: lob.deliveryManager,
          salesSpoc: lob.salesPOC,
          hsbcHead: lob.hsbchead,
        });
        setEditMode(true);
      } catch {
        alert("Error editing details");
      }
    }
  };

  const handleAddOrEditVendor = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")).psid;
    if (!vendorForm.vendorName) return;
    try {
      if (editMode) {
        await editVendor(vendorForm.vendorId, {
          vendorId: vendorForm.vendorId,
          vendorName: vendorForm.vendorName,
          updatedBy: user,
        });
      } else {
        await createVendor({
          vendorName: vendorForm.vendorName,
          createdBy: user,
          updatedBy: user,
        });
      }
      setVendorForm({ vendorName: "" });
      setEditMode(false);
      fetchVendors();
    } catch {
      alert("Error adding/editing vendor");
    }
  };

  const handleAddOrEditRole = async (e) => {
    e.preventDefault();
    if (!roleForm.roleName) return;
    try {
      if (editMode) {
        await updateRole(roleForm.roleId, {
          roleId: roleForm.roleId,
          roleName: roleForm.roleName,
          roleFunctions: roleForm.roleFunctions,
          // remarks: roleForm.remarks,
        });
      } else {
        await createRole({
          roleName: roleForm.roleName,
          roleFunctions: roleForm.roleFunctions,
          //remarks: roleForm.remarks,
        });
      }
      setRoleForm({ roleId: "", roleName: "", roleFunctions: "" });
      setEditMode(false);
      fetchRoles();
      toast.success("Role added successfully");
    } catch {
      alert("Error adding role");
    }
  };

  const handleEmp = async (e) => {
    if (!empForm.psId || !empForm.roles || !empForm.lob) {
      alert("Please fill all required fields.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user")).psid;
    try {
      const updatedEmployee = {
        psid: empForm.psId,
        firstName: empForm.name.split(" ")[0] || "",
        lastName: empForm.name.split(" ")[1] || "",
        roles: {
          roleId: empForm.roles?.roleId,
          roleName: empForm.roles?.roleName,
          roleFunctions: empForm.roles?.roleFunctions,
        },
        updatedBy: user,
      };

      await updateEmployee(empForm.psId, updatedEmployee);

      console.log(
        "Employee updated successfully",
        empForm.psId,
        empForm.roles,
        empForm.lob
      );
      toast.success("Employee and role updated successfully");
      //3. Reset form
      setEmpForm({
        psId: "",
        name: "",
        roles: "",
        lob: [],
      });
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error updating employee or role");
    }
  };

  const handleLobUpdate = async (e) => {
    e.preventDefault();
    if (!lobForm.lobName) return;
    try {
      if (editMode) {
        await updateLob(lobForm.lobId, {
          lobId: lobForm.lobId,
          lobName: lobForm.lobName,
          deliveryManager: lobForm.deliveryManager,
          salesPOC: lobForm.saleSpoc,
          hsbchead: lobForm.hsbcHead,
        });
        console.log(lobForm);
      }
      toast.success("Lob updated successfully");
      setLobForm({
        lobId: "",
        lobName: "",
        deliveryManager: "",
        salesSpoc: "",
        hsbcHead: "",
      });
      setEditMode(false);
      getAllLobs();
    } catch {
      alert("Error updating LOB details");
    }
  };

  const handleStatusChange = async (id) => {
    if (adminActiveTab === "lob") {
      try {
        await changeLobStatus(id);
        toast.success("Status changed successfully");
        getAllLobs();
      } catch {
        alert("Error changing LOB status");
      }
    } else {
      try {
        await changeVendorStatus(id);
        toast.success("Status changed successfully");
        fetchVendors();
      } catch {
        alert("Error changing vendor status");
      }
    }
  };

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="flex items-center mb-4 mt-2 px-4 border-b">
        {" "}
        {/* <-- Added bg-gray-100 */}
        <button
          className={`px-4 py-2 font-semibold focus:outline-none ${
            activeTab === "myselection"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => handleTabClick("myselection")}
        >
          My Selection
        </button>
        <button
          className={`px-4 py-2 font-semibold ml-2 focus:outline-none ${
            activeTab === "dashboard"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => handleTabClick("dashboard")}
        >
          Selection Tracker Dashboard
        </button>
        <button
          className={`px-4 py-2 font-semibold ml-2 focus:outline-none ${
            activeTab === "admin"
              ? "border-b-2 border-blue-800 text-blue-800"
              : "text-gray-600"
          }`}
          onClick={() => handleTabClick("admin")}
        >
          Admin Dashboard
        </button>
      </div>
      <div className="flex mb-2 border-b">
        {" "}
        {/* <-- Added bg-gray-100 */}
        <button
          className={`px-4 py-2 font-semibold ml-2 focus:outline-none ${
            adminActiveTab === "employee"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => handleAdminTabClick("employee")}
        >
          User Roles
        </button>
        <button
          className={`px-4 py-2 font-semibold focus:outline-none ${
            adminActiveTab === "vendor"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => handleAdminTabClick("vendor")}
        >
          Vendors
        </button>
        <button
          className={`px-4 py-2 font-semibold focus:outline-none ${
            adminActiveTab === "roles"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => handleAdminTabClick("roles")}
        >
          Roles
        </button>
        <button
          className={`px-4 py-2 font-semibold focus:outline-none ${
            adminActiveTab === "lob"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => handleAdminTabClick("lob")}
        >
          LOB
        </button>
      </div>
      <div className="p-4">
        {adminActiveTab === "employee" && (
          <div className="flex gap-8 items-start">
            <form className="w-96" onSubmit={handleEmp}>
              <div className="flex items-center mb-2">
                <label className="font-medium w-36">PS ID : </label>
                <input
                  type="text"
                  value={empForm.psId}
                  name="psId"
                  onChange={handlePsIdChange}
                  className="border px-2 py-1 rounded text-sm w-64"
                  required
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="font-medium w-36">Employee Name : </label>
                <input
                  type="text"
                  value={empForm.name}
                  name="name"
                  onChange={handleFormChange}
                  className="border px-2 py-1 rounded text-sm w-64"
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="font-medium w-36">Roles : </label>
                <select
                  name="roles"
                  value={empForm.roles?.roleId || ""}
                  onChange={(e) => {
                    const selectedRoleId = parseInt(e.target.value, 10); // if roleId is a number
                    const selectedRole = roles.find(
                      (r) => r.roleId === selectedRoleId
                    );

                    if (selectedRole) {
                      setEmpForm((prev) => ({
                        ...prev,
                        roles: selectedRole,
                      }));
                    }
                  }}
                  className="border px-2 py-1 rounded text-sm w-64"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mb-2">
                <label className="font-medium w-36">LOB : </label>
                <Select
                  isMulti
                  name="lob"
                  options={enhancedLobOptions}
                  value={
                    empForm.lob.includes(SELECT_ALL_VALUE)
                      ? enhancedLobOptions
                      : enhancedLobOptions.filter((opt) =>
                          empForm.lob.includes(opt.value)
                        )
                  }
                  onChange={(selected) => {
                    const selectedValues = selected.map((opt) => opt.value);

                    if (selectedValues.includes(SELECT_ALL_VALUE)) {
                      setEmpForm((prev) => ({
                        ...prev,
                        lob: [
                          SELECT_ALL_VALUE,
                          ...lobs.map((lob) => lob.lobName),
                        ],
                      }));
                    } else {
                      setEmpForm((prev) => ({
                        ...prev,
                        lob: selectedValues,
                      }));
                    }
                  }}
                  className="text-sm w-64"
                />
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  type="reset"
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() =>
                    setEmpForm({
                      psId: "",
                      name: "",
                      roles: "",
                      lob: [{ lobName: "", lobId: "" }],
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {adminActiveTab === "vendor" && (
          <div>
            {/* Mini Form for Add/Edit Vendor */}
            <form
              className="mb-4 flex flex-col md:flex-row gap-2 items-center"
              onSubmit={handleAddOrEditVendor}
            >
              {editMode && (
                <input
                  type="text"
                  value={vendorForm.vendorId}
                  disabled
                  className="border px-2 py-1 rounded bg-gray-100"
                  placeholder="Vendor ID"
                />
              )}
              <input
                type="text"
                value={vendorForm.vendorName}
                onChange={handleFormChange}
                name="vendorName"
                className="border px-2 py-1 rounded"
                placeholder="Vendor Name"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                {editMode ? "Update" : "Add"}
              </button>
              {editMode && (
                <button
                  type="reset"
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setVendorForm({ vendorId: "", vendorName: "" });
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={fetchVendors}
              >
                Refresh Table
              </button>
            </form>
            {/* Vendor Table */}
            <table className="p-1 border text-center w-1/3">
              <thead>
                <tr className="p-1 border text-center">
                  <th className="p-1 border text-center">Vendor ID</th>
                  <th className="p-1 border text-center">Vendor Name</th>
                  <th className="p-1 border text-center">Count</th>
                  <th className="p-1 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No vendors found.</td>
                  </tr>
                ) : (
                  vendors.map((vendor, idx) => (
                    <tr
                      className="p-1 border text-center"
                      key={vendor.vendorId}
                    >
                      <td className="p-1 border text-center">{idx + 1}</td>
                      <td className="p-1 border text-center">
                        {vendor.vendorName}
                      </td>
                      <td className="p-1 border text-center">{vendor.count}</td>
                      <td className="p-1 border text-center">
                        <button
                          className="bg-indigo-600 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleEdit(vendor.vendorId)}
                        >
                          Edit
                        </button>
                        <button
                          className={`px-2 py-1 rounded transition-colors ${
                            vendor.status === false
                              ? "bg-gray-400 hover:bg-gray-500 text-white"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                          onClick={() => handleStatusChange(vendor.vendorId)}
                        >
                          {vendor.status === false ? "Inactive" : "Active"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {adminActiveTab === "roles" && (
          <div className="flex gap-8 items-start">
            <form className="w-96" onSubmit={handleAddOrEditRole}>
              {editMode && (
                <div className="flex items-center mb-2">
                  <label className="font-medium w-36">Role Id : </label>
                  <input
                    type="text"
                    value={roleForm.roleId}
                    onChange={handleFormChange}
                    disabled
                    name="roleId"
                    className="border px-2 py-1 rounded"
                  />
                </div>
              )}
              <div className="flex items-center mb-2">
                <label className="font-medium w-36">Role Name : </label>
                <input
                  type="text"
                  value={roleForm.roleName}
                  onChange={handleFormChange}
                  name="roleName"
                  className="border px-2 py-1 rounded"
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="font-medium w-36">Role Description : </label>
                <input
                  type="text"
                  value={roleForm.roleFunctions}
                  onChange={handleFormChange}
                  name="roleFunctions"
                  className="border px-2 py-1 rounded"
                />
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {editMode ? "Update" : "Add"}
                </button>
                {editMode && (
                  <button
                    type="reset"
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setRoleForm({
                        roleId: "",
                        roleName: "",
                        roleFunctions: "",
                      });
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={fetchRoles}
                >
                  Refresh Table
                </button>
              </div>
            </form>
            {/* Role Table */}
            <table className="p-1 border text-center w-1/3">
              <thead>
                <tr className="p-1 border text-center">
                  <th className="p-1 border text-center">Role ID</th>
                  <th className="p-1 border text-center">Role Name</th>
                  <th className="p-1 border text-center">Role Description</th>
                  <th className="p-1 border text-center">Count</th>
                  <th className="p-1 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No Roles found.</td>
                  </tr>
                ) : (
                  roles.map((role, idx) => (
                    <tr className="p-1 border text-center" key={role.roleId}>
                      <td className="p-1 border text-center">{idx + 1}</td>
                      <td className="p-1 border text-center">
                        {role.roleName}
                      </td>
                      <td className="p-1 border text-center">
                        {role.roleFunctions}
                      </td>
                      <td className="p-1 border text-center">{role.count}</td>
                      <td className="p-1 border text-center">
                        <button
                          className="bg-indigo-600 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleEdit(role.roleId)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {adminActiveTab === "lob" && (
          <div className="flex gap-6 items-start">
            {editMode && (
              <form onSubmit={handleLobUpdate} className="w-96">
                <div className="flex items-center mb-2">
                  <label className="font-medium w-36">Lob Id : </label>
                  <input
                    type="text"
                    value={lobForm.lobId}
                    onChange={handleFormChange}
                    name="lobId"
                    className="border px-2 py-1 rounded"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-medium w-36">Lob Name : </label>
                  <input
                    type="text"
                    value={lobForm.lobName}
                    onChange={handleFormChange}
                    name="lobName"
                    className="border px-2 py-1 rounded"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-medium w-36">
                    Delivery Manager :{" "}
                  </label>
                  <input
                    type="text"
                    value={lobForm.deliveryManager}
                    onChange={handleFormChange}
                    name="deliveryManager"
                    className="border px-2 py-1 rounded"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-medium w-36">Sales SPOC : </label>
                  <input
                    type="text"
                    value={lobForm.salesSpoc}
                    onChange={handleFormChange}
                    name="salesSpoc"
                    className="border px-2 py-1 rounded"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-medium w-36">HSBC Head : </label>
                  <input
                    type="text"
                    value={lobForm.hsbcHead}
                    onChange={handleFormChange}
                    name="hsbcHead"
                    className="border px-2 py-1 rounded"
                  />
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
                  >
                    Update
                  </button>
                  <button
                    type="reset"
                    className="bg-gray-400 text-white px-3 py-1 rounded mb-2"
                    onClick={() => {
                      setLobForm({
                        lobId: "",
                        lobName: "",
                        deliveryManager: "",
                        salesSpoc: "",
                        hsbcHead: "",
                      });
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* lob Table */}
            <div className="p-1 w-1/2">
              <button
                type="button"
                className="bg-green-500 text-white px-3 py-1 rounded mb-2"
                onClick={getAllLobs}
              >
                Refresh Table
              </button>
              <table className="p-1 border text-center">
                <thead>
                  <tr className="p-1 border text-center">
                    <th className="p-1 border text-center">LOB ID</th>
                    <th className="p-1 border text-center">LOB Name</th>
                    <th className="p-1 border text-center">Delivery Manager</th>
                    <th className="p-1 border text-center">Count</th>
                    <th className="p-1 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allLobs.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No LOBs found.</td>
                    </tr>
                  ) : (
                    allLobs.map((lob) => (
                      <tr className="p-1 border text-center" key={lob.lobId}>
                        <td className="p-1 border text-center">{lob.lobId}</td>
                        <td className="p-1 border text-center">
                          {lob.lobName}
                        </td>
                        <td className="p-1 border text-center">
                          {lob.deliveryManager || "-"}
                        </td>
                        <td className="p-1 border text-center">
                          {lob.count || 0}
                        </td>
                        <td className="p-1 border text-center w-1/4">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              className="bg-indigo-600 hover:bg-indigo-700  text-white px-4 py-1 rounded"
                              onClick={() => handleEdit(lob.lobId)}
                            >
                              Edit
                            </button>
                            <button
                              className={`w-24 py-1 rounded transition-colors ${
                                lob.active === false
                                  ? "bg-gray-400 hover:bg-gray-500 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                              onClick={() => handleStatusChange(lob.lobId)}
                            >
                              {lob.active === false ? "Inactive" : "Active"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
