import { Router } from "express";

import { isAuth } from "../middleware/isAuth.middleware.js";
import {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  searchMemberForAdding,
  updateMemberRole,
  updateProject,
} from "../controllers/project.controller.js";
import {
  addMemberToProjectValidator,
  createProjectValidator,
  deleteMemberValidator,
  searchMemberForAddInProjectValidator,
  updateMemberRoleValidator,
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

router.post(
  "/:projectId/add-member/:memberId",
  addMemberToProjectValidator(),
  validate,
  isAuth,
  addMemberToProject,
);
router.delete(
  "/:projectId/delete-member/:memberId",
  deleteMemberValidator(),
  validate,
  isAuth,
  deleteMember,
);
router.patch(
  "/:projectId/update-member-role/:memberId",
  updateMemberRoleValidator(),
  validate,
  isAuth,
  updateMemberRole,
);

router.post("/search-member-for-add", isAuth, searchMemberForAdding);

router.get("/:projectId/project-members", isAuth, getProjectMembers);

export default router;
