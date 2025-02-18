import "../../css/header/header.css";
import React from "react";
import CameraIcon from "@mui/icons-material/Camera";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <div className="header">
      <CameraIcon className="iconText" />
      <Button sx={{ color: "white" }} size="large">
        Cam-connect
      </Button>
    </div>
  );
};

export default Header;
