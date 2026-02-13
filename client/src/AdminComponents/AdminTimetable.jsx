import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTimeTable } from "../hooks/allHooks";

function AdminTimetable() {
  const dispatch = useDispatch();
  getAllTimeTable(dispatch);

  let { timetables } = useSelector((state) => state.timetable);

  return (
    <div className="">
      {/* NAVBAR */}

      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* CREATE CARD */}

        {/* TIMETABLE VIEW */}

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Weekly Timetable</h3>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Class</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Day</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {timetables?.map((t, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3">{t?.classId || "No class"}</td>
                    <td>{t?.subject || "No name"}</td>
                    <td>{t?.teacher || "No teacher"}</td>
                    <td>{t?.day || "No day"}</td>
                    <td>
                      {t?.startTime} - {t?.endTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="md:hidden space-y-3">
            {timetables?.map((t, i) => (
              <div key={i} className="border rounded-lg p-3 shadow-sm">
                <p className="font-semibold">{t?.subject}</p>
                <p className="text-sm text-gray-600">Class: {t?.classId}</p>
                <p className="text-sm">{t?.teacher}</p>
                <p className="text-sm text-blue-600">
                  {t?.day} | {t?.startTime}-{t?.endTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTimetable;
