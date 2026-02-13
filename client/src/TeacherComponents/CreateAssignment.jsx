import React, {  useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getAllClasses from "../hooks/getClasses";
import { getClassSubject } from "../hooks/allHooks";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../main";
import { setTeacherAssignment } from "../redux/assignmentSlice";
function CreateAssignment() {
  const navigate = useNavigate();
  getAllClasses();
  const dispatch = useDispatch();
  let { classData } = useSelector((state) => state.class);
  let [classId, setClassId] = useState("");
  getClassSubject(classId);

  let { classSubjects } = useSelector((state) => state.subject);
  let [subjectId, setSubjectId] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [dueDate, setDueDate] = useState("");
  let [loading, setLoading] = useState(false);


  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/assignments/create`,
        {
          title,
          description,
          classId,
          subjectId,
          dueDate,
        },
        { withCredentials: true },
      );

      dispatch(setTeacherAssignment(result.data));
      toast.success("Assignment created successfully");
      navigate("/");
    } catch (error) {
  
      toast.error(error?.response?.data?.message || "Something went wrong !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-white shadow px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <FaArrowLeftLong size={22} />
        </button>

        <h2 className="text-lg font-semibold">Create Assignment</h2>
      </div>

      {/* FORM */}
      <div className="flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-2xl rounded-xl shadow p-6 space-y-5"
        >
          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter assignment title"
              className="w-full border h-11 px-3 rounded-lg mt-1"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter assignment description"
              className="w-full border px-3 py-2 rounded-lg mt-1 h-28"
              required
            />
          </div>

          {/* CLASS + SUBJECT */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Class</label>
              <select
                name="classId"
                value={classId}
                onChange={(e) => {
                  setClassId(e.target.value);
                }}
                className="w-full border h-11 px-3 rounded-lg mt-1"
                required
              >
                <option value="">Select Class</option>
                {classData?.map((cls) => (
                  <option value={cls._id}> {cls.name} </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <select
                name="subjectId"
                disabled={!classId}
                value={subjectId}
                onChange={(e) => {
                  setSubjectId(e.target.value);
                }}
                className="w-full border h-11 px-3 rounded-lg mt-1"
                required
              >
                <option value="">Select Subject</option>
                {classSubjects?.map((sub) => (
                  <option key={sub._id} value={sub.subjectId?._id}>
                    {sub.subjectId?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DUE DATE */}
          <div>
            <label className="text-sm font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
              className="w-full border h-11 px-3 rounded-lg mt-1"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              {loading ? "Creating..." : " Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAssignment;
