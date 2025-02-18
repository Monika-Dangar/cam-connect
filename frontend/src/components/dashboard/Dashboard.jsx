import React from 'react';
import Sidebar from '../dashboard/Sidebar';
import MainContent from '../dashboard/MainContent';
import Header from '../header/Header';

const Dashboard = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="dashboardContainer">
        <Sidebar />
        <div className="mainContentWrapper">
          <MainContent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
