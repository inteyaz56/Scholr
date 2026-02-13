import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import { serverUrl } from "../main";

const Result = () => {
  const subjects = [
    { name: "Mathematics", marks: 95, total: 100 },
    { name: "Science", marks: 88, total: 100 },
    { name: "English", marks: 90, total: 100 },
    { name: "History", marks: 85, total: 100 },
  ];

  let { userData } = useSelector((state) => state.user);
  let [studentData, setStudentData] = useState(null);
  let [resultData, setResultData] = useState(null);

  useEffect(() => {
    const getStudent = async () => {
      try {
        let result = await axios.get(
          `${serverUrl}/api/students/get/student/${userData?._id}`,
          { withCredentials: true },
        );

        setStudentData(result.data);
      } catch (error) {
        return;
      }
    };
    getStudent();
  }, []);

  useEffect(() => {
    if (!studentData?._id) return;

    const getResult = async () => {
      try {
        let result = await axios.post(
          `${serverUrl}/api/result/get-result`,
          {
            studentId: studentData._id,
          },
          { withCredentials: true },
        );

        setResultData(result.data);
      } catch (error) {
        return;
      }
    };

    getResult();
  }, [studentData]); 

  const totalMarks = subjects.reduce((a, s) => a + s.marks, 0);
  const maxMarks = subjects.reduce((a, s) => a + s.total, 0);
  const percentage = Math.round((totalMarks / maxMarks) * 100);

  const getGrade = (p) => {
    if (p >= 90) return "A+";
    if (p >= 80) return "A";
    if (p >= 70) return "B";
    if (p >= 60) return "C";
    return "D";
  };

  const grade = getGrade(percentage);

  return (
    <div className=" p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-teal-600 text-white px-6 py-4 text-lg font-semibold">
            {resultData?.[0]?.examId?.name ?? "MID-TERM EXAM"}
          </div>

          <div className="p-6 space-y-3 text-gray-700">
            <p className="flex justify-between">
              <span>Total Marks:</span>
              <span className="font-semibold">
                {totalMarks} / {maxMarks}
              </span>
            </p>

            <p className="flex justify-between">
              <span>Percentage:</span>
              <span className="font-semibold">{percentage}%</span>
            </p>

            <p className="flex justify-between">
              <span>Grade:</span>
              <span className="font-semibold">{grade}</span>
            </p>

            <div className="pt-4">
              <span className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Status: PASS
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT TABLE */}
        <div className="bg-white rounded-xl shadow md:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Subject Wise Marks</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm">
                  <th className="p-3">Subject</th>
                  <th className="p-3">Marks</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {resultData?.map((result) =>
                  result.subjects?.map((s, i) => (
                    <tr key={i} className="border-b last:border-none text-sm">
                      <td className="p-3">{s.subjectId?.name}</td>

                      <td className="p-3 font-medium">
                        {s.obtainedMarks} / {s.maxMarks}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded text-xs text-white ${
                            s.obtainedMarks >= s.passingMarks
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {s.obtainedMarks >= s.passingMarks ? "Pass" : "Fail"}
                        </span>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
