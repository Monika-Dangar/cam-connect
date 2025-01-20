const User = require("../models/userSchema");
const { setUser } = require("../service/tokenGeneration");

async function handleCreateUser(req, res) {
  try {
    const postData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : null,
      emailId: req.body.emailId,
      password: req.body.password,
    };

    const response = User.create(postData);

    if (response) {
      return res
        .status(201)
        .send({ message: "User signed up successfully", postData });
    }
  } catch (error) {
    console.log(`Error in User: ${error}`);
    return res.status(500).send({ message: `Error in signup: ${error}` });
  }
}

module.exports = {
  handleCreateUser,
};
