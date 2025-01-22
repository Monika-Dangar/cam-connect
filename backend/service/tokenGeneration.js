const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET_KEY;

function setUser(user) {
  return jwt.sign(user, secret);
}

function getUser(token) {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    // Access user info from the decoded token payload
    const userId = decoded.id; // User ID from the token payload
    const username = decoded.username; // Username from the token payload

    // Now, you can use the user info (e.g., for logging, response, etc.)
    res
      .status(200)
      .send({ message: "Access granted", user: { userId, username } });
  });
}

module.exports = {
  setUser,
  getUser,
};
