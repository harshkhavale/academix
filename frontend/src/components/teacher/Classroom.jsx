import React, { useEffect, useState } from "react";
import { publicRequest } from "../../redux/requestMethods";
import SubjectCard from "../widgets/ClassroomCard";
import { useSelector } from "react-redux";
import ClassroomCard from "../widgets/ClassroomCard";
const Classroom = () => {
  const [teachers, setTeachers] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const fetchteachers = async () => {
      try {
        const response = await publicRequest.get(
          `/classrooms/teacher/${user._id}`
        );
        setTeachers(response.data);
        console.log("teachers:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchteachers();
  }, [user._id]);
  return (
    <div className="graph flex gap-2 p-2 items-center mt-4 justify-between">
      {teachers.map((classroom, index) => (
        <ClassroomCard classroom={classroom} key={index} />
      ))}
    </div>
  );
};

export default Classroom;
