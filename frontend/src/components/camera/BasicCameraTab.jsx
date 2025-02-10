import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Search from "./Search";
import ApprovedRequest from "./ApprovedRequest";
import PendingRequest from "./PendingRequest";
import Notifications from "./Notifications";
// import DeviceDetailModal from "../modal/DeviceDetailModal";
import cameraServies from "../../services/cameraServices";

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

export default function BasicCameraTab() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const [showModal, setshowModal] = React.useState(false);
  // const handleModal = () => {
  //   setshowModal((prev) => !prev);
  // };
  const [deviceData, setDeviceData] = React.useState([]);
  const [type, setType] = React.useState();
  React.useEffect(() => {
    const fetchApprovedDevices = async () => {
      setType("approved");
      const response = await cameraServies.getApprovedDevice();
      console.log(response);
      if (response) {
        setDeviceData(response);
      }
    };

    const fetchPendingDevices = async () => {
      setType("pending");
      const response = await cameraServies.getPendingDevice();
      if (response) {
        setDeviceData(response);
      }
    };
    if (value == 0) {
      fetchApprovedDevices();
    } else if (value == 1) {
      fetchPendingDevices();
    }
  }, [value]);
  return (
    <Box className="boxStyling">
      <Box sx={{ width: "50%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTab-root": {
                color: "gray", // Inactive tab color
                fontWeight: "normal", // Normal font weight for inactive tabs
                "&.Mui-selected": {
                  color: "white", // Selected tab color
                  fontWeight: "bold", // Bold text for the active tab
                },
              },
            }}
          >
            <Tab label="Approved Request" {...a11yProps(0)} />
            <Tab label="Pending Request" {...a11yProps(1)} />
            <Tab label="Notifications" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ApprovedRequest
            // handleModal={handleModal}
            approvedDeviceData={deviceData}
            response={deviceData}
            setDeviceData={setDeviceData}
            type={type}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <PendingRequest
            // handleModal={handleModal}
            pendingDeviceData={deviceData}
            response={deviceData}
            setDeviceData={setDeviceData}
            type={type}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Notifications />
        </CustomTabPanel>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Search />
      </Box>
      {/* {showModal && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 9,
              backgroundColor: "rgb(189, 189, 189, 0.1)",
            }}
            onClick={handleModal}
          />

          <DeviceDetailModal
            handleModal={handleModal}
            response={deviceData}
            type={type}
          />
        </>
      )} */}
    </Box>
  );
}
