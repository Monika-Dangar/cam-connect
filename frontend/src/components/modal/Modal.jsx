import "../../css/modal/modal.css";
import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { createDevice, editDevice } from "../../services/deviceServices";
import TransitionsSnackbar from "../toaster/TransitionsSnackbar";

const BasicModalDialog = ({ device, setDevices, devices, open, onClose }) => {
  const [formData, setFormData] = useState({
    deviceName: device.deviceName,
    deviceLocation: device.deviceLocation,
    deviceType: device.deviceType,
  });
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (device) {
      try {
        const response = await editDevice(device._id, formData);
        if (response) {
          setToastMessage(response);
          setOpenToast(true);
          const updatedDevices = devices.map((d) =>
            d._id === device._id ? { ...d, ...formData } : d
          );
          setDevices(updatedDevices);
        }
      } catch (error) {
        setToastMessage(error.message);
        setOpenToast(true);
      }
    } else {
      try {
        const response = await createDevice(formData);

        if (response) {
          setDevices((prevData) => [...prevData, response.response]);
          setFormData({});
        }
        setToastMessage(response.message);
        setOpenToast(true);
      } catch (error) {
        setToastMessage(error.message);
        setOpenToast(true);
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
    <>
      <Modal open={open} onClose={onClose}>
        <Box id="deviceBox">
          <form onSubmit={handleSubmit}>
            <h4 className="text">{device ? "Edit device" : "Create device"}</h4>
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

      <TransitionsSnackbar
        open={openToast}
        message={toastMessage}
        onClose={() => setOpenToast(false)} // Close the toast after it's shown
        autoHideDuration={1000}
      />
    </>
  );
};

export default BasicModalDialog;
