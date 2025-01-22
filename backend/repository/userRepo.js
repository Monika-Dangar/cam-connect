const User = require('../models/userSchema');

function findByUsername(username) {
  return User.findOne({ username });
}

function create(data) {
  try {
    const newUser = new User(data);
    return newUser.save();
  } catch (error) {
    console.log('Error in userRepo:', error);
    return null;
  }
}

module.exports = {
  findByUsername,
  create,
};
