import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { toast } from "react-toastify";
import { TiThMenu } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import MobileSideBar from "../AdminComponents/MobileSidebar"; // ✅ add this
import { useSelector } from "react-redux";
import AdminAttendanceChart from "../AdminComponents/AdminAttendanceChart";

const Attendacnce = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const fetchAnalytics = async () => {
    if (!fromDate || !toDate) {
      toast.error("Please select both dates");
      return;
    }

    if (fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/attendance/analytics`,
        { fromDate, toDate },
        { withCredentials: true },
      );
      setData(res.data.analytics);
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-screen overflow-auto px-2 bg-white">
      {/* ✅ Proper width usage for large screens */}
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="w-full  px-4 h-[70px] bg-white shadow-md flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <TiThMenu
            color="blue"
            size={35}
            className="cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
          <h1 className="font-semibold text-xl text-black">
            Attendance Report
          </h1>
        </div>
      </div>
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Analyze class-wise attendance performance
          </p>
        </div>

        {/* FILTER CARD */}
        <div className="bg-white rounded-2xl shadow border p-6 flex flex-col lg:flex-row gap-6 items-end">
          <div className="flex flex-col w-full lg:w-auto">
            <label className="text-sm font-semibold text-gray-600">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              max={today}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col w-full lg:w-auto">
            <label className="text-sm font-semibold text-gray-600">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              max={today}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Get Report"}
          </button>
        </div>

        {/* CHART CARD */}
        {data.length > 0 && (
          <div className="bg-white rounded-2xl shadow border p-6">
            <AdminAttendanceChart data={data} />
          </div>
        )}

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow border p-6">
          <h2 className="text-lg font-semibold mb-4">Attendance Summary</h2>

          {loading ? (
            <p className="text-center py-10 text-gray-500">
              Fetching analytics...
            </p>
          ) : data.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              No data available for selected dates
            </p>
          ) : (
            <>
              {/* DESKTOP HEADER */}
              <div className="hidden lg:grid grid-cols-4 font-semibold text-gray-500 mb-2">
                <span>Class</span>
                <span>Subject</span>
                <span>Total Records</span>
                <span>Attendance %</span>
              </div>

              <div className="flex flex-col gap-3">
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className="
                      bg-gray-50 border rounded-xl p-4
                      flex flex-col gap-2
                      lg:grid lg:grid-cols-4
                    "
                  >
                    <p className="font-semibold">{item.className}</p>
                    <p>{item.subjectName}</p>
                    <p>{item.total}</p>
                    <p
                      className={`font-bold ${
                        item.percentage >= 75
                          ? "text-green-600"
                          : item.percentage >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.percentage}%
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendacnce;
