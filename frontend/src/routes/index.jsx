import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Loginsignup from "../pages/Loginsignup";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="account/login" />} />
        <Route path="/account/login" element={<Loginsignup />} />
        <Route path="/account/signup" element={<Loginsignup />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
