const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { default: messages } = require("../utils/constants");

function hashPassword(req, res, next) {
  if (req.body.password.trim() === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: messages.validation });
  }
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: messages.auth.hashingError });
      }

      req.body.password = hashPassword;
      next();
    });
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: messages.auth.missingPassword });
  }
}

module.exports = {
  hashPassword,
};
