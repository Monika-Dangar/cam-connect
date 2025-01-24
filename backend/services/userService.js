const bcrypt = require('bcrypt');
const userRepo = require('../repository/userRepo');

async function createUser(data) {
  const existingUser = await userRepo.findByUsername(data.username);

  if (existingUser) {
    return { success: false, message: 'Username already exists!' };
  }

  const userCreated = await userRepo.create(data);
  if (userCreated) {
    return { success: true };
  } else {
    return { success: false, message: 'Error creating user.' };
  }
}

async function verifyPassword(username, password) {
  const user = await userRepo.findByUsername(username);

  if (!user) {
    return { success: false, message: `User doesn't exist!` };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { success: false, message: 'Invalid password!' };
  }

  return { success: true, user };
}

module.exports = { createUser, verifyPassword };
