import React from "react";
import { Link } from "react-router-dom";

const MentorCard = ({ mentor }) => {
  return (
    <Link
      to={`/teachers/${mentor._id}`}
      className="card relative shadow-xl rounded-2xl w-5/12 md:w-4/12 overflow-hidden "
    >
      <img
        src={`http://localhost:5000/assets/${mentor.profilepicture}`}
        alt="image"
        className="w-full h-auto object-cover"
      />
      <div className="info absolute bottom-0 w-full">
        <p className="font-bold text-primary absolute bottom-0 p-4 text-2xl">
          {mentor.name}
        </p>
        <p className=" font-bold text-3xl absolute -right-4  rounded-full p-5 -bottom-4">
          12K
        </p>
      </div>
    </Link>
  );
};

export default MentorCard;
