import '../../css/container/main.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  return (
    <>
      <div className="innerContent">
        <Outlet />
      </div>
    </>
  );
};

export default MainContent;
