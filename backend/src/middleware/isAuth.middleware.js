import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

const isAuth = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken) throw new ApiError(404, "Access token not found!");

  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken)
    throw new ApiError(401, "Access token is invalid or expire!");
  req.userId = decodedToken._id;
  next();
});

export { isAuth };
