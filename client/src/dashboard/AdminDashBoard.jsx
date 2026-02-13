import React, { useState } from "react";
import SideBar from "../AdminComponents/SideBar";
import { CiSearch } from "react-icons/ci";
import { HiUsers } from "react-icons/hi2";
import { TiThMenu } from "react-icons/ti";
import { useSelector } from "react-redux";
import Dashboard from "../AdminComponents/Dashboard";
import Teachers from "../AdminComponents/Teachers";
import Parents from "../AdminComponents/Parents";
import Student from "../AdminComponents/Student";
import Classes from "../AdminComponents/Classes";
import Fees from "../AdminComponents/Fees";
import Attendance from "../AdminComponents/Attendacnce";
import Exam from "../AdminComponents/Exam";
import Notices from "../AdminComponents/Notices";
import Timetable from "../AdminComponents/Timetable";
import Subject from "../AdminComponents/Subject";
import getAllTeacher from "../hooks/getTeacher";
import getAllClasses from "../hooks/getClasses";

const AdminDashBoard = () => {
  getAllTeacher();
  getAllClasses();
  let [showMenu, setShowMenu] = useState(false);
  let { active } = useSelector((state) => state.user);

  return (
    <div className="w-[100%]  min-h-[100vh] flex flex-row  bg-white-500">
      <SideBar />

      {active === "Dashboard" ? (
        <Dashboard />
      ) : active === "Teachers" ? (
        <Teachers />
      ) : active === "Parents" ? (
        <Parents />
      ) : active === "Students" ? (
        <Student />
      ) : active === "Classes" ? (
        <Classes />
      ) : active === "Fees" ? (
        <Fees />
      ) : active === "Exams" ? (
        <Exam />
      ) : active === "Attendance" ? (
        <Attendance />
      ) : active === "Notices" ? (
        <Notices />
      ) : active === "Timetable" ? (
        <Timetable />
      ) : active === "Subject" ? (
        <Subject />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default AdminDashBoard;
