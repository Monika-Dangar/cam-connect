import { Card, CardContent, Button, Box, Avatar } from "@mui/material";
import img from "../../assets/profile.jpg";
import { Tooltip } from "@mui/material";
import { ViewListSharp as ViewListSharpIcon } from "@mui/icons-material";
import DeviceDetailModal from "../modal/DeviceDetailModal";
import { useState } from "react";
import { useEffect } from "react";
const UserListCard = ({ type, requester, devices, setDeviceData }) => {
  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal((prev) => !prev);
  };
  const [requesterData, setRequesterData] = useState(requester);

  return (
    <>
      <Box
        sx={{ width: type === "pending" ? "540px" : "450px", height: "150px" }}
        className="boxContainer"
      >
        {Object.keys(requesterData).length !== 0 && (
          <Card className="card ">
            <CardContent>
              <table>
                <tbody>
                  <tr className="tableRowCamera" key={requesterData.username}>
                    <td className="tableContentCamera">
                      <Avatar
                        src={img}
                        variant="square"
                        sx={{ width: 80, height: 80 }}
                      ></Avatar>
                    </td>
                    <td className="content">
                      {requesterData.username || "nakshi"}
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
                        <ViewListSharpIcon />
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
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
              devices={devices}
              type={type}
              requesterId={requester._id}
              setDeviceData={setDeviceData}
              setRequesterData={setRequesterData}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default UserListCard;
