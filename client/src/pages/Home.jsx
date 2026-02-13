import React from "react";
import { useSelector } from "react-redux";
import AdminDashBoard from "../dashboard/AdminDashBoard";
import TeacherDashBoard from "../dashboard/TeacherDashBoard";
import StudentDashBoard from "../dashboard/StudentDashBoard";
import ParentDashBoard from "../dashboard/ParentDashBoard";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-[100vh]  ">
      {userData?.role === "ADMIN" ? (
        <AdminDashBoard />
      ) : userData?.role === "TEACHER" ? (
        <TeacherDashBoard />
      ) : userData?.role === "STUDENT" ? (
        <StudentDashBoard />
      ) : userData?.role === "PARENT" ? (
        <ParentDashBoard />
      ) : (
        <h2>No Dashboard Found</h2>
      )}
    </div>
  );
};

export default Home;
