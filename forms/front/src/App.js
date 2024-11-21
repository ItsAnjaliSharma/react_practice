import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your components
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Nopage from './pages/Nopage';




const App = () => {
  return (
    <div>
      

      <Routes>
        {/* Ensure you're passing the components correctly */}
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Nopage />} />


      </Routes>
    </div>
  );
};

export default App;
