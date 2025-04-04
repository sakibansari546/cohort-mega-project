import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import { matchedData } from "express-validator";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = matchedData(req);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { email, username, password, role },
        "User registration successful!",
      ),
    );
});

export { registerUser };
