import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaUserGraduate, FaUsers } from "react-icons/fa";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { MdSubject } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../redux/userSlice"; 
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../main";
const MobileSidebar = ({ showMenu, setShowMenu }) => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.user);

  const handleMenuClick = (name) => {
    dispatch(setActive(name));
    setShowMenu(false);
  };

  if (!showMenu) return null;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/users/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null));
      toast.success("Logout successfull");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      
    }
  };
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        onClick={() => setShowMenu(false)}
        className="absolute inset-0 bg-black/40"
      ></div>

      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-[#2b2b82] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          <h1 className="text-white text-xl font-bold">Admin Panel</h1>

          <IoMdClose
            size={28}
            className="text-white cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>

        {/* User Section */}
        <div className="px-4 py-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <FaUsers className="text-[#2b2b82]" size={22} />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">Inteyaz</h2>
              <p className="text-white/70 text-sm">Administrator</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-3">
          <button
            onClick={() => handleMenuClick("Dashboard")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Dashboard" ? "bg-white/15" : ""
            }`}
          >
            <MdDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => handleMenuClick("Students")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Students" ? "bg-white/15" : ""
            }`}
          >
            <FaUserGraduate size={18} />
            Students
          </button>

          <button
            onClick={() => handleMenuClick("Parents")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Parents" ? "bg-white/15" : ""
            }`}
          >
            <FaUsers size={18} />
            Parents
          </button>

          <button
            onClick={() => handleMenuClick("Subject")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Subject" ? "bg-white/15" : ""
            }`}
          >
            <MdSubject size={18} />
            Subject
          </button>
          
             <button
            onClick={() => handleMenuClick("Exams")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Exams" ? "bg-white/15" : ""
            }`}
          >
            <MdSubject size={18} />
            Exam
          </button>

          <button
            onClick={() => handleMenuClick("Teachers")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Teachers" ? "bg-white/15" : ""
            }`}
          >
            <PiChalkboardTeacherFill size={20} />
            Teachers
          </button>

          <button
            onClick={() => handleMenuClick("Classes")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Classes" ? "bg-white/15" : ""
            }`}
          >
            <MdOutlineClass size={20} />
            Classes
          </button>

          <button
            onClick={() => handleMenuClick("Attendance")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Attendance" ? "bg-white/15" : ""
            }`}
          >
            <BsClipboardCheck size={18} />
            Attendance
          </button>

          <button
            onClick={() => handleMenuClick("Fees")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Fees" ? "bg-white/15" : ""
            }`}
          >
            <RiMoneyRupeeCircleFill size={20} />
            Fees
          </button>

          <button
            onClick={() => handleMenuClick("Timetable")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Timetable" ? "bg-white/15" : ""
            }`}
          >
            <AiOutlineSchedule size={20} />
            Timetable
          </button>

          <button
            onClick={() => handleMenuClick("Notices")}
            className={`w-full flex items-center gap-3 px-5 py-3 text-white font-medium hover:bg-white/10 transition ${
              active === "Notices" ? "bg-white/15" : ""
            }`}
          >
            <FaRegBell size={18} />
            Notices
          </button>

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
      </div>
    </div>
  );
};

export default MobileSidebar;
