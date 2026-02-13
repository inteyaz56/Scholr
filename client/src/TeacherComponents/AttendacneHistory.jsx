import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AttendanceHistory = () => {
  const { classId, subjectId } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/attendance/history`,
        { classId, subjectId },
        { withCredentials: true },
      );

      setHistory(res.data.history);
    } catch (error) {
      toast.error("Failed to load attendance history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [classId, subjectId]);

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow border p-4 sm:p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Attendance History
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View past attendance records
          </p>
        </div>

        {/* Desktop header */}
        <div className="hidden sm:grid grid-cols-4 text-sm font-semibold text-gray-500 px-2">
          <span>Date</span>
          <span>Present</span>
          <span>Absent</span>
          <span>Total</span>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No attendance records found
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map((item) => (
              <div
                key={item._id}
                className="
        bg-gray-50 border rounded-xl px-4 py-3
        flex flex-col gap-2
        sm:grid sm:grid-cols-4 sm:gap-3
      "
              >
                {/* Date */}
                <div>
                  <p className="text-xs text-gray-500 sm:hidden">Date</p>
                  <p className="font-semibold text-gray-800">{item.date}</p>
                </div>

                {/* Present */}
                <div>
                  <p className="text-xs text-gray-500 sm:hidden">Present</p>
                  <p className="text-green-600 font-semibold">{item.present}</p>
                </div>

                {/* Absent */}
                <div>
                  <p className="text-xs text-gray-500 sm:hidden">Absent</p>
                  <p className="text-red-600 font-semibold">{item.absent}</p>
                </div>

                {/* Total */}
                <div>
                  <p className="text-xs text-gray-500 sm:hidden">Total</p>
                  <p className="text-gray-700 font-semibold">{item.total}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;
