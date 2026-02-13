import React from "react";

const AssignedTeacherCard = ({ item }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5 flex flex-col gap-3">
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            {item?.teacherId?.name || "Teacher Name"}
          </h2>
          <p className="text-sm text-gray-500">
            {item?.teacherId?.email || "teacher@email.com"}
          </p>
        </div>

        {/* Badge */}
        <span className="text-xs md:text-sm font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
          Assigned
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm md:text-base">
        <p className="text-gray-700">
          <span className="font-semibold">Class:</span>{" "}
          {item?.classId?.name || "10th A"}
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Subject:</span>{" "}
          {item?.subjectId?.name || "Mathematics"}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
        <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition font-semibold text-gray-800">
          Edit
        </button>

        <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold text-white">
          Remove
        </button>
      </div>
    </div>
  );
};

export default AssignedTeacherCard;
