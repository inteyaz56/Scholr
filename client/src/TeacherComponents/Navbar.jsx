import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
const Navbar = () => {
  return (
    <div className="w-[100%] h-[70px] border-2 lg:px-8 px-2 border-gray-300 shadow-lg flex items-center justify-between ">
      <div className="flex gap-2">
        <PiStudentBold size={30} color="blue" className="hidden lg:block" />
        <p className="text-gray-600 font-semibold text-md lg:text-lg">
          Teacher Dashboard
        </p>
      </div>
      <div className="flex gap-4">
        <IoNotificationsOutline
          size={25}
          className="hidden cursor-pointer lg:block text-gray-600"
        />
        <IoSettingsOutline
          size={25}
          className="hidden cursor-pointer lg:block text-gray-600"
        />

        <FaUserGraduate size={25} className="cursor-pointer  text-blue-600" />
      </div>
    </div>
  );
};

export default Navbar;
