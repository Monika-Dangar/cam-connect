import React from "react";
import NotifyCard from "./NotifyCard";

const Notifications = ({ handleModal }) => {
  return (
    <>
      <NotifyCard handleModal={handleModal} />
      {/* <NotifyCard /> */}
    </>
  );
};

export default Notifications;
