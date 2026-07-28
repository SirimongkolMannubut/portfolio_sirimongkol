import mongoose, { Schema, model, models } from "mongoose";

const ActivitySchema = new Schema(
  {
    title:        { type: String, required: true },
    organization: { type: String, required: true },
    period:       { type: String, required: true },
    description:  [{ type: String }],
    type:         { type: String, enum: ["internship", "training", "award", "volunteer", "work"], default: "training" },
    order:        { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Activity = models.Activity || model("Activity", ActivitySchema);
