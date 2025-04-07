import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import { matchedData } from "express-validator";
import { User } from "../models/user.model.js";
import { sendMail } from "../utils/nodemailer.js";
import {
  verificationEmailTemplate,
  forgotPasswordEmailTemplate,
} from "../utils/emailTemplates.js";
import { UserDataSelectedFeilds } from "../utils/constants.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const cooieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV == "production" ? true : false,
  sameSite: "none",
};

const generateRefreshAndAccessTokenAndSetCookie = async (userId, res) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, cooieOptions);
    res.cookie("refreshToken", refreshToken, cooieOptions);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Internal server errors", error);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role, fullname } = req.body;
  const existUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (existUser && existUser.isEmailVerified) {
    throw new ApiError(400, "User with this email or username already exists");
  }

  if (existUser && !existUser.isEmailVerified) {
    if (existUser.emailVerificationExpiry > Date.now()) {
      throw new ApiError(400, "Email not verified. Please verify your email.");
    }
  }

  const newUser = await User.create({
    email,
    fullname,
    password,
    username,
    role,
  });

  const user = await User.findById(newUser._id).select(UserDataSelectedFeilds);

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  const updatedUser = await User.findOneAndUpdate(
    { email: user.email },
    {
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: tokenExpiry,
    },
    { new: true },
  );

  if (!updatedUser) {
    throw new ApiError(500, "Failed to update user with verification token");
  }

  await sendMail({
    email: user.email,
    subject: "Verify your email!",
    mailgenContent: verificationEmailTemplate(
      user.username,
      `${process.env.BACKEND_BASE_URL}/api/v1/auth/verify-email/${unHashedToken}`,
    ),
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "User registered successfull. Plaese verify your email.",
      ),
    );
});
const verifyUserEmial = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) throw new ApiError(404, "token is required!");

  // Hash the incoming token using the same algorithm and secret
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    $and: [
      { emailVerificationToken: hashedToken },
      { emailVerificationExpiry: { $gt: Date.now() } },
    ],
  });

  if (!user) throw new ApiError(404, "Token is invalid or expire!");

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save();

  const userData = {
    email: user.email,
    username: user.username,
    fullname: user.fullname,
    avatar: user.avatar,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    refreshToken: user.refreshToken,
  };

  res
    .status(200)
    .json(new ApiResponse(200, userData, "User verified successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(404, "The email or username does not exist");
  }

  if (user && !user.isEmailVerified) {
    throw new ApiError(404, "The email verified Please verify your email");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(400, "Invalid password");

  const { accessToken, refreshToken } =
    await generateRefreshAndAccessTokenAndSetCookie(user._id, res);

  const userData = await User.findById(user._id).select(UserDataSelectedFeilds);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userData, accessToken, refreshToken },
        "User login successfully",
      ),
    );
});

const userLogout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user || !user.isEmailVerified) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = null;
  user.save();

  res.clearCookie("accessToken", cooieOptions);
  res.clearCookie("refreshToken", cooieOptions);

  res.status(200).json(new ApiResponse(200, {}, "User logout successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  // get date - email - Done
  // find user with email - Done
  // validate with isEmailVerified - Done
  // generate token - Done
  // save token and expiry in user - Done
  // send email with token and link - Done
  // send res - Done

  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");
  if (user && !user.isEmailVerified)
    throw new ApiError(401, "Email is not verified Please verify your email");

  if (user.forgotPasswordExpiry > Date.now())
    throw new ApiError(
      401,
      "A password reset request has already been made. Please check your email or try again later.",
    );

  const { hashedToken, unHashedToken } = user.generateTemporaryToken();
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = Date.now() + 1 * 60 * 60 * 1000; // Add 1 hour expiry
  await user.save();

  await sendMail({
    email: user.email,
    subject: "Reset your Password!",
    mailgenContent: forgotPasswordEmailTemplate(
      user.username,
      `${process.env.FRONTEND_BASE_URL}/reset-passsword/${unHashedToken}`,
    ),
  });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset email sent successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  // get data - token,newPass,confirmPass - Done
  // get user and validate - Done
  // verify token and check expiry - Dene
  // update the password
  // send res

  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword)
    throw new ApiError(401, "Passwords do not match");

  // Hash the incoming token using the same algorithm and secret
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ forgotPasswordToken: hashedToken });
  if (!user) throw new ApiError(404, "Invaild token user not found!");
  if (user && user.forgotPasswordExpiry < Date.now())
    throw new ApiError(
      401,
      "Token has expired. Please request a new password reset.",
    );

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully!"));
});

const refreshToken = asyncHandler(async (req, res) => {
  const userRefreshToken = req.cookies.refreshToken;
  if (!userRefreshToken)
    throw new ApiError(404, "No Refresh token - Unauthorized");
  const decodedToken = jwt.verify(
    userRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  const user = await User.findById(decodedToken._id).select(
    UserDataSelectedFeilds,
  );
  if (!user) throw new ApiError(401, "Invalid Refresh Token");

  if (userRefreshToken !== user.refreshToken)
    throw new ApiError(401, "Refresh token mismatch - Unauthorized");

  const { refreshToken, accessToken } =
    await generateRefreshAndAccessTokenAndSetCookie(user._id, res);

  user.refreshToken = refreshToken;
  user.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "Toker refreshed successfully",
      ),
    );
});

export {
  registerUser,
  verifyUserEmial,
  userLogin,
  userLogout,
  refreshToken,
  forgotPassword,
  resetPassword,
};
