import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { setActive } from "../redux/userSlice";

const Dashboard = () => {
  let { userData } = useSelector((state) => state.user);
  let [studentId, setStudentId] = useState("");
  let [studentData, setStudentData] = useState(null);
  let [attendanceData, setAttendanceData] = useState([]);
  let [assignments, setAssignments] = useState([]);
  let [assignmentsResult, setAssignmentsResult] = useState([]);
  const dispatch = useDispatch();

  const getStudent = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/students/get/student/${userData?._id}`,
        { withCredentials: true },
      );

      setStudentData(result.data);
      setStudentId(result.data.userId._id);
    } catch (error) {
      return;
    }
  };

  const getAttendance = async () => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/attendance/student/attendance`,
        { studentId: studentData?._id },
        { withCredentials: true },
      );
      setAttendanceData(result.data);
    } catch (error) {
      return;
    }
  };

  const getAssignments = async () => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/assignments/getByClass`,
        { classId: studentData?.classId._id },
        { withCredentials: true },
      );
      setAssignments(result.data);
    } catch (error) {
      return;
    }
  };

  const getAssignmentsResutlt = async () => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/submissions/get-assignment-results`,
        {},
        { withCredentials: true },
      );

      setAssignmentsResult(result.data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  useEffect(() => {
    getAttendance();
  }, [studentData]);

  useEffect(() => {
    getAssignments();
  }, [studentData]);

  useEffect(() => {
    getAssignmentsResutlt();
  }, []);

  return (
    <div className="lg:p-6 p-2 ">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ATTENDANCE */}
        <div className="bg-white max-h-[300px] flex items-center justify-center flex-col p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Attendance Overview</h2>

          <div className="flex items-center gap-6">
            {/* Donut */}
            <div className="relative w-32 h-32">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
                #14b8a6 ${attendanceData?.summary?.percentage || 0}%,
                #e5e7eb 0%
              )`,
                }}
              />

              <div className="absolute inset-4 bg-white rounded-full flex flex-col justify-center items-center">
                <p className="text-2xl font-bold">
                  {attendanceData?.summary?.percentage || 0}%
                </p>
                <p className="text-xs text-gray-500">This Month</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 text-lg font-semibold">
              <p>✅ Present: {attendanceData?.summary?.present || 0}</p>
              <p>❌ Absent: {attendanceData?.summary?.absent || 0}</p>
            </div>
          </div>
        </div>

        {/* ACADEMIC */}
        <div className="bg-white max-h-[300px] p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Academic Progress</h2>

          <p className="mb-3">GPA: 3.8</p>

          {assignmentsResult.map((sub) => (
            <div
              key={sub.assignmentId?.subjectId?.name || sub._id}
              className="mb-3"
            >
              <p className="text-sm">
                {sub.assignmentId?.subjectId?.name || "No Subject"}
              </p>

              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-teal-500 rounded"
                  style={{ width: `${sub.marks}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* UPCOMING TASKS */}
        <div className="bg-white p-6 max-h-[300px] overflow-auto rounded-xl shadow">
          <h2 className="font-semibold mb-4">Upcoming Tasks</h2>

          <div className="space-y-3 text-sm">
            {assignments.length === 0 && <p>No upcoming assignments</p>}
            {assignments.map((assignment) => (
              <p className="font-semibold " key={assignment._id}>
                📘 {assignment.subjectId?.name || "No Subject"} — Due Date :{" "}
                {new Date(assignment.dueDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            ))}
          </div>
        </div>

        {/* CLASS SCHEDULE */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="font-semibold mb-4">Class Schedule</h2>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <p>Math — 9:00 AM</p>
            <p>History — 10:00 AM</p>
            <p>Science — 11:00 AM</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="bg-white gap-2 p-6 rounded-xl shadow flex justify-center items-center">
          <button
            onClick={() => {
              dispatch(setActive("Attendance"));
            }}
            className="px-4 cursor-pointer py-2 bg-teal-500 text-white rounded-lg"
          >
            Attendance
          </button>

          <button
            onClick={() => {
              dispatch(setActive("Result"));
            }}
            className="px-4 cursor-pointer py-2 bg-blue-500 text-white rounded-lg"
          >
            Result
          </button>

          <button
            onClick={() => {
              dispatch(setActive("Assignment"));
            }}
            className="px-4 cursor-pointer  py-2 bg-green-500 text-white rounded-lg"
          >
            Assignments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
