import mongoose from "mongoose";
import User from "./User.js";
import Classroom from "./Classroom.js";
const Teacher = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
      required: true,
    },
    keywords: [{ type: String, required: true }],
    education: [
      {
        type: String,
        required: true,
      },
    ],
    experience: {
      type: String,
      required: true,
    },
    interests: [
      {
        type: String,
        required: true,
      },
    ],

    profilepicture: {
      type: String,
    },
    coverpicture: {
      type: String,
    },
    classrooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
      },
    ],
    sociallinks: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const teacher = mongoose.model("Teacher", Teacher);
export default teacher;
