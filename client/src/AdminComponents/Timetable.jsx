import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import MobileSideBar from "../AdminComponents/MobileSidebar";
import { useDispatch, useSelector } from "react-redux";

import { getAllTimeTable } from "../hooks/allHooks";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../main";
const Timetable = () => {
  getAllTimeTable();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  let { timetables } = useSelector((state) => state.timetable);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverUrl}/api/timetable/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Slot deleted ✅");
      getAllTimeTable();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    }
  };

  return (
    <div className="w-[100%] flex flex-col h-screen overflow-hidden  ">
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />

      <div className="w-full lg:px-12 px-4 h-[57px] bg-[#2f2faf] shadow-md flex items-center justify-between">
        <div className="flex  gap-4 items-center">
          <TiThMenu
            color="white"
            size={30}
            className="cursor-pointer block lg:hidden "
            onClick={() => setShowMenu(true)}
          />
          <h1 className="font-semibold hidden lg:block text-xl text-white">
            Timetable
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate("/add/timetable");
            }}
            className="lg:w-[200px] w-[150px] h-[40px] bg-white rounded-lg shadow-lg text-black font-semibold cursor-pointer "
          >
            {" "}
            Create Timetable
          </button>
        </div>
      </div>

      <div className="px-3 lg:px-6  overflow-auto ">
        <h2 className="text-lg font-semibold mb-4">Weekly Timetable</h2>

        <div className="overflow-x-auto   border">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Class</th>
                <th className="border p-3 text-left">Subject</th>
                <th className="border p-3 text-left">Day</th>
                <th className="border p-3 text-left">Teacher</th>
                <th className="border p-3 text-left">Time</th>
                <th className="border p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {timetables?.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border  p-1.5 lg:p-3">
                    {t?.classId?.name || t?.classId || "-"}
                  </td>

                  <td className="border p-1.5 lg:p-3">
                    {t?.subjectId?.name || "-"}
                  </td>

                  <td className="border p-1.5 lg:p-3">{t?.day}</td>

                  <td className="border p-1.5 lg:p-3">
                    {t?.teacherId?.name || "No teaher"}
                  </td>

                  <td className="border p-1.5 lg:p-3">
                    {t?.startTime} - {t?.endTime}
                  </td>

                  <td className="border p-1.5 lg:p-3">
                    <button
                      onClick={() => {
                        handleDelete(t._id);
                      }}
                      className="bg-red-500 cursor-pointer px-1 lg:px-3 py-1.5 shadow-lg rounded-md text-white font-semibold "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
