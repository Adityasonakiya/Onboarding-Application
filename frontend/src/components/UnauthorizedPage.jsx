import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.psid) {
      // Optional: If you want to notify backend (not required for stateless OTP flow)
      fetch("http://localhost:8080/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ psid: user.psid }),
      }).catch((err) => console.error("Logout API failed:", err));
    }

    localStorage.removeItem("user"); // Clear user info
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Unauthorized
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have permission to access this page.
      </p>
      <button
        onClick={() => navigate("/landing-page")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Landing Page
      </button>
      <button
        onClick={handleLogout}
        className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Unauthorized;
