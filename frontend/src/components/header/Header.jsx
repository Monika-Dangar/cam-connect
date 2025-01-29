import '../../css/header/header.css';
import React from 'react';
import CameraIcon from '@mui/icons-material/Camera';

const Header = () => {
  return (
    <>
      <div className=" header">
        <CameraIcon className="iconText" />
        <p className="headerText">Cam-connect</p>
      </div>
    </>
  );
};

export default Header;
