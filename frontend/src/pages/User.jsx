// User.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/user/Profile";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import UserMain from "../components/user/UserMain";
import UserLeftbar from "../components/user/UserLeftbar";
import Explore from "../components/Explore";
import Mentor from "../components/user/Mentor";
import LiveSessions from "../components/user/LiveSessions";
import Classroom from "../components/user/Classroom";

const User = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const [toggle, setToggle] = useState(true);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("Dashboard"); // State to keep track of the selected sidebar item

  const handleSidebarItemClick = (item) => {
    setSelectedSidebarItem(item);
  };

  return (
    <div className="User w-full overflow-hidden">
      {!isNonMobileScreen && (
        <div className="">
          {toggle ? (
            <div
              className="fixed top-6 z-50 start-0 p-1 cursor-pointer"
              onClick={() => setToggle(false)}
            >
              <MenuIcon />
            </div>
          ) : (
            <div
              className="fixed top-6 z-50 start-0 p-1 cursor-pointer"
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
          <div id="main min-h-screen " className=" ">
            {/* Render components based on the selected sidebar item */}
            {selectedSidebarItem === "Dashboard" && <UserMain />}
            {selectedSidebarItem === "Explore" && <Explore />}
            {selectedSidebarItem === "Mentors" && <Mentor />}
            {selectedSidebarItem === "Live Sessions" && <LiveSessions />}
            {selectedSidebarItem === "Classrooms" && <Classroom />}

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

export default User;
