import React from "react";
import { Box, Card, CardContent, Button } from "@mui/material";
import "../../css/camera/camera.css";
import { useEffect } from "react";

const DeviceDetailModal = ({ handleModal, response, type, requesterId }) => {
  useEffect(() => {
    console.log("Received response in modal:", response);
  }, [response]);
  return (
    <>
      <Box className="deviceListModal">
        <Card className="deviceListCard">
          <CardContent>
            <table>
              <tbody>
                <tr>
                  <td className="heading2">IMEI number</td>

                  <td className="heading">Name</td>
                  <td className="heading">Location</td>
                  <td className="heading">Type</td>

                  <td className="btnClose">
                    <Button
                      onClick={() => handleModal()}
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
                {response.length > 0 ? (
                  response
                    .filter((device) => device.requesterId._id === requesterId)
                    .map((device) => {
                      return (
                        <tr key={device.deviceId._id}>
                          <td className="tableContent2">
                            {device.deviceId.imeiNumber}
                          </td>
                          <td className="tableContent">
                            {device.deviceId.deviceName}
                          </td>
                          <td className="tableContent">
                            {device.deviceId.deviceLocation}
                          </td>
                          <td className="tableContent3">
                            {device.deviceId.deviceType}
                          </td>

                          <td className="tableContent">
                            {type === "search" && (
                              <Button
                                color="primary"
                                size="small"
                                variant="contained"
                                sx={{
                                  width: "100px",
                                  height: "30px",
                                  fontSize: 10,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Send Request
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td>No device</td>
                  </tr>
                )}

                {/* ------------------- */}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DeviceDetailModal;
