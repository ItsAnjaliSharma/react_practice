import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'; // Added useNavigate import
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils'; // Ensure these utility functions are correctly implemented
import 'react-toastify/dist/ReactToastify.css'; // Required for Toastify styles

function Signup() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // useNavigate hook to navigate between pages

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('All fields are required');
    }

    try {
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        handleSuccess('Successfully Registered!');
        setTimeout(() => {
         // Redirect after successful signup
         navigate('/');
        }, 1000);
      } else {
        handleError(result.message || 'Something went wrong during signup');
      }
    } catch (error) {
      handleError('An error occurred while connecting to the server');
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Enter Your Name"
            value={signupInfo.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={signupInfo.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={signupInfo.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Signup</button>
        <span>
          Already Have An Account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
