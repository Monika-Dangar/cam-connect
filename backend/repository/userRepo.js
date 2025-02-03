const User = require("../models/userSchema");

function findByUsername(username, emailId) {
  return User.findOne({ $or: [{ username }, { emailId }] });
}

function create(data) {
  try {
    const newUser = new User(data);
    return newUser.save();
  } catch (error) {
    console.error("Error in userRepo:", error);
    return null;
  }
}

module.exports = {
  findByUsername,
  create,
};
