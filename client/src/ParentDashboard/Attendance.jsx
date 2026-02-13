import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAttendanceOfStudent } from "../hooks/allHooks";

const Attendance = () => {
  const { myChild = [] } = useSelector((state) => state.parent);
  const { myAttendance = [] } = useSelector((state) => state.attendance);

  const navigate = useNavigate();
  const [activeChild, setActiveChild] = useState(null);

  useEffect(() => {
    if (myChild.length > 0) {
      setActiveChild(myChild[0]);
    }
  }, [myChild]);

  useEffect(() => {
    if (activeChild?._id) {
      getAttendanceOfStudent(activeChild._id);
    }
  }, [activeChild]);

  if (!activeChild) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-blue-600 text-white flex items-center gap-4 px-5 h-[60px] shadow">
        <FaArrowLeft
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-semibold">Attendance</h1>
      </div>

      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* CHILD SELECT */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Select Child</h2>

          <div className="flex gap-3 flex-wrap">
            {myChild?.map((c) => (
              <button
                key={c._id}
                onClick={() => setActiveChild(c)}
                className={`px-4 py-2 cursor-pointer rounded-lg
                  ${
                    activeChild._id === c._id
                      ? "bg-blue-600  text-white"
                      : "bg-gray-200  "
                  }`}
              >
                {c.userId?.name}
              </button>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card
            label="Attendance %"
            value={`${myAttendance?.summary?.percentage || 0}%`}
            color="text-blue-600"
          />
          <Card
            label="Present"
            value={myAttendance?.summary?.present}
            color="text-green-600"
          />
          <Card
            label="Absent"
            value={myAttendance?.summary?.absent}
            color="text-red-600"
          />
        </div>

        {/* CALENDAR */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            {activeChild.userId?.name}'s Attendance
          </h2>

          {/* LEGEND */}
          <div className="flex gap-4 mt-5 text-sm">
            <Legend
              color="bg-green-400"
              value={myAttendance?.summary?.present}
              label="Present"
            />
            <Legend
              color="bg-red-400"
              value={myAttendance?.summary?.absent}
              label="Absent"
            />

            <Legend
              color="bg-black shadow-lg text-white shadow "
              value={myAttendance?.summary?.percentage + "%"}
              label="Percentage"
            />
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm"></div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ label, value, color }) => (
  <div className="bg-white p-5 rounded-xl shadow text-center">
    <p className="text-gray-500">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const Legend = ({ color, label, value }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-16 h-12 flex items-center justify-center font-semibold text-lg rounded ${color}`}
    >
      {value}{" "}
    </div>
    <span>{label}</span>
  </div>
);

export default Attendance;
