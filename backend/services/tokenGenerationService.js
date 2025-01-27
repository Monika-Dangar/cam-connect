const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET_KEY;

function setUser(user) {
  return jwt.sign(user, secret);
}

function getUser(token) {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return `Token not verified ${err}`;
    } else {
      return decoded;
    }
  });
}

module.exports = {
  setUser,
  getUser,
};
