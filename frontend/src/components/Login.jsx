import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", otp: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [otpSent, setOtpSent] = useState(false);
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
    if (!form.username) errors.username = "Username is required";
    if (otpSent && !form.otp) errors.otp = "OTP is required";
    return errors;
  };

  const sendOtp = async () => {
    try {
      const response = await fetch(`http://localhost:8080/employees/${form.username}`);
      if (!response.ok) throw new Error("Invalid PSID");

      const data = await response.json();
      // const email=data.mailID;
      const email = "adityasonakiya29@gmail.com";

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
      setErrors({ submit: "Above PSID does not have access" });
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={verifyOtp}>
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <input
          type="number"
          name="username"
          placeholder="PSID"
          value={form.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full p-2 mb-2 border rounded"
        />
        {touched.username && errors.username && (
          <p className="text-red-500 text-sm mb-4">{errors.username}</p>
        )}

        {!otpSent ? (
          <button type="button" onClick={sendOtp} className="w-full bg-blue-500 text-white p-2 rounded">
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full p-2 mb-2 border rounded"
            />
            {touched.otp && errors.otp && (
              <p className="text-red-500 text-sm mb-4">{errors.otp}</p>
            )}
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
              Verify OTP
            </button>
          </>
        )}

        {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}

        {/* <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p> */}
      </form>
    </div>
  );
};

export default Login;
