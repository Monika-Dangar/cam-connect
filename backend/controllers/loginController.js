const { setUser } = require("../services/tokenGenerationService");

function handleLoginUser(req, res) {
  const token = setUser(req.body.username);

  if (token) {
    return res.status(200).send({
      message: `Login successfully`,
      token,
      user: { username: req.body.username },
    });
  }
}

module.exports = {
  handleLoginUser,
};
