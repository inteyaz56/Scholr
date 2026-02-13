import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { getAllExams, getAllSubjects } from "../hooks/allHooks";
import { useNavigate } from "react-router-dom";
import MobileSideBar from "../AdminComponents/MobileSidebar"; // ✅ add this
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ExamDashboard from "./ExamDashboard";

const Exam = () => {
  getAllExams();
  getAllSubjects();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-[100%] flex flex-col h-screen overflow-auto ">
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="w-full lg:px-12 px-4 h-[57px] bg-[#2f2faf] shadow-md flex items-center justify-between">
        <div className="flex  gap-4 items-center">
          <TiThMenu
            color="white"
            size={30}
            className="cursor-pointer block lg:hidden "
            onClick={() => setShowMenu(true)}
          />
          <h1 className="font-semibold hidden lg:block text-xl text-white">
            Exam
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate("/add/exam");
            }}
            className="lg:w-[200px] w-[100px] h-[40px] bg-white rounded-lg shadow-lg text-black font-semibold cursor-pointer "
          >
            {" "}
            + Add Exam
          </button>

          <button
            onClick={() => {
              navigate("/add/subject/to-exam");
            }}
            className="lg:w-[200px] w-[120px] h-[40px] bg-white rounded-lg shadow-lg text-black font-semibold cursor-pointer "
          >
            Add Subject
          </button>
        </div>
      </div>
      <ExamDashboard />
    </div>
  );
};

export default Exam;
