import { Router } from "express";

import { isAuth } from "../middleware/isAuth.middleware.js";
import { validateProjectPermission } from "../middleware/validate-permissions.middlerware.js";

import {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectForMember,
  getProjectMembers,
  getProjects,
  getProjectsForMembers,
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
import { UserRoleEnum } from "../utils/constants.js";

const router = Router();

router.get("/projects", isAuth, getProjects);
router.get("/:projectId", isAuth, getProjectById);

// Two routes for User Enrolled in Projects
router.get("/projects/for-members", isAuth, getProjectsForMembers);
router.get("/:projectId/for-members", isAuth, getProjectForMember);

router.post(
  "/create",
  createProjectValidator(),
  validate,
  isAuth,
  createProject,
);
router.patch(
  "/update/:projectId",
  updateProjectValidator(),
  validate,
  isAuth,
  validateProjectPermission([UserRoleEnum.ADMIN, UserRoleEnum.ADMIN]),
  updateProject,
);
router.delete(
  "/delete/:projectId",
  isAuth,
  validateProjectPermission([UserRoleEnum.ADMIN]),
  deleteProject,
);

// Project Members
router.post(
  "/:projectId/add-member/:memberId",
  addMemberToProjectValidator(),
  validate,
  isAuth,
  validateProjectPermission([UserRoleEnum.ADMIN, UserRoleEnum.PROJECt_ADMIN]),
  addMemberToProject,
);
router.delete(
  "/:projectId/delete-member/:memberId",
  deleteMemberValidator(),
  validate,
  isAuth,
  validateProjectPermission([UserRoleEnum.ADMIN, UserRoleEnum.PROJECt_ADMIN]),
  deleteMember,
);
router.patch(
  "/:projectId/update-member-role/:memberId",
  updateMemberRoleValidator(),
  validate,
  isAuth,
  validateProjectPermission([UserRoleEnum.ADMIN, UserRoleEnum.PROJECt_ADMIN]),
  updateMemberRole,
);

router.post(
  "/search-member-for-add",
  isAuth,
  validateProjectPermission([UserRoleEnum.ADMIN, UserRoleEnum.PROJECt_ADMIN]),
  searchMemberForAdding,
);

router.get("/:projectId/project-members", isAuth, getProjectMembers);

export default router;
