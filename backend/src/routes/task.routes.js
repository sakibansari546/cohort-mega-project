import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { isAuth } from "../middleware/isAuth.middleware.js";
const router = Router();

router.get("/:projectId/tasks", isAuth, getTasks);
router.get("/:projectId/task/taskId", isAuth, getTaskById);

router.post("/:projectId/task/create", isAuth, createTask);
router.patch("/:projectId/task/update/taskId", isAuth, updateTask);
router.delete("/:projectId/task/delete/taskId", isAuth, deleteTask);


export default router;
