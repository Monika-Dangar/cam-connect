import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Loginsignup from "../pages/Loginsignup";
import Home from '../pages/Home'
import DeviceLayout from "../components/device/DeviceLayout";
import Camera from '../components/camera/Camera'
import Gallery from '../components/gallery/Gallery'
import Account from '../components/account/Account'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="account/login" />} />
        <Route path="/account/login" element={<Loginsignup />} />
        <Route path="/account/signup" element={<Loginsignup />} />
        <Route path="/user/dashboard" element={<Home />} >
        <Route path="" element={<Navigate to="devices" />} />
          <Route path="devices" element={<DeviceLayout/>}/>
          <Route path="cameras" element={<Camera/>}/>
          <Route path="gallery" element={<Gallery/>}/>
          <Route path="account" element={<Account/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
