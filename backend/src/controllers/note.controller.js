import { ProjectNote } from "../models/note.model.js";
import { Project } from "../models/project.model.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

const getNotes = asyncHandler(async (req, res) => {
  // get all notes
  // get projectId and find
  // send res
  const { projectId } = req.params;
  const projectNotes = await ProjectNote.find({ project: projectId })
    .populate([
      {
        path: "project",
        select: "_id name description",
        populate: {
          path: "createdBy",
          select: "_id fullname username email avatar role",
        },
      },
      {
        path: "createdBy",
        select: "_id fullname username email avatar role",
      },
    ])
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projectNotes },
        "Project Notes retrieved successfully",
      ),
    );
});

const getNoteById = asyncHandler(async (req, res) => {
  // get note by id
  const { projectId, noteId } = req.params;
  const projectNote = await ProjectNote.findOne({
    $and: [{ project: projectId }, { _id: noteId }],
  }).populate([
    {
      path: "project",
      select: "_id name description",
      populate: {
        path: "createdBy",
        select: "_id fullname username email avatar role",
      },
    },
    {
      path: "createdBy",
      select: "_id fullname username email avatar role",
    },
  ]);
  if (!projectNote) throw new ApiError(404, "No Project Note");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projectNote },
        "Project Note retrieved successfully",
      ),
    );
});

const createNote = asyncHandler(async (req, res) => {
  // create note
  const { projectId } = req.params;
  const { content } = req.body;

  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "Project not found");

  const newProjectNote = await ProjectNote.create({
    project: projectId,
    createdBy: req.userId,
    content,
  });
  if (!newProjectNote) throw new ApiError(500, "Failed to create Project Note");

  const projectNote = await ProjectNote.findById(newProjectNote._id).populate([
    {
      path: "project",
      select: "_id name content",
      populate: {
        path: "createdBy",
        select: "_id fullname username email avatar role",
      },
    },
    {
      path: "createdBy",
      select: "_id fullname username email avatar role",
    },
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { newProjectNote: projectNote },
        "Project Note created successfully",
      ),
    );
});

const updateNote = asyncHandler(async (req, res) => {
  // update note
  const { projectId, noteId } = req.params;
  const { content } = req.body;

  const updatedProjectNote = await ProjectNote.findOneAndUpdate(
    {
      $and: [
        { project: projectId },
        { _id: noteId },
        { createdBy: req.userId },
      ],
    },
    { content: content },
    { new: true },
  ).populate([
    {
      path: "project",
      select: "_id name content",
      populate: {
        path: "createdBy",
        select: "_id fullname username email avatar role",
      },
    },
    {
      path: "createdBy",
      select: "_id fullname username email avatar role",
    },
  ]);

  if (!updatedProjectNote) throw new ApiError(404, "Project Note not found");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatedProjectNote },
        "Project Note updated successfully",
      ),
    );
});

const deleteNote = asyncHandler(async (req, res) => {
  // delete note
  const { projectId, noteId } = req.params;
  if (!projectId || !noteId) {
    throw new ApiError(400, "projectId or noteId is missing");
  }
  const deleteProjectNote = await ProjectNote.findOneAndDelete({
    $and: [{ project: projectId }, { _id: noteId }],
  });
  if (!deleteProjectNote) throw new ApiResponse(404, "Falid to delete note");

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Project Note deleted successfully"));
});

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
