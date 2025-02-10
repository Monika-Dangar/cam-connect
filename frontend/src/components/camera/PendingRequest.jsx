import React from "react";
import UserListCard from "./UserListCard";

const PendingRequest = ({ handleModal, pendingDeviceData, type }) => {
  return (
    <>
      {/* i will map this */}
      {pendingDeviceData.length > 0 ? (
        pendingDeviceData.map((pendingData) => {
          return (
            <UserListCard
              key={pendingData._id}
              type={type}
              handleModal={handleModal}
              deviceData={pendingData}
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
