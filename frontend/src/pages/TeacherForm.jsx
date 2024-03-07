import React, { useState } from "react";
import { publicRequest } from "../redux/requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { UploadFile } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-hot-toast";
import { RiUserSmileFill } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import Compressor from "compressorjs";
import { AiTwotoneExperiment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { Md123, MdVerified } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";
import { LiaUniversitySolid } from "react-icons/lia";
import { teacher, teacherstanding } from "../assets";
import { setUser } from "../redux/userSlice";

const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState("");
  const [interests, setInterests] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [location, setLocation] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [coverPicture, setCoverPicture] = useState(null);
  const [previewCoverImage, setPreviewCoverImage] = useState();
  const [coverFileName, setCoverFileName] = useState("");

  const [previewProfileImage, setPreviewProfileImage] = useState();
  const [profileFileName, setProfileFileName] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", user.fullname);
    formData.append("description", description);
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("education", JSON.stringify(education));
    formData.append("experience", experience);
    formData.append("interests", JSON.stringify(interests));
    formData.append("profilePicture", profilePicture || user.profile);
    formData.append("coverPicture", coverPicture);
    formData.append("userId", user.id);
    formData.append("location", JSON.stringify(location));

    formData.append("socialLinks", JSON.stringify(socialLinks));

    try {
      // Capture previous state
      const prevUserData = { ...user };

      // Create teacher
      const response = await publicRequest.post("/teachers", formData);
      console.log("Teacher created:", response.data);
      toast.success("You are a teacher now!");

      // Update user data
      const newUserData = await publicRequest.put(`/users/${user.id}`);

      // Merge previous state with new user data
      const mergedUserData = { ...newUserData.data, ...response.data };

      // Dispatch action with merged user data
      await dispatch(setUser(mergedUserData));

      // Navigate to teacher dashboard
      navigate("/teacherdashboard");
    } catch (error) {
      console.error("Error creating mentor:", error);
    }
  };

  const handleFileSelect = (e, setterFunction, previewSetterFunction) => {
    const selectedFile = e.target.files[0];
    setterFunction(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      previewSetterFunction(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        success(result) {
          resolve(URL.createObjectURL(result));
        },
        error(error) {
          reject(error);
        },
      });
    });
  };
  const handleProfileFileChange = (event) => {
    const file = event.target.files?.[0]; // Add null check
    setProfilePicture(file);
    if (file) {
      setProfileFileName(file.name);
      compressImage(file)
        .then((compressedImage) => {
          // Change the type to string or ArrayBuffer, as CompressorJS may return ArrayBuffer
          setPreviewProfileImage(compressedImage);
        })
        .catch((error) => {
          console.error("Error compressing cover image:", error);
        });
    } else {
      setProfileFileName("cover-picture");
    }
  };
  const handleCoverFileChange = (event) => {
    const file = event.target.files?.[0]; // Add null check
    setCoverPicture(file);
    if (file) {
      setCoverFileName(file.name);
      compressImage(file)
        .then((compressedImage) => {
          // Change the type to string or ArrayBuffer, as CompressorJS may return ArrayBuffer
          setPreviewCoverImage(compressedImage);
        })
        .catch((error) => {
          console.error("Error compressing cover image:", error);
        });
    } else {
      setCoverFileName("cover-picture");
    }
  };
  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <div className="profile grid px-8 grid-cols-4 gap-6">
        <div className=" col-span-3 ">
          <div className="profile-display rounded-3xl border-2 border-black">
            <div className="banner  relative h-[30vh]">
              <div className="rounded-t-3xl relative h-full overflow-hidden  w-full flex justify-center items-center bg-primary">
                {!coverPicture && <FaImage className=" text-white h-40 w-60" />}
                <div className="">
                  {previewCoverImage && (
                    <div className=" h-full w-full">
                      <img
                        src={previewCoverImage}
                        alt="Profile Preview"
                        className=" w-[100vw]"
                      />
                    </div>
                  )}
                  <div className="flex justify-center">
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer rounded "
                    >
                      <FiEdit className=" flex h-10 w-10 justify-center items-center font-bold text-white absolute top-5 right-5 p-2" />
                    </label>
                    <input
                      id="cover-upload"
                      type="file"
                      className="hidden"
                      onChange={handleCoverFileChange}
                    />
                  </div>
                </div>
              </div>

              <div className=" h-40 w-40 border-4 flex justify-center items-center border-white bg-gray-200 absolute z-10 start-16 -bottom-20">
                <div className="">
                  {previewProfileImage && (
                    <div className=" h-[25vh] w-[25vh]">
                      <img
                        src={previewProfileImage}
                        alt="Profile Preview"
                        className="w-full h-full bg-white overflow-hidden object-cover"
                      />
                    </div>
                  )}
                  <div className="flex justify-center">
                    <label
                      htmlFor="profile-upload"
                      className="cursor-pointer rounded "
                    >
                      <MdOutlineFileUpload className=" border-2 border-black text-3xl absolute bottom-16 -ms-3 flex justify-center items-center z-50 bg-white rounded-full p-1" />
                    </label>
                    <input
                      id="profile-upload"
                      type="file"
                      className="hidden"
                      onChange={handleProfileFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="info grid grid-cols-2 gap-8 mt-28 pb-10 m-8 relative">
              <div className=" flex justify-center items-center bg-white text-black absolute -top-20 right-0 rounded-full p-2">
                <FiEdit />
              </div>
              <div className="highlights col-span-1">
                <div className="name flex items-center gap-2">
                  <p className="font-bold text-2xl text-primary">
                    {user.fullname}
                  </p>
                  <MdVerified />
                  <p>{"(He/Him)"}</p>
                </div>
                <div className="bio">
                  <div className="mb-4">
                    <label className="block mb-1">Keywords:</label>
                    <input
                      type="text"
                      placeholder="Full STack Developer | MERN STACK DEV | MEAN TOO"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value.split(","))}
                      className="w-full p-4 bg-gray-100 rounded-3xl border-2 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
                <div className="location text-sm flex items-center gap-2">
                  <MdMyLocation />
                  <div className="location">
                    <div className="mb-4">
                      <label className="block mb-1">Location:</label>
                      <input
                        type="text"
                        placeholder="Pune, India"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-4 bg-gray-100 rounded-3xl border-2 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>
                <div className="commuinity">
                  <p className=" text-primary">78K lookout's</p>
                </div>
              </div>
              <div className="experience col-span-1">
                <div className="mb-4">
                  <p className="p-2">Tell more about you:</p>
                  <textarea
                    value={description}
                    rows={7}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 rounded-3xl border-2 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="education rounded-3xl border-2 border-black p-8 my-4 relative">
            <div className="  absolute flex items-center gap-4  top-5 right-5 ">
              <div className="flex justify-center items-center bg-white text-black rounded-full p-2">
                <IoMdAdd />
              </div>
              <div className="flex justify-center items-center bg-white text-black rounded-full p-2">
                <FiEdit />
              </div>
            </div>

            <p className=" font-bold  my-4 text-2xl">
              Education & Experience{" "}
              <span className="text-sm happy-font">
                {"( use , semicolons for multiple values )"}
              </span>
            </p>
            <div div className="flex">
              <div className="institute flex w-full items-center">
                <div className="mb-4 w-11/12">
                  <div className="flex items-center">
                    <label className="block mb-1">Education:</label>
                    <LiaUniversitySolid className="h-8 w-8 bg-white p-1" />
                  </div>
                  <textarea
                    type="text"
                    rows={4}
                    value={education}
                    onChange={(e) => setEducation(e.target.value.split(","))}
                    className=" p-4 bg-gray-100 w-full rounded-3xl border-2 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
              <div className="institute flex w-full items-center">
                <div className="mb-4 w-11/12">
                  <div className="flex items-center">
                    <label className="block mb-1">Experience:</label>
                    <AiTwotoneExperiment className="h-8 w-8 bg-white p-1" />
                  </div>{" "}
                  <textarea
                    type="text"
                    rows={4}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className=" p-4 bg-gray-100 w-full rounded-3xl border-2 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="social rounded-3xl border-2 border-black p-8 my-4 relative">
            <div className="  absolute flex items-center gap-4  top-5 right-5 ">
              <div className="flex justify-center items-center bg-white text-black rounded-full p-2">
                <IoMdAdd />
              </div>
              <div className="flex justify-center items-center bg-white text-black rounded-full p-2">
                <FiEdit />
              </div>
            </div>

            <p className=" font-bold text-2xl">
              Social Links & Interest's{" "}
              <span className="text-sm happy-font">
                {"( use , semicolons for multiple values )"}
              </span>
            </p>
            <div className="institute  items-center gap-2">
              <div className="mb-4">
                <label className="block my-4 mb-1">Social Links:</label>
                <input
                  type="text"
                  value={socialLinks}
                  onChange={(e) => setSocialLinks(e.target.value)}
                  className="w-full p-4 bg-gray-100 border-2 rounded-md focus:outline-none focus:border-black"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Interests:</label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value.split(","))}
                  className="w-full p-4 bg-gray-100 border-2 rounded-md focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-1">
          <div className="box bg-gray-200 py-8 px-2 rounded-3xl">
            <img src={teacherstanding} alt="" />
          </div>
          <div className=" flex justify-center  items-center p-4 w-full">
            <button
              type="submit"
              className="bg-primary mt-20 p-6 rounded-3xl text-white happy-font font-bold hover:bg-opacity-80 transition duration-300"
            >
              Become a Teacher
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TeacherForm;
