import React, { useState } from "react";
import { serverUrl } from "../main";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../ParentComponents/Sidebar";
import { IoIosMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import Dashboard from "../ParentDashboard/Dashboard";
import { getMyChild } from "../hooks/allHooks";
import Assignment from "../ParentDashboard/Assignment";
import Attendance from "../ParentDashboard/Attendance";
import Result from "../ParentDashboard/Result";
import MobileSideBar from "../ParentComponents/MobileSideBar";

const ParentDashBoard = () => {
  let { userData, active } = useSelector((state) => state.user);
  let [showMenu, setShowMenu] = useState(false);
  const dispacth = useDispatch();
  getMyChild();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/users/logout`,
        {},
        { withCredentials: true },
      );
      dispacth(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex overflow-hidden  bg-gray-200 ">
      <Sidebar />
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className=" w-[100%] relative flex flex-col h-screen overflow-auto ">
        <div className="w-[100%] px-2 lg:px-4  h-[60px] bg-gray-200 shadow-lg flex items-center justify-between  fixed top-0 left-0 ">
          {/* LEFT */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                setShowMenu(true);
              }}
              className="cursor-pointer lg:hidden block"
            >
              <IoIosMenu size={25} color="black" />
            </button>

            <h1 className="text-black font-semibold text-lg">
              {userData?.name}
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex  gap-2">
            <button className="cursor-pointer">
              <IoIosNotificationsOutline size={25} color="black" />
            </button>

            <button className="cursor-pointer">
              <CgProfile size={22} color="black" />
            </button>
          </div>
        </div>

        {active === "Dashboard" ? (
          <Dashboard />
        ) : active === "Assignments" ? (
          <Assignment />
        ) : active === "Attendance" ? (
          <Attendance />
        ) : active === "Result" ? (
          <Result />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
};

export default ParentDashBoard;
