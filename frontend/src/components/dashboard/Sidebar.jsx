import "../../css/sidebar/sidebar.css";
import React from "react";
import Link from "../navLink/Link";
import DevicesIcon from "@mui/icons-material/Devices";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
  return (
    <>
      <div className="container">
        <p className="text">Dashboard</p>

        <Link icon={DevicesIcon} text={"Devices"} to={"devices"} />
        <Link icon={CameraAltIcon} text={"Access Control"} to={"cameras"} />
        <Link icon={CollectionsIcon} text={"Gallery"} to={"gallery"} />
        <Link icon={AccountCircleIcon} text={"Account"} to={"account"} />
      </div>
    </>
  );
};

export default Sidebar;
