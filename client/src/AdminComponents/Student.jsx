import React, { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import MobileSideBar from "../AdminComponents/MobileSidebar";
import axios from "axios";
import { serverUrl } from "../main";
import StudentList from "../Card/StudentList";

const Student = () => {
  const navigate = useNavigate();

  const [totalStudents, setTotalStudents] = useState(0);
  let [students, setStudents] = useState([]);

  const [showMenu, setShowMenu] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);

      const res = await axios.get(`${serverUrl}/api/students/get-students`, {
        params: { page, limit },
        withCredentials: true,
      });

      setStudents(res.data.students);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 bg-white">
      {/* ✅ Mobile Sidebar */}
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />

      {/* Top Bar */}
      <div className="w-full lg:px-12 px-4 h-[70px] bg-gray-200 shadow-md flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <TiThMenu
            color="blue"
            size={35}
            className="cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
          <h1 className="font-semibold text-xl text-black">Students</h1>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search students"
            className="w-[250px] h-[40px] px-2 hidden lg:flex rounded-l-2xl outline-0 border-2 border-gray-400"
          />

          <button
            onClick={() => navigate("/add/student")}
            className="w-[150px] flex items-center justify-center gap-1 cursor-pointer text-white font-semibold h-[40px] bg-blue-600 lg:rounded-r-2xl rounded-2xl lg:rounded-l-none"
          >
            <IoMdAdd color="white" size={20} /> Add Student
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full px-4 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="h-[100px] bg-[#2b7ce7] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <HiUsers size={40} color="white" />
              <span className="text-2xl font-semibold text-white">
                {students?.length || 0}
              </span>
            </div>
            <h1 className="text-white font-semibold text-lg">Total Students</h1>
          </div>

          <div className="h-[100px] bg-[#91f83d] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <HiUsers size={40} color="white" />
              <span className="text-2xl font-semibold text-white">38</span>
            </div>
            <h1 className="text-white font-semibold text-lg">
              Active Students
            </h1>
          </div>

          <div className="h-[100px] bg-[#f63a37] cursor-pointer flex items-center justify-center flex-col rounded-xl shadow-lg">
            <div className="flex gap-2 items-center">
              <HiUsers size={40} color="white" />
              <span className="text-2xl font-semibold text-white">310+</span>
            </div>
            <h1 className="text-white font-semibold text-lg">
              Restricted Students
            </h1>
          </div>
        </div>
      </div>

      {/* ✅ Students List + Pagination */}
      <StudentList
        students={students}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        loading={loadingStudents}
        limit={limit}
        totalStudents={totalStudents}
      />
    </div>
  );
};

export default Student;
