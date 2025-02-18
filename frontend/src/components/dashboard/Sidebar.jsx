import "../../css/sidebar/sidebar.css";
import React from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Ensure you're using React Router
import DevicesIcon from "@mui/icons-material/Devices";
import AccessibilityNewSharpIcon from "@mui/icons-material/AccessibilityNewSharp";
import CollectionsSharpIcon from "@mui/icons-material/CollectionsSharp";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";

const Sidebar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Navigation */}
      <Box
        sx={{
          minWidth: 50,
          maxWidth: 180,
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "10px 5px",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTab-root": {
              textAlign: "bottom",
              alignItems: "flex-between",
              justifyContent: "flex-start",
              color: "white",
              fontWeight: "normal",
              paddingLeft: "10px",
              "&.Mui-selected": {
                color: "white",
                fontWeight: "bold",
                backgroundColor: "#333",
              },
            },
          }}
        >
          <Tab
            component={Link}
            to="devices"
            icon={<DevicesIcon />}
            iconPosition="start"
            label="Devices"
          />
          <Tab
            component={Link}
            to="cameras"
            icon={<AccessibilityNewSharpIcon />}
            iconPosition="start"
            label="Access Control"
          />
          <Tab
            component={Link}
            to="gallery"
            icon={<CollectionsSharpIcon />}
            iconPosition="start"
            label="Gallery"
          />
          <Tab
            component={Link}
            to="account"
            icon={<AccountBoxSharpIcon />}
            iconPosition="start"
            label="Account"
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default Sidebar;
