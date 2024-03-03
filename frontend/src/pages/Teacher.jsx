// Teacher.js
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Explore from "../components/Explore";
import LiveSession from "../components/teacher/LiveSession";
import Classroom from "../components/teacher/Classroom";
import MentorMain from "../components/teacher/TeacherMain";
import Profile from "../components/user/Profile";
import UserLeftbar from "../components/user/UserLeftbar";
import MentorProfile from "./TeacherProfile";

const Teacher = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const [toggle, setToggle] = useState(true);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("Dashboard"); // State to keep track of the selected sidebar item

  const handleSidebarItemClick = (item) => {
    setSelectedSidebarItem(item);
  };

  return (
    <div className="Teacher w-full overflow-hidden">
      {!isNonMobileScreen && (
        <div className="">
          {toggle ? (
            <div
              className="fixed top-1 z-50 start-0 p-1 cursor-pointer"
              onClick={() => setToggle(false)}
            >
              <MenuIcon />
            </div>
          ) : (
            <div
              className="fixed top-1 z-50 start-0 p-1 cursor-pointer"
              onClick={() => setToggle(true)}
            >
              <CloseOutlinedIcon />
            </div>
          )}
        </div>
      )}
      <div className="main flex justify-center">
        {isNonMobileScreen && (
          <div className=" ">
            <UserLeftbar handler={handleSidebarItemClick} />
          </div>
        )}
        {/* Render the left sidebar */}
        {!isNonMobileScreen && !toggle && (
          <UserLeftbar handler={handleSidebarItemClick} />
        )}
        <div className="flex overflow-hidden ">
          <div id="main" className=" min-h-screen ">
            {/* Render components based on the selected sidebar item */}
            {selectedSidebarItem === "Dashboard" && <MentorMain />}
            {selectedSidebarItem === "Explore" && <Explore />}
            {selectedSidebarItem === "Live Sessions" && <LiveSession />}
            {selectedSidebarItem === "Classrooms" && <Classroom />}
            {selectedSidebarItem === "Profile" && (
              <div className=" w-screen p-2 md:w-[60vw]">
                <MentorProfile />
              </div>
            )}

            {/* 
            {selectedSidebarItem === "Subjects" && <Subjects />}
            {selectedSidebarItem === "Assignments" && <Assignments />}
            {selectedSidebarItem === "Quize" && <Quizes />}
            {selectedSidebarItem === "Resources" && <Resources />}
            {selectedSidebarItem === "Live Sessions" && <Resources />} */}
            {/* Render other components based on the selected sidebar item */}
          </div>
        </div>
      </div>
      {isNonMobileScreen && (
        <div className=" fixed right-0 top-20">
          <Profile />
        </div>
      )}
      {isNonMobileScreen && selectedSidebarItem === "Profile" && (
        <div className=" w-full">
          <Profile />
        </div>
      )}
    </div>
  );
};

export default Teacher;
