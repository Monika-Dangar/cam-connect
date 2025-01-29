const { findByUsername } = require("../repository/userRepo");
const deviceService = require("../services/deviceService");

//In device - device associated with loggedIn user are to be displayed and
//and device which loggedin user have access.
const createDevice = async (req, res) => {
  try {
    const user = await findByUsername(req.user);

    const deviceData = {
      userId: user._id,
      deviceName: req.body.deviceName,
      deviceLocation: req.body.deviceLocation,
      deviceType: req.body.deviceType,
    };
    const response = await deviceService.createDevice(deviceData);

    if (response.success) {
      return res
        .status(201)
        .send({ message: "Device created successfully", deviceData });
    } else {
      return res.status(401).send({ message: response.message });
    }
  } catch (error) {
    console.log("Error in creating device", error);

    res.status(500).send({ message: `Error creating device ${error}` });
  }
};
const getDevice = async (req, res) => {
  const user = await findByUsername(req.user);
  //Find device data of logggedin User
  try {
    const userDeviceData = await deviceService.readDevice(user._id);
    if (userDeviceData) {
      const response = {
        device:
          userDeviceData.device != ""
            ? userDeviceData.device
            : { message: "Create your device" },
        sharedDeviceWithMe:
          userDeviceData.sharedDeviceDataWithMe != ""
            ? userDeviceData.sharedDeviceDataWithMe
            : { message: "No shared device available" },
        sharedDeviceWithOthers:
          userDeviceData.sharedDeviceDataWithOthers != ""
            ? userDeviceData.sharedDeviceDataWithOthers
            : { message: "No device shared with others" },
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ message: "No device data available " });
    }
  } catch (error) {
    console.log("Error in reading  device", error);

    res.status(500).send({ message: `Error reading device ${error}` });
  }
};
const editDevice = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    //Find device data of logged iN USER
    const deviceData = {
      deviceId: deviceId,
      deviceName: req.body.deviceName,
      deviceLocation: req.body.deviceLocation,
      deviceType: req.body.deviceType,
    };
    const response = await deviceService.updateDevice(deviceData);
    if (response.success) {
      res.status(200).json(response.message);
    } else {
      res.status(404).json(response.message);
    }
  } catch (error) {
    console.log("Error in updating device", error);

    res.status(500).send({ message: ` Internal server error ${error}` });
  }
};
const removeDevice = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const response = await deviceService.deleteDevice(deviceId);
    if (response.success) {
      res.status(200).send(response.message);
    } else {
      res.status(404).send(response.message);
    }
  } catch (error) {
    console.log("Error in deleting device", error);

    res.status(500).send({ message: ` Internal server error ${error}` });
  }
};
const removeSharedDevice = async (req, res) => {
  try {
    const accessId = req.params.accessId;
    const response = await deviceService.deleteSharedDevice(accessId);
    if (response.success) {
      res.status(200).send(response.message);
    } else {
      res.status(500).send(response.message);
    }
  } catch (error) {
    console.log("Error in deleting shared device", error);

    res.status(500).send({ message: ` Internal server error ${error}` });
  }
};
module.exports = {
  createDevice,
  getDevice,
  editDevice,
  removeDevice,
  removeSharedDevice,
};
