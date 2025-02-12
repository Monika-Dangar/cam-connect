import React from "react";
import UserListCard from "./UserListCard";

const PendingRequest = ({ handleModal, type, groupData }) => {
  return (
    <>
      {/* i will map this */}
      {groupData.length > 0 ? (
        groupData.map((data) => {
          return (
            <UserListCard
              key={data.requester._id}
              type={type}
              handleModal={handleModal}
              requester={data.requester}
              devices={data.devices}
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
