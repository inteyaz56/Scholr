import React from "react";
import { PiStudentDuotone } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RiProgress5Line } from "react-icons/ri";
import { MdOutlineAssignment } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { setUserData, setActive } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../main";
import { FaRegBell } from "react-icons/fa6";

const SideBar = () => {
  let { active } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(
      `${serverUrl}/api/users/logout`,
      {},
      { withCredentials: true },
    );
    dispatch(setActive("Dashboard"));
    dispatch(setUserData(null));
  };
  return (
    <div className="w-[20%] hidden lg:flex flex-col h-[100vh] bg-gray-200 shadow-2xl gap-4 ">
      <div className="flex items-center shadow-lg px-4 py-3 gap-2">
        <PiStudentDuotone size={35} />
        <h1 className="text-gray-800 text-3xl font-semibold">Student</h1>
      </div>

      <div className="w-full flex flex-col gap-2 ">
        <div
          onClick={() => {
            dispatch(setActive("Dashboard"));
          }}
          className={`flex gap-2 w-full py-2 px-4 cursor-pointer ${
            active === "Dashboard" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <LuLayoutDashboard size={18} />
          <h1 className="font-semibold text-black text-lg">Dashboard</h1>
        </div>

        <div
          onClick={() => {
            dispatch(setActive("Attendance"));
          }}
          className={`flex gap-2 w-full py-2 px-4 cursor-pointer ${
            active === "Attendance" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <RiProgress5Line size={18} />
          <h1 className="font-semibold text-black text-lg">Attendance</h1>
        </div>
        <div
          onClick={() => {
            dispatch(setActive("Assignment"));
          }}
          className={`flex gap-2 w-full py-2 px-4 cursor-pointer ${
            active === "Assignment" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <MdOutlineAssignment size={18} />
          <h1 className="font-semibold text-black text-lg">Assignment</h1>
        </div>

        <div
          onClick={() => {
            dispatch(setActive("Timetable"));
          }}
          className={`flex gap-2 w-full py-2 px-4 cursor-pointer ${
            active === "Timetable" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <RiCalendarScheduleLine size={18} />
          <h1 className="font-semibold text-black text-lg">Timetable</h1>
        </div>
        <div
          onClick={() => {
            dispatch(setActive("Result"));
          }}
          className={`flex gap-2 w-full py-2 px-4 cursor-pointer ${
            active === "Result" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <GiProgression size={18} />
          <h1 className="font-semibold text-black text-lg">Result</h1>
        </div>

        <div
          onClick={() => {
            dispatch(setActive("Notice"));
          }}
          className={`flex gap-2 w-full py-2 px-4 cursor-pointer ${
            active === "Notice" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <FaRegBell size={18} />
          <h1 className="font-semibold text-black text-lg">Notice</h1>
        </div>
        <div
          onClick={() => {
            dispatch(setActive("Profile"));
          }}
          className={`flex gap-2 w-full py-2 px-4 cursor-pointer ${
            active === "Profile" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <CgProfile size={18} />
          <h1 className="font-semibold text-black text-lg">Profile</h1>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="absolute bottom-8 cursor-pointer  flex gap-2 items-center justify-center left-4"
      >
        <IoLogOutOutline size={20} />
        <h1 className="font-semibold text-black text-lg">Logout</h1>
      </button>
    </div>
  );
};

export default SideBar;
