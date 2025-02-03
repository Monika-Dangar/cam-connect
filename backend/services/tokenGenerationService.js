const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { default: messages } = require("../utils/constants");
const secret = process.env.TOKEN_SECRET_KEY;

function setUser(user) {
  return jwt.sign(user, secret);
}

function getUser(token) {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: messages.tokenNotVerified });
    } else {
      return decoded;
    }
  });
}

module.exports = {
  setUser,
  getUser,
};
