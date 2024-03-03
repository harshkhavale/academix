import React from "react";
import { learningboy, modelboy, smilinglapboy } from "../assets";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="h-[90vh] w-screen overflow-hidden flex ">
      <div className="headlines p-8">
        <p className=" text-9xl font-bold w-[60vw] ">
          academics at your place!
        </p>
        <p className="p-8 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
          tenetur architecto eos, esse quisquam repudiandae voluptates ipsam
          corrupti enim voluptatibus eveniet beatae. Assumenda culpa obcaecati
          tempore vero, adipisci sequi aliquam!
        </p>
        <button className="bg-primary m-8 p-4 happy-font font-bold rounded-3xl text-white">
          <Link to={"/auth/registration"}>Let's get started -{">"}</Link>
        </button>
      </div>
      <div className="banner">
        <img src={learningboy} className=" w-full object-contain" alt="" />
      </div>
    </div>
  );
};

export default Main;
