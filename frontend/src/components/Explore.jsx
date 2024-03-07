import React, { useEffect, useState } from "react";
import { teachers } from "../constants/user";
import { useSelector } from "react-redux";
import { publicRequest } from "../redux/requestMethods";
import ProfileCard from "./widgets/ProfileCard";
import ClassroomCard from "./widgets/ClassroomCard";
const Explore = () => {
  const [teachers, setTeacher] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await publicRequest.get(`/teachers`);
        setTeacher(response.data);
        console.log("Teachers:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    const fetchClassrooms = async () => {
      try {
        const response = await publicRequest.get(`/classrooms`);
        setClassrooms(response.data);
        console.log("Classrooms:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };

    fetchClassrooms();

    fetchTeacher();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <p className=" font-bold text-sky-600 w-min text-nowrap bg-sky-100 rounded-3xl">
        #best teachers
      </p>
      <div className="flex flex-wrap h-min w-screen gap-4 p-2 md:w-[70vw]">
        {teachers.map((teacher, index) => (
          <ProfileCard key={index} teacher={teacher} />
        ))}
      </div>
      <p className=" font-bold text-sky-600 w-min text-nowrap bg-sky-100 rounded-3xl">
        #subjects we have..
      </p>

      <div className="flex flex-wrap h-min w-screen gap-4 p-2 md:w-[70vw]">
        {classrooms.map((classroom, index) => (
          <ClassroomCard key={index} classroom={classroom} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
