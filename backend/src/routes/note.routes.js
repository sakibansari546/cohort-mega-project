import { Router } from "express";
import { isAuth } from "../middleware/isAuth.middleware.js";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";
import {
  createNoteValidator,
  deleteNoteValidator,
  getNoteByIdValidator,
  getNotesValidator,
  updateNoteValidator,
} from "../validators/note/index.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.get(
  "/:projectId/notes",
  getNotesValidator(),
  validate,
  isAuth,
  getNotes,
);
router.get(
  "/:projectId/note/:noteId",
  getNoteByIdValidator(),
  validate,
  isAuth,
  getNoteById,
);

router.post(
  "/:projectId/note/create",
  createNoteValidator(),
  validate,
  isAuth,
  createNote,
);
router.patch(
  "/:projectId/note/update/:noteId",
  updateNoteValidator(),
  validate,
  isAuth,
  updateNote,
);
router.delete(
  "/projectId/note/delete/noteId",
  deleteNoteValidator,
  validate,
  isAuth,
  deleteNote,
);

export default router;
