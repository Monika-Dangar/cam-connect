const { StatusCodes } = require('http-status-codes');
const messages = require('../utils/constants').default;
const cameraService = require('../services/cameraService');
const { findByUsername } = require('../repository/userRepo');

const requestToAccessDevice = async (req, res) => {
  try {
    const { deviceId, ownerId } = req.body;
    const user = await findByUsername(req.user);

    const response = await cameraService.requestToAccessDevice(
      user._id,
      ownerId,
      deviceId
    );

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
    const { username } = req.params;

    const user = await findByUsername(req.user);

    const regex = new RegExp(username, 'i'); // 'i' for case-insensitive search

    const response = await cameraService.findDevicesByUsername(regex);

    if (response) {
      return res
        .status(StatusCodes.OK)

        .send({
          message: messages.requestSentToAccessDevice,
          response,
          userId: user._id,
        });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.requestToAccessDeviceError });
    }
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const findRequestStatus = async (req, res) => {
  try {
    const { deviceId } = req.body;

    const user = await findByUsername(req.user);

    const response = await cameraService.findRequestStatus(user._id, deviceId);

    if (response) {
      return res.status(StatusCodes.OK).send({ message: messages.requestStatus, response });
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ message: messages.requestStatusError });
    }
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const getApprovedDevice = async (req, res) => {
  try {
    const user = await findByUsername(req.user);

    const response = await cameraService.getApprovedDevice(user._id);
    // const response = await cameraService.getApprovedDevice(userId);
    if (response.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.approvedRequestError });
    }

    return res.status(StatusCodes.OK).send(response);
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const getDeniedDevice = async (req, res) => {
  try {
    const user = await findByUsername(req.user);

    const response = await cameraService.getDeniedDevice(user._id);
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
    const { deviceId } = req.body;
    const user = await findByUsername(req.user);
    const response = await cameraService.removeDeniedRequest(
      user._id,
      deviceId
    );

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
    const user = await findByUsername(req.user);
    console.log(req.user);
    const response = await cameraService.pendingRequests(user._id);
    // const response = await cameraService.pendingRequests(userId);
    console.log(response);
    if (response.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.pendingRequestsError });
    }

    return res.status(StatusCodes.OK).send(response);
  } catch (error) {
    console.error(messages.serverError, error);
  }
};

const allowAccessToDevice = async (req, res) => {
  try {
    const { requesterId, deviceId } = req.body;
    const response = await cameraService.allowAccessToDevice(requesterId, deviceId);
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
const findRequestStatus = async (req, res) => {
  try {
    const { deviceId } = req.body;
    console.log(deviceId);
    const user = await findByUsername(req.user);
    const response = await cameraService.findRequestStatus(user._id, deviceId);
    if (response) {
      return res
        .status(StatusCodes.OK)
        .send({ message: messages.requestStatus, response });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: messages.requestStatusError });
    }
  } catch (error) {
    console.error(messages.serverError, error);
  }
};
module.exports = {
  requestToAccessDevice,
  findDevicesByUsername,
  findRequestStatus,
  getApprovedDevice,
  getDeniedDevice,
  removeDeniedRequest,
  getPendingRequest,
  allowAccessToDevice,
  deniedAccessToDevice,
};
