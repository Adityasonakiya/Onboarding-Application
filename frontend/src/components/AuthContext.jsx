import React, { createContext, useContext, useEffect, useState } from "react";
import { rolePermissions } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.log("No user found in localStorage");
      setPermissions(null);
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
        canAccessAdminDashboard: res.canAccessAdminDashboard === 1,
        canAddSelection: res.canAddSelection === 1,
        canUpdateSelection: res.canUpdateSelection === 1,
        canAccessMasters: res.canAccessMasters === 1,
      };
      setPermissions(normalized);
      console.log("Permissions fetched:", normalized);
    } catch (err) {
      console.error("Error fetching permissions:", err);
      setPermissions(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <AuthContext.Provider value={{ permissions, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useEffect, useState } from "react";
// import { rolePermissions } from "../services/api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [permissions, setPermissions] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getPsidFromStorage = () => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser).psid : null;
//   };

//   const [psid, setPsid] = useState(getPsidFromStorage);

//   // Watch for changes in localStorage (same tab + other tabs)
//   useEffect(() => {
//     console.log("AuthContext mounted, initial PSID:", psid);
//     const checkPsid = () => {
//       const currentPsid = getPsidFromStorage();
//       if (currentPsid !== psid) {
//         setPsid(currentPsid);
//         console.log(`PSID changed:`, currentPsid);
//       }
//     };

//     window.addEventListener("storage", checkPsid); // for other tabs
//     const interval = setInterval(checkPsid, 500); // for same tab

//     return () => {
//       window.removeEventListener("storage", checkPsid);
//       clearInterval(interval);
//     };
//   }, []);

//   // Fetch permissions when psid changes
//   useEffect(() => {
//     console.log("Fetching permissions for PSID:", psid);
//     if (!psid) {
//       setPermissions(null);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     rolePermissions(psid)
//       .then((res) => {
//         const normalized = {
//           psid: res.psid,
//           roleName: res.roleName,
//           lobName: res.lobName,
//           canViewDashboard: res.canViewDashboard === 1,
//           canAccessAdminDashboard: res.canAccessAdminDashboard === 1,
//           canAddSelection: res.canAddSelection === 1,
//           canUpdateSelection: res.canUpdateSelection === 1,
//           canAccessMasters: res.canAccessMasters === 1,
//         };
//         setPermissions(normalized);
//         console.log("Permissions fetched:", normalized);
//       })
//       .catch((err) => {
//         console.error("Error fetching role permissions:", err);
//         setPermissions(null);
//       })
//       .finally(() => setLoading(false));
//   }, [psid]);

//   return (
//     <AuthContext.Provider value={{ permissions, loading,psid }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
