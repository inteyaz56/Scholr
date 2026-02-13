import React, { use } from "react";
import { getCurrentStudentData } from "../hooks/allHooks";
import { useSelector } from "react-redux";

function Profile() {
  getCurrentStudentData();
  let { studentData } = useSelector((state) => state.student);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold">
            {studentData?.userId?.name}
          </h2>

          <p className="text-gray-500">
            Class {studentData?.classId?.name}-{studentData?.classId?.section}
          </p>
        </div>

        {/* GRID */}
        <div className="grid w-full md:grid-cols-2 gap-6">
          {/* PERSONAL INFO */}

          {/* ACADEMIC INFO */}
          <div className="bg-white p-6 rounded-xl shadow space-y-2 md:col-span-2">
            <h3 className="font-semibold text-lg mb-3">Academic Info</h3>

            <p>Admission No: {studentData?.admissionNumber}</p>
            <p>Class Teacher: {studentData?.classId?.classTeacher?.name}</p>

            <p>
              Subjects: {studentData?.subjects?.map((s) => s.name).join(", ")}
            </p>
          </div>

          {/* PARENT INFO */}
          <div className="bg-white p-6 rounded-xl shadow space-y-2 md:col-span-2">
            <h3 className="font-semibold text-lg mb-3">Parent Info</h3>

            <p>Parent Name: {studentData?.parentId?.userId?.name}</p>
            <p>Email: {studentData?.parentId?.userId?.email}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <button className="bg-teal-500 text-white px-6 py-2 rounded-lg">
            Edit Profile
          </button>

          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
