import React, { useEffect, useState } from "react";
import { mentors } from "../constants/user";
import MentorCard from "./widgets/MentorCard";
import { useSelector } from "react-redux";
import { publicRequest } from "../redux/requestMethods";
const Explore = () => {
  const [mentors, setMentors] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await publicRequest.get(`/mentors`);
        setMentors(response.data);
        console.log("Mentors:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchMentors();
  }, [user.id]);
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-wrap h-min w-screen gap-4 p-2 md:w-[60vw]">
        {mentors.map((mentor, index) => (
          <MentorCard key={index} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
