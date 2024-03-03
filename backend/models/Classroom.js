import mongoose from "mongoose";
import Resource from "./Resource.js";
import User from "./User.js";
const Classroom = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
    enrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const classroom = mongoose.model("Classroom", Classroom);
export default classroom;
