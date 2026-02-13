import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiUsers } from "react-icons/hi2";
import { TiThMenu } from "react-icons/ti";
import MobileSideBar from "../AdminComponents/MobileSidebar";
import { getAllStudents } from "../hooks/allHooks";
import { useSelector } from "react-redux";

const Dashboard = () => {
  getAllStudents();
  let { teacherData } = useSelector((state) => state.teacher);
  let { students } = useSelector((state) => state.student);
  let { classData } = useSelector((state) => state.class);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col lg:py-3 gap-4 min-h-screen">
        {/* Desktop Search Bar */}
        <div className="w-full hidden h-[70px] shadow-md items-center lg:flex px-6 justify-center bg-white">
          <div className="w-full relative flex items-center justify-center">
            <CiSearch size={18} className="absolute left-20 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="w-[90%] pl-10 pr-4 outline-0 border-2 border-gray-300 h-[40px] rounded-2xl"
            />
          </div>
        </div>

        {/* Mobile Top Bar */}
        <div className="w-full px-4 h-[70px] lg:hidden flex items-center gap-4 bg-[#2b2b82]">
          <TiThMenu
            size={35}
            onClick={() => setShowMenu(true)}
            color="white"
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        </div>

        {/* ✅ Mobile Sidebar */}
        <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />

        {/* Main Content */}
        <div className="w-full px-4 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
              <div className="flex gap-2 items-center">
                <HiUsers size={40} color="white" />
                <span className="text-2xl font-semibold text-white">
                  {students?.length || 0}{" "}
                </span>
              </div>
              <h1 className="text-white font-semibold text-lg">
                Total Students
              </h1>
            </div>

            <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
              <div className="flex gap-2 items-center">
                <HiUsers size={40} color="white" />
                <span className="text-2xl font-semibold text-white">
                  {teacherData?.length}{" "}
                </span>
              </div>
              <h1 className="text-white font-semibold text-lg">Teachers</h1>
            </div>

            <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
              <div className="flex gap-2 items-center">
                <HiUsers size={40} color="white" />
                <span className="text-2xl font-semibold text-white">
                  {classData?.length || 0}{" "}
                </span>
              </div>
              <h1 className="text-white font-semibold text-lg">Classes</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
