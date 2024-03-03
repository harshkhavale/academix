import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/apiCalls.js";
import toast from "react-hot-toast";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { slideFromLeft } from "../constants/style";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../redux/requestMethods.js";
import { setUsertype } from "../redux/userSlice.js";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // New state to track login success
  const { isFetching, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { email, password });
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (error) {
        toast.error("Login failed. Please try again.");
      } else if (!isFetching && user) {
        // Assuming 'user' is the data returned upon successful login
        handleLoginSuccess();
        toast.success("Login successful!");
        try {
          const mentor = await publicRequest.get(`/mentors/check/${user.id}`);
          console.log(mentor);
          if (mentor.data) {
            // If mentor data is returned, set usertype to "Mentor"
            dispatch(setUsertype("MENTOR"));
          }
          navigate("/mentordashboard");
        } catch (error) {
          console.error("Error fetching mentor:", error);
          navigate("/userdashboard");
          dispatch(setUsertype("USER"));

          // Handle error
        }
      }
    };

    fetchData(); // Call the async function immediately
  }, [error, isFetching, user]);

  const handleLoginSuccess = () => {
    setLoginSuccess(true); // Set login success flag
  };
  return (
    <div className=" flex">
      <div className=" absolute start-0 top-20 ">
        <p className=" text-start text-[12rem] w-min  font-bold ">Let's</p>
        <p className=" text-start -my-36 text-[12rem] w-min  font-bold ">
          Start
        </p>
      </div>
      <div className=" relative flex  gap-4 border-2 bg-white border-current p-10 rounded-3xl shadow-md ">
        <div className=" sectipon-2 flex-1">
          <div className=" flex  justify-center w-full items-center flex-col ">
            <div className="  flex flex-col w-full  justify-center items-center gap-2">
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
            </div>
          </div>
        </div>
        <div className="section-1 flex-1 flex flex-col gap-2">
          <div>
            <div className="btn w-full my-8 p-0 ">
              <button
                type="button"
                onClick={handleClick}
                className=" border-2 text-white w-full font-bold bg-primary p-4 happy-font  rounded-3xl "
              >
                Login
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
            <Link to="/auth/registration" className="flex">
              <p className=" font-bold hover:text-primary happy-font  px-2">
                Don't have any account?
              </p>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
