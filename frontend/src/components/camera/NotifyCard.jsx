import React, { useState } from "react";
import { Box, Card, CardContent, Avatar, Tooltip, Button } from "@mui/material";
import img from "../../assets/profile.jpg";
// import VideocamSharpIcon from "@mui/icons-material/VideocamSharp";
import { ViewListSharp as ViewListSharpIcon } from "@mui/icons-material";

const NotifyCard = ({ handleModal }) => {
  return (
    <>
      <Box
        sx={{
          width: "500px",
          height: "150px",
          margin: 0,
          padding: 0,
          position: "fixed",
        }}
        className="boxContainer"
      >
        <Card className="card ">
          <CardContent>
            <table>
              <tbody>
                <tr className="tableRowCamera">
                  <td className="tableContentCameraNotify">
                    <Avatar
                      src={img}
                      variant="square"
                      sx={{ width: 80, height: 80 }}
                    ></Avatar>
                  </td>
                  <td className="tableContentCameraNotify">Username</td>
                  <td
                    className="tableContentCameraNotify"
                    onClick={() => handleModal()}
                  >
                    <Tooltip
                      title="View device details of which you don't got access"
                      arrow
                      className="toolTip"
                    >
                      {/* <VideocamSharpIcon /> */}
                      <ViewListSharpIcon />
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title="Click if you have read">
                      <Button variant="outlined" color="error" size="small">
                        Permission Denied
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default NotifyCard;
