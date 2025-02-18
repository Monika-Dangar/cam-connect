import '../../css/container/main.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  return (
    <>
      <div className="mainContent">
        <Outlet />
      </div>
    </>
  );
};

export default MainContent;
