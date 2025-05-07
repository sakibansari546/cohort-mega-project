import mongoose from "mongoose";
import { Project } from "../models/project.model.js";
import { ProjectMember } from "../models/projectmember.model.js";

import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

export const validateProjectPermission = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(400, "Project Id is missing");
    }
    const project = await ProjectMember.findOne({
      project: projectId,
      user: req.userId,
    });

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    if (!roles.includes(project.role)) {
      throw new ApiError(
        403,
        "You do not have permission to access this project",
      );
    }

    next();
  });
