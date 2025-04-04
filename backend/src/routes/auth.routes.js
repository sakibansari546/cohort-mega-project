import { Router } from "express";

import { registerUser } from "../controllers/auth.controller.js";
import {
  userRegistrationValidationSchema,
  userRegistrationValidator,
} from "../validators/index.js";
import { validate } from "../middleware/validate.middleware.js";
import { checkSchema } from "express-validator";

const router = Router();

router.post(
  "/register",
  //   checkSchema(userRegistrationValidationSchema),
  userRegistrationValidator(),
  validate,
  registerUser,
);

export default router;
