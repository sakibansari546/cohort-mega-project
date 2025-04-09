import { body, param } from "express-validator";
import { AvailableUserRole } from "../../utils/constants.js";

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

const addMemberToProjectValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("projectId is required")
      .isMongoId()
      .withMessage("Invalid projectId format"),

    param("memberId")
      .trim()
      .notEmpty()
      .withMessage("memberId is required")
      .isMongoId()
      .withMessage("Invalid memberId format"),

    body("role")
      .trim()
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRole)
      .withMessage(
        `Role must be one of the following: ${AvailableUserRole.join()}`,
      ),
  ];
};

const deleteMemberValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("projectId is required")
      .isMongoId()
      .withMessage("Invalid projectId format"),

    param("memberId")
      .trim()
      .notEmpty()
      .withMessage("memberId is required")
      .isMongoId()
      .withMessage("Invalid memberId format"),
  ];
};

const updateMemberRoleValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("projectId is required")
      .isMongoId()
      .withMessage("Invalid projectId format"),

    param("memberId")
      .trim()
      .notEmpty()
      .withMessage("memberId is required")
      .isMongoId()
      .withMessage("Invalid memberId format"),

    body("role")
      .trim()
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRole)
      .withMessage(
        `Role must be one of the following: ${AvailableUserRole.join()}`,
      ),
  ];
};

const searchMemberForAddInProjectValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is invalid!"),
  ];
};

export {
  createProjectValidator,
  updateProjectValidator,
  addMemberToProjectValidator,
  deleteMemberValidator,
  updateMemberRoleValidator,
  searchMemberForAddInProjectValidator,
};
