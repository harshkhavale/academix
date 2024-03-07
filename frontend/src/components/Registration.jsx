import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/apiCalls.js";
import toast from "react-hot-toast";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Google } from "@mui/icons-material";
import {
  apple,
  github,
  google,
  officeview,
  studentprofile,
  teacher,
  teacherprofile,
} from "../assets/index.js";
import { motion } from "framer-motion";
import { slideFromLeft } from "../constants/style.js";
import { publicRequest } from "../redux/requestMethods.js";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import Compressor from "compressorjs";
import { setUser } from "../redux/userSlice.js";

const Registration = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [cfpassword, setCfpassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState();

  const [previewProfileImage, setPreviewProfileImage] = useState();
  const [profileFileName, setProfileFileName] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.user);
  const handleClick = async (e) => {
    e.preventDefault();
    if (!password.match(cfpassword)) {
      toast.error("Password and confirm password should be the same!");
    } else {
      try {
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile", img);
        formData.append("isTeacher", false);

        const response = await publicRequest.post("/auth/register", formData);

        console.log(response);
        toast.success("Registration successful!");
        dispatch(setUser(response.data));

        navigate("/userdashboard");
      } catch (error) {
        // Handle any errors that might occur during registration
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again.");
      }
    }
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
    setImg(file);
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
  return (
    <div className="  flex z-50">
      <div className=" absolute start-0 ">
        <p className=" text-start text-[12rem] w-min  font-bold ">Let's</p>
        <p className=" text-start -my-36 text-[12rem] w-min  font-bold ">
          Start
        </p>
      </div>
      <div className=" relative flex  gap-4 border-2 border-current p-10 rounded-3xl shadow-md ">
        <div className=" sectipon-2 flex-1">
          <div className=" flex  justify-center w-full items-center flex-col ">
            <div className="  flex flex-col w-full  justify-center items-center gap-2">
              <div className="relative flex flex-col gap-2 z-0 w-full mb-5 group">
                <label htmlFor="floating_name" className="font-bold">
                  Username
                </label>

                <input
                  type="text"
                  name="floating_name"
                  id="floating_name"
                  className=" p-4  bg-neutral border-2 border-gray-200 rounded-3xl"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative flex flex-col gap-2 z-0 w-full mb-5 group">
                <label htmlFor="floating_email" className="font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className=" p-4  bg-neutral border-2 border-gray-200 rounded-3xl"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder=" "
                  required
                />
              </div>

              <div className="relative z-0 w-full flex flex-col gap-2 mb-5 group">
                <label htmlFor="floating_password" className="font-bold">
                  Password
                </label>
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className=" p-4  bg-neutral border-2 border-gray-200 rounded-3xl"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative flex flex-col gap-2 z-0 w-full mb-5 group">
                <label htmlFor="floating_cfpassword" className="font-bold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="floating_cfpassword"
                  id="floating_cfpassword"
                  className=" p-4  bg-neutral border-2 border-gray-200 rounded-3xl"
                  onChange={(e) => {
                    setCfpassword(e.target.value);
                  }}
                  placeholder=" "
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section-1 flex-1 flex flex-col gap-2">
          <p className="font-bold">profile picture</p>
          <div className="profileimage relative rounded-3xl flex items-center justify-center  h-[25vh] w-full overflow-hidden    border-2 border-gray-400 border-dashed ">
            {previewProfileImage && (
              <div className=" h-[25vh] w-full">
                <img
                  src={previewProfileImage}
                  alt="Profile Preview"
                  className="w-full h-full overflow-hidden object-cover"
                />
              </div>
            )}
            <div className="flex justify-center">
              <label
                htmlFor="profile-upload"
                className="cursor-pointer rounded "
              >
                <MdOutlineFileUpload className="text-3xl absolute flex justify-center items-center inset-0 z-50 bg-white rounded-full p-1" />
              </label>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                onChange={handleProfileFileChange}
              />
            </div>
          </div>
          <div>
            {/* <div>
              <div className="flex justify-center items-center mt-5 gap-8  ">
                <div
                  onClick={() => setUsertype("STUDENT")}
                  className={` ${
                    usertype == "STUDENT" ? "border-4 border-primary" : ""
                  } border border-gray-400   rounded-md shadow-md text-center h-24 cursor-pointer`}
                >
                  <img
                    src={studentprofile}
                    className="text-4xl h-full w-full  object-top"
                  />
                  <p className="text-lg font-semibold">Student</p>
                </div>

                <div
                  onClick={() => setUsertype("TEACHER")}
                  className={` ${
                    usertype == "TEACHER" ? "border-4 border-primary" : ""
                  } border border-gray-400  rounded-md shadow-md text-center h-24 cursor-pointer`}
                >
                  <img
                    src={teacherprofile}
                    className="text-4xl h-full w-full object-top"
                  />
                  <p className=" text-lg font-semibold">Teacher</p>
                </div>
              </div>
            </div> */}

            <div className="btn w-full my-8 p-0 ">
              <button
                type="button"
                onClick={handleClick}
                className=" border-2 text-white w-full font-bold bg-primary p-4 happy-font  rounded-3xl "
              >
                Register
              </button>
            </div>
            <div className="options flex justify-center gap-8 items-center my-4">
              <FaGoogle className="w-10 bg-white p-2 rounded-full h-10" />
              <FaGithub className="w-10 bg-white p-2 rounded-full h-10" />
              <BsApple className="w-10 bg-white p-2 rounded-full h-10" />
            </div>
            <div className=" w-full h-[1px] bg-slate-300" />
          </div>
          <div className="signup flex">
            <Link to="/auth/login" className="flex">
              <p className=" font-bold hover:text-primary happy-font  px-2">
                Already have an account?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
