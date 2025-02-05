const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { getUser } = require("./tokenGenerationService");
const { default: messages } = require("../utils/constants");

const authenticate = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Check if authorization header is present and starts with "Bearer"
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: messages.auth.tokenMissing });
    }

    const receivedToken = authorization.split(" ")[1];

    const isTokenVerified = getUser(receivedToken);
    if (isTokenVerified) {
      req.user = isTokenVerified;
      next();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json(isTokenVerified);
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: messages.auth.inValidToken });
    }

    console.error("Authentication error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  authenticate,
};
