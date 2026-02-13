import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import MobileSideBar from "../AdminComponents/MobileSidebar"; 
import { useSelector } from "react-redux";

const Classes = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  let { classData } = useSelector((state) => state.class); 

  return (
    <div className="w-full flex flex-col min-h-screen overflow-auto bg-white">
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />

      <div className="w-full lg:px-12 px-4 h-[70px] bg-gray-300 shadow-md flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <TiThMenu
            color="blue"
            size={35}
            className="cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
          <h1 className="font-semibold text-xl text-black">Classes</h1>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search classes"
            className="w-[250px] h-[40px] px-2 hidden lg:flex rounded-l-2xl outline-0 border-2 border-gray-400"
          />

          <button
            onClick={() => navigate("/add/class")}
            className="w-[150px] flex items-center justify-center gap-1 cursor-pointer text-white font-semibold h-[40px] bg-blue-600 lg:rounded-r-2xl rounded-2xl lg:rounded-l-none"
          >
            <IoMdAdd color="white" size={20} /> Add Classes
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full px-4 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1 */}
          <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <HiUsers size={40} color="white" />
              <span className="text-2xl font-semibold text-white">
                {classData?.length || "Coming soon"}{" "}
              </span>
            </div>
            <h1 className="text-white font-semibold text-lg">Total Classes</h1>
          </div>

          {/* Card 2 */}
          <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <HiUsers size={40} color="white" />
              <span className="text-2xl font-semibold text-white">38</span>
            </div>
            <h1 className="text-white font-semibold text-lg">Total Sections</h1>
          </div>

          {/* Card 3 */}
          <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <HiUsers size={40} color="white" />
              <span className="text-2xl font-semibold text-white">310+</span>
            </div>
            <h1 className="text-white font-semibold text-lg">Total Students</h1>
          </div>

          {/* Card 4 */}
          <div className="h-[100px] bg-[#fa7959] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <HiUsers size={40} color="white" />
              <span className="text-2xl font-semibold text-white">10+</span>
            </div>
            <h1 className="text-white font-semibold text-lg">Active Classes</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
