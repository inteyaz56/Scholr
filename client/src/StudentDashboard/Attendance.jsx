import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";

function Attendance() {
  const { userData } = useSelector((state) => state.user);

  const [studentData, setStudentData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);

  const getStudent = async () => {
    const res = await axios.get(
      `${serverUrl}/api/students/get/student/${userData?._id}`,
      { withCredentials: true },
    );
    setStudentData(res.data);
  };


  const getAttendance = async () => {
    const res = await axios.post(
      `${serverUrl}/api/attendance/student/attendance`,
      { studentId: studentData?._id },
      { withCredentials: true },
    );


    setAttendanceData(res.data);
  };

  // ✅ GET MONTHLY %
  const getMonthly = async () => {
    const res = await axios.post(
      `${serverUrl}/api/attendance/student/overall-attendance`,
      { studentId: studentData?._id },
      { withCredentials: true },
    );

    setMonthlyData(res.data);
  };

  useEffect(() => {
    if (userData?._id) getStudent();
  }, [userData]);

  useEffect(() => {
    if (studentData?._id) {
      getAttendance();
      getMonthly();
    }
  }, [studentData]);

  const percent = attendanceData?.summary?.percentage || 0;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Overall */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col h-[320px]">
            <h2 className="font-semibold text-lg mb-6">Overall Attendance</h2>

            <div className="flex items-center gap-8 flex-1">
              {/* Donut */}
              <div className="relative w-36 h-36">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(
                      #2dd4bf ${percent}%,
                      #e5e7eb 0%
                    )`,
                  }}
                />

                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <p className="text-2xl font-bold">{percent}%</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2 text-lg">
                <p>✅ Present: {attendanceData?.summary?.present || "..."}</p>
                <p>❌ Absent: {attendanceData?.summary?.absent || "..."}</p>
                <p>📅 Total: {attendanceData?.summary?.total || "..."}</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-xl shadow grid grid-cols-3 text-center">
            <div>
              <p className="text-2xl font-bold text-teal-500">
                {attendanceData?.summary?.present || "Loading..."}
              </p>
              <p className="text-gray-500 text-sm">Present</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-red-500">
                {attendanceData?.summary?.absent || "Loading..."}
              </p>
              <p className="text-gray-500 text-sm">Absent</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-yellow-500">
                {attendanceData?.summary?.late || 0}
              </p>
              <p className="text-gray-500 text-sm">Late</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Monthly Chart */}
          <div className="bg-white p-6 rounded-xl shadow h-[320px] flex flex-col">
            <h2 className="font-semibold text-lg mb-4">Monthly Attendance</h2>

            <div className="flex-1">
              {monthlyData.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar
                      dataKey="percentage"
                      fill="#2dd4bf"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400">No data</p>
              )}
            </div>
          </div>

          {/* Recent */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Recent Attendance</h2>

            {attendanceData?.history?.length ? (
              attendanceData.history.slice(0, 5).map((h, i) => (
                <div key={i} className="flex justify-between border-b pb-2">
                  <p>{h.date}</p>
                  <p
                    className={
                      h.status === "PRESENT" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {h.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No recent data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
