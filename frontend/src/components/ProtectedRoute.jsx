import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ permission, children }) => {
  const { permissions, loading } = useAuth();

  console.log("ProtectedRoute rendered with permissions:", permissions);
  console.log("PSID recieved:",permissions?.psid)

  if (loading) return <div>Loading...</div>;

  if (!permissions) {
    console.warn("No permissions found. Redirecting to unauthorized.");
    return <Navigate to="/unauthorized" />;
  }

  if (!permissions[permission]) {
    console.warn("Permission denied:", permission);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
