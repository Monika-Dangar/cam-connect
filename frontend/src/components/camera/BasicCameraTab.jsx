import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Search from "./Search";
import ApprovedRequest from "./ApprovedRequest";
import PendingRequest from "./PendingRequest";
import Notifications from "./Notifications";
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

  const [deviceData, setDeviceData] = React.useState([]);
  const [type, setType] = React.useState();
  React.useEffect(() => {
    const fetchApprovedDevices = async () => {
      setType("approved");
      const response = await cameraServies.getApprovedDevice();

      if (response) {
        const result = Object.values(groupedData(response));
        setDeviceData(result);
      }
    };
    const groupedData = (response) => {
      return response.reduce((acc, curr) => {
        const { requesterId, deviceId } = curr;
        if (!acc[requesterId.username]) {
          acc[requesterId.username] = {
            requester: requesterId,
            devices: [],
          };
        }
        acc[requesterId.username].devices.push(deviceId);
        return acc;
      }, {});
    };
    const groupedDeniedData = (response) => {
      return response.reduce((acc, curr) => {
        const { ownerId, deviceId } = curr;
        if (!acc[ownerId.username]) {
          acc[ownerId.username] = {
            requester: ownerId, //THIS REQUESTER SHOULD BE OWNER I HAVE JUST KEEP NAME SAME
            devices: [],
          };
        }
        acc[ownerId.username].devices.push(deviceId);
        return acc;
      }, {});
    };
    const fetchPendingDevices = async () => {
      setType("pending");
      const response = await cameraServies.getPendingDevice();
      if (response) {
        const result = Object.values(groupedData(response));
        setDeviceData(result);
      }
    };
    const fetchDeniedDevices = async () => {
      setType("denied");
      const response = await cameraServies.getDeniedDevice();
      if (response) {
        const result = Object.values(groupedDeniedData(response));
        setDeviceData(result);
      }
    };
    if (value === 0) {
      fetchApprovedDevices();
    } else if (value === 1) {
      fetchPendingDevices();
    } else if (value === 2) {
      fetchDeniedDevices();
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
          <ApprovedRequest groupData={deviceData} type={type} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <PendingRequest
            // handleModal={handleModal}
            pendingDeviceData={deviceData}
            groupData={deviceData}
            setDeviceData={setDeviceData}
            type={type}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Notifications groupData={deviceData} type={type} />
        </CustomTabPanel>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Search />
      </Box>
    </Box>
  );
}
