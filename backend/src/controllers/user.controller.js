import { User } from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import { UserDataSelectedFeilds } from "../utils/constants.js";

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select(UserDataSelectedFeilds);
  if (!user || !user.isEmailVerified) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, { user }, "user data"));
});

export { getCurrentUser };
