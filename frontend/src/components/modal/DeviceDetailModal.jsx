import React, { useState } from "react";
import { Box, Card, CardContent, Button, Tooltip } from "@mui/material";
import "../../css/camera/camera.css";
import cameraServices from "../../services/cameraServices";
const DeviceDetailModal = ({
  handleModal,
  devices,
  type,
  requesterId,
  setRequesterData,
  setDeviceData,
}) => {
  const [deviceList, setDeviceList] = useState(devices);
  const handleApprovedRequests = async (deviceId, requesterId) => {
    const response = await cameraServices.acceptRequests(deviceId, requesterId);
    if (response) {
      setDeviceList((devices) => {
        const updatedDevices = devices.filter(
          (device) => device._id !== deviceId
        );
        setDeviceData((groupData) =>
          groupData.map((data) =>
            data.requester._id === requesterId
              ? { ...data, devices: updatedDevices }
              : data
          )
        );
        if (updatedDevices.length === 0) {
          setRequesterData({});
        }
        return updatedDevices;
      });
    }
  };
  const handleDeniedRequests = async (deviceId, requesterId) => {
    const response = await cameraServices.denyRequest(deviceId, requesterId);
    if (response) {
      setDeviceList((devices) => {
        const updatedDevices = devices.filter(
          (device) => device._id !== deviceId
        );
        setDeviceData((groupData) =>
          groupData.map((data) =>
            data.requester._id === requesterId
              ? { ...data, devices: updatedDevices }
              : data
          )
        );
        if (updatedDevices.length === 0) {
          setRequesterData({});
        }
        return updatedDevices;
      });
    }
  };
  const handleSeenDenied = async (deviceId) => {
    const response = await cameraServices.seenDenied(deviceId);
    if (response) {
      setDeviceList((devices) => {
        const updatedDevices = devices.filter(
          (device) => device._id !== deviceId
        );
        setDeviceData((groupData) =>
          groupData.map((data) =>
            data.requester._id === requesterId
              ? { ...data, devices: updatedDevices }
              : data
          )
        );
        if (updatedDevices.length === 0) {
          setRequesterData({});
        }
        return updatedDevices;
      });
    }
  };
  return (
    <>
      <Box className="deviceListModal">
        <Card
          className="deviceListCard"
          sx={{ width: type === "pending" ? 900 : 750 }}
        >
          <CardContent>
            <table>
              <tbody>
                <tr className="deviceTr">
                  <td className="searchDeviceContent">IMEI number</td>
                  <td className="searchDeviceContent">Name</td>
                  <td className="searchDeviceContent">Location</td>
                  <td className="searchDeviceContent">Type</td>

                  <td
                    className={`btnCloseDevice ${
                      type === "pending" ? "p2" : "p1"
                    }`}
                  >
                    <Button
                      onClick={() => {
                        handleModal();
                      }}
                      variant="contained"
                      size="small"
                    >
                      Close
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
          <CardContent className="scrollableContent">
            <table>
              <tbody>
                {deviceList.length > 0 ? (
                  deviceList.map((device) => {
                    return (
                      <tr key={device._id} className="deviceTr">
                        <td className="searchDeviceContent">
                          {device.imeiNumber}
                        </td>
                        <td className="searchDeviceContent">
                          {device.deviceName}
                        </td>
                        <td className="searchDeviceContent">
                          {device.deviceLocation}
                        </td>
                        <td className="searchDeviceContent">
                          {device.deviceType}
                        </td>
                        {type === "pending" && (
                          <td className="tableContent">
                            <Tooltip title="GIVE ACCESS" arrow>
                              <Button
                                color="primary"
                                variant="contained"
                                type="button"
                                size="small"
                                onClick={() =>
                                  handleApprovedRequests(
                                    device._id,
                                    requesterId
                                  )
                                }
                              >
                                Accept
                              </Button>
                            </Tooltip>
                          </td>
                        )}
                        {type != "denied" ? (
                          <td className="tableContent">
                            <Tooltip
                              title={
                                type === "pending"
                                  ? "REFUSE ACCESS"
                                  : "STOP GIVING ACCESS"
                              }
                              arrow
                            >
                              <Button
                                color="primary"
                                variant="contained"
                                type="button"
                                size="small"
                                onClick={() =>
                                  handleDeniedRequests(device._id, requesterId)
                                }
                              >
                                {type === "pending" ? "Decline" : "Remove"}
                              </Button>
                            </Tooltip>
                          </td>
                        ) : (
                          <td className="tableContent">
                            <Tooltip title="Click if you have read">
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleSeenDenied(device._id)}
                              >
                                Remove
                              </Button>
                            </Tooltip>
                          </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No device</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DeviceDetailModal;
