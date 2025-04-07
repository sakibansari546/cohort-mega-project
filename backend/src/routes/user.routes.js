import { Router } from "express";

import { getCurrentUser } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.middleware.js";

const router = Router();

// geting the user info
router.get("/get-current-user", isAuth, getCurrentUser);

export default router;
