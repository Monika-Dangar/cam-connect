import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginsignup from '../pages/Loginsignup'; 
import Dashboard from '../components/Dashboard';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/account/login" element={<Loginsignup />} />
        <Route path="/account/signup" element={<Loginsignup />} />
        <Route path="/user/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
