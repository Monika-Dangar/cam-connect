const { StatusCodes } = require("http-status-codes");
const { setUser } = require("../services/tokenGenerationService");
const { default: messages } = require("../utils/constants");

function handleLoginUser(req, res) {
  const token = setUser(req.body.username);

  if (token) {
    return res.status(StatusCodes.OK).send({
      message: messages.signInSuccess,
      token,
      user: { username: req.body.username },
    });
  }
}

module.exports = {
  handleLoginUser,
};
