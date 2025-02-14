import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Devices from "../device/Devices";
import SharedWithOthers from "./SharedWithOthers";
import SharedWithMe from "./SharedWithMe";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTab-root": {
              color: "gray", // Inactive tab color
              fontWeight: "normal", // Normal font weight for inactive tabs
              width: 200,
              "&.Mui-selected": {
                color: "white", // Selected tab color
                fontWeight: "bold", // Bold text for the active tab
              },
            },
          }}
        >
          <Tab label="My Devices" {...a11yProps(0)} />
          <Tab label="Shared with me" {...a11yProps(1)} />
          <Tab label="Shared with others" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Devices />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SharedWithMe />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SharedWithOthers />
      </CustomTabPanel>
    </Box>
  );
}
