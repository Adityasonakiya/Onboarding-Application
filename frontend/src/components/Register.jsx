import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', email: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // Use navigate hook for navigation

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
    if (!form.username) errors.username = 'Username is required';
    if (!form.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email is invalid';
    if (!form.password) errors.password = 'Password is required';
    else {
      if (form.password.length < 8) errors.password = 'Password must be at least 8 characters';
      if (!/[A-Z]/.test(form.password)) errors.password = 'Password must contain at least one uppercase letter';
      if (!/[a-z]/.test(form.password)) errors.password = 'Password must contain at least one lowercase letter';
      if (!/[0-9]/.test(form.password)) errors.password = 'Password must contain at least one number';
      if (!/[!@#$%^&*]/.test(form.password)) errors.password = 'Password must contain at least one special character';
    }
    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // Simulate successful registration
      localStorage.setItem('user', JSON.stringify({ username: form.username, password: form.password }));
      navigate('/login'); // Navigate to login page after successful registration
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
        <input
          type="number"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full p-2 mb-2 border rounded"
        />
        {touched.username && errors.username && <p className="text-red-500 text-sm mb-4">{errors.username}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full p-2 mb-2 border rounded"
        />
        {touched.email && errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}
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
          <div className="text-red-500 text-sm mb-4">
            {errors.password.includes('characters') && <p>{errors.password}</p>}
            {errors.password.includes('uppercase') && <p>{errors.password}</p>}
            {errors.password.includes('lowercase') && <p>{errors.password}</p>}
            {errors.password.includes('number') && <p>{errors.password}</p>}
            {errors.password.includes('special character') && <p>{errors.password}</p>}
          </div>
        )}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full p-2 mb-2 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {touched.confirmPassword && errors.confirmPassword && <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>}
        <Link to="/login">
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
        </Link>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
