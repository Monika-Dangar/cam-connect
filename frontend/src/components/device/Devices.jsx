import React, { useState, useEffect } from 'react';
import DisplayDeviceCard from './DisplayDeviceCard';
import { displayDevice } from '../../services/deviceServices';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import BasicModalDialog from '../modal/Modal'; // Assuming this is the modal component you mentioned

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [changes, setChanges] = useState(false);

  const handleChanges = ()=>{
    setChanges((prev) => !prev)
  }

  const handleModalToggle = () => {
    // setModalOpen((prev) => setModalOpen(!prev));
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      const response = await displayDevice();
      if (response) {
        setDevices(response.device); // devices array
      }
    };
    fetchDevices();
  }, [changes]);


  return (
    <>
    <main className='flex'>
    <table className="tableContainer">
      <thead className="th">
        <tr className="tableRow">
          <th className="tableHeading">Device Name</th>
          <th className="tableHeading">Location</th>
          <th className="tableHeading">Device Type</th>
          <th className="tableHeading">Edit</th>
          <th className="tableHeading">Delete</th>
        </tr>
      </thead>
      <tbody>
        {devices.length > 0 ? 
        (
          devices.map((device) => (
            <tr key={device._id}>
              <DisplayDeviceCard
              handleChanges={handleChanges}
                device={device}
                delete={DeleteOutlineSharpIcon}
                edit={ModeEditOutlineOutlinedIcon}
                type="device" // Specifies that it's a regular device
              />
            </tr>
          ))
        ) : (
          <tr>
            <td>No devices</td>
          </tr>
        )
      }
      </tbody>
    </table>
          <button type="button" className="createBtn" onClick={handleModalToggle}>
          Create
        </button>

          </main>
      {/* Modal */}
      <BasicModalDialog handleChanges={handleChanges} device={''} open={modalOpen} onClose={handleModalToggle} />
      </>
  );
};

export default Devices;
