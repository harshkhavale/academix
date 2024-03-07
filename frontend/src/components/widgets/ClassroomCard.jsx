import React from "react";
import { Link } from "react-router-dom";

const ClassroomCard = ({ classroom }) => {
  return (
    <div>
      <div
        key={classroom._id}
        className="classroom-card shadow-md relative rounded-2xl"
      >
        <Link to={`/classrooms/${classroom._id}`}>
          <div className="thumbnail md:h-[15rem] md:w-[13rem] h-[10rem] w-[10rem]">
            {classroom.thumbnail && (
              <img
                src={`http://localhost:5000/thumbnails/${classroom.thumbnail}`}
                alt={classroom.name}
                onError={(e) => console.error("Image error:", e)}
                className=" h-full w-full object-cover rounded-xl" // Check image loading errors
              />
            )}
          </div>
          <div className="classroom-details absolute bottom-0 bg-white p-6 w-full flex items-center justify-center font-bold">
            <p className="md:text-2xl text-xl font-black">{classroom.name}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ClassroomCard;
