import { Router } from "express";
import { isAuth } from "../middleware/isAuth.middleware.js";
import { validateProjectPermission } from "../middleware/validate-permissions.middlerware.js";

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
import { UserRoleEnum } from "../utils/constants.js";

const router = Router();

router.get(
  "/:projectId/notes",
  getNotesValidator(),
  validate,
  isAuth,
  validateProjectPermission([
    UserRoleEnum.ADMIN,
    UserRoleEnum.PROJECt_ADMIN,
    UserRoleEnum.MEMBER,
  ]),
  getNotes,
);
router.get(
  "/:projectId/note/:noteId",
  getNoteByIdValidator(),
  validate,
  isAuth,
  validateProjectPermission([
    UserRoleEnum.ADMIN,
    UserRoleEnum.PROJECt_ADMIN,
    UserRoleEnum.MEMBER,
  ]),
  getNoteById,
);

router.post(
  "/:projectId/note/create",
  createNoteValidator(),
  validate,
  isAuth,
  validateProjectPermission([
    UserRoleEnum.ADMIN,
    UserRoleEnum.PROJECt_ADMIN,
    UserRoleEnum.MEMBER,
  ]),
  createNote,
);
router.patch(
  "/:projectId/note/update/:noteId",
  updateNoteValidator(),
  validate,
  isAuth,
  validateProjectPermission([
    UserRoleEnum.ADMIN,
    UserRoleEnum.PROJECt_ADMIN,
    UserRoleEnum.MEMBER,
  ]),
  updateNote,
);
router.delete(
  "/:projectId/note/delete/:noteId",
  deleteNoteValidator(),
  validate,
  isAuth,
  validateProjectPermission([
    UserRoleEnum.ADMIN,
    UserRoleEnum.PROJECt_ADMIN,
    UserRoleEnum.MEMBER,
  ]),
  deleteNote,
);

export default router;
