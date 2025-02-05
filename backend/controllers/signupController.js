const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const messages = require("../utils/constants").default;

async function handleCreateUser(req, res) {
  try {
    const { firstName, lastName, username, dateOfBirth, emailId, password } =
      req.body;
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      username.trim() === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: messages.validation });
    }
    const data = {
      firstName,
      lastName,
      username,
      dateOfBirth,
      emailId,
      password,
    };

    const response = await userService.createUser(data);
    if (response.success) {
      return res
        .status(StatusCodes.CREATED)
        .send({ message: messages.signUpSuccess, data });
    } else {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send({ message: response.message });
    }
  } catch (error) {
    console.error(`Error in User: ${error}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: messages.serverError, error: error });
  }
}

module.exports = {
  handleCreateUser,
};
