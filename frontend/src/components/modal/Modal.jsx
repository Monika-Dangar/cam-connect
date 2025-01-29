import '../../css/modal/modal.css';
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { createDevice, editDevice } from '../../services/deviceServices';

const BasicModalDialog = ({ device, open, onClose }) => {
  const [formData, setFormData] = useState({
    deviceName: '',
    deviceLocation: '',
    deviceType: '',
  });

  useEffect(() => {
    if (device) {
      setFormData({
        deviceName: device.deviceName,
        deviceLocation: device.deviceLocation,
        deviceType: device.deviceType,
      });
    } else {
      // Reset form data if it's in create mode
      setFormData({
        deviceName: '',
        deviceLocation: '',
        deviceType: '',
      });
    }
  }, [device]); // Only run when the device prop changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (device) {
      const response = await editDevice(device._id, formData);
      if (response) {
        // console.log(response);
      }
    } else {
      // console.log('creating device');
      const response = await createDevice(formData);
      if (response) {
        // console.log(response);
      }
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box id="deviceBox">
        <form onSubmit={handleSubmit}>
          <h4 className="text">{device ? 'Edit device' : 'Create device'}</h4>
          <TextField
            type="text"
            name="deviceName"
            id="standard-basic"
            label="Device name"
            variant="filled"
            className="textField"
            color="primary"
            value={formData.deviceName}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            type="text"
            name="deviceLocation"
            id="standard-basic"
            label="Location"
            variant="filled"
            className="textField"
            value={formData.deviceLocation}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            type="text"
            name="deviceType"
            id="standard-basic"
            label="Type"
            variant="filled"
            className="textField"
            value={formData.deviceType}
            onChange={handleChange}
            required
          ></TextField>

          <div className="buttonContainer">
            <Button variant="contained" className="button" type="submit">
              Submit
            </Button>
            <Button variant="contained" className="button" onClick={onClose}>
              Close
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default BasicModalDialog;
