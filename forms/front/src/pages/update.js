import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Update() {
  const { id } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate(); // Navigation function
  const [user, setUser] = useState(null); // User state initialized as null
  const [loading, setLoading] = useState(true); // Loading state to handle UI

  // Fetch the specific user data based on the ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${id}`);
        if (!response) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setUser(data); // Set the fetched user data in the state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle input change to update the user state
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      handleSuccess('User updated successfully!');
      setTimeout(() => {
        navigate('/'); // Redirect to the home page after success
      }, 1000);
    } catch (error) {
      console.error('Error updating user:', error.message || error);
    }
  };

  // Render loading state if data is not yet fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the form once the user data is loaded
  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user?.name || ''} // Use fallback to prevent errors
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user?.email || ''} // Use fallback to prevent errors
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user?.password || ''} // Use fallback to prevent errors
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Update;
