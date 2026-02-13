import React from "react";
import { TiThMenu } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllParents } from "../hooks/allHooks";
const Parents = () => {
  getAllParents();
  const navigate = useNavigate();
  let { parentData } = useSelector((state) => state.parent);
  return (
    <div className="w-full h-[100%] overflow-auto  ">
      <div className="w-[100%] lg:px-12 px-2 h-[70px]  bg-gray-300 shadow-md shadow-black flex items-center justify-between ">
        <div className="flex gap-4 items-center">
          <TiThMenu color="blue" size={35} />
          <h1 className="font-semibold text-xl text-black">Parents</h1>
        </div>
        <div className="flex gap-0 items-center">
          <input
            type="text"
            placeholder="Search classes"
            className="w-[250px] h-[40px] px-2 hidden lg:flex  rounded-l-2xl outline-0 border-2 border-gray-400 "
          />
          <button
            onClick={() => {
              navigate("/add/parent");
            }}
            className="w-[150px] flex items-center justify-center gap-1 cursor-pointer text-white font-semibold h-[40px] bg-[blue]  lg:rounded-r-2xl "
          >
            <IoMdAdd color="white" size={20} /> Add Parents
          </button>
        </div>
      </div>
      <div className="w-full px-4 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1 */}
          <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <HiUsers size={40} color="white" />
              <span className="text-2xl font-semibold text-white">
                {parentData?.length || 12}{" "}
              </span>
            </div>
            <h1 className="text-white font-semibold text-lg">Total Parents</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parents;
