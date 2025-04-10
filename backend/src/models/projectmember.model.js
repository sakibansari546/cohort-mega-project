import mongoose, { Schema, model } from "mongoose";
import { AvailableUserRole, UserRoleEnum } from "../utils/constants.js";

const projectMemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRole,
      default: UserRoleEnum.MEMBER,
    },
  },
  {
    timestamps: true,
  },
);

export const ProjectMember = model("ProjectMember", projectMemberSchema);
