const express = require("express");
const {
  signUp,
  login,
  handleGoogle,
  showGoogleOAuth,
  exchangeJWTToUser,
  exchangeRefreshToken,
} = require("../controllors/auth");
const authRouter = express.Router();

const { signUpSchema } = require("../common/Validation/index.js");
const {
  handleValidation,
  verifyJWT,
  verifyRefresh,
} = require("../middlewares");

authRouter.post("/sign-up", signUpSchema, handleValidation, signUp);
authRouter.post("/login", login);
authRouter.get("/me", verifyJWT, exchangeJWTToUser);
authRouter.get("/refresh", verifyRefresh, exchangeRefreshToken);
authRouter.get("/google-oauth", showGoogleOAuth);
authRouter.get("/google-callback", handleGoogle);

module.exports = authRouter;
