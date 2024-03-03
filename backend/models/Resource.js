import mongoose from "mongoose";

const Resource = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    files: [
      {
        filename: {
          type: String,
          required: true,
        },
        path: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const resource = mongoose.model("Resource", Resource);
export default resource;
