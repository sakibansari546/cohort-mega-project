import { body, param } from "express-validator";
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
      .toLowerCase()
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
      .toLowerCase()
      .isIn(AvailableUserRole)
      .withMessage(
        `Role must be one of the following: ${AvailableUserRole.join(", ")}!`,
      ),
  ];
};

const userLoginVelidator = () => {
  return [
    body("email")
      .optional({ checkFalsy: true })
      .trim()
      .isEmail()
      .withMessage("Email is invalid!"),

    body("username")
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long!")
      .isLength({ max: 15 })
      .withMessage("Username must not exceed 15 characters!"),

    body().custom((value, { req }) => {
      if (!req.body.email && !req.body.username) {
        throw new Error("Either email or username is required!");
      }
      return true;
    }),

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
  ];
};

const userFrogotPasswordValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is invalid!"),
  ];
};

const resetPasswordValidator = () => {
  return [
    param("token").trim().notEmpty().withMessage("Token is required!"),

    body("newPassword")
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

    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Confirm Password is required!")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Confirm Password must match New Password!");
        }
        return true;
      }),
  ];
};

// const userRegistrationValidationSchema = {
//   email: {
//     trim: true,
//     notEmpty: {
//       errorMessage: "Email is required!",
//     },
//     isEmail: {
//       errorMessage: "Email is invalid!",
//     },
//   },
//   username: {
//     trim: true,
//     notEmpty: {
//       errorMessage: "Username is required!",
//     },
//     isLength: {
//       options: {
//         min: 3,
//       },
//       errorMessage: "Username must be at least 3 characters long!",
//     },
//     isLength: {
//       options: {
//         max: 15,
//       },
//       errorMessage: "Username must not exceed 15 characters!",
//     },
//   },
// };

export {
  userRegistrationValidator,
  userLoginVelidator,
  userFrogotPasswordValidator,
  resetPasswordValidator,
};
