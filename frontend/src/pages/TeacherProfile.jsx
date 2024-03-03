import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../redux/requestMethods";
import { useSelector } from "react-redux";
import { coverimage } from "../assets";
import { Instagram, LinkedIn } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { toast } from "react-hot-toast";
import AddTaskIcon from "@mui/icons-material/AddTask";
const MentorProfile = () => {
  const { id } = useParams(); // Extracting id from URL params
  const [mentor, setMentor] = useState([]);
  const user = useSelector((state) => state.user.user);

  const handleEnrollment = async () => {
    const response = await publicRequest.post(`/mentors/${id}/enroll`, {
      userIds: user.id,
    });
    console.log(response);
    if (response.status === 200) {
      toast.success("Enrollment successfull! ");
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await publicRequest.get(`/mentors/${id}`);
        setMentor(response.data);
        console.log("Mentors:", response.data); // Check subjects data
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchMentors();
  }, [user.id]);
  return (
    <div className="profile relative h-full ">
      <img
        src={`https://mentorius-server.onrender.com/assets/${mentor.coverpicture}`}
        alt="banner"
        className="w-full h-[10rem] object-cover md:h-[20rem]"
      />
      <img
        src={`https://mentorius-server.onrender.com/assets/${mentor.profilepicture}`}
        alt="image"
        className="w-40 md:w-80 absolute top-20 md:top-40 ms-[2rem] border-4 rounded-full h-40 md:h-80 object-cover"
      />
      <div className=" absolute right-4 top-52 md:top-96 ">
        <p className="font-bold text-5xl">12K</p>
        <p className="text-xs w-min">mentorship provided</p>
      </div>
      <div className="info mt-20 md:mt-40 p-4 md:p-20">
        <p className="font-bold text-2xl md:text-5xl">{mentor.name}</p>
        <p>{mentor.enrolled}</p>
        <p>Talks About</p>
        <div className="keywords flex flex-wrap gap-4">
          {mentor.keywords?.map((keyword, index) => (
            <p className="font-bold" key={index}>
              #{keyword}
            </p>
          ))}
        </div>
        <div>
          <p>Description</p>
          <p className=" font-semibold text-gray-500">{mentor.description}</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            repellendus a omnis temporibus fugiat nam deleniti itaque culpa
            ipsum molestiae.
          </p>
        </div>
        <p>Education</p>
        <div className="keywords flex flex-wrap gap-4">
          {mentor.education?.map((degree, index) => (
            <p
              className="font-bold bg-primary rounded-3xl p-1 text-white"
              key={index}
            >
              {degree}
            </p>
          ))}
        </div>
        <p>Hobbies</p>
        <div className="interests flex flex-wrap gap-4">
          {mentor.education?.map((degree, index) => (
            <p
              className="font-bold bg-primary rounded-3xl p-1 text-white"
              key={index}
            >
              {degree}
            </p>
          ))}
        </div>
        <p>Social</p>
        <div className="flex gap-4 justify-center bg-white rounded-3xl  shadow-xl p-2 items-center">
          <div className="flex flex-col justify-center items-center">
            <p>Linkedin</p>
            <LinkedIn />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>X/Tweeter</p>
            <XIcon />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Instagram</p>
            <Instagram />
          </div>
        </div>

        <div className="flex justify-center my-8">
          <div
            onClick={handleEnrollment}
            className="bg-primary cursor-pointer text-white gap-2 p-4 font-bold flex rounded-2xl shadow-2xl"
          >
            <AddTaskIcon />
            <p>Enroll Mentor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
