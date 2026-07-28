import mongoose, { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema(
  {
    name:         { type: String, required: true },
    title:        { type: String, required: true },
    bio:          { type: String, required: true },
    profileImage: { type: String, default: "" },
    gpa:          { type: Number, default: 3.05 },
    university:   { type: String, default: "มหาวิทยาลัยราชภัฏศรีสะเกษ" },
    faculty:      { type: String, default: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์" },
  },
  { timestamps: true }
);

export const Profile = models.Profile || model("Profile", ProfileSchema);
