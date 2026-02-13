import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineSubject } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { BsClockHistory } from "react-icons/bs";
import { SiPrecommit } from "react-icons/si";
const MyClassCard = ({ item }) => {
  const navigate = useNavigate();
  const [attendanceTaken, setAttendanceTaken] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const checkAttendance = async () => {
      try {
        const result = await axios.post(
          `${serverUrl}/api/attendance/check/attendance`,
          {
            classId: item?.classId?._id,
            subjectId: item?.subjectId?._id,
            date: today,
          },
          { withCredentials: true },
        );

        setAttendanceTaken(result.data.taken);
      } catch (error) {
        return;
      }
    };

    checkAttendance();
  }, []);

  return (
    <div className="w-full bg-white border border-gray-200 shadow-md rounded-2xl p-4 md:p-5 flex flex-col gap-4">
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            {item?.classId?.name}
          </h2>
          <p className="text-sm md:text-base text-gray-600 flex items-center gap-2 mt-1">
            <MdOutlineSubject className="text-blue-600" size={18} />
            {item?.subjectId?.name}
          </p>
        </div>

        <IoChevronForward className="text-gray-400" size={20} />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
        {!attendanceTaken ? (
          <button
            disabled={attendanceTaken}
            onClick={() =>
              navigate(
                `/attendance/${item?.classId?._id}/subject/${item?.subjectId?._id}`,
              )
            }
            className={`w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white  sm:w-auto px-4 py-2 rounded-xl font-semibold shadow
         
          `}
          >
            Take Attendance
          </button>
        ) : (
          <button
            onClick={() =>
              navigate(
                `/attendance/${item?.classId?._id}/subject/${item?.subjectId?._id}`,
              )
            }
            className={`w-full  sm:w-auto px-6 py-2 rounded-xl font-semibold shadow
          cursor-pointer bg-blue-600 hover:bg-blue-700 text-white
          `}
          >
            Edit
          </button>
        )}
        <button
          disabled={!attendanceTaken}
          onClick={() => {
            navigate(
              `/students/${item?.classId?._id}/subject/${item?.subjectId?._id}`,
            );
          }}
          className={`w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 px-4 py-2
             rounded-xl bg-gray-100 ${
               attendanceTaken ? "bg-gray-100" : "bg-gray-200 hover:bg-gray-300"
             }  font-semibold`}
        >
          <FaUsers size={16} />
          View Students
        </button>

        <button
          onClick={() => {
            navigate(
              `/attendance/precentage/${item?.classId?._id}/subject/${item?.subjectId?._id}`,
            );
          }}
          className={`w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 px-4 py-2
             rounded-xl bg-gray-100 ${
               attendanceTaken ? "bg-gray-100" : "bg-gray-200 hover:bg-gray-300"
             }  font-semibold`}
        >
          <SiPrecommit size={16} />
          Attendance %
        </button>
        <button
          onClick={() => {
            navigate(
              `/attendance/history/${item?.classId?._id}/subject/${item?.subjectId?._id}`,
            );
          }}
          className={`w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 px-4 py-2
             rounded-xl bg-gray-100 hover:bg-gray-200
               font-semibold`}
        >
          <BsClockHistory size={16} />
          Attendance History
        </button>
      </div>
    </div>
  );
};

export default MyClassCard;
