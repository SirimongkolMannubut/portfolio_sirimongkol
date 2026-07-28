import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    techStack:   [{ type: String }],
    githubUrl:   { type: String, default: "" },
    figmaUrl:    { type: String, default: "" },
    liveUrl:     { type: String, default: "" },
    imageUrl:    { type: String, default: "" },
    order:       { type: Number, default: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Project = models.Project || model("Project", ProjectSchema);
