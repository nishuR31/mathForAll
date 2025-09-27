import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import { red } from "../config/redis.js";
import ApiResponse from "../utils/apiResponse.js";
import codes from "../utils/statusCodes.js";
import hideEmail from "../utils/hideEmail.js";
import isEmpty from "../utils/isEmpty.js";
import {
  tokens,
  accessToken,
  verifyRefresh,
  verifyAccess,
  refreshToken,
} from "../utils/tokenGenerator.js";
import cookieOptions from "../utils/cookieOptions.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { mail } from "../utils/mailer.js";
import driveLink from "../utils/driveLink.js";
import json from "../utils/json.js";
import { otp, expiry } from "../utils/OTP.js";

export let register = asyncHandler(async (req, res) => {
  let existingUser = await User.find();

  if (existingUser[0]) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User exists, signup denied.",
          codes.unauthorized
        ).res()
      );
  }

  let { firstName, lastName, email, password, password2, userName } = req.body;
  if (isEmpty([email, password, password2, userName])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("All fields are required", codes.badRequest).res()
      );
  }

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Invalid email format.", codes.badRequest).res()
      );
  }

  if (password.length < 8) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must be atleast 8 characters long.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\d/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a digit [1,2...].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[a-z]/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a lowercase character [a-z].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[A-Z]/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have an uppercase character [A-Z].",
          codes.badRequest
        ).res()
      );
  }

  if (/\s/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must not have any spaces between.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\W/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a symbol [!,@...].",
          codes.badRequest
        ).res()
      );
  }
  if (password !== password2) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Password dont match.", codes.badRequest).res()
      );
  }

  let existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse("Email already exists.", codes.conflict).res()
      );
  }

  let existingUsername = await User.findOne({ userName });

  if (existingUsername) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          `Account with username : ${userName} already exists`,
          codes.conflict
        ).res()
      );
  }

  // await User.create({
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   userName,
  // });
  let user = await User.create({
    firstName,
    lastName,
    email,
    password,
    userName,
  });
  if (!user) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Registration failed, please retry.",
          codes.internalServerError
        ).res()
      );
  }

  if (req.body.photoUrl) {
    user.photoUrl = driveLink(req.body.photoUrl, "view");
    await user.save();
  }

  return res.status(codes.created).json(
    new ApiResponse(
      "Account created and registered successfully,please return to login",
      codes.created,
      {
        userName: user.userName,
        email: hideEmail(user.email),
        photoUrl: user.photoUrl,
      }
    ).res()
  );
});

/////////////////////////////////////////////////////////////////

export let login = asyncHandler(async (req, res) => {
  let exist = json.parse(await red.hGet(`user:0000`, "login"));
  console.log(req.user, exist);
  if (req.user || exist) {
    return res.status(codes.ok).json(
      new ApiResponse(
        `User already logged in, welcome ${
          req.user.userName ?? exist.userName
        }`,
        codes.ok,
        {
          user: {
            _id: req.user._id ?? exist._id,
            userName: req.user.userName ?? exist.userName,
          },
        }
      ).res()
    );
  }
  let { emailUser, password } = req.body;
  console.log("REQ.BODY:", req.body);

  if (!emailUser || !password) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Username or email required with password.",
          codes.badRequest
        ).res()
      );
  }

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let field = emailRegex.test(emailUser) ? "email" : "userName";

  let user = await User.findOne({ $or: [{ [field]: emailUser }] });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "Account with credentials do not exist, try registering.",
          codes.notFound
        ).res()
      );
  }

  if (!(await user.comparePassword(password))) {
    return res
      .status(codes.conflict)
      .json(new ApiErrorResponse("Password mismatch.", codes.conflict).res());
  }

  let payload = { _id: user._id, userName: user.userName };
  let { accessToken, refreshToken } = tokens(payload);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, cookieOptions("access"));
  res.cookie("refreshToken", refreshToken, cookieOptions("refresh"));
  await red.hSet(
    `user:0000`,
    "login",
    json.str({ userName: user.userName, _id: user._id })
  ); //1day
  return res.status(codes.ok).json(
    new ApiResponse(
      `Welcome back ${user.userName}. Logging you in.`,
      codes.ok,
      {
        user: {
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          photoUrl: user.photoUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken: accessToken,
      }
    ).res()
  );
});

////////////////////////////////////////////////////////////////////////////

export let profile = asyncHandler(async (req, res) => {
  let exist = json.parse(await red.hGet(`user:0000`, "profile"));
  if (exist) {
    return res.status(codes.ok).json(
      new ApiResponse(`User ${user.userName} found successfully.`, codes.ok, {
        user: {
          _id: exist._id,
          userName: exist.userName,
          firstName: exist.firstName,
          lastName: exist.lastName,
          email: exist.email,
          photoUrl: exist.photoUrl,
          createdAt: exist.createdAt,
          updatedAt: exist.updatedAt,
        },
      }).res()
    );
  }

  let user = await User.findOne();
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Samir sir not found.", codes.notFound).res());
  }
  await red.hSet(
    `user:0000`,
    "profile",
    json.str({
      _id: user._id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photoUrl: user.photoUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  );
  return res.status(codes.ok).json(
    new ApiResponse(`User ${user.userName} found successfully.`, codes.ok, {
      user: {
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,

        photoUrl: user.photoUrl,

        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }).res()
  );
});
/////////////////////////////////////////////////////////////
export let logout = asyncHandler(async (req, res) => {
  // let exist=json.parse(await red.hGet(`user:0000`,"login))
  for (let cookie in req.cookies) {
    res.clearCookie(cookie, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "None",
    });
  }

  const keys = await red.keys("user:*");
  if (keys) {
    await red.del(...keys);
  }

  return res
    .status(codes.ok)
    .json(new ApiResponse(`User successfully logged out.`, codes.ok).res());
});

///////////////////////////////////////////////

export let updateProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not authorized,please login before updating profile.",
          codes.unauthorized
        ).res()
      );
  }

  let { firstName, email, lastName } = req.body;

  let user = await User.findById(req.user._id).select(
    "-password -refreshToken -otp"
  );

  if (!req.user._id) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("User Account not found.", codes.notFound).res()
      );
  }

  // Update fields if changed
  if (firstName && user.firstName !== firstName) {
    user.firstName = firstName;
  }
  if (email && user.email !== email) {
    user.email = email;
  }
  if (lastName !== undefined && user.lastName !== lastName) {
    user.lastName = lastName;
  }

  await user.save();
  await red.hSet(
    `user:0000`,
    "profile",
    json.parse({
      _id: user._id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,

      photoUrl: user.photoUrl,

      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  );
  return res.status(codes.ok).json(
    new ApiResponse("User profile successfully updated", codes.ok, {
      user: user,
    }).res()
  );
});

///////////////////////////////////////////////////////////

export let del = asyncHandler(async (req, res) => {
  let exist = json.parse(await red.hGet(`user:0000`, "login"));
  let user = await User.findByIdAndDelete(req.user._id ?? exist._id);
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("User not found.", codes.notFound).res());
  }

  let keys = await red.get(`user:*`);
  if (keys) {
    await red.del(...keys);
  }

  return res
    .status(codes.ok)
    .json(new ApiResponse("Users successfully deleted", codes.ok).res());
});

////////////////////////////////////////////////////////////////////////////////////////

export let refresh = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse("User not authenticated", codes.unauthorized).res()
      );
  }
  let user = await User.findById(req.user._id);
  if (!user) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "User not found. Try registering",
          codes.notFound
        ).res()
      );
  }

  let decodedRefresh;
  if (user.refreshToken) {
    try {
      decodedRefresh = await verifyRefresh(user.refreshToken);
    } catch (err) {
      console.log(`Error verifying token: ${err.message}`);
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse(
            "Token verification failed",
            codes.badRequest
          ).res()
        );
    }
  }

  if (decodedRefresh._id !== user._id) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Token mismatched. Login again",
          codes.conflict
        ).res()
      );
  }

  let accessToken = await accessToken({
    userName: user.userName,
    _id: user._id,
  });

  res.cookie("accessToken", accessToken, cookieOptions("access"));

  return res
    .status(codes.ok)
    .json(new ApiResponse("Token refreshed", codes.ok).res());
});

/////////////////////////////////////////////////////////////////////////////////

export const checkOtp = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const user = await User.findOne({ email });
  // const user = await User.findOne({ email: localStorage.getItem("email") });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Email not found.", codes.notFound).res());
  }

  if (!bcrypt.compare(otp, user.otp.code)) {
    return res
      .status(codes.conflict)
      .json(new ApiErrorResponse("Invalid otp.", codes.conflict).res());
  }

  if (user.otp.expiry < Date.now()) {
    return res
      .status(codes.conflict)
      .json(new ApiErrorResponse("OTP expired.", codes.conflict).res());
  }
  user.otp.verified = true;
  user.otp.expiry = null;
  await user.save();

  return res
    .status(codes.ok)
    .json(new ApiResponse("OTP verification done", codes.ok).res());
});
//////////////////////////////////////////////////////////////////////////////
// helper for OTP expiry time
export const email = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Email not found.", codes.notFound).res());
  }

  // generate OTP
  const { code, hashCode } = await otp();

  user.otp = {
    code: hashCode,
    verified: false,
    expiry: expiry(5),
  };

  await user.save();

  // send mail immediately
  await mail({
    to: email,
    subject: "Mathematics for all - Access Permission",
    text: `Your OTP is ${code}. It will expire in 5 minutes.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Access Permission</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #007bff;">Access Permission</h2>
    <p style="font-size: 15px; color: #333;">
      Your OTP is <b style="font-size: 18px; color: #d9534f;">${code}</b>.  
      It will expire in <b>5 minutes</b>.
    </p>
    <p style="font-size: 14px; color: #555;">
      If you did not request this reset, please ignore this email or contact our support team.
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 13px; color: #666;">
      Regards,<br/>
      <strong>Mathematics for All - Security Team</strong>
    </p>
  </div>
</body>
</html>
`,
  });

  return res
    .status(codes.ok)
    .json(new ApiResponse("OTP sent to your email.", codes.ok).res());
});

////////////////////////////////////////////////////////////////////////////////

export const forgotPass = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Email not found.", codes.notFound).res());
  }

  // generate OTP
  const { code, hashCode } = otp();

  user.otp = {
    code: hashCode,
    verified: false,
    expiry: expiry(5),
  };

  await user.save();

  // send mail immediately
  await mail({
    to: email,
    subject: "Mathematics for all - Password Reset",
    text: `Your OTP is ${code}. It will expire in 5 minutes.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #007bff;">Password Reset</h2>
    <p style="font-size: 15px; color: #333;">
      Your OTP is <b style="font-size: 18px; color: #d9534f;">${code}</b>.  
      It will expire in <b>5 minutes</b>.
    </p>
    <p style="font-size: 14px; color: #555;">
      If you did not request this reset, please ignore this email or contact our support team.
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 13px; color: #666;">
      Regards,<br/>
      <strong>Mathematics for All - Security Team</strong>
    </p>
  </div>
</body>
</html>
`,
  });

  return res
    .status(codes.ok)
    .json(new ApiResponse("OTP sent to your email.", codes.ok).res());
});

////////////////////////////////////////////////////////

export const verifyOtp = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const user = await User.findOne({ email });
  // const user = await User.findOne({ email: localStorage.getItem("email") });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Email not found.", codes.notFound).res());
  }

  if (!bcrypt.compare(otp, user.otp.code)) {
    return res
      .status(codes.conflict)
      .json(new ApiErrorResponse("Invalid otp.", codes.conflict).res());
  }

  if (user.otp.expiry < Date.now()) {
    return res
      .status(codes.conflict)
      .json(new ApiErrorResponse("OTP expired.", codes.conflict).res());
  }
  user.otp.verified = true;
  user.otp.expiry = null;
  await user.save();

  return res
    .status(codes.ok)
    .json(new ApiResponse("OTP verification done", codes.ok).res());
});

////////////////////////////////////////////////////////

export const changePass = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  // const user = await User.findOne({ email: localStorage.getItem("email") });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Email not found.", codes.notFound).res());
  }

  if (!user.otp.verified) {
    return res
      .status(codes.conflict)
      .json(new ApiErrorResponse("OTP not verified.", codes.conflict).res());
  }

  if (password.length < 8) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must be atleast 8 characters long.",
          codes.badRequest
        ).res()
      );
  }

  if (bcrypt.compare(password, user.password)) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Password must be different from previous one.",
          codes.conflict
        ).res()
      );
  }

  if (!/\d/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a digit [1,2...].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[a-z]/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a lowercase character [a-z].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[A-Z]/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have an uppercase character [A-Z].",
          codes.badRequest
        ).res()
      );
  }

  if (/\s/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must not have any spaces between.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\W/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a symbol [!,@...].",
          codes.badRequest
        ).res()
      );
  }
  user.password = password;

  user.otp.verified = false;
  await user.save();
  await mail({
    to: email,
    subject: "Mathematics for All - Password Change Done",
    text: `Your password is successfully changed.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Changed</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #d9534f;">Your password is successfully changed</h2>
    <p style="font-size: 15px; color: #333;">
      If this was not done by you, please <a href="https://mathematics-for-all.vercel.app/reset-password" style="color: #007bff; text-decoration: none;">reset your password immediately</a> and contact our support team.
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 13px; color: #666;">
      Regards,<br/>
      <strong>Mathematics for All - Security Team</strong>
    </p>
  </div>
</body>
</html>
`,
  });

  return res
    .status(codes.ok)
    .json(
      new ApiResponse("Password changed. Please login again.", codes.ok).res()
    );
});

///////////////////////////////////////////////////////////////////////////////

let q;

export const passwordLessMail = asyncHandler(async (req, res, next) => {
  let { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Email not found.", codes.notFound).res());
  }

  let token = accessToken({ _id: user._id, email: user.email });
  q = refreshToken({ payload: "payload" });

  await mail({
    to: email,
    subject: "Mathematics for All - Login",
    text: `Click button below to login.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Link</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    
    <h2 style="color: #007bff; margin-bottom: 20px;">Click below to login</h2>

    <a href="https://mathematics-for-all.onrender.com/api/v1/sir/password-less-login?${q}=${token}"
       style="display: inline-block; background-color: #28a745; color: #fff; 
              padding: 12px 24px; border-radius: 6px; text-decoration: none; 
              font-weight: bold; font-size: 16px;">
      Login
    </a>

    <p style="font-size: 15px; color: #333; margin-top: 20px;">
      If this action was not done by you, please 
      <a href="https://mathematics-for-all.vercel.app/reset-password" style="color: #d9534f; text-decoration: none;">
        reset your password immediately
      </a> and contact our support team.
    </p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

    <p style="font-size: 13px; color: #666;">
      Regards,<br/>
      <strong>Mathematics for All - Security Team</strong>
    </p>
  </div>
</body>
</html>
`,
  });

  return res
    .status(codes.ok)
    .json(new ApiResponse("Check your mail. Login link sent", codes.ok).res());
});

//////////////////////////////////////////////////////////

export const passwordLessLogin = asyncHandler(async (req, res) => {
  let { q: token } = req.query;

  let decoded;
  try {
    decoded = verifyAccess(token);
  } catch (err) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Token invalid", codes.badRequest).res());
  }
  const user = await User.findOne({ email: decoded.email });
  // const user = await User.findOne({ email: localStorage.getItem("email") });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Email not found.", codes.notFound).res());
  }

  if (!decoded._id === user._id) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse("Mismatch token, try again", codes.conflict).res()
      );
  }

  return res
    .status(codes.ok)
    .json(new ApiResponse(`Welcome back ${user.userName}`, codes.ok).res());
});

///////////////////////////////////////////////////////

export let reset = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(codes.unauthorized).json(new ApiErrorResponse().json());
  }
  let { password1, password2 } = req.body;
  if (isEmpty([password1, password2])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Password fields are required.", codes.badRequest)
      );
  }

  let user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Samir sir not found.", codes.notFound).res());
  }
  if (bcrypt.compare(password1, user.password)) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "New password must be different from old password.",
          codes.conflict
        ).res()
      );
  }

  if (password1 !== password2) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Passwords dont match, kindly recheck.",
          codes.conflict
        ).res()
      );
  }

  if (password1.length < 8) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must be atleast 8 characters long.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\d/.test(password1)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a digit [1,2...].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[a-z]/.test(password1)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a lowercase character [a-z].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[A-Z]/.test(password1)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have an uppercase character [A-Z].",
          codes.badRequest
        ).res()
      );
  }

  if (/\s/.test(password1)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must not have any spaces between.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\W/.test(password1)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a symbol [!,@...].",
          codes.badRequest
        ).res()
      );
  }

  user.password = password1;
  await user.save();
  return res
    .status(codes.ok)
    .json(new ApiResponse("Password successfully changed.", codes.ok).res());
});
