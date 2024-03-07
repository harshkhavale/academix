import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { publicRequest } from "../redux/requestMethods";
import { MdMyLocation, MdVerified } from "react-icons/md";
import ResourceCard from "../components/widgets/ResourceCard";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import CreateResource from "../components/modals/CreateResource";
const ClassroomProfile = () => {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams(); // Extracting id from URL params
  const [classroom, setClassroom] = useState();
  const [teacher, setTeacher] = useState();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await publicRequest.get(`/classrooms/${id}`);
        setClassroom(response.data);
        console.log("Classroom:", response.data);
        try {
          const response2 = await publicRequest.get(
            `/teachers/${response.data.teacher_id}`
          );
          setTeacher(response2.data);
          console.log("Teacher:", response2.data);
        } catch (error) {
          console.error("Error fetching Teacher:", error);
        }
      } catch (error) {
        console.error("Error fetching Classroom:", error);
      }
    };

    fetchClassroom();
  }, [id]);

  return (
    <div className="grid grid-cols-10 w-screen h-screen">
      {user && user.isTeacher && showModal && (
        <CreateResource onClose={() => setShowModal(false)} />
      )}
      <div className="col-span-2">
        <img
          src={`http://localhost:5000/thumbnails/${classroom?.thumbnail}`}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-8 px-4">
        {teacher?._id == user._id ? (
          <button
            onClick={() => setShowModal(true)}
            className=" flex items-center gap-1 font-bold happy-font text-primary border-2 border-primary rounded-3xl p-1"
          >
            <FiPlus />
            <p className="">upload resources</p>
          </button>
        ) : (
          <button className=" flex items-center gap-1 font-bold happy-font text-primary border-2 border-primary rounded-3xl p-1">
            <FiPlus />
            <p className="">Enroll</p>
          </button>
        )}

        <p className="font-bold text-5xl text-right px-10">{classroom?.name}</p>
        <p className="p-4 bg-sky-200 m-4 font-bold happy-font">
          {classroom?.description}
        </p>
        <p className="font-bold text-3xl">23 Enrolled Users</p>
        <div className="author flex">
          {teacher && (
            <Link
              to={`/teachers/${teacher._id}`}
              className="card relative shadow-sm rounded-xl border-2 border-black w-full overflow-hidden"
            >
              <div className="profile-display rounded-3xl">
                <div className="banner relative h-[20vh]">
                  <div className=" relative h-full overflow-hidden w-full flex justify-center items-center bg-primary">
                    <div className="h-full w-full">
                      <img
                        src={`http://localhost:5000/assets/${teacher.coverpicture}`}
                        alt="Profile Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="h-30 w-30 shadow-md flex justify-center items-center absolute z-10 right-8 -bottom-20">
                    <div className="">
                      <div className="h-[25vh] w-[25vh]">
                        <img
                          src={`http://localhost:5000/assets/${teacher.profilepicture}`}
                          alt="Profile Preview"
                          className="w-full h-full bg-white overflow-hidden object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info  px-10 py-20 relative">
                  <div className="highlights flex items-center gap-6 absolute bottom-4">
                    <div className="name flex items-center">
                      <p className="font-bold text-3xl text-nowrap">
                        {teacher.name}
                      </p>
                      <MdVerified />
                    </div>
                    <div className="bio">
                      <div className="flex items-center gap-2">
                        {teacher.keywords.map((keyword, index) => (
                          <p
                            className="happy-font p-1 bg-gray-200 rounded-3xl font-bold"
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
                        <p>{teacher.location}</p>
                      </div>
                    </div>
                    <div className="commuinity">
                      <p className="text-primary font-bold">78K lookout's</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="resources p-8">
          <ResourceCard />
        </div>
      </div>
    </div>
  );
};

export default ClassroomProfile;
