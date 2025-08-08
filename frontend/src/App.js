import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SelectionTracker from "./components/SelectionTracker";
import UpdateDetails from "./components/UpdateDetails";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import SelectionTrackerDashboard from "./components/SelectionTrackerDashboard"; // Import SelectionTrackerDashboard component
import Loader from "./components/Loader";
import Admin from "./components/Admin"; // Import Admin
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component
import UnauthorizedPage from "./components/UnauthorizedPage"; // Import UnauthorizedPage component
import { AuthProvider } from "./components/AuthContext";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Loader" element={<Loader />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/" element={<Navigate replace to="/login" />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/landing-page"
          element={
            <AuthProvider>
              <ProtectedRoute permission="canViewDashboard">
                <Layout>
                  <LandingPage />
                </Layout>
              </ProtectedRoute>
            </AuthProvider>
          }
        />

        <Route
          path="/selection-tracker-dashboard"
          element={
            <AuthProvider>
              <ProtectedRoute permission="canViewDashboard">
                <SelectionTrackerDashboard />
              </ProtectedRoute>
            </AuthProvider>
          }
        />

        <Route
          path="/admin"
          element={
            <AuthProvider>
              <ProtectedRoute permission="canAccessAdminDashboard">
                <Layout>
                  <Admin />
                </Layout>
              </ProtectedRoute>
            </AuthProvider>
          }
        />

        <Route
          path="/selection-tracker"
          element={
            <AuthProvider>
              <ProtectedRoute permission="canAddSelection">
                <Layout>
                  <SelectionTracker />
                </Layout>
              </ProtectedRoute>
            </AuthProvider>
          }
        />

        <Route
          path="/update-details"
          element={
            <AuthProvider>
              <ProtectedRoute permission="canUpdateSelection">
                <Layout>
                  <UpdateDetails />
                </Layout>
              </ProtectedRoute>
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
