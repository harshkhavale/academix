import React from "react";
import { FaImage } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdMyLocation, MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const ProfileCard = ({ teacher }) => {
  return (
    <Link
      to={`/teachers/${teacher._id}`}
      className="card relative shadow-md rounded-2xl w-5/12 md:w-[32%] overflow-hidden "
    >
      <div className="profile-display rounded-3xl ">
        <div className="banner  relative h-[15vh]">
          <div className="rounded-t-3xl relative h-full overflow-hidden  w-full flex justify-center items-center bg-primary">
            <div className=" h-full w-full">
              <img
                src={`http://localhost:5000/assets/${teacher.coverpicture}`}
                alt="Profile Preview"
                className=" h-full w-full object-cover"
              />
            </div>
          </div>

          <div className=" h-30 w-30 shadow-md flex justify-center items-center absolute z-10 start-2 -bottom-10">
            <div className="">
              <div className=" h-[15vh] w-[15vh]">
                <img
                  src={`http://localhost:5000/assets/${teacher.profilepicture}`}
                  alt="Profile Preview"
                  className="w-full h-full bg-white overflow-hidden object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="info mt-10 px-4 relative">
          <div className="highlights">
            <div className="name flex items-center">
              <p className="font-bold text-xl text-nowrap text-primary">
                {teacher.name}
              </p>
              <MdVerified />
            </div>
            <div className="bio">
              <div className="mb-4 flex items-center gap-2">
                {teacher.keywords.map((keyword, index) => (
                  <p
                    className=" happy-font bg-gray-200 rounded-3xl p-1 text-xs font-bold "
                    key={index}
                  >
                    {keyword}
                  </p>
                ))}
              </div>
            </div>
            <div className="location text-sm flex items-center gap-2">
              <MdMyLocation />
              <div className="location">
                <p>{teacher.location}</p>
              </div>
            </div>
            <div className="commuinity">
              <p className=" text-primary font-bold">78K lookout's</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
