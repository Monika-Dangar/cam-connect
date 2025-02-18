import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Button, Tooltip } from "@mui/material";
import "../../css/camera/camera.css";
import cameraServices from "../../services/cameraServices";
const Status = ({ deviceId, ownerId }) => {
  const [buttonType, setButtonType] = useState("Request Access");
  const handleStatus = async () => {
    const response = await cameraServices.handleRequestStatus(deviceId);
    console.log(response);
    if (response.response.length == 1) {
      setButtonType(response.response[0].status);
    }
  };
  useEffect(() => {
    handleStatus();
  }, []);

  const handleRequest = async (deviceId, ownerId) => {
    const response = await cameraServices.handleRequestOnSearch(
      deviceId,
      ownerId
    );
    if (response) {
      setButtonType(response.response[0].status);
    }
  };
  return (
    <Button
      variant="contained"
      sx={{
        width: 100,
        height: 30,
        fontSize: 9,
        whiteSpace: "nowrap",
      }}
      onClick={() => handleRequest(deviceId, ownerId)}
    >
      {buttonType}
    </Button>
  );
};
const SearchDetailModal = ({ handleModal, devices, userId }) => {
  return (
    <>
      <Box className="deviceListModal">
        <Card
          className="searchListCard "
          sx={{
            width:
              devices[0].length > 0 && devices[0][0].userId != userId
                ? 720
                : 600,
          }}
        >
          <CardContent>
            <table>
              <tbody>
                <tr className="tr">
                  <td className="searchDeviceContent">Name</td>
                  <td className="searchDeviceContent">Location</td>
                  <td className="searchDeviceContent">Type</td>
                  {devices[0].length > 0 && devices[0][0].userId != userId && (
                    <td className="searchDeviceContent">Request Status</td>
                  )}
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
                {devices[0].length > 0 &&
                  devices[0].map((device) => {
                    return (
                      <tr key={device._id} className="tr">
                        <td className="searchDeviceContent">
                          {device.deviceName}
                        </td>
                        <td className="searchDeviceContent">
                          {device.deviceLocation}
                        </td>
                        <td className="searchDeviceContent">
                          {device.deviceType}
                        </td>
                        <td className="searchDeviceContent">
                          {device.userId != userId && (
                            <Status
                              deviceId={device._id}
                              ownerId={device.userId}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default SearchDetailModal;
