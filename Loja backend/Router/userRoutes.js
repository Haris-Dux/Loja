const { Router } = require("express");
const {
  signup,
  login,
  logout,
  updateUser,
  forgotPassword,
  resetPassword,
  validateToken,
} = require("../Controller/UserController");

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/updateUser", updateUser);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/validateToken", validateToken);

module.exports = userRouter;
