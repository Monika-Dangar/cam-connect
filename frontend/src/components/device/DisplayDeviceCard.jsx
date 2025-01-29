import React, { useState } from "react";
import "../../css/device/device.css";
import {
  removeDevice,
  removeAccessToDevice,
} from "../../services/deviceServices";
import BasicModalDialog from "../modal/Modal";

const DisplayDeviceCard = ({
  handleChanges,
  device,
  delete: DeleteIcon,
  edit: EditIcon,
  type,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  const handleDelete = async (deviceId) => {
    console.log("clicked delete");

    if (type === "sharedWithOthers" || type === "sharedWithMe") {
      const response = await removeAccessToDevice(deviceId);
      if (response) {
        console.log(response);
        handleChanges();
      }
    } else {
      const response = await removeDevice(deviceId);
      if (response) {
        console.log(response);
        handleChanges();
      }
    }
  };

  const handleEdit = async () => {
    console.log("Clicked edit");
    setModalOpen(true);
  };

  // Standardize access to the device properties
  const deviceName = device?.deviceId?.deviceName || device?.deviceName;
  const deviceLocation =
    device?.deviceId?.deviceLocation || device?.deviceLocation;
  const deviceType = device?.deviceId?.deviceType || device?.deviceType;

  // Conditionally check for owner or requester depending on the type
  const deviceOwner =
    type === "sharedWithMe" ? device?.ownerId?.username : null;
  const deviceRequester =
    type === "sharedWithOthers" ? device?.requesterId?.username : null;

  return (
    <>
      {/* Device Owner (Shared with Me) */}
      {deviceOwner && <td className="tableData">{deviceOwner}</td>}

      {/* Device Requester (Shared with Others) */}
      {deviceRequester && <td className="tableData">{deviceRequester}</td>}

      {/* Device Name */}
      <td className="tableData">{deviceName}</td>

      {/* Device Location */}
      <td className="tableData">{deviceLocation}</td>

      {/* Device Type */}
      <td className="tableData">{deviceType}</td>

      {/* Edit button (only for Devices) */}
      {type === "device" && (
        <td className="tableData">
          <button type="button" onClick={() => handleEdit(device._id)}>
            <EditIcon />
          </button>
        </td>
      )}

      {/* Delete button */}
      <td className="tableData">
        <button type="button" onClick={() => handleDelete(device._id)}>
          <DeleteIcon />
        </button>
      </td>

      {/* Modal Dialog */}
      <BasicModalDialog
        handleChanges={handleChanges}
        device={device}
        open={modalOpen}
        onClose={handleModalToggle}
      />
    </>
  );
};

export default DisplayDeviceCard;
