const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

async function passwordVerification(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: `username or password missing!` });
  }

  try {
    const user = await User.findOne({ username: username });

    if (!username) {
      return res.status(400).send({ message: `User doesn't exisits!` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: `password invalid!` });
    }

    
    req.user = {
      _id: user._id,
      userame: user.username,
      
    };
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
}

module.exports = {
  passwordVerification,
};
