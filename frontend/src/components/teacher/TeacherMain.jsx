import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../redux/requestMethods";
import BarChart from "../widgets/BarChart";
import PolarAreaChart from "../widgets/PolarAreaChart";
import { attendance, score } from "../../constants/student";
import { teacherbanner, userbanner } from "../../assets";
import SubjectCard from "../widgets/ClassroomCard";
import LineChart from "../widgets/LineChart";
import { enrollments } from "../../constants/user";

const MentorMain = () => {
  const [subjects, setSubjects] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // Fetch subjects data from the backend API
    const fetchSubjects = async () => {
      try {
        const response = await publicRequest.get(
          `/subjects/teacher/${user.id}`
        );
        setSubjects(response.data);
        console.log("Subjects:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [user.id]);

  return (
    <div className="teacherdashboard w-screen md:w-[60vw]">
      <div className="banner h-60 w-full bg-primary overflow-hidden rounded-2xl shadow-sm flex justify-between items-center">
        <div className="bg-primary text-white p-8">
          <p className="md:text-3xl text-xl font-bold ">
            Welcome back, {user.fullname} Sir!
          </p>
          <p className="text-sm happy-font font-bold my-4  ">
            Always stay updated in your teacher portal
          </p>
        </div>
        <div className="">
          <img
            className=" h-full object-contain  "
            src={teacherbanner}
            alt=""
          />
        </div>
      </div>
      <div className=" font-semibold mb-4 my-4">
        Classrooms you have enrolled
      </div>

      <div className="graph flex gap-2 p-2 items-center mt-4 justify-between">
        {subjects.map((subject, index) => (
          <SubjectCard subject={subject} key={index} />
        ))}
      </div>
      <div className="graph flex flex-col md:flex-row gap-2 p-2 items-center justify-between  ">
        <div className="attendance p-2 shadow-lg">
          <p className=" text-sm font-semibold ">Attendance</p>
          <BarChart data={attendance} />
        </div>
        <div className="score p-2 shadow-lg">
          <p className=" text-sm font-semibold  ">Overall Score</p>
          <PolarAreaChart data={score} />
        </div>
      </div>
    </div>
  );
};

export default MentorMain;
