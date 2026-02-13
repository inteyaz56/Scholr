import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setSubject } from "../redux/subjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { setActive } from "../redux/userSlice";

const AddSubject = () => {
  let { classData } = useSelector((state) => state.class);
  let { subjects } = useSelector((state) => state.subject);

  let [name, setName] = useState("");
  let [code, setCode] = useState("");
  let [loading, setLoading] = useState(false);

  let [subjectId, setSubjectId] = useState("");
  let [classId, setClassId] = useState("");
  let [assignLoading, setAssignLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddSubject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/subject/create`,
        { name, code },
        { withCredentials: true },
      );

      setActive("Subject");
      dispatch(setSubject(result.data));
      toast.success("Subject added successfuly ");
      navigate("/");
    } catch (error) {

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignSubject = async (e) => {
    e.preventDefault();
    setAssignLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/class/subject/create`,
        { subjectId, classId },
        { withCredentials: true },
      );

      toast.success("Subject assigned successfully");
    } catch (error) {
      
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setAssignLoading(false); 
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-3 sm:px-6 lg:px-10 py-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Subject Management
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Create subjects and assign them to classes.
        </p>
      </div>

      {/* Main Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ✅ Add Subject */}
        <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Add Subject</h2>
            <p className="text-sm text-gray-500 mt-1">
              Create a new global subject (for all classes).
            </p>
          </div>

          <form onSubmit={handleAddSubject} className="flex flex-col gap-4">
            {/* Subject Name */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700" htmlFor="name">
                Subject Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mathematics"
                className="w-full h-[44px] rounded-xl outline-0 border border-gray-300 px-4 text-sm focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">
                Example: Math, English, Science
              </p>
            </div>

            {/* Subject Code */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700" htmlFor="code">
                Subject Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. MATH101"
                className="w-full h-[44px] rounded-xl outline-0 border border-gray-300 px-4 text-sm focus:border-blue-500"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full h-[46px] rounded-xl bg-blue-600 text-white cursor-pointer font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? <ClipLoader size={22} color="white" /> : "Add Subject"}
            </button>
          </form>
        </div>

        {/* ✅ Assign Subject to Class */}
        <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900">
              Assign Subject to Class
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select subject and class to connect them.
            </p>
          </div>

          <form onSubmit={handleAssignSubject} className="flex flex-col gap-4">
            {/* Select Subject */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">
                Select Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full h-[44px] rounded-xl outline-0 border border-gray-300 px-4 text-sm focus:border-blue-500 bg-white"
              >
                <option value="">Select Subject</option>
                {subjects?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name} {sub.code ? `(${sub.code})` : ""}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Choose a subject you already created.
              </p>
            </div>

            {/* Select Class */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">
                Select Class
              </label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full h-[44px] rounded-xl outline-0 border border-gray-300 px-4 text-sm focus:border-blue-500 bg-white"
              >
                <option value="">Select Class</option>
                {classData?.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} {cls.section}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Subject will be available for students of this class.
              </p>
            </div>

            {/* Button */}
            <button
              disabled={assignLoading}
              type="submit"
              className="w-full h-[46px] rounded-xl bg-green-600 text-white cursor-pointer font-semibold flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-60"
            >
              {assignLoading ? (
                <ClipLoader size={22} color="white" />
              ) : (
                "Assign Subject"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
