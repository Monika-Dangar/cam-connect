import React, { useState, useEffect } from 'react';
import DisplayDeviceCard from './DisplayDeviceCard';
import { displayDevice } from '../../services/deviceServices';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import TransitionsSnackbar from '../toaster/TransitionsSnackbar';

const SharedWithOthers = () => {
  const [sharedDevices, setSharedDevices] = useState([]);
  const [changes, setChanges] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChanges = () => {
    setChanges((prev) => !prev);
  };
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await displayDevice();
        if (response) {
          setSharedDevices(response.sharedDeviceWithOthers);
        }
      } catch (error) {
        setToastMessage(error.message);
        setOpenToast(true);
      }
    };
    fetchDevices();
  }, [changes]);

  return (
    <>
      <table className="tableContainer">
        <thead className="th">
          <tr className="tableRow">
            <th className="tableHeading">Device Requester</th>
            <th className="tableHeading">Device Name</th>
            <th className="tableHeading">Location</th>
            <th className="tableHeading">Device Type</th>
            <th className="tableHeading">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sharedDevices.length > 0 ? (
            sharedDevices.map((device) => (
              <tr key={device.deviceId._id}>
                <DisplayDeviceCard
                  handleChanges={handleChanges}
                  device={device}
                  delete={DeleteOutlineSharpIcon}
                  type="sharedWithOthers"
                />
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-white">No devices shared</td>
            </tr>
          )}
        </tbody>
      </table>

      <TransitionsSnackbar
        open={openToast}
        message={toastMessage}
        onClose={() => setOpenToast(false)} // Close the toast after it's shown
        autoHideDuration={5000}
      />
    </>
  );
};

export default SharedWithOthers;
