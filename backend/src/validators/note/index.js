import { body, param } from "express-validator";

const getNotesValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("projectId is required")
      .isMongoId()
      .withMessage("Invalid projectId format"),
  ];
};

const getNoteByIdValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("projectId is required")
      .isMongoId()
      .withMessage("Invalid projectId format"),
    param("noteId")
      .trim()
      .notEmpty()
      .withMessage("noteId is required")
      .isMongoId()
      .withMessage("Invalid noteId format"),
  ];
};

const createNoteValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("projectId is required")
      .isMongoId()
      .withMessage("Invalid projectId format"),

    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 10, max: 200 })
      .withMessage("Content must be between 10 and 200 characters"),
  ];
};

const updateNoteValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("projectId is required")
      .isMongoId()
      .withMessage("Invalid projectId format"),

    param("noteId")
      .trim()
      .notEmpty()
      .withMessage("noteId is required")
      .isMongoId()
      .withMessage("Invalid noteId format"),

    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 10, max: 200 })
      .withMessage("Content must be between 10 and 200 characters"),
  ];
};

const deleteNoteValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("projectId is required")
      .isMongoId()
      .withMessage("Invalid projectId format"),

    param("noteId")
      .trim()
      .notEmpty()
      .withMessage("noteId is required")
      .isMongoId()
      .withMessage("Invalid noteId format"),
  ];
};

export {
  getNotesValidator,
  getNoteByIdValidator,
  createNoteValidator,
  updateNoteValidator,
  deleteNoteValidator,
};
