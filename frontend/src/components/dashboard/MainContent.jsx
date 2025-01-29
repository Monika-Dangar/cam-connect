import '../../css/container/main.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  return (
    <>
      <div className="mainContainer">
        {/* <p>MainContent</p> */}
        <Outlet />
      </div>
    </>
  );
};

export default MainContent;
