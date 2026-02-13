import React from "react";
import { CiSearch } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
const NavBar = () => {
  return (
    <div className="w-full flex flex-col lg:py-3 gap-4 min-h-screen">
      <div className="w-[100%] lg:px-12 px-2 h-[70px]  bg-gray-300 shadow-md shadow-black flex items-center justify-between ">
        <div className="flex gap-4 items-center">
          <TiThMenu color="blue" size={35} />
          <h1 className="font-semibold text-xl text-black">Students</h1>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
