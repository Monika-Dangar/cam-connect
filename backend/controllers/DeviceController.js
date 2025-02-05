const { StatusCodes } = require("http-status-codes");
const { findByUsername } = require("../repository/userRepo");
const deviceService = require("../services/deviceService");
const messages = require("../utils/constants").default;

//In device - device associated with loggedIn user are to be displayed and
//and device which loggedin user have access.
const createDevice = async (req, res) => {
  try {
    const user = await findByUsername(req.user);
    const { deviceName, deviceLocation, deviceType } = req.body;
    if (!deviceName || !deviceLocation || !deviceType) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: messages.fieldCheck });
    }
    if (
      deviceName.trim() === "" ||
      deviceLocation.trim() === "" ||
      deviceType.trim() === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: messages.validation });
    }
    const deviceData = {
      userId: user._id,
      deviceName,
      deviceLocation,
      deviceType,
    };

    const response = await deviceService.createDevice(deviceData);
    if (response) {
      return res
        .status(StatusCodes.CREATED)
        .send({ message: messages.createSuccess, response });
    } else {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send({ message: messages.createError });
    }
  } catch (error) {
    console.error(messages.createError, error);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: messages.serverError, error: error });
  }
};
const getDevice = async (req, res) => {
  const user = await findByUsername(req.user);
  //Find device data of logggedin User
  try {
    const userDeviceData = await deviceService.readDevice(user._id);

    if (userDeviceData.length > 0) {
      const response = {
        device:
          userDeviceData[0].length > 0
            ? userDeviceData[0]
            : { message: messages.feedEmpty },
        sharedDeviceWithMe:
          userDeviceData[1].length > 0
            ? userDeviceData[1]
            : { message: messages.feedEmpty },
        sharedDeviceWithOthers:
          userDeviceData[2].length > 0
            ? userDeviceData[2]
            : { message: messages.feedEmpty },
      };

      return res.status(StatusCodes.OK).send(response);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.createMessage });
    }
  } catch (error) {
    console.error(messages.readError, error);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: messages.serverError, error: error });
  }
};

const editDevice = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    //Find device data of logged iN USER
    const { deviceName, deviceLocation, deviceType } = req.body;
    if (
      deviceName.trim() === "" ||
      deviceLocation.trim() === "" ||
      deviceType.trim() === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: messages.validation });
    }
    const deviceData = {
      deviceId: deviceId,
      deviceName,
      deviceLocation,
      deviceType,
    };
    const response = await deviceService.updateDevice(deviceData);
    if (response.success) {
      return res
        .status(StatusCodes.OK)
        .json({ message: messages.updateSuccess });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: messages.updateError });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: messages.serverError, error: error });
  }
};
const removeDevice = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const response = await deviceService.deleteDevice(deviceId);
    if (response.success) {
      return res
        .status(StatusCodes.OK)
        .send({ message: messages.deleteSucess });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.deleteError });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: messages.serverError, error: error });
  }
};
const removeSharedDevice = async (req, res) => {
  try {
    const accessId = req.params.accessId;
    const response = await deviceService.deleteSharedDevice(accessId);
    if (response.success) {
      return res
        .status(StatusCodes.OK)
        .send({ message: messages.deleteSucess });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.deleteError });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: messages.serverError, error: error });
  }
};
module.exports = {
  createDevice,
  getDevice,
  editDevice,
  removeDevice,
  removeSharedDevice,
};
