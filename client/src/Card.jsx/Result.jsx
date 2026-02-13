import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { toast } from "react-toastify";
import {
  getClassExam,
  studentByClass,
  getExamSubject,
} from "../hooks/allHooks";

function Result() {
  const [classId, setClassId] = useState("");
  const [examId, setExamId] = useState("");
  const [marks, setMarks] = useState({});

  const { myClass } = useSelector((state) => state.class);
  const { classExam, examSubject } = useSelector((state) => state.exam);
  const { classStudent } = useSelector((state) => state.student);

  getClassExam(classId);
  studentByClass(classId);
  getExamSubject(examId);

  const handleMarkChange = (studentId, subjectId, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectId]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      if (!examId) {
        toast.error("Select exam first");
        return;
      }

      if (!classStudent?.length) {
        toast.error("No students found");
        return;
      }

      const results = classStudent.map((stu) => ({
        studentId: stu._id,
        subjects: examSubject.map((sub) => ({
          subjectId: sub.subjectId._id,
          obtainedMarks: Number(marks?.[stu._id]?.[sub.subjectId._id] || 0),
        })),
      }));

      const res = await axios.post(
        `${serverUrl}/api/result/bulk-result`,
        { examId, results },
        { withCredentials: true },
      );

      toast.success("Results saved successfully ✅");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save results");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Marks Entry</h1>

        {/* SELECTS */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* CLASS */}
          <div>
            <label className="text-sm text-gray-600">Select Class</label>

            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full border rounded-lg h-11 px-3"
            >
              <option value="">Select</option>
              {myClass?.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* EXAM */}
          <div>
            <label className="text-sm text-gray-600">Select Exam</label>

            <select
              disabled={!classId}
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              className="w-full border rounded-lg h-11 px-3"
            >
              <option value="">Select</option>
              {classExam?.map((exm) => (
                <option key={exm._id} value={exm._id}>
                  {exm.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Student</th>

                {examSubject?.map((sub) => (
                  <th key={sub._id} className="p-3 border">
                    {sub.subjectId?.name} ({sub.maxMarks})
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {classStudent?.map((stu) => (
                <tr key={stu._id}>
                  <td className="p-3 border font-medium">{stu.userId?.name}</td>

                  {examSubject?.map((sub) => (
                    <td key={sub.subjectId._id} className="p-2 border">
                      <input
                        type="number"
                        min="0"
                        max={sub.maxMarks}
                        value={marks?.[stu._id]?.[sub.subjectId._id] || ""}
                        onChange={(e) =>
                          handleMarkChange(
                            stu._id,
                            sub.subjectId._id,
                            e.target.value,
                          )
                        }
                        className="w-full border rounded-md h-10 px-2"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Save Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
