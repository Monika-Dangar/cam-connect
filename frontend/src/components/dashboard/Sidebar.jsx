import '../../css/sidebar/sidebar.css';
import '../../css/logout/logout.css';
import React from 'react';
import Link from '../navLink/Link';
import DevicesIcon from '@mui/icons-material/Devices';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userLogout } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate('/account/login');
  };

  return (
    <>
      <div className="container">
        <p className="text">Dashboard</p>

        <Link icon={DevicesIcon} text={'Devices'} to={'devices'} />
        <Link icon={CameraAltIcon} text={'Access Control'} to={'cameras'} />
        <Link icon={CollectionsIcon} text={'Gallery'} to={'gallery'} />
        <Link icon={AccountCircleIcon} text={'Account'} to={'account'} />

        <button onClick={handleLogout} className="logoutBtn">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
