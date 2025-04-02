import mongoose, { Schema, model } from "mongoose";
import { AvailableTaskStatus, TaskStatusEnum } from "../utils/constants";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: AvailableTaskStatus,
      default: TaskStatusEnum.TODO,
    },
    attachments: {
      type: Schema.Types.ObjectId,
      ref: "Attachment",
    },
  },
  { timestamps: String },
);

export const Task = model("Task", taskSchema);
