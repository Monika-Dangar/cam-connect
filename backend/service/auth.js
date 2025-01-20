const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization && !authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "Authorization token missing or invalid" });
    }

    const receivedToken = authorization.split(" ")[1];

    const isTokenVerified = getUser(receivedToken);

    if (isPasswordValid.status == 200) {
      const { userId } = isTokenVerified;

      const user = await User.findById(userId);
      req.user = user;
      next();
    } else {
      return res.send(isTokenVerified);
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  authenticate,
};
