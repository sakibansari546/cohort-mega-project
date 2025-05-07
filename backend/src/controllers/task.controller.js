import asyncHandler from "../utils/async-handler.js";

// get all tasks
const getTasks = asyncHandler(async (req, res) => {
  // get all tasks
});

// get task by id
const getTaskById = asyncHandler(async (req, res) => {
  // get task by id
});

// create task
const createTask = asyncHandler(async (req, res) => {
  // create task
});

// update task
const updateTask = asyncHandler(async (req, res) => {
  // update task
});

// delete task
const deleteTask = asyncHandler(async (req, res) => {
  // delete task
});

// create subtask
const createSubTask = asyncHandler(async (req, res) => {
  // create subtask
});

// update subtask
const updateSubTask = asyncHandler(async (req, res) => {
  // update subtask
});

// delete subtask
const deleteSubTask = asyncHandler(async (req, res) => {
  // delete subtask
});

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};
