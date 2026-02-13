import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AttendancePercentage = () => {
  const { classId, subjectId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPercentage = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/attendance/precentage`,
        { classId, subjectId },
        { withCredentials: true },
      );

      setStudents(res.data.students);
    } catch (error) {
      toast.error("Failed to load attendance percentage");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPercentage();
  }, [classId, subjectId]);

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow border p-4 sm:p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Attendance Percentage
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overall attendance summary
          </p>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-5 text-sm font-semibold text-gray-500 px-2">
          <span>Student</span>
          <span>Roll No</span>
          <span>Present</span>
          <span>Absent</span> {/* ✅ */}
          <span>Total</span>
          <span>%</span>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">
            Loading attendance...
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {students.map((s) => (
              <div
                key={s._id}
                className="
                  bg-gray-50 border rounded-xl px-4 py-3
                  flex flex-col gap-2
                  sm:grid sm:grid-cols-5 sm:gap-3
                "
              >
                {/* Name */}
                <div>
                  <p className="font-semibold text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-500 sm:hidden">
                    Roll: {s.rollNumber || "-"}
                  </p>
                </div>

                {/* Roll */}
                <p className="hidden sm:block text-gray-600">
                  {s.rollNumber || "-"}
                </p>

                {/* Present */}
                <p className="text-green-600 font-semibold">{s.present}</p>
   <p className="text-red-600 font-semibold">{s.absent}</p>
                {/* Total */}
                <p className="text-gray-700 font-semibold">{s.total}</p>

                {/* Percentage */}
                <p
                  className={`font-bold ${
                    s.percentage >= 75
                      ? "text-green-600"
                      : s.percentage >= 60
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {s.percentage}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePercentage;
