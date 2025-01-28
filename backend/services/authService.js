const User = require("../models/userSchema");
const { getUser } = require("./tokenGenerationService");

const authenticate = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Check if authorization header is present and starts with "Bearer"
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "Authorization token missing or invalid" });
    }

    const receivedToken = authorization.split(" ")[1];

    const isTokenVerified = getUser(receivedToken);
    console.log("Token verified data", isTokenVerified);
    if (isTokenVerified) {
      req.user = isTokenVerified;
      next();
    } else {
      return res.status(401).json(isTokenVerified);
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
