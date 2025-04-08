import { Router } from "express";

import { isAuth } from "../middleware/isAuth.middleware.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/project.controller.js";
import {
  createProjectValidator,
  updateProjectValidator,
} from "../validators/project/index.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/projects", isAuth, getProjects);
router.get("/:projectId", isAuth, getProjectById);

router.post(
  "/createProject",
  createProjectValidator(),
  validate,
  isAuth,
  createProject,
);
router.post(
  "/update/:projectId",
  updateProjectValidator(),
  validate,
  isAuth,
  updateProject,
);
router.post("/delete/:projectId", isAuth, deleteProject);

export default router;
