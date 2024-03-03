import React, { useEffect, useState } from "react";
import { publicRequest } from "../../redux/requestMethods";
import SubjectCard from "../widgets/SubjectCard";
import { useSelector } from "react-redux";
const Classroom = () => {
  const [mentors, setMentors] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await publicRequest.get(`/classrooms`);
        setMentors(response.data);
        console.log("Mentors:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchMentors();
  }, [user.id]);
  return (
    <div className="graph flex gap-2 p-2 items-center mt-4 justify-between">
      {mentors.map((subject, index) => (
        <SubjectCard subject={subject} key={index} />
      ))}
    </div>
  );
};

export default Classroom;
