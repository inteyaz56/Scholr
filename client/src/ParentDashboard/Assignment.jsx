import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getClassAssignment, StudentById } from "../hooks/allHooks";

const Assignment = () => {
  const navigate = useNavigate();
  let { classId, studentId } = useParams();
  getClassAssignment(classId);
  StudentById(studentId);

  const { classAssignment = [] } = useSelector((state) => state.assignment);
  let { myData } = useSelector((state) => state.student);

  const isOverdue = (date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-blue-600 text-white flex items-center gap-4 px-5 h-[60px] shadow">
        <FaArrowLeft
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-semibold">Children Assignments</h1>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        {classAssignment.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No assignments found
          </p>
        )}

        {classAssignment?.map((a) => (
          <div
            key={a._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* TOP */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">{a.title}</h2>

              <span
                className={`text-sm px-3 py-1 rounded-full font-semibold
                ${
                  isOverdue(a.dueDate)
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }
                `}
              >
                {isOverdue(a.dueDate) ? "Overdue" : "Active"}
              </span>
            </div>

            {/* DETAILS */}
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Child name</p>
                <p className="font-medium">{myData?.userId?.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Subject</p>
                <p className="font-medium">{a?.subjectId?.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Teacher</p>
                <p className="font-medium">{a?.teacherId?.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Due Date</p>
                <p
                  className={`font-bold
                  ${isOverdue(a.dueDate) ? "text-red-600" : "text-blue-600"}`}
                >
                  {new Date(a.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignment;
