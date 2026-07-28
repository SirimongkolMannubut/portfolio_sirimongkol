import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema(
  {
    name:     { type: String, required: true },
    level:    { type: Number, min: 0, max: 100, default: 50 },
    category: { type: String, enum: ["Web", "Mobile", "Database", "Tools"], default: "Web" },
    order:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = models.Skill || model("Skill", SkillSchema);
