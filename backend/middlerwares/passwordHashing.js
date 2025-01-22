const bcrypt = require("bcrypt");

function hashPassword(req, res, next) {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
      if (err) {
        return res.status(500).send(`Error in hasing password!`);
      }
      
      req.body.password = hashPassword;
      next();
    });
  } else {
    return res.status(400).send({ message: `Password is not given!` });
  }
}

module.exports = {
  hashPassword,
};
