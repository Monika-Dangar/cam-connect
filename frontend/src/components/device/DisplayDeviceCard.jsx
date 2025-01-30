import React, { useState } from 'react';
import '../../css/device/device.css';
import { removeDevice,removeAccessToDevice } from '../../services/deviceServices';
import BasicModalDialog from '../modal/Modal';
import TransitionsSnackbar from '../toaster/TransitionsSnackbar';

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
        // console.log(response);
        handleChanges()
      }
    } else {
      const response = await removeDevice(deviceId);
      if (response) {
        // console.log(response);
        handleChanges()
      }
    }
  };

  const handleEdit = async () => {
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

      <td className="tableData">{deviceName}</td>

      <td className="tableData">{deviceLocation}</td>

      <td className="tableData">{deviceType}</td>

      {type === 'device' && (
        <td className="tableData">
          <button type="button" onClick={() => handleEdit(device._id)}>
            <EditIcon />
            <TransitionsSnackbar/>
          </button>
        </td>
      )}

      <td className="tableData">
        <button type="button" onClick={() => handleDelete(device._id)}>
          <DeleteIcon />
        </button>
      </td>

      <BasicModalDialog handleChanges={handleChanges} device={device} open={modalOpen} onClose={handleModalToggle} />
    </>
  );
};

export default DisplayDeviceCard;
