import React from "react";
import Sidebar from "../dashboard/Sidebar";
import MainContent from "../dashboard/MainContent";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="flex justify-between">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
