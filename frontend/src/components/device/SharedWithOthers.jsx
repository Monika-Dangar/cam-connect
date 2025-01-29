import React, { useState, useEffect } from 'react';
import DisplayDeviceCard from './DisplayDeviceCard';
import { displayDevice } from '../../services/deviceServices';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

const SharedWithOthers = () => {
  const [sharedDevices, setSharedDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const response = await displayDevice();
      if (response) {
        setSharedDevices(response.sharedDeviceWithOthers);
      }
    };
    fetchDevices();
  }, []);

  return (
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
                device={device}
                delete={DeleteOutlineSharpIcon}
                type="sharedWithOthers" // Specifies shared devices with others
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
  );
};

export default SharedWithOthers;
