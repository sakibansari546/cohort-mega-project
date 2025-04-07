import { Router } from "express";

import {
  forgotPassword,
  refreshToken,
  registerUser,
  resetPassword,
  userLogin,
  userLogout,
  verifyUserEmial,
} from "../controllers/auth.controller.js";
import {
  resetPasswordValidator,
  userFrogotPasswordValidator,
  userLoginVelidator,
  userRegistrationValidator,
} from "../validators/index.js";

import { validate } from "../middleware/validate.middleware.js";
import { isAuth } from "../middleware/isAuth.middleware.js";

const router = Router();

router.post("/register", userRegistrationValidator(), validate, registerUser);
router.get("/verify-email/:token", verifyUserEmial);

router.post("/login", userLoginVelidator(), validate, userLogin);
router.post("/logout", isAuth, userLogout);

router.post("/refresh", refreshToken);

router.post(
  "/forgot-password",
  userFrogotPasswordValidator(),
  validate,
  forgotPassword,
);

router.post(
  "/reset-password/:token",
  resetPasswordValidator(),
  validate,
  resetPassword,
);

export default router;
