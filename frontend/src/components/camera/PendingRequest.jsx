import React from "react";
import UserListCard from "./UserListCard";

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
        <p>No device data found</p>
      )}
    </>
  );
};

export default PendingRequest;
