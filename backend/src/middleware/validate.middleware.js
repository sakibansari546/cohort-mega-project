import { validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

const validate = (req, res, next) => {
  console.log(req.body);

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  console.log("Logging Errors in Validate middleware", errors);
  const extractedError = [];

  errors.array().map((err) =>
    extractedError.push({
      [err.path]: err.msg,
    }),
  );

  throw new ApiError(422, "Recive data is not valid!", extractedError);
};

export { validate };
