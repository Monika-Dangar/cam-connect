const userService = require('../services/userService');

async function passwordVerification(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ message: 'Username or password is missing.' });
    }

    const user = await userService.verifyPassword(username, password);

    if (!user.success) {
      return res.status(401).send({ message: user.message });
    }

    req.user = {
      _id: user._id,
      username: user.username,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
}

module.exports = {
  passwordVerification,
};
