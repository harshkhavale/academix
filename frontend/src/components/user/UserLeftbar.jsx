import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

import { userDashboardLinks } from "../../constants/user";
import Settings from "../widgets/Settings";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreateSubject from "../modals/CreateClassroom";

const UserLeftbar = ({ handler }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const handleItemClick = (itemName) => {
    handler(itemName); // Call handler with the item name
  };
  const user = useSelector((state) => state.user.user);
  return (
    <div className="sidebar rounded-sm fixed top-16 start-0 shadow-xl h-screen bg-white z-50">
      {user.usertype == "MENTOR" && showModal && (
        <CreateSubject onClose={() => setShowModal(false)} />
      )}{" "}
      <div className="top p-7">
        <p className="font-bold my-4">Overview</p>
        {userDashboardLinks.map((item, index) => (
          <div key={index}>
            <div
              className="item flex gap-4 p-2 items-center hover:bg-gray-200 hover:rounded-md cursor-pointer"
              onClick={() => handleItemClick(item.name)} // Pass the item name to handleItemClick
            >
              {item.icon}
              <p className="text-sm">{item.name}</p>
            </div>
          </div>
        ))}
        {!isNonMobileScreen && (
          <button
            onClick={() => setShowModal(true)}
            className=" bg-primary my-4 text-white shadow-lg p-2 flex  items-center gap-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h18M12 3v18"
              />
            </svg>
            {user.usertype == "MENTOR" ? "Create Classroom" : "Become Mentor"}
          </button>
        )}
      </div>
      <div className="bottom">
        <Settings />
      </div>
    </div>
  );
};

export default UserLeftbar;
