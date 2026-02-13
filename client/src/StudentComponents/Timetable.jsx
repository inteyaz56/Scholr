import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { serverUrl } from "../main";
import { getClassTimeTable } from "../hooks/allHooks";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

const subjectColors = {
  English: "bg-blue-100 text-blue-700",
  Hindi: "bg-green-100 text-green-700",
  Maths: "bg-purple-100 text-purple-700",
  Physics: "bg-red-100 text-red-700",
  Chemistry: "bg-yellow-100 text-yellow-700",
};

function Timetable() {
  const [activeDay, setActiveDay] = useState("MON");
  const { userData } = useSelector((state) => state.user);
  const { clasTimeTable } = useSelector((state) => state.timetable);
  const [studentData, setStudentData] = useState(null);

 

  const fetchStudent = async () => {
    const res = await axios.get(
      `${serverUrl}/api/students/get/student/${userData?._id}`,
      { withCredentials: true },
    );
    setStudentData(res.data);
  };

  useEffect(() => {
    fetchStudent();
  });

  getClassTimeTable(studentData?.classId?._id);

  useEffect(() => {
    const todayIndex = new Date().getDay();
    if (todayIndex >= 1 && todayIndex <= 6) {
      setActiveDay(days[todayIndex - 1]);
    }
  }, []);


  const filtered = useMemo(() => {
    return clasTimeTable
      ?.filter((t) => t.day === activeDay)
      ?.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [clasTimeTable, activeDay]);

  return (
    <div className="h-screen p-2  lg:p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-5">
        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-4">📅 Weekly Timetable</h2>

        {/* DAY TABS */}
        <div className="flex gap-2 py-2 overflow-x-auto mb-6">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium
                ${
                  activeDay === day
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200"
                }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* TIMELINE */}
        <div className="space-y-4">
          {filtered?.map((item) => {
            const color =
              subjectColors[item.subjectId?.name] ||
              "bg-gray-100 text-gray-700";

            return (
              <div
                key={item._id}
                className="flex items-center gap-4 p-4 rounded-xl
                border hover:shadow-md transition"
              >
                {/* TIME */}
                <div className="text-sm font-semibold text-gray-600 w-28">
                  {item.startTime}
                  <br />
                  {item.endTime}
                </div>

                {/* DOT */}
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>

                {/* CONTENT */}
                <div className="flex-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
                  >
                    {item.subjectId?.name}
                  </span>

                  <p className="mt-2 font-medium">{item.teacherId?.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY */}
        {filtered?.length === 0 && (
          <p className="text-center text-gray-500 mt-10">🎉 No classes today</p>
        )}
      </div>
    </div>
  );
}

export default Timetable;
