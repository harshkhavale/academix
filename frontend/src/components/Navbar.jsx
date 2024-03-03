import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { academix, logo } from "../assets";
import TeacherForm from "../pages/TeacherForm";
import { Link } from "react-router-dom";
import CreateSubject from "./modals/CreateClassroom";
import JoinClassrooms from "./modals/JoinClassrooms";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user.user);

  return (
    <div className="navbar text-sm md:text-base w-full p-2 flex justify-between  items-center">
      {user && user.usertype == "MENTOR" && showModal && (
        <CreateSubject onClose={() => setShowModal(false)} />
      )}
      <div className="navbar text-sm md:text-base p-2 flex justify-between w-full overflow-x-hidden items-center">
        {showModal && <JoinClassrooms onClose={() => setShowModal(false)} />}

        <div className="logo">
          <a href="/" className=" flex items-center gap-2">
            <img
              src={academix}
              className="md:h-10 ps-6 md:ps-auto h-10"
              alt=""
            />
            <p className=" happy-font font-bold text-3xl text-primary">
              academix
            </p>
          </a>
        </div>

        <div className="middle flex items-center gap-4 justify-center">
          {user && (
            <div className="search flex border rounded-xl items-center p-2">
              <CiSearch />
              {isNonMobileScreen ? (
                <input
                  type="text"
                  className="text-sm w-72 p-1 outline-none rounded-3xl"
                  placeholder="search your course here..."
                />
              ) : (
                ""
              )}
            </div>
          )}

          <div className="theme flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </div>

          {user && user.usertype == "MENTOR" && isNonMobileScreen && (
            <button
              onClick={() => setShowModal(true)}
              className="ml-auto bg-primary text-white shadow-lg p-2 flex  items-center gap-1 rounded-3xl happy-font font-bold"
            >
              <FiPlus /> Create Classroom
            </button>
          )}

          {user && user.usertype != "MENTOR" && isNonMobileScreen && (
            <Link to={"/teacherform"}>
              <button className="ml-auto bg-primary text-white shadow-lg p-2 flex  items-center gap-1 rounded-3xl happy-font font-bold">
                <FiPlus />
                Become a Teacher
              </button>
            </Link>
          )}
          {!user && (
            <Link
              to={"/auth/login"}
              className="bg-primary text-white rounded-2xl p-2"
            >
              signin
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
