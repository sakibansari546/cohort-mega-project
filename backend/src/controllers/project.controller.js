import { Project } from "../models/project.model.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import mongoose from "mongoose";

const getProjects = asyncHandler(async (req, res) => {
  // get all projects
  // 1. check user login or not
  // 2. find projects and remove sensitive data
  // 3. send res
  const projects = await Project.find({ createdBy: req.userId });
  if (!projects || !projects.length)
    res
      .status(404)
      .json(new ApiResponse(404, { projects: [] }, "No projects found"));

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projects: projects },
        "Projects retrieved successfully",
      ),
    );
});

const getProjectById = asyncHandler(async (req, res) => {
  // get project by id
  // 1. check user login or not
  // 2. get projectId from req.params
  // 3. find project with projectId
  // 4. remove sensitive data from project
  // 5. send res

  const { projectId } = req.params;
  if (!projectId) throw new ApiError(404, "porjectId is required");

  const validId = new mongoose.Types.ObjectId(projectId);
  if (!validId) throw new ApiError(401, "Invalid porjectID");

  const project = await Project.findOne({
    _id: validId,
    createdBy: req.userId,
  });

  if (!project)
    res
      .status(404)
      .json(new ApiResponse(404, { project: {} }, "No project found"));

  res
    .status(200)
    .json(new ApiResponse(200, { project }, "Project retrieved successfully"));
});

const createProject = asyncHandler(async (req, res) => {
  // create project
  // 1. check user login or not
  // 2. get data from req.body and validate
  // 3. create project and set createdBy with req.userId
  // 4. send res

  const { name, description } = req.body;

  const newProject = await Project.create({
    name,
    description,
    createdBy: req.userId,
  });

  if (!newProject) throw new ApiError(404, "Failed to create project");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { newProject: newProject },
        "Project created successfully",
      ),
    );
});

const updateProject = asyncHandler(async (req, res) => {
  // update project
  // 1. check user login or not
  // 2. get data from req.body
  // 3. get projectId from req.params
  // 4. find project with projectId
  // 5. update the project fields
  // 6. send res
  const { name, description } = req.body;
  const { projectId } = req.params;

  const validId = new mongoose.Types.ObjectId(projectId);
  if (!validId) throw new ApiError(401, "Invalid porjectID");

  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: validId,
      createdBy: req.userId,
    },
    {
      name,
      description,
    },
    { new: true },
  );

  if (!updatedProject) throw new ApiError(404, "Failed to update project");

  res
    .status(200)
    .json(
      new ApiResponse(200, { updatedProject }, "Project updated successfully"),
    );
});

const deleteProject = asyncHandler(async (req, res) => {
  // delete project
  // get projectId from req.params
  // findAndDelete project with projectId
  // send res

  const { projectId } = req.params;
  if (!projectId) throw new ApiError(404, "projectId is required");

  const validId = new mongoose.Types.ObjectId(projectId);
  if (!validId) throw new ApiError(401, "Invalid porjectID");

  const deleteProject = await Project.findOneAndDelete({
    _id: validId,
    createdBy: req.userId,
  });

  if (!deleteProject) throw new ApiError(401, "Failed to delete project");

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Project deleted successfully"));
});

const addMemberToProject = asyncHandler(async (req, res) => {
  // add member to project
});

const getProjectMembers = asyncHandler(async (req, res) => {
  // get project members
});

const deleteMember = asyncHandler(async (req, res) => {
  // delete member from project
});

const updateMemberRole = asyncHandler(async (req, res) => {
  // update member role
});

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
