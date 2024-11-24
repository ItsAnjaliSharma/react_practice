import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Import your components
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Nopage from './pages/Nopage';
import Refreshhandler from './Refreshhandler';
import Update from './pages/update';
// import EditUser from './components/EditUser';

const App = () => {
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const PrivateRoute=({element})=>{
      return isAuthenticated ? element: <Navigate to='/'/>
  }
  return (
    <div>
       <Refreshhandler  setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        {/* Ensure you're passing the components correctly */}
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<PrivateRoute element={<Home/>}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="*" element={<Nopage />} />


      </Routes>
    </div>
  );
};

export default App;
