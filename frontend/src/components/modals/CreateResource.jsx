import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { userRequest, publicRequest } from "../../redux/requestMethods";
import { useSelector } from "react-redux";
import { CloudUpload, FileUpload } from "@mui/icons-material"; // Importing Material-UI icon
import { IconButton } from "@mui/material"; // Importing Material-UI IconButton
import { toast } from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";
import Compressor from "compressorjs";
import { Close } from "@mui/icons-material";

import { FaFilePdf } from "react-icons/fa";
import { GrDocumentWord } from "react-icons/gr";
const CreateResource = ({ onClose, classID }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [description, setDescription] = useState("");

  const user = useSelector((state) => state.user.user);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (fileExtension === "pdf") {
      setFileType("pdf");
    } else if (fileExtension === "doc" || fileExtension === "docx") {
      setFileType("word");
    } else {
      setFileType("");
    }
  };

  const handleCreateResource = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("file", file);
      formData.append("description", description);
      formData.append("classroom", classID);

      const response = await publicRequest.post("/resources", formData);

      console.log("Classroom created:", response.data);
      // const res = await publicRequest.post("/resource/", {
      //   teacherId: user._id,
      //   classroomId: response.data._id,
      // });
      // console.log("creation of resource", res);
      toast.success("Resource has been created successfully!");

      onClose();
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center fixed inset-0 z-[1000] bg-blue-300 bg-opacity-30 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-96 h-auto shadow p-4 relative">
          <button onClick={onClose} className="absolute top-2 right-2">
            <Close />
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
              <select
                name="type"
                id="type"
                onChange={(e) => setType(e.target.value)}
                className="block w-full border-2 border-gray-400 hover:border-black rounded-3xl p-4 mt-4 text-sm"
              >
                <option value="NOTES">NOTES</option>
                <option value="ASSIGNMENT">ASSIGNMENT</option>
              </select>
              <textarea
                type="text"
                placeholder="Description"
                value={description}
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full border-2 border-gray-400 hover:border-black rounded-lg p-2 my-5 text-sm"
              />
              <div className=" border-2 border-black border-dashed rounded-3xl p-8">
                <div className="flex justify-center items-center">
                  {fileType === "pdf" && (
                    <FaFilePdf className=" text-red-500" fontSize="large" />
                  )}
                  {fileType === "word" && (
                    <GrDocumentWord
                      className=" text-blue-500"
                      fontSize="large"
                    />
                  )}
                  {file && <p>{file.name}</p>}
                </div>
                {!file && (
                  <label
                    htmlFor="fileupload"
                    className=" cursor-pointer"
                    name="fileupload"
                  >
                    <FileUpload className=" text-primary" />
                  </label>
                )}

                <input
                  id="fileupload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
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
