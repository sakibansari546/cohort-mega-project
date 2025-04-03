import { Router } from "express";

import { registerUser } from "../controllers/auth.controller.js";
import { userRegistrationValidator } from "../validators/index.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.post("/register", userRegistrationValidator, validate, registerUser);

export default router;
