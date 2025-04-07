import { validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

const validate = (req, res, next) => {
  // console.log(validationResult(req));

  const errors = validationResult(req);
  // console.log(errors);

  if (errors.isEmpty()) {
    return next();
  }

  // console.log("Logging Errors in Validate middleware", errors);
  const extractedError = [];

  errors.array().map((err) =>
    extractedError.push({
      [err.path]: err.msg,
    }),
  );
  const err = new ApiError(422, errors.array()[0].msg, extractedError);
  // console.log(errors.errors);

  throw new ApiError(
    422,
    errors.array()[0].msg || "Recive data is not valid!",
    extractedError,
  );
};

export { validate };
