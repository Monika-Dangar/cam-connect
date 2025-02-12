import React, { useState } from "react";
import { Card, CardContent, Avatar, Tooltip, Button, Box } from "@mui/material";
import img from "../../assets/profile.jpg";
import { ViewListSharp as ViewListSharpIcon } from "@mui/icons-material";
import SearchDetailModal from "../modal/SearchDetailModal";

const SearchListCard = ({ searchUserData }) => {
  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal((prev) => !prev);
  };
  return (
    <>
      <Card className="userListCard ">
        <CardContent>
          <table>
            <tbody>
              <tr className="tableRowCamera">
                <td className="tableContentCameraNotify">
                  <Avatar
                    src={img}
                    variant="square"
                    sx={{ width: 60, height: 40 }}
                  ></Avatar>
                </td>
                <td className="tableContentUserListSearch">
                  {searchUserData.user.username}
                </td>
                <td
                  className="tableContentUserListSearch"
                  onClick={() => handleModal()}
                >
                  <Tooltip title="View devices" arrow>
                    <ViewListSharpIcon />
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

          <SearchDetailModal
            handleModal={handleModal}
            devices={searchUserData.devices}
          />
        </>
      )}
    </>
  );
};
export default SearchListCard;
