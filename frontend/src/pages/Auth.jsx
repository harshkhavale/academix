import React from "react";
import Registration from "../components/Registration";
import { teacher, vrboy } from "../assets";
import Login from "../components/Login";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";

const Auth = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const { parameter } = useParams();
  console.log(parameter);
  let componentToRender;

  if (parameter === "login") {
    componentToRender = <Login />;
  } else if (parameter === "registration") {
    componentToRender = <Registration />;
  } else {
    componentToRender = <Login />;
  }
  return (
    <div className=" flex justify-center items-center h-[90vh] overflow-hidden">
      <div className="auth ps-40">{componentToRender}</div>
      <div className="band fixed right-0 h-screen top-0 p-40 bg-[#925FE2]"></div>
      <img
        src={teacher}
        className=" absolute right-5 h-[90vh] object-contain"
        alt="vrboy"
      />
    </div>
  );
};

export default Auth;
