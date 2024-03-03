import React from "react";
import { Link } from "react-router-dom";

const SubjectCard = ({ subject }) => {
  return (
    <div>
      <div
        key={subject._id}
        className="subject-card shadow-xl relative rounded-2xl"
      >
        <Link to={`/subjects/${subject._id}`}>
          <div className="thumbnail md:h-[15rem] md:w-[15rem] h-[10rem] w-[10rem]">
            {subject.thumbnail && (
              <img
                src={`http://localhost:5000/thumbnails/${subject.thumbnail}`}
                alt={subject.name}
                onError={(e) => console.error("Image error:", e)}
                className=" h-full w-full object-cover rounded-xl" // Check image loading errors
              />
            )}
          </div>
          <div className="subject-details absolute -bottom-16 flex items-center justify-center p-4 font-bold">
            <p className="md:text-3xl text-2xl happy-font font-black">
              {subject.name}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SubjectCard;
