// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "user",
    },
    email: { type: String, unique: true, required: true },
    token: {
      type: Number,
      required: true,
      default: 3,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
