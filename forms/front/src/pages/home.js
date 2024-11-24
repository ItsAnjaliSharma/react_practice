import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser') || '';
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out Successfully...');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const fetchUsersData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUsersData(data.users);
      setShowTable(true);
      handleSuccess('Users data fetched successfully!');
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const handleEdit = (_id) => {
    navigate(`/update/${_id}`); // Redirect to an edit page
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      handleSuccess(`User with ID ${_id} deleted successfully!`);
      setUsersData(usersData.filter((user) => user._id !== _id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {loggedInUser || 'Guest'}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <button onClick={fetchUsersData}>Users Data</button>
      {showTable && (
        <table border="1" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user._id)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
