import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    isTeacher: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("User", User);
export default user;
