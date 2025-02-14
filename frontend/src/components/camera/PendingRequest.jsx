import React from "react";
import UserListCard from "./UserListCard";
import emptyImg from "../../assets/empty.png";
import { Typography } from "@mui/material";
const PendingRequest = ({
  handleModal,
  type,
  groupData,
  setDevicePendingData,
}) => {
  return (
    <>
      {groupData.length > 0 ? (
        groupData.map((data) => {
          return (
            <UserListCard
              key={data.requester._id}
              type={type}
              handleModal={handleModal}
              requester={data.requester}
              devices={data.devices}
              setDeviceData={setDevicePendingData}
            />
          );
        })
      ) : (
        <>
          <img src={emptyImg} className="emptyImage"></img>
          <Typography variant="h6" className="emptyText" sx={{ ml: 22, mt: 5 }}>
            No Pending request
          </Typography>
        </>
      )}
    </>
  );
};

export default PendingRequest;
