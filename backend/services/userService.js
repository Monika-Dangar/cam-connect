const bcrypt = require("bcrypt");
const userRepo = require("../repository/userRepo");
const { default: messages } = require("../utils/constants");

async function createUser(data) {
  const existingUser = await userRepo.findByUsername(
    data.username,
    data.emailId
  );

  if (existingUser) {
    if (existingUser.username === data.username) {
      return { success: false, message: messages.usernameExists };
    }
    if (existingUser.emailId === data.emailId) {
      return { success: false, message: messages.emailExists };
    }
  }
  const userCreated = await userRepo.create(data);

  if (userCreated) {
    return { success: true };
  } else {
    return { success: false };
  }
}

async function verifyPassword(username, password) {
  const user = await userRepo.findByUsername(username);

  if (!user) {
    return { success: false, message: messages.userNotFound };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { success: false, message: messages.invalidPassword };
  }

  return { success: true };
}

module.exports = { createUser, verifyPassword };
