import { Card, CardContent, Button, Box, Avatar } from "@mui/material";
import img from "../../assets/profile.jpg";
import { Tooltip } from "@mui/material";
// import { ViewHeadlineSharp as ViewHeadlineSharpIcon } from "@mui/icons-material";
import { ViewListSharp as ViewListSharpIcon } from "@mui/icons-material";
import DeviceDetailModal from "../modal/DeviceDetailModal";
import { useState } from "react";
import cameraServices from "../../services/cameraServices";
// import VideocamSharpIcon from "@mui/icons-material/VideocamSharp";
const UserListCard = ({ type, deviceData, response, setDeviceData }) => {
  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal((prev) => !prev);
  };
  const handleApprovedRrequests = async (deviceId, requesterId) => {
    const response = await cameraServices.acceptRequests(deviceId, requesterId);
    console.log(response);
    if (response) {
      setDeviceData((deviceData) =>
        deviceData.filter(
          (deviceData) =>
            deviceData.deviceId._id !== deviceId &&
            deviceData.requesterId._id !== requesterId
        )
      );
    }
  };
  return (
    <>
      <Box
        sx={{ width: type === "pending" ? "540px" : "450px", height: "150px" }}
        className="boxContainer"
      >
        <Card className="card ">
          <CardContent>
            <table>
              <tbody>
                <tr className="tableRowCamera" key={deviceData.requesterId._id}>
                  <td className="tableContentCamera">
                    <Avatar
                      src={img}
                      variant="square"
                      sx={{ width: 80, height: 80 }}
                    ></Avatar>
                  </td>
                  <td className="content">
                    {(deviceData && deviceData.requesterId.username) ||
                      "nakshi"}
                  </td>
                  <td
                    className="tableContentCamera"
                    onClick={() => handleModal()}
                  >
                    <Tooltip
                      title={
                        type === "pending"
                          ? "User have requested accessed for this device"
                          : "View device details"
                      }
                      arrow
                    >
                      {/* <VideocamSharpIcon /> */}
                      {/* <ViewHeadlineSharpIcon /> */}
                      <ViewListSharpIcon />
                    </Tooltip>
                  </td>
                  {type === "pending" && (
                    <td className="tableContentCamera">
                      <Tooltip title="GIVE ACCESS" arrow>
                        <Button
                          color="primary"
                          variant="contained"
                          type="button"
                          size="small"
                          onClick={() =>
                            handleApprovedRrequests(
                              deviceData.deviceId._id,
                              deviceData.requesterId._id
                            )
                          }
                        >
                          Accept
                        </Button>
                      </Tooltip>
                    </td>
                  )}
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
                        onClick={() => handleDeniedRequests()}
                      >
                        {type === "pending" ? "Decline" : "Remove"}
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        {showModal && (
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
              response={response}
              type={type}
              requesterId={deviceData.requesterId._id}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default UserListCard;
