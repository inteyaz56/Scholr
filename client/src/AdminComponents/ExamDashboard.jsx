import React from "react";
import {
  getAllExams,
  getStudentResult,
  getStudentById,
} from "../hooks/allHooks";
import { useSelector } from "react-redux";

const ExamDashboard = () => {
  getAllExams();
  let { userData } = useSelector((state) => state.user);
  // getStudentResult();
  getStudentById(userData?._id);
  let { exams } = useSelector((state) => state.exam);
  let { studentData } = useSelector((state) => state.student);
  console.log(studentData);
  return (
    <div className=" p-4 10  md:p-8">
      {/* STATS IN ONE SECTION */}
      <div className=" rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-gray-500 text-sm">Total Exams</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {" "}
              {exams?.length || 5}
            </h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total Students</p>
            <h2 className="text-2xl font-bold text-red-500">120</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Ongoing Exams</p>
            <h2 className="text-2xl font-bold text-yellow-500">2</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Completed Exams</p>
            <h2 className="text-2xl font-bold text-green-600">3</h2>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE TABLE */}
        <div className="lg:col-span-2  rounded-xl shadow overflow-x-auto">
          <h3 className="font-semibold text-lg p-4 border-b">Ongoing Exams</h3>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">Exam Name</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {exams.map((e, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{e.name}</td>
                  <td className="p-3">{e?.classId?.name}</td>
                  <td className="p-3">
                    {new Date(e?.startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-3">
                    {new Date(e?.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                      {e?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* IMAGE */}

          {/* RECENT RESULTS */}
          <div className="bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg p-4 border-b">
              Recent Results
            </h3>

            <div className="divide-y text-sm">
              {[
                ["John Doe", "Mid-Term", 85],
                ["Jane Smith", "Mid-Term", 78],
                ["Rahul Kumar", "Spring", 92],
                ["Emily Johnson", "Mid-Term", 88],
                ["Michael Brown", "Mock", 74],
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between p-4 hover:bg-gray-50"
                >
                  <span>{r[0]}</span>
                  <span className="text-gray-500">
                    {r[1]} | <b>{r[2]}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;
