import { Router } from "express";
import { healthCheck } from "../controllers/health-check.controller.js";

const router = Router();

router.get("/health-check", healthCheck);

export default router;
