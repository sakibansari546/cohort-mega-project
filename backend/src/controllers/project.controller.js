import { Project } from "../models/project.model.js";
import { ProjectMember } from "../models/projectmember.model.js";
import { User } from "../models/user.model.js";
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
  // 1. get data - projectId, userId, and role
  // 2.  validate data
  // 3. insert data in projectMember table
  // 4. send res

  const { projectId, memberId } = req.params;
  const { role } = req.body;

  if (memberId === req.userId)
    throw new ApiError(
      401,
      "You cannot add yourself as a member to the project",
    );

  const projectMember = await ProjectMember.findOne({
    $and: [{ project: projectId }, { user: memberId }],
  });
  if (projectMember)
    throw new ApiError(403, "Member already exists in the project");

  const newProjectMember = await ProjectMember.create({
    role,
    user: memberId,
    project: projectId,
  });

  if (!newProjectMember) throw new ApiError(404, "Faild to Add Project Member");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projectMember: newProjectMember },
        "Member add successfully",
      ),
    );
});

const getProjectMembers = asyncHandler(async (req, res) => {
  // get project members
  // 1. get data - projectId
  // 2. find Project Member with projectId
  // 3. if no member throw an error
  // 4. send res

  const { projectId } = req.params;

  if (!projectId) throw new ApiError(404, "projectId is required");

  const validId = new mongoose.Types.ObjectId(projectId);
  if (!validId) throw new ApiError(401, "Invalid projectId");

  const projectMembers = await ProjectMember.find({ project: projectId });
  if (!projectMembers || !projectMembers.length)
    throw new ApiError(404, "Project Member not found");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projectMembers: projectMembers },
        "Project members retrieved successfully",
      ),
    );
});

const deleteMember = asyncHandler(async (req, res) => {
  // delete member from project
  // get data - projectId and memberId
  // find and delete
  // send res
  const { projectId, memberId } = req.params;

  const projectMember = await ProjectMember.findOneAndDelete({
    project: projectId,
    user: memberId,
  });
  if (!projectMember)
    throw new ApiError(404, "Failed to delete member from project");

  res.status(200).json(new ApiResponse(200, {}, "Member Deleted successfully"));
});

const updateMemberRole = asyncHandler(async (req, res) => {
  // update member role
  // get data - role
  // find and update member
  // send res

  const { projectId, memberId } = req.params;
  const { role } = req.body;

  const updatedProjectMember = await ProjectMember.findOneAndUpdate(
    { project: projectId, user: memberId },
    { role: role },
    { new: true },
  );
  if (!updatedProjectMember)
    throw new ApiError(403, "Failed to update member role");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatedProjectMember: updatedProjectMember },
        "Member role updated successfully",
      ),
    );
});

const searchMemberForAdding = asyncHandler(async (req, res) => {
  const { email } = req.query;

  const members = await User.find({
    email: { $regex: "^" + email, $options: "i" },
    _id: { $ne: req.userId },
  });
  if (!members || !members.length) throw new ApiError(404, "Member not found");

  res
    .status(200)
    .json(new ApiResponse(200, { members }, "Members retrieved successfully"));
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
  searchMemberForAdding,
};
