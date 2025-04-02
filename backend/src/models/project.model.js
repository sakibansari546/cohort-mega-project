import mongoose, { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required!"],
      trim: true,
      minLength: [3, "Project Name must be at least 3 characters long"],
      maxLength: [40, "Project Name cannot exceed 40 characters"],
    },
    description: {
      type: String,
      maxLength: [40, "Project description cannot exceed 40 characters"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Project = model("Project", projectSchema);
