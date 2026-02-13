import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllSubjects } from "../hooks/allHooks";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../main";
import { useNavigate } from "react-router-dom";

const AssignTeacher = () => {
  getAllSubjects();

  const { teacherData } = useSelector((state) => state.teacher);
  const { classData } = useSelector((state) => state.class);
  const { subjects } = useSelector((state) => state.subject);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [teacherId, setTeacherId] = useState("");
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const handleAssign = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/teacher/assign/subject`,
        {
          teacherId,
          classId,
          subjectId,
        },
        { withCredentials: true },
      );

      toast.success("Assignmet assign successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-3 py-10 flex justify-center items-start">
      <div className="w-full max-w-3xl">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Assign Teacher to Class
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Select teacher, class and subject to create an assignment.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8">
          <form onSubmit={handleAssign} className="flex flex-col gap-5">
            {/* Teacher */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700 text-lg">
                Select Teacher
              </label>
              <select
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="w-full h-[48px] rounded-xl border border-gray-200 px-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Teacher</option>
                {teacherData?.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700 text-lg">
                Select Class
              </label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full h-[48px] rounded-xl border border-gray-200 px-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Class</option>
                {classData?.map((classs) => (
                  <option key={classs._id} value={classs._id}>
                    {classs.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700 text-lg">
                Select Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full h-[48px] rounded-xl border border-gray-200 px-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Subject</option>
                {subjects?.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-[220px] h-[48px] bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl shadow-md mt-2"
            >
              {loading ? (
                <ClipLoader color="white" size={30} />
              ) : (
                "   Assign Teacher"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignTeacher;
