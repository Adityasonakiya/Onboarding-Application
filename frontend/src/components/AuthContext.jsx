import React, { createContext, useContext, useEffect, useState } from "react";
import { rolePermissions } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.log("No user found in localStorage");
      setPermissions({});
      setLoading(false);
      return;
    }

    const psid = JSON.parse(storedUser).psid;
    console.log("Current PSID:", psid);

    try {
      const res = await rolePermissions(psid);
      const normalized = {
        psid: res.psid,
        roleName: res.roleName,
        lobName: res.lobName,
        canViewDashboard: res.canViewDashboard === 1,
        canViewLandingPage: res.canViewLandingPage === 1,
        canAccessAdminDashboard: res.canAccessAdminDashboard === 1,
        canAddSelection: res.canAddSelection === 1,
        canUpdateSelection: res.canUpdateSelection === 1,
        canAccessLob: res.canAccessLob === 1,
        canAccessMasters: res.canAccessMasters === 1,
      };
      setPermissions(normalized);
      console.log("Permissions fetched:", normalized);
    } catch (err) {
      console.error("Error fetching permissions:", err);
      setPermissions({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <AuthContext.Provider value={{ permissions, loading, fetchPermissions, setPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);