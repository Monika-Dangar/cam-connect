const User = require('../models/userSchema');

async function findByUsername(username) {
  return await User.findOne({ username });
}

async function create(data) {
  try {
    const newUser = new User(data);
    return await newUser.save();
  } catch (error) {
    console.log('Error in userRepo:', error);
    return null;
  }
}

module.exports = {
  findByUsername,
  create,
};
