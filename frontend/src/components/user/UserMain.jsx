import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../redux/requestMethods";
import BarChart from "../widgets/BarChart";
import PolarAreaChart from "../widgets/PolarAreaChart";
import { attendance, score } from "../../constants/student";
import { books, madem, teacherbanner, userbanner } from "../../assets";
import SubjectCard from "../widgets/SubjectCard";

const UserMain = () => {
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
    <div className="teacherdashboard w-screen p-2 md:w-[60vw]">
      <div className="banner h-60 w-full bg-primary text-white px-12 overflow-hidden rounded-2xl shadow-sm flex justify-between items-center">
        <div className="">
          <p className="md:text-5xl text-xl font-bold ">
            Welcome back, {user.fullname}!
          </p>
          <p className="text-sm py-4 happy-font font-bold  ">
            Always stay updated in your student portal
          </p>
        </div>
        <div className="">
          <img
            className="float-right md:h-72  h-full object-contain  "
            src={madem}
            alt=""
          />
        </div>
      </div>
      <div className=" font-semibold text-3xl mb-4 my-4">
        Classrooms you have enrolled
      </div>

      <div className="graph flex gap-2 p-2 items-center mt-4 justify-between">
        {subjects.map((subject, index) => (
          <SubjectCard subject={subject} key={index} />
        ))}
      </div>
      <div className="graph flex flex-col md:flex-row gap-2 p-2 items-center justify-between  ">
        <div className="attendance">
          <p className=" text-sm  mb-10">Attendance</p>
          <BarChart data={attendance} />
        </div>
        <div className="score">
          <p className=" text-sm mb-10">Overall Score</p>
          <PolarAreaChart data={score} />
        </div>
      </div>
    </div>
  );
};

export default UserMain;
