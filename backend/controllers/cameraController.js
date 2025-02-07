const { StatusCodes } = require('http-status-codes');
const messages = require('../utils/constants').default;
const cameraService = require('../services/cameraService');
const { findByUsername } = require('../repository/userRepo');

const requestToAccessDevice = async (req, res) => {
  try {
    // const { deviceId, userId } = req.body;
    const { deviceId } = req.body;
    const user = await findByUsername(req.user);

    const response = cameraService.accessToDevice(deviceId, user._id);
    // const response = await cameraService.requestToAccessDevice(deviceId, userId);

    if (response) {
      return res
        .status(StatusCodes.OK)
        .send({ message: messages.requestSentToAccessDevice, response });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.requestToAccessDeviceError });
    }
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const findDevicesByUsername = async (req, res) => {
  try {
    const { username } = req.body;

    const response = await cameraService.findDevicesByUsername(username);

    if (response) {
      return res
        .status(StatusCodes.OK)
        .send({ message: messages.requestSentToAccessDevice, response });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.requestToAccessDeviceError });
    }
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const getApprovedDevice = async (req, res) => {
  try {
    // const { userId } = req.body;
    const user = await findByUsername(req.user);

    const response = cameraService.getApprovedDevice(user._id);
    // const response = await cameraService.getApprovedDevice(userId);

    if (!response) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: messages.approvedRequestError });
    }

    return res.status(StatusCodes.OK).send(response);
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const getDeniedDevice = async (req, res) => {
  try {
    // const { userId } = req.body;
    const user = await findByUsername(req.user);

    const response = cameraService.getDeniedDevice(user._id);
    // const response = await cameraService.getDeniedDevice(userId);

    if (!response) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: messages.deniedRequestError });
    }

    return res.status(StatusCodes.OK).send(response);
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const removeDeniedRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const response = await cameraService.removeDeniedRequest(requestId);

    if (!response) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: messages.removeDeniedRequestError });
    }

    return res.status(StatusCodes.OK).send(response);
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const getPendingRequest = async (req, res) => {
  try {
    // const { userId } = req.body;
    const user = await findByUsername(req.user);

    const response = cameraService.pendingRequests(user._id);
    // const response = await cameraService.pendingRequests(userId);

    if (!response) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: messages.pendingRequestsError });
    }

    return res.status(StatusCodes.OK).send(response);
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const allowAccessToDevice = async (req, res) => {
  try {
    const { requesterId, deviceId } = req.body;

    const user = await findByUsername(req.user);

    const response = await cameraService.allowAccessToDevice(user._id, requesterId, deviceId);

    if (response) {
      return res.status(StatusCodes.OK).send({ message: messages.allowedAccess, response });
    } else {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send({ message: messages.allowedAccessError });
    }
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const deniedAccessToDevice = async (req, res) => {
  try {
    const { requesterId, deviceId } = req.body;

    const user = await findByUsername(req.user);

    const response = await cameraService.deniedAccessToDevice(user._id, requesterId, deviceId);

    if (response) {
      return res.status(StatusCodes.OK).send({ message: messages.deniedAccess, response });
    } else {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send({ message: messages.deniedAccessError });
    }
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

module.exports = {
  requestToAccessDevice,
  findDevicesByUsername,
  getApprovedDevice,
  getDeniedDevice,
  removeDeniedRequest,
  getPendingRequest,
  allowAccessToDevice,
  deniedAccessToDevice,
};
