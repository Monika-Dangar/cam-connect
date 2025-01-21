const { setUser } = require("../service/tokenGeneration");

async function handleLoginUser(req, res) {
  const token = setUser(req.user);

  if (token) {
    return res
      .status(200)
      .send({ message: `Login successfully`, token, user: req.user });
  }
}

module.exports = {
  handleLoginUser,
};