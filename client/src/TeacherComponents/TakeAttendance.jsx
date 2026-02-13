import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const TakeAttendance = () => {
  const { classId, subjectId } = useParams();
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const fetchStudents = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/attendance/student/by-class`,
        { classId },
        { withCredentials: true },
      );

      setStudents(res.data.students);

      setRecords(
        res.data.students.map((s) => ({
          studentId: s._id,
          status: "PRESENT",
        })),
      );
    } catch (error) {
      toast.error("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classId]);

  const toggleStatus = (studentId) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.studentId === studentId
          ? {
              ...r,
              status: r.status === "PRESENT" ? "ABSENT" : "PRESENT",
            }
          : r,
      ),
    );
  };

  const saveAttendance = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${serverUrl}/api/attendance/create`,
        {
          classId,
          subjectId,
          date: today,
          records,
        },
        { withCredentials: true },
      );

      toast.success("Attendance saved successfully ✅");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Attendance failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-3 py-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border p-4 sm:p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Take Attendance
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Mark students present or absent for today
            </p>
          </div>

          <div className="text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-xl w-fit">
            Date: {today}
          </div>
        </div>

        {/* Table header (Desktop only) */}
        <div className="hidden sm:grid grid-cols-3 text-sm font-semibold text-gray-500 px-2">
          <span>Student</span>
          <span>Roll No</span>
          <span className="text-right">Status</span>
        </div>

        {/* Student List */}
        <div className="flex flex-col gap-3">
          {students.map((student) => {
            const record = records.find((r) => r.studentId === student._id);

            return (
              <div
                key={student._id}
                className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 bg-gray-50 border rounded-xl px-4 py-3"
              >
                {/* Student Name */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {student.userId?.name}
                  </p>
                  <p className="text-xs text-gray-500 sm:hidden">
                    Roll: {student.rollNumber || "-"}
                  </p>
                </div>

                {/* Roll Number (desktop) */}
                <p className="hidden sm:block text-gray-600">
                  {student.rollNumber || "-"}
                </p>

                {/* Status Button */}
                <div className="flex sm:justify-end">
                  <button
                    onClick={() => toggleStatus(student._id)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                      record?.status === "PRESENT"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {record?.status}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t flex justify-end">
          <button
            onClick={saveAttendance}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow disabled:opacity-50"
          >
            {loading ? "Saving Attendance..." : "Save Attendance"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance;
