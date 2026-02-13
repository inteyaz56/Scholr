import React, { useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaUserGraduate, FaRegCircleUser, FaCalendar } from "react-icons/fa6";
import { VscLayoutStatusbar } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../main";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getMyClasses, getMyClass } from "../hooks/allHooks";
import MyClassCard from "../Card.jsx/MyClassCard";
import { setActive } from "../redux/userSlice";
import TeacherProfile from "../TeacherComponents/TeacherProfile";
import Result from "../Card.jsx/Result";
import Assignment from "../Card.jsx/Assignment";
import { MdAssignment } from "react-icons/md";
import Notice from "../Card.jsx/Notice";
import Notices from "../AdminComponents/Notices";
import { IoIosMenu } from "react-icons/io";
import MobileSideBar from "../StudentComponents/MobileSideBar";
import Timetable from "../TeacherComponents/Timetable";
const TeacherDashBoard = () => {
  getMyClasses();
  getMyClass();
  let { myClasses } = useSelector((state) => state.teacher);
  let [showMenu, setShowmenu] = useState(false);
  let { active } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/users/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null));
      toast.success("Logout successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // ✅ full page fixed height, no scroll here
    <div className="w-full h-screen overflow-hidden relative">
      {/* ✅ TOP NAV FIXED */}
      <div className="fixed top-0 left-0 w-full h-[70px] border-b border-gray-300 shadow-lg bg-white z-[999] flex items-center justify-between lg:px-8 px-2">
        <div className="flex gap-2 items-center">
          <PiStudentBold size={30} color="blue" className="hidden lg:block" />
          <p className="text-gray-600 font-semibold text-md lg:text-lg">
            Teacher Dashboard
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              dispatch(setActive("Notice"));
            }}
            className="cursor-pointer"
          >
            <IoNotificationsOutline
              size={25}
              className="  cursor-pointer  text-gray-600"
            />
          </button>
          <IoSettingsOutline
            size={25}
            className="hidden cursor-pointer lg:block text-gray-600"
          />
          <FaUserGraduate size={25} className="cursor-pointer text-blue-600" />
        </div>
      </div>

      {/* ✅ LAYOUT WRAPPER (Padding so content doesn't go under fixed nav/bottom bar) */}
      <div className="pt-[70px] lg:pb-0 pb-[70px] h-full flex">
        {/* ✅ LG SIDEBAR FIXED */}
        <div className="hidden lg:flex fixed left-0 top-[70px] w-[25%] h-[calc(100vh-70px)] px-4 py-6 bg-[#23237a] flex-col justify-between z-[998]">
          <div className="w-full flex flex-col gap-4">
            <div
              onClick={() => dispatch(setActive("Classes"))}
              className="flex cursor-pointer items-center gap-2 text-white"
            >
              <VscLayoutStatusbar size={30} className="text-white" />
              <h1 className="font-semibold">My Classes</h1>
            </div>
            <div
              onClick={() => dispatch(setActive("Assignment"))}
              className="flex cursor-pointer items-center gap-2 text-white"
            >
              <MdAssignment size={30} className="text-white" />
              <h1 className="font-semibold">Assignment</h1>
            </div>

            <div
              onClick={() => dispatch(setActive("Result"))}
              className="flex cursor-pointer items-center gap-2 text-white"
            >
              <PiStudentBold size={30} className="text-white" />
              <h1 className="font-semibold">Result</h1>
            </div>

            <div
              onClick={() => dispatch(setActive("Timetable"))}
              className="flex cursor-pointer items-center gap-2 text-white"
            >
              <RiCalendarScheduleLine size={30} className="text-white" />
              <h1 className="font-semibold">Timetable</h1>
            </div>
            <div
              onClick={() => dispatch(setActive("Notice"))}
              className="flex cursor-pointer items-center gap-2 text-white"
            >
              <IoNotificationsOutline size={30} className="text-white" />
              <h1 className="font-semibold">Notice</h1>
            </div>
            <div
              onClick={() => dispatch(setActive("Profile"))}
              className="flex cursor-pointer items-center gap-2 text-white"
            >
              <FaRegCircleUser size={30} className="text-white" />
              <h1 className="font-semibold">My Profile</h1>
            </div>
          </div>

          <div
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 text-white"
          >
            <IoLogOutOutline size={30} className="text-white" />
            <h1 className="font-semibold">Logout</h1>
          </div>
        </div>

        {/* ✅ MAIN CONTENT (ONLY THIS SCROLLS) */}
        <div
          className="
    w-full
    lg:ml-[25%]
    lg:w-[75%]
    h-[calc(100vh-140px)]
    lg:h-[calc(100vh-70px)]
    overflow-y-auto
    px-2 lg:px-4
    py-4
    pb-4
  "
        >
          {active === "Classes" ? (
            myClasses?.map((classes, idx) => (
              <MyClassCard key={classes?._id || idx} item={classes} />
            ))
          ) : active === "Profile" ? (
            <TeacherProfile />
          ) : active === "Result" ? (
            <Result />
          ) : active === "Assignment" ? (
            <Assignment />
          ) : active === "Notice" ? (
            <Notices />
          ) : active === "Timetable" ? (
            <Timetable />
          ) : (
            myClasses?.map((classes, idx) => (
              <MyClassCard key={classes?._id || idx} item={classes} />
            ))
          )}
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 w-full z-[999] border-t border-gray-300 shadow-lg bg-white flex items-center justify-between px-6 h-[70px]">
        <div
          onClick={() => dispatch(setActive("Classes"))}
          className="flex items-center flex-col cursor-pointer justify-center"
        >
          <VscLayoutStatusbar size={28} className="text-gray-900" />
          <h1 className="text-sm font-semibold">My Classes</h1>
        </div>
        <div
          onClick={() => dispatch(setActive("Assignment"))}
          className="flex items-center cursor-pointer flex-col justify-center"
        >
          <MdAssignment size={28} className="text-gray-900" />
          <h1 className="text-sm font-semibold">Assignment</h1>
        </div>

        <div
          onClick={() => dispatch(setActive("Timetable"))}
          className="flex items-center cursor-pointer flex-col justify-center"
        >
          <RiCalendarScheduleLine size={28} className="text-gray-900" />
          <h1 className="text-sm font-semibold">Timetable</h1>
        </div>
        <div
          onClick={() => dispatch(setActive("Result"))}
          className="flex items-center cursor-pointer flex-col justify-center"
        >
          <PiStudentBold size={28} className="text-gray-900" />
          <h1 className="text-sm font-semibold">Result</h1>
        </div>
        <div
          onClick={() => dispatch(setActive("Profile"))}
          className="flex items-center cursor-pointer flex-col justify-center"
        >
          <FaRegCircleUser size={28} className="text-gray-900" />
          <h1 className="text-sm font-semibold">My Profile</h1>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashBoard;
