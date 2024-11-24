import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'; // Added useNavigate import
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils'; // Ensure these utility functions are correctly implemented
import 'react-toastify/dist/ReactToastify.css'; // Required for Toastify styles

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handlelogin = async (e) => {
    
    e.preventDefault();
    // useNavigate hook to navigate between pages

    const {email, password } = loginInfo;

    if (!email || !password) {
      return handleError('All fields are required');
    }

    try {
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

  

      const result = await response.json();
      const { jwttoken, name, error}= result;
      if (response.ok && result.success) {
        handleSuccess('Successfully Logged In!');
        localStorage.setItem('token', jwttoken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
         // Redirect after successful signup
         navigate('/home');
        }, 1000);

      } else if(error){
        const details=error?.details[0].message;
        handleError(details);
      }
      else if(!result.success){
        handleError(result.message || 'Something went wrong during signup');
      }
    } catch (error) {
      handleError('An error occurred while connecting to the server');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={loginInfo.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={loginInfo.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Login</button>
        <span>
           Don't Have An Account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
