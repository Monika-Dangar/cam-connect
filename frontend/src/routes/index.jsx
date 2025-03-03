import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import DeviceLayout from "../components/device/DeviceLayout";
import Camera from "../components/camera/Camera";
import Gallery from "../components/gallery/Gallery";
import Account from "../components/account/Account";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Dashboard from "../components/dashboard/Dashboard";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
function AppRoutes() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthenticated(!!localStorage.getItem("token"));
    };

    handleStorageChange();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes isAuthenticated={authenticated} />}>
          <Route path="/" element={<Navigate to="account/login" />} />
          <Route
            path="/account/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route path="/account/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes isAuthenticated={authenticated} />}>
          <Route path="/user/dashboard" element={<Dashboard />}>
            <Route path="" element={<Navigate to="devices" />} />
            <Route path="devices" element={<DeviceLayout />} />
            <Route path="cameras" element={<Camera />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
