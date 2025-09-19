import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  changePass,
  del,
  forgotPass,
  login,
  logout,
  passwordLessLogin,
  passwordLessMail,
  profile,
  refresh,
  register,
  reset,
  updateProfile,
  verifyOtp,
} from "../controllers/user.controller.js";

let userRouter = new express.Router();

userRouter.post("/signup", register);
userRouter.get("/reset", auth(true), reset);
userRouter.post("/login", auth(false), login);
userRouter.get("/me", auth(false), profile);
userRouter.get("/logout", auth(false), logout);
// userRouter.get("/refresh", auth(true), refresh);
userRouter.patch("/update", auth(true), updateProfile);
userRouter.delete("/del", auth(true), del);
userRouter.get("/forgot", forgotPass);
userRouter.post("/otp", verifyOtp);
userRouter.patch("/change-pass", changePass);
userRouter.get("/password-less-mail", passwordLessMail);
userRouter.get("/password-less-login", passwordLessLogin);

export default userRouter;
