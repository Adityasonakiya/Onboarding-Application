import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ permission, children }) => {
  const { permissions, loading } = useAuth();

  console.log("ProtectedRoute rendered with permissions:", permissions);
  console.log("PSID recieved:", permissions?.psid);

  if (loading) return <div>Loading...</div>;

  if (!permissions || !permissions.psid) {
    console.warn("User not authenticated. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  if (!permissions[permission]) {
    console.warn("User lacks permission:", permission);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
