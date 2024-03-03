import React from "react";
import { graph, random, teacherbanner, user } from "../../assets";
import { studentDashboardMentors } from "../../constants/indexStudent";
import CalendarComponent from "../widgets/CalendarComponent";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <div className="flex flex-col items-center p-4 shadow-xl h-screen">
        <p className="text-sm font-semibold mb-4 text-primary">Your Profile</p>

        <div className="rounded-full overflow-hidden border-4 border-primary mb-4">
          <img
            src={teacherbanner}
            alt="Profile"
            className="w-20 h-20 object-cover"
          />
        </div>

        <p className="text-xl font-semibold mb-2">{user.fullname}</p>
      </div>
    </div>
  );
};

export default Profile;
