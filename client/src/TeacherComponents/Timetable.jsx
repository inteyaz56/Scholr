import React, { useState, useMemo, useEffect } from "react";
import { getTeacherTimeTable } from "../hooks/allHooks";
import { useSelector } from "react-redux";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

const subjectColors = {
  English: "bg-blue-100 text-blue-700",
  Grammar: "bg-green-100 text-green-700",
  Literature: "bg-purple-100 text-purple-700",
};

function Timetable() {
  const [activeDay, setActiveDay] = useState("MON");
  const [now, setNow] = useState(new Date());
  const [completed, setCompleted] = useState([]);
  let { userData } = useSelector((state) => state.user);
  getTeacherTimeTable(userData?._id);

  let { teacherTimetable } = useSelector((state) => state.timetable);

  const toMin = (t) => {
    if (!t) return 0;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const currentMin = now.getHours() * 60 + now.getMinutes();

  const todayData = useMemo(() => {
    if (!teacherTimetable) return [];

    return teacherTimetable
      .filter((t) => t.day === activeDay)
      .sort((a, b) => toMin(a.startTime) - toMin(b.startTime));
  }, [activeDay, teacherTimetable]);

  let currentClass = null;
  let nextClass = null;

  todayData.forEach((t) => {
    const start = toMin(t.startTime);
    const end = toMin(t.endTime);

    if (currentMin >= start && currentMin <= end) {
      currentClass = t;
    }
    if (start > currentMin && !nextClass) {
      nextClass = t;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-5">
        <h2 className="text-2xl font-bold mb-2">🧑‍🏫 My Schedule</h2>

        <div className="flex gap-2 overflow-x-auto mb-6">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium
              ${
                activeDay === d
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200"
              }
              `}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {todayData.map((t) => {
            const isCurrent = currentClass?.id === t.id;

            const done = completed.includes(t.id);

            return (
              <div
                key={t.id}
                className={`flex items-center gap-4 p-4 rounded-xl border
                ${isCurrent ? "bg-blue-50 border-blue-400 shadow" : ""}
                `}
              >
                <div className="w-24 text-sm font-semibold text-gray-600">
                  {t?.startTime}
                  <br />
                  {t?.endTime}
                </div>

                <div
                  className={`w-3 h-3 rounded-full
                  ${isCurrent ? "bg-blue-600 animate-pulse" : "bg-gray-400"}
                `}
                ></div>

                <div className="flex-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${subjectColors[t.subject] || "bg-gray-200"}
                  `}
                  >
                    {t?.subjectId?.name}
                  </span>

                  <p className="mt-2 font-medium">Class {t?.classId?.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        {todayData.length === 0 && (
          <p className="text-center text-gray-500 mt-10">🎉 No classes today</p>
        )}
      </div>
    </div>
  );
}

export default Timetable;
