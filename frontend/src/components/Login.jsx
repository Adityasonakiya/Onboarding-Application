import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
    if (!form.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            psid: form.username,
            password: form.password,
          }),
        });

        if (response.ok) {
          // Simulate successful login
          localStorage.setItem('user', JSON.stringify({ psid: form.username, password: form.password }));
          navigate('/landing-page'); // Navigate to the landing page after successful login
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.message });
        }
      } catch (error) {
        setErrors({ submit: "An error occurred while submitting the form" });
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <input
          type="number"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full p-2 mb-2 border rounded"
        />
        {touched.username && errors.username && (
          <p className="text-red-500 text-sm mb-4">{errors.username}</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full p-2 mb-2 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {touched.password && errors.password && (
          <p className="text-red-500 text-sm mb-4">{errors.password}</p>
        )}
        {errors.submit && (
          <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Forgot Password?{" "}
          <Link to="/reset-password" className="text-blue-500">
            Reset Password
          </Link>
        </p>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched({ ...touched, [name]: true });
//     const errors = validate();
//     setErrors(errors);
//   };

//   const validate = () => {
//     const errors = {};
//     if (!form.username) errors.username = 'Username is required';
//     if (!form.password) errors.password = 'Password is required';
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = validate();
//     if (Object.keys(errors).length === 0) {
//       try {
//         const response = await fetch('http://localhost:8080/api/users/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ psid: form.username, password: form.password }),
//         });

//         if (response.ok) {
//           // Simulate successful login
//           localStorage.setItem('user', JSON.stringify({ psid: form.username, password: form.password }));
//           navigate('/selection-tracker'); // Navigate to the home page after successful login
//         } else {
//           const errorData = await response.json();
//           setErrors({ submit: errorData.message });
//         }
//       } catch (error) {
//         setErrors({ submit: 'An error occurred while submitting the form' });
//       }
//     } else {
//       setErrors(errors);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
//         <input
//           type="number"
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block w-full p-2 mb-2 border rounded"
//         />
//         {touched.username && errors.username && <p className="text-red-500 text-sm mb-4">{errors.username}</p>}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="block w-full p-2 mb-2 border rounded"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>
//         {touched.password && errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}
//         {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
//         <p className="mt-4 text-center">
//           Forgot Password? <Link to="/reset-password" className="text-blue-500">Reset Password</Link>
//         </p>
//         <p className="mt-4 text-center">
//           Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
