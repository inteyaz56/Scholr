import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { setStudents } from "../redux/studentSlice";

const AddStudent = () => {
  let [searchQuery, setSearchQuery] = useState("");
  let { classData } = useSelector((state) => state.class);
  const dispatch = useDispatch();
  let [userId, setUserId] = useState("");
  let [parentId, setParentId] = useState("");
  let [classId, setClassId] = useState("");
  let [address, setAddress] = useState("");
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState();
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");

  const handleUserSeacrh = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/users/student/search`, {
        params: { query: user },
        withCredentials: true,
      });

    
      setUserId(result.data._id);
 
      toast.success("User found");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Not found enter correct email ",
      );
      
    }
  };

  const handelSearchParent = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/parent/search`, {
        params: { query: searchQuery },
        withCredentials: true,
      });

  

      setParentId(result.data._id);
    
      toast.success("Found ✅");
    } catch (error) {
     
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/students/create`,
        { userId, parentId, classId, address },
        { withCredentials: true },
      );

      dispatch(setStudents(result.data));
      toast.success("Student created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/students/admin/create`,
        {
          name,
          email,
          password,
          address,
          classId,
          parentId,
        },
        { withCredentials: true },
      );
      dispatch(setStudents(result.data));
    
      toast.success("Student added successfully ✅");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-3 py-6 sm:px-6 lg:px-10">
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add student using existing user or create a new student account.
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ✅ Left Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">
            Add existing user as student
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Search student user and parent, select class, then submit.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
            {/* Search user */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Search Student User (Email)
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Enter email to search user"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={handleUserSeacrh}
                  className="w-full sm:w-[120px] rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Search parent */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Search Parent (Email)
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  placeholder="Enter email to search parent"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={handelSearchParent}
                  className="w-full sm:w-[120px] rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Select class */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Select Class
              </label>

              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Choose Class</option>
                {classData?.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} {cls.section}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>

              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
                placeholder="Enter full address"
                className="min-h-[120px] w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              type="submit"
              className="flex h-[44px] w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? <ClipLoader size={24} color="white" /> : "Add Student"}
            </button>
          </form>
        </div>

        {/* ✅ Right Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">
            Create a new Student
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create new student user account and link parent + class.
          </p>

          <form
            onSubmit={handleAdminSubmit}
            className="mt-6 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Enter full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter email"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Create password"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Search Parent (Email)
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  placeholder="Enter email to search parent"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={handelSearchParent}
                  className="w-full sm:w-[120px] rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Select Class
              </label>

              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Choose Class</option>
                {classData?.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} {cls.section}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>

              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
                placeholder="Enter full address"
                className="min-h-[120px] w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="flex h-[44px] w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? <ClipLoader size={24} color="white" /> : "Add Student"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
