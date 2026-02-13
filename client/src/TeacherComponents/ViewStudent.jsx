import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewStudent = () => {
  const { classId, subjectId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  const fetchStudentsStatus = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/attendance/students/status`,
        { classId, subjectId, date: today },
        { withCredentials: true },
      );
  
      setStudents(res.data.students);
    } catch (error) {
    
      toast.error("Failed to load student attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsStatus();
  }, [classId]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-100 text-green-700";
      case "ABSENT":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow border p-4 sm:p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 border-b pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Class Students
            </h1>
            <p className="text-sm text-gray-500">Attendance status for today</p>
          </div>

          <div className="text-sm font-semibold bg-gray-100 px-4 py-2 rounded-xl w-fit">
            Date: {today}
          </div>
        </div>

        {/* Table header (desktop only) */}
        <div className="hidden sm:grid grid-cols-3 text-sm font-semibold text-gray-500 px-2">
          <span>Student Name</span>
          <span>Roll No</span>
          <span className="text-right">Status</span>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading students...</p>
        ) : (
          <div className="flex flex-col gap-3">
            {students.map((student) => (
              <div
                key={student._id}
                className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 bg-gray-50 border rounded-xl px-4 py-3"
              >
                {/* Name */}
                <div>
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-xs text-gray-500 sm:hidden">
                    Roll: {student.rollNumber || "-"}
                  </p>
                </div>

                {/* Roll */}
                <p className="hidden sm:block text-gray-600">
                  {student.rollNumber || "-"}
                </p>

                {/* Status */}
                <div className="flex sm:justify-end">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusStyle(
                      student.status,
                    )}`}
                  >
                    {student.status === "NOT_MARKED"
                      ? "Not Marked"
                      : student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStudent;
