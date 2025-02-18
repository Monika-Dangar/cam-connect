import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import DeviceLayout from '../components/device/DeviceLayout';
import Camera from '../components/camera/Camera';
import Gallery from '../components/gallery/Gallery';
import Account from '../components/account/Account';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="account/login" />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/user/dashboard" element={<Home />}>
          <Route path="" element={<Navigate to="devices" />} />
          <Route path="devices" element={<DeviceLayout />} />
          <Route path="cameras" element={<Camera />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
