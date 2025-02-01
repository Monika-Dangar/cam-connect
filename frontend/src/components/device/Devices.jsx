import React, { useState, useEffect } from 'react';
import DisplayDeviceCard from './DisplayDeviceCard';
import { displayDevice } from '../../services/deviceServices';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import BasicModalDialog from '../modal/Modal'; 
import TransitionsSnackbar from '../toaster/TransitionsSnackbar'; 

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [changes, setChanges] = useState(false);
  const [openToast, setOpenToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
  
  const handleChanges = ()=>{
    setChanges((prev) => !prev)
  }

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
      
        const response = await displayDevice();
        if (response) {
          console.log(response.device);
          
          setDevices(response.device); 
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
            <td className='text-white'>No devices</td>
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

      <TransitionsSnackbar
        open={openToast}
        message={toastMessage}
        onClose={() => setOpenToast(false)} // Close the toast after it's shown
        autoHideDuration={5000} 
      />
      </>
  );
};

export default Devices;
