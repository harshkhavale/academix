import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../redux/requestMethods";
import { useSelector } from "react-redux";
import { coverimage } from "../assets";
import { Instagram, LinkedIn } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { toast } from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

import AddTaskIcon from "@mui/icons-material/AddTask";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdMyLocation, MdOutlineFileUpload, MdVerified } from "react-icons/md";
import { AiTwotoneExperiment } from "react-icons/ai";
import { LiaUniversitySolid } from "react-icons/lia";
import ClassroomCard from "../components/widgets/ClassroomCard";
const TeacherProfile = () => {
  const { id } = useParams(); // Extracting id from URL params
  const [teacher, setTeacher] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const user = useSelector((state) => state.user.user);

  const handleEnrollment = async () => {
    const response = await publicRequest.post(`/teachers/${id}/enroll`, {
      teacherIds: teacher.id,
    });
    console.log(response);
    if (response.status === 200) {
      toast.success("Enrollment successfull! ");
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await publicRequest.get(`/teachers/${id}`);
        setTeacher(response.data);
        console.log("Teachers:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    const fetchClassrooms = async () => {
      try {
        const response = await publicRequest.get(`classrooms/teacher/${id}`);
        setClassrooms(response.data);
        console.log("Classrooms:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };

    fetchClassrooms();
    fetchTeachers();
  }, [teacher.id]);
  return (
    <div className="profile relative h-full ">
      <img
        src={`http://localhost:5000/assets/${teacher.coverpicture}`}
        alt="banner"
        className="w-full h-[10rem] object-cover md:h-[20rem]"
      />
      <img
        src={`http://localhost:5000/assets/${teacher.profilepicture}`}
        alt="image"
        className="w-40 md:w-80 absolute top-20 md:top-20 ms-[2rem] shadow-md h-40 md:h-80 object-cover bg-white"
      />

      <div className="flex">
        <div className=" w-9/12 m-4">
          <div className="profile-display rounded-3xl ">
            <div className="info grid grid-cols-2 gap-8 mt-28 pb-10 m-8 relative">
              <div className="highlights col-span-1">
                <div className="name flex items-center gap-2">
                  <p className="font-bold text-5xl text-primary">
                    {teacher.name}
                  </p>
                  <MdVerified />
                  <p>{"(He/Him)"}</p>
                </div>
                <div className="bio">
                  <div className="mb-4 flex items-center gap-2">
                    {teacher.keywords?.map((keyword, index) => (
                      <p
                        className=" happy-font rounded-3xl p-1 font-bold "
                        key={index}
                      >
                        #{keyword}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="location text-sm flex items-center gap-2">
                  <MdMyLocation />
                  <div className="location">
                    <div className="mb-4">{teacher.location}</div>
                  </div>
                </div>
                <div className="commuinity flex items-center gap-4">
                  <div>
                    <p className=" text-purple-400 font-bold text-5xl">78K</p>
                    <p>lookouts</p>
                  </div>
                  <div className=" ">
                    <button className="border-2 rounded-3xl p-1 border-primary text-primary happy-font flex items-center font-bold">
                      <FiPlus /> lookout
                    </button>
                  </div>
                </div>
              </div>
              <div className="experience col-span-1">
                <div className="mb-4 bg-sky-100 p-2">
                  <p className="p-2">About:</p>
                  <p className=" happy-font font-bold">{teacher.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="social rounded-3xl border-2 border-black p-8 my-4 relative">
            <p className=" font-bold text-2xl">Social Links & Interest's </p>
            <div className="institute  items-center gap-2">
              <div className="mb-4">
                <label className="block my-4 mb-1">Social Links:</label>
                <div className="mb-4 flex items-center gap-2">
                  {teacher.sociallinks?.map((link, index) => (
                    <p
                      className=" happy-font rounded-3xl p-1 font-bold "
                      key={link}
                    >
                      {link}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Interests:</label>
                <div className="mb-4 flex items-center gap-2">
                  {teacher.interests?.map((hobby, index) => (
                    <p
                      className=" happy-font rounded-3xl p-1 font-bold "
                      key={hobby}
                    >
                      {hobby}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap h-min w-screen gap-4 p-2 md:w-[60vw]">
            {classrooms.map((classroom, index) => (
              <ClassroomCard key={index} classroom={classroom} />
            ))}
          </div>
        </div>
        <div className="w-3/12">
          <div className="education rounded-3xl border-2 border-black p-8 my-4 relative">
            <p className=" font-bold  my-4 text-2xl">Education & Experience </p>
            <div div className="flex flex-col">
              <div className="institute flex w-full items-center">
                <div className="mb-4 w-11/12">
                  <div className="flex items-center">
                    <label className="block mb-1">Education:</label>
                  </div>
                  {teacher.education?.map((edu, index) => (
                    <div className=" flex items-center gap-2">
                      <LiaUniversitySolid className="h-8 w-8 bg-white p-1" />

                      <p>{edu}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="institute flex w-full items-center">
                <div className="mb-4 w-11/12">
                  <div className="flex items-center">
                    <label className="block mb-1">Experience:</label>
                  </div>{" "}
                  <AiTwotoneExperiment className="h-8 w-8 bg-white p-1" />
                  <p>{teacher.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
