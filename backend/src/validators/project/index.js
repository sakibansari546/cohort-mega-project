import { body, param } from "express-validator";

const createProjectValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Project name is required")
      .isLength({ min: 3, max: 40 })
      .withMessage("Project name must be between 3 and 40 characters"),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Project description is required")
      .isLength({ min: 10, max: 200 })
      .withMessage("Project description must be between 10 and 200 characters"),
  ];
};

const updateProjectValidator = () => {
  return [
    param("projectId").trim().notEmpty().withMessage("projectId is required"),

    body("name")
      .trim()
      .notEmpty()
      .withMessage("Project name is required")
      .isLength({ min: 3, max: 40 })
      .withMessage("Project name must be between 3 and 40 characters"),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Project description is required")
      .isLength({ min: 10, max: 200 })
      .withMessage("Project description must be between 10 and 200 characters"),
  ];
};

export { createProjectValidator, updateProjectValidator };
