import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { userRequest, publicRequest } from "../../redux/requestMethods";
import { useSelector } from "react-redux";
import { CloudUpload } from "@mui/icons-material"; // Importing Material-UI icon
import { IconButton } from "@mui/material"; // Importing Material-UI IconButton
import { toast } from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";
import Compressor from "compressorjs";
const CreateResource = ({ onClose }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const user = useSelector((state) => state.user.user);

  const handleCreateResource = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("file", file);

      const response = await publicRequest.post("/resource", formData);

      console.log("Subject created:", response.data);
      console.log("Response:", response);
      const res = await publicRequest.post("/teachers/update-classrooms", {
        teacherId: user._id,
        classroomId: response.data._id,
      });
      console.log("creation of class", res);
      toast.success("Classroom has been created successfully!");

      onClose();
    } catch (error) {
      console.error("Error creating subject:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center fixed inset-0 z-[1000] bg-blue-300 bg-opacity-30 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-96 h-auto shadow p-4 relative">
          <button onClick={onClose} className="absolute top-2 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#7959FD"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="">
            <p className=" font-semibold text-2xl flex justify-center my-4">
              Create Classroom
            </p>
            <form className="flex-1 mt-10">
              <input
                type="text"
                placeholder="Resource Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full border-2 border-gray-400 hover:border-black rounded-3xl p-4 text-sm"
              />
              <textarea
                type="text"
                placeholder="Description"
                value={description}
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full border-2 border-gray-400 hover:border-black rounded-lg p-2 my-5 text-sm"
              />
              <p className="font-bold">thumbnail</p>
              <div className="profileimage relative rounded-3xl flex items-center justify-center  h-[25vh] w-full overflow-hidden    border-2 border-gray-400 border-dashed ">
                <div className="flex justify-center">
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer rounded "
                  >
                    <MdOutlineFileUpload className="text-3xl absolute flex justify-center items-center  top-16 left-40 z-50 bg-white rounded-full p-1" />
                  </label>
                </div>
              </div>
            </form>
            <div className="flex justify-center">
              <button
                onClick={handleCreateResource}
                className="bg-primary text-white shadow-lg p-3 m-4 flex items-center gap-2 rounded-2xl hover:bg-primary/80"
              >
                Create Classroom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResource;
