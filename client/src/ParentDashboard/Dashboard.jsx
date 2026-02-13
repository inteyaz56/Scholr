import React, { useEffect, useState } from "react";
import {
  getMyChild,
  getAttendanceOfStudent,
  getClassAssignment,
} from "../hooks/allHooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineAssignment } from "react-icons/md";
import { MdHistoryToggleOff } from "react-icons/md";

const Dashboard = () => {
  getMyChild();

  const { myChild = [] } = useSelector((state) => state.parent);
  const navigate = useNavigate();
  const [activeChild, setActiveChild] = useState(null);
  let [studentId, setStudentId] = useState(activeChild?._id || "");
  let [classId, setClassId] = useState(activeChild?.classId?._id || "");
  getAttendanceOfStudent(studentId);
  getClassAssignment(classId);
  let { myAttendance } = useSelector((state) => state.attendance);
  let { classAssignment } = useSelector((state) => state.assignment);

  useEffect(() => {
    if (myChild.length > 0) {
      setActiveChild(myChild[0]);
    }
  }, [myChild]);

  if (!activeChild) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* CHILD SELECTOR */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">My Children</h2>

          <div className="flex gap-3 overflow-x-auto">
            {myChild.map((child) => (
              <button
                key={child._id}
                onClick={() => {
                  setActiveChild(child);
                  setStudentId(child._id);
                  setClassId(child?.classId?._id);
                }}
                className={`px-4 py-2 cursor-pointer rounded-lg border
                  ${
                    activeChild._id === child._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }
                `}
              >
                {child?.userId?.name}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* CHILD OVERVIEW */}
          <div className="bg-white p-5 rounded-xl shadow space-y-4">
            <h2 className="font-semibold text-lg">Child Overview</h2>

            <div>
              <p className="font-semibold text-xl">{activeChild.name}</p>
              <p className="text-gray-500">Class {activeChild.classId?.name}</p>
            </div>

            <div className="space-y-2">
              <div className="bg-green-50 p-3 rounded-lg flex justify-between">
                <span>Attendance</span>
                <span className="text-green-600 font-semibold">
                  {myAttendance?.summary?.percentage || 0}%
                </span>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                Assignments : {classAssignment?.length}
              </div>
            </div>
          </div>

          {/* ATTENDANCE */}
          <div className="bg-white p-5 rounded-xl shadow text-center space-y-4">
            <h2 className="font-semibold text-lg">Attendance</h2>

            <p className="text-4xl font-bold text-green-600">
              {myAttendance?.summary?.percentage || 0}%
            </p>

            <p className="text-gray-500">
              Present {myAttendance?.summary?.present || 0} days
            </p>
          </div>

          {/* FEES */}
          <div className="bg-white p-5 rounded-xl shadow space-y-4 text-center">
            <h2 className="font-semibold text-lg">Fees Status</h2>

            <p className="text-2xl font-bold">
              ₹{activeChild.fees?.total || 0}
            </p>

            <p className="text-green-600">
              Paid ₹{activeChild.fees?.paid || 0}
            </p>

            <p className="text-red-500">Due ₹{activeChild.fees?.due || 0}</p>
          </div>
        </div>

        {/* RESULTS + ACTIONS */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* RESULTS */}
          <div className="bg-white p-5 rounded-xl shadow space-y-4">
            <h2 className="font-semibold text-lg">Recent Results</h2>

            {(activeChild.results || []).map((r, i) => (
              <div
                key={i}
                className="flex justify-between bg-gray-50 p-3 rounded-lg"
              >
                <span>{r.subject}</span>
                <span className="font-semibold">{r.marks}</span>
              </div>
            ))}

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              View All
            </button>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white p-5 rounded-xl shadow space-y-4">
            <h2 className="font-semibold text-lg">Quick Actions</h2>

            <button
              disabled={!classId}
              onClick={() => {
                navigate(`/child/attendance/${classId}`);
              }}
              className="w-full flex gap-2 items-center bg-blue-50 py-3 text-left px-4  cursor-pointer "
            >
              <MdHistoryToggleOff scale={22} />
              Attendance
            </button>
            <button
              disabled={!classId}
              onClick={() => {
                navigate(`/child/assignment/${classId}/${studentId}`);
              }}
              className="w-full flex gap-2 items-center bg-blue-50 py-3 text-left px-4  cursor-pointer "
            >
              <MdOutlineAssignment scale={22} /> Assignmetss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickBtn = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 bg-blue-50 p-3 rounded-lg hover:bg-blue-100">
    {icon}
    {label}
  </button>
);

export default Dashboard;
