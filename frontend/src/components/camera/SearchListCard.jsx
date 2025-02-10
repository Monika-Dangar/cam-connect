import React from "react";
import { Card, CardContent, Avatar, Tooltip, Button } from "@mui/material";
import img from "../../assets/profile.jpg";
import VideocamSharpIcon from "@mui/icons-material/VideocamSharp";
import { ViewListSharp as ViewListSharpIcon } from "@mui/icons-material";

const SearchListCard = ({ handleModal }) => {
  return (
    <>
      <Card className="userListCard">
        <CardContent>
          <table>
            <tr className="tableRowCamera">
              <td className="tableContentCameraNotify">
                <Avatar
                  src={img}
                  variant="square"
                  sx={{ width: 60, height: 40 }}
                ></Avatar>
              </td>
              <td className="tableContentUserListSearch"> Username</td>
              <td
                className="tableContentUserListSearch"
                onClick={() => handleModal()}
              >
                <Tooltip title="View devices" arrow>
                  {/* <VideocamSharpIcon /> */}
                  <ViewListSharpIcon />
                </Tooltip>
              </td>
            </tr>
          </table>
        </CardContent>
      </Card>
    </>
  );
};
export default SearchListCard;
