import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/ltim.png';


const Login = () => {
  const [form, setForm] = useState({ username: "", otp: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const errors = validate();
    setErrors(errors);
  };

  const validate = () => {
    const errors = {};
    if (!form.username) errors.username = "PSID is required";
    if (otpSent && !form.otp) errors.otp = "OTP is required";
    return errors;
  };

  const sendOtp = async () => {
    setIsSendingOtp(true);
    try {
      const response = await fetch(`http://localhost:8080/employees/${form.username}`);
      if (!response.ok) throw new Error("Invalid PSID");

      const data = await response.json();
      const email = "adityasonakiya29@gmail.com"; // Replace with: const email = data.mailID;

      const otpResponse = await fetch("http://localhost:8080/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (otpResponse.ok) {
        setOtpSent(true);
      } else {
        const errorData = await otpResponse.json();
        setErrors({ submit: errorData.message });
      }
    } catch (error) {
      setErrors({ submit: "PSID does not have access" });
    } finally {
      setIsSendingOtp(false);
    }
  };


  const verifyOtp = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ psid: form.username, otp: form.otp }),
        });

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify({ psid: form.username }));
          navigate("/landing-page");
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.message });
        }
      } catch (error) {
        setErrors({ submit: "OTP verification failed" });
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="md:w-1/2 h-screen flex  bg-blue-600">
        <div className="group text-white p-10 rounded-xl w-full max-w-xl flex flex-col items-center text-center">
          <img
            src={logo}
            alt="Company Logo"
            className="w-63 h-24"
          />
          <h1 className="text-3xl font-bold mb-2 tracking-wide">
            Selection Tracker
          </h1>
          <p className="text-lg font-medium opacity-90 mb-4 ">
            Everything your team needs, in one workspace
          </p>
          <p className="text-sm font-light leading-relaxed px-4">
            The HSBC Onboarding Application (Selection Tracker) is a streamlined solution designed to automate the client onboarding process at HSBC. It reduces manual effort, minimizes errors, and enhances efficiency by providing a centralized platform to manage onboarding activities.
          </p>
        </div>
      </div>

      <form
        className="bg-white p-8 rounded-xl shadow-2xl w-full md:w-1/2 max-w-md mx-auto my-auto transition-all duration-300"
        onSubmit={verifyOtp}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Login</h2>

        <label className="block mb-2 text-base font-semibold text-gray-800 tracking-wide">
          PSID
        </label>

        <input
          type="number"
          name="username"
          placeholder="Enter your PSID"
          value={form.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {touched.username && errors.username && (
          <p className="text-red-500 text-sm mb-4">{errors.username}</p>
        )}

        {!otpSent ? (
          <button
            type="button"
            onClick={sendOtp}
            disabled={isSendingOtp}
            className={`w-full ${isSendingOtp ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-2 px-4 rounded-lg transition duration-200`}
          >
            {isSendingOtp ? "Sending OTP..." : "Send OTP"}
          </button>

        ) : (
          <>
            <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {touched.otp && errors.otp && (
              <p className="text-red-500 text-sm mb-4">{errors.otp}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Verify OTP
            </button>
          </>
        )}

        {errors.submit && (
          <p className="text-red-500 text-sm mt-4 text-center">{errors.submit}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
