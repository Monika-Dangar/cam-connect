import React, { useState } from "react";
import { Box, Card, CardContent, Button, Tooltip } from "@mui/material";
import "../../css/camera/camera.css";
const SearchDetailModal = ({ handleModal, devices }) => {
  const [buttonType, setButtonType] = useState("Request Access");
  const handleRequest = (deviceId, ownerId) => {};
  return (
    <>
      <Box className="deviceListModal">
        <Card className="searchListCard ">
          <CardContent>
            <table>
              <tbody>
                <tr>
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
                {devices[0].length > 0 &&
                  devices[0].map((device) => {
                    return (
                      <tr key={device._id}>
                        <td className="searchDeviceContent">
                          {device.deviceName}
                        </td>
                        <td className="searchDeviceContent">
                          {device.deviceLocation}
                        </td>
                        <td className="searchDeviceContent">
                          {device.deviceType}
                        </td>
                        <td>
                          <Button
                            variant="contained"
                            sx={{
                              width: 100,
                              height: 30,
                              fontSize: 9,
                              whiteSpace: "nowrap",
                            }}
                            onClick={handleRequest(device._id, device.userId)}
                          >
                            {buttonType}
                          </Button>
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
