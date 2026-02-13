import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import MobileSidebar from "./MobileSidebar";
import { getAllSubjects } from "../hooks/allHooks";
import { MdOutlineMenuBook } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const Subject = () => {
  getAllSubjects();
  const navigate = useNavigate();
  let { subjects } = useSelector((state) => state.subject);
  let [showMenu, setShowMenu] = useState(false);
  return (
    <div className="w-full h-[100vh] flex flex-col gap-4 overflow-auto bg-white ">
      <MobileSidebar showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="w-[100%] h-[70px] py-3 bg-gray-200 shadow-lg gap-4 flex justify-between items-center lg:px-4 px-2 ">
        <h1 className="font-semibold hidden lg:flex text-black lg:text-2xl text-xl ">
          Subject Dashboard
        </h1>

        <h1>
          {" "}
          <IoMdMenu
            size={30}
            onClick={() => {
              setShowMenu(true);
            }}
            color="blue"
            className="flex cursor-pointer lg:hidden"
          />
        </h1>

        <div className="flex gap-4  items-center">
          <input
            type="text"
            placeholder="Search"
            className="lg:w-[400px] w-[65%]   h-[40px] rounded-2xl outline-0 px-2 border-2 border-gray-400 "
          />

          <button
            onClick={() => {
              navigate("/add/subject");
            }}
            className="w-[120px] h-[40px] cursor-pointer bg-blue-600 rounded-2xl  text-white flex items-center justify-center "
          >
            Add Subject
          </button>
        </div>
      </div>
      <div className="w-full px-4 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <MdOutlineMenuBook size={40} color="white" />
              <span className="text-2xl font-semibold text-white">
                {" "}
                {subjects?.length}{" "}
              </span>
            </div>
            <h1 className="text-white font-semibold text-lg">Total Subject</h1>
          </div>

          <div className="h-[100px] bg-[#91f83d] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <MdOutlineMenuBook size={40} color="white" />
              <span className="text-2xl font-semibold text-white">
                {" "}
                {subjects?.length}{" "}
              </span>
            </div>
            <h1 className="text-white font-semibold text-lg">Active Subject</h1>
          </div>

          <div className="h-[100px] px-2 bg-[#f63a37] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <MdOutlineMenuBook size={40} color="white" />
              <span className="text-2xl font-semibold text-white">0</span>
            </div>
            <h1 className="text-white font-semibold text-lg">
              Deactiveted Subject
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-gray-300 ">
        {/* Top Title Row */}
        <div className="px-5 py-4 border-b border-gray-300 ">
          <h2 className="text-sm font-semibold text-gray-800">Subject Name</h2>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 px-5 py-3  border-b border-gray-300">
          <div className="col-span-6 text-xs font-semibold text-gray-700">
            Subject Name
          </div>

          <div className="col-span-3 text-xs font-semibold text-gray-700">
            Code
          </div>

          <div className="col-span-3 text-xs font-semibold text-gray-700 text-right">
            Actions
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {subjects?.map((sub) => (
          <Card key={sub._id} name={sub.name} code={sub.code} />
        ))}
      </div>
    </div>
  );
};

export default Subject;
