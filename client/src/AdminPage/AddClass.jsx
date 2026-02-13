import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setClass } from "../redux/classSlice";

export default function AddClass() {
  let { teacherData } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();
  let [name, setName] = useState("");
  let [section, setSection] = useState("");
  const [status, setStatus] = useState("Active");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTeachers(teacherData || []);
  }, [teacherData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${serverUrl}/api/class/create`,
        {
          name,
          section,
          classTeacher: selectedTeacher, 
        },
        { withCredentials: true }
      );
      dispatch(setClass(result.data));
      toast.success("Class created ✅");
      navigate("/");
    } catch (error) {
     
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Admin / Classes / <span className="text-gray-800">Add Class</span>
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">Add Class</h1>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="addClassForm"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save Class
          </button>
        </div>
      </div>

      {/* Form */}
      <form
        id="addClassForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {/* Class Info */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Class Information
          </h2>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Class Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 10th"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Sections & Teacher */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Sections & Teacher
          </h2>

          {/* Sections */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Sections <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. A"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* ✅ Teacher Select */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Select Class Teacher
            </label>

            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="">-- Select Teacher --</option>

              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
