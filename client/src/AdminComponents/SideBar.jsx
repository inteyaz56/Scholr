import React, { useState } from "react";
import { TbSchool } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaClipboardCheck } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { setActive } from "../redux/userSlice";
import { MdSubject } from "react-icons/md";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import axios from "axios";

const SideBar = () => {
  const { userData, active } = useSelector((state) => state.user);
  const dispacth = useDispatch();

  const menu = [
    { name: "Dashboard", icon: <MdDashboard size={18} /> },
    { name: "Students", icon: <PiStudentFill size={18} /> },
    { name: "Parents", icon: <FaUsers size={18} /> },
    { name: "Subject", icon: <MdSubject size={18} /> },
    { name: "Teachers", icon: <FaChalkboardTeacher size={18} /> },
    { name: "Classes", icon: <SiGoogleclassroom size={18} /> },
    { name: "Attendance", icon: <FaClipboardCheck size={18} /> },
    { name: "Fees", icon: <MdAttachMoney size={18} /> },
    { name: "Exams", icon: <FaFileAlt size={18} /> },
    { name: "Timetable", icon: <MdOutlineAccessTimeFilled size={18} /> },
    { name: "Notices", icon: <MdNotificationsActive size={18} /> },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/users/logout`,
        {},
        { withCredentials: true },
      );
      dispacth(setUserData(null));
      toast.success("Logout successfull");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-[20%] h-screen hidden lg:flex flex-col bg-[#23237a]">
      {/* TOP HEADER */}
      <div className="w-full h-[55px] flex items-center gap-2 justify-center bg-[#2f2faf] shadow-md">
        <TbSchool size={28} color="white" />
        <p className="font-semibold text-lg text-white">Admin Panel</p>
      </div>

      {/* PROFILE */}
      <div className="w-full flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <div className="w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center">
          <RiAdminFill size={26} color="#23237a" />
        </div>

        <div className="flex flex-col leading-4">
          <h1 className="text-white font-semibold text-[16px]">
            {userData?.name || "Admin"}
          </h1>
          <p className="text-white/80 text-[12px]">Administrator</p>
        </div>
      </div>

      {/* MENU */}
      <div className="w-full flex flex-col mt-2">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              dispacth(setActive(item.name));
            }}
            className={`w-full flex items-center gap-3 px-5 py-2 text-white text-[14px] font-semibold cursor-pointer transition-all duration-200
              ${active === item.name ? "bg-[#2f2faf]" : "hover:bg-[#2f2faf]"}`}
          >
            <span className="text-white">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* LOGOUT (BOTTOM) */}
      <div className="mt-auto w-full pb-4">
        <div
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-2 text-white text-[14px] font-semibold cursor-pointer hover:bg-[#2f2faf] transition-all duration-200"
        >
          <IoLogOut size={18} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
