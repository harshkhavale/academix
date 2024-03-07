import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../redux/requestMethods";
import ProfileCard from "../widgets/ProfileCard";

const Mentor = () => {
  const [mentors, setMentors] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await publicRequest.get(
          `/mentors/users/${user.id}/mentors`
        );
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
      <div className="flex flex-wrap h-min w-screen gap-8 p-2 md:w-[60vw]">
        {mentors.map((mentor, index) => (
          <ProfileCard key={index} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default Mentor;
