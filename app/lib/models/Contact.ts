import mongoose, { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    phone:    { type: String, default: "065-590-3845" },
    email:    { type: String, default: "topt75870@gmail.com" },
    lineId:   { type: String, default: "6807ac.th" },
    github:   { type: String, default: "https://github.com/SirimongkolMannubut" },
    facebook: { type: String, default: "https://www.facebook.com/sirimongkol.manubut.577/" },
    figmaUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Contact = models.Contact || model("Contact", ContactSchema);
