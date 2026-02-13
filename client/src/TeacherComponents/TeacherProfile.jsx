import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../main";
import { setActive, setUserData } from "../redux/userSlice";

const TeacherProfile = () => {
  const { userData } = useSelector((state) => state.user);
  let [laoding, setLoading] = useState(false);
  const dispacth = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/users/logout`,
        {},
        { withCredentials: true },
      );
      dispacth(setUserData(null));
      dispacth(setActive("Dashboard"));
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* ✅ Header */}
      <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[55px] h-[55px] md:w-[70px] md:h-[70px] rounded-full bg-blue-100 flex items-center justify-center">
            <FaRegCircleUser className="text-blue-600" size={30} />
          </div>

          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">
              {userData?.name || "Teacher Name"}
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-semibold">
              Role: {userData?.role || "TEACHER"}
            </p>
          </div>
        </div>

        <span className="hidden md:block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
          Active
        </span>
      </div>

      {/* ✅ Profile Details */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-5 flex items-center gap-3">
          <div className="w-[45px] h-[45px] rounded-xl bg-gray-100 flex items-center justify-center">
            <MdEmail className="text-gray-700" size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold">Email</p>
            <p className="text-gray-800 font-bold text-base md:text-lg">
              {userData?.email || "teacher@email.com"}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-5 flex items-center gap-3">
          <div className="w-[45px] h-[45px] rounded-xl bg-gray-100 flex items-center justify-center">
            <FaPhoneAlt className="text-gray-700" size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold">Phone</p>
            <p className="text-gray-800 font-bold text-base md:text-lg">
              {userData?.phone || "Not Available"}
            </p>
          </div>
        </div>

        {/* Teacher ID */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-5 flex items-center gap-3">
          <div className="w-[45px] h-[45px] rounded-xl bg-gray-100 flex items-center justify-center">
            <PiStudentBold className="text-gray-700" size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold">Teacher ID</p>
            <p className="text-gray-800 font-bold text-base md:text-lg">
              {userData?._id || "N/A"}
            </p>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-5 flex items-center gap-3">
          <div className="w-[45px] h-[45px] rounded-xl bg-gray-100 flex items-center justify-center">
            <FaRegCircleUser className="text-gray-700" size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold">Status</p>
            <p className="text-gray-800 font-bold text-base md:text-lg">
              Active ✅
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Action Buttons */}
      <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition font-semibold text-gray-800">
          Edit Profile
        </button>

        <button className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-white shadow">
          Change Password
        </button>

        <button
          onClick={handleLogout}
          className="w-full lg:hidden cursor-pointer sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-white shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherProfile;
