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
}) => {
  const [deviceList, setDeviceList] = useState(devices);
  const handleApprovedRequests = async (deviceId, requesterId) => {
    const response = await cameraServices.acceptRequests(deviceId, requesterId);
    if (response) {
      setDeviceList((devices) => {
        const updatedDevices = devices.filter(
          (device) => device._id !== deviceId
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
        <Card className="deviceListCard">
          <CardContent>
            <table>
              <tbody>
                <tr className="">
                  <td className="heading2">IMEI number</td>

                  <td className="heading">Name</td>
                  <td className="heading">Location</td>
                  <td className="heading">Type</td>

                  <td className="btnClose">
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
                      <tr key={device._id}>
                        <td className="tableContent">{device.imeiNumber}</td>
                        <td className="tableContent">{device.deviceName}</td>
                        <td className="tableContent">
                          {device.deviceLocation}
                        </td>
                        <td className="tableContent">{device.deviceType}</td>
                        {type === "pending" && (
                          <td>
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
                          <td className="tableContentCamera">
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
                          <td>
                            <Tooltip title="Click if you have read">
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleSeenDenied(device._id)}
                                sx={{ whiteSpace: "nowrap" }}
                              >
                                Permission Denied
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
