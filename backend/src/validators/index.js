import { body } from "express-validator";
import { AvailableUserRole } from "../utils/constants.js";

const userRegistrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is invalid!"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long!")
      .isLength({ max: 15 })
      .withMessage("Username must not exceed 15 characters!"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long!")
      .matches(/\d/)
      .withMessage("Password must contain at least one number!")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter!")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter!")
      .matches(/[@$!%*?&#]/)
      .withMessage("Password must contain at least one special character!"),

    body("role")
      .trim()
      .notEmpty()
      .withMessage("Role is required!")
      .isIn(AvailableUserRole)
      .withMessage(
        `Role must be one of the following: ${AvailableUserRole.join(", ")}!`,
      ),
  ];
};

export { userRegistrationValidator };
