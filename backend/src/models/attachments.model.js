import mongoose, { Schema, model } from "mongoose";
import { AvailableTaskStatus, TaskStatusEnum } from "../utils/constants";

const attachmentSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  { timestamps: String },
);

export const Attechment = model("Attechment", attachmentSchema);
