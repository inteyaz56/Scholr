import React, { useState } from "react";
import { TiThMenu, TiArrowLeft } from "react-icons/ti";
import MobileSideBar from "../AdminComponents/MobileSidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { setExam } from "../redux/examSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddExam = () => {
  const [showMenu, setShowMenu] = useState(false);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let { classData } = useSelector((state) => state.class);

  let [classId, setClassId] = useState("");
  let [academicYear, setAcademicYear] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/exams/create`,
        { name, classId, academicYear, startDate, endDate },
        { withCredentials: true },
      );

      toast.success("Exam created successfully");
      dispatch(setExam(result.data));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
  
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Sidebar */}
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />

      {/* Top Bar */}
      <div className="w-full lg:px-12 px-4 h-[57px] bg-[#2f2faf] shadow-md flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <TiArrowLeft
            onClick={() => {
              navigate(-1);
            }}
            color="white"
            size={30}
            className="cursor-pointer "
          />

          <TiThMenu
            color="white"
            size={22}
            className="cursor-pointer blcok lg:hidden "
            onClick={() => setShowMenu(true)}
          />

          <h1 className="font-semibold text-xl text-white">Exam</h1>
        </div>
      </div>

      {/* Centered Form Section */}
      <div className="flex-1 w-full flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col gap-4 px-6 py-8 bg-white shadow-xl rounded-xl"
        >
          {/* Exam Name */}
          <div className="flex flex-col gap-2">
            <label>Exam name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter exam name"
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
            />
          </div>

          {/* Class */}
          <div className="flex flex-col gap-2">
            <label>Select Class</label>
            <select
              onChange={(e) => setClassId(e.target.value)}
              value={classId}
              className="w-full border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
            >
              <option value="">Select Class</option>
              {classData?.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year */}
          <div className="flex flex-col gap-2">
            <label>Academic Year</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="Academic year"
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-2">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-2">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full h-[45px] bg-blue-600 rounded-lg cursor-pointer text-white flex items-center justify-center font-semibold"
          >
            {loading ? "Creating..." : "Create Exam"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExam;
