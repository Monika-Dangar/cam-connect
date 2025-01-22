const userService = require('../services/userService');

async function handleCreateUser(req, res) {
  try {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : null,
      emailId: req.body.emailId,
      password: req.body.password,
    };

    const response = await userService.createUser(data);

    if (response.success) {
      return res.status(201).send({ message: 'User signed up successfully', data });
    } else {
      return res.status(401).send({ message: response.message });
    }
  } catch (error) {
    console.log(`Error in User: ${error}`);
    return res.status(500).send({ message: `Error in signup: ${error}` });
  }
}

module.exports = {
  handleCreateUser,
};
