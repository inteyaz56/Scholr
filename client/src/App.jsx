import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import getCurrentUser from "./hooks/getUser";

import AddClass from "./AdminPage/AddClass";
import AddParent from "./AdminPage/AddParent";
import AddStudent from "./AdminPage/AddStudent";
import AddSubject from "./AdminPage/AddSubject";
import AssignTeacher from "./AdminPage/AssignTeacher";
import TakeAttendance from "./TeacherComponents/TakeAttendance";
import ViewStudent from "./TeacherComponents/ViewStudent";
import AttendanceHistory from "./TeacherComponents/AttendacneHistory";
import AttendancePercentage from "./TeacherComponents/AttendancePercentage";
import SubmitAssignment from "./StudentDashboard/SubmitAssignment";
import AddExam from "./AdminPage/AddExam";
import AddExamSubject from "./AdminPage/AddExamSubject";
import CreateAssignment from "./TeacherComponents/CreateAssignment";
import AddNotice from "./AdminPage/AddNotice";
import ViewDetails from "./StudentComponents/ViewDetails";
import AssignmentView from "./StudentDashboard/AssignmentView";
import AddFees from "./AdminPage/AddFees";
import AddTimetable from "./AdminPage/AddTimetable";
import Assignment from "./ParentDashboard/Assignment";
import Attendance from "./ParentDashboard/Attendance";

const App = () => {
  getCurrentUser();

  const { userData } = useSelector((state) => state.user);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!userData ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/add/class"
          element={
            userData && userData?.role === "ADMIN" ? (
              <AddClass />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add/parent"
          element={
            userData && userData.role === "ADMIN" ? (
              <AddParent />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add/student"
          element={
            userData && userData.role === "ADMIN" ? (
              <AddStudent />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add/subject"
          element={
            userData && userData.role === "ADMIN" ? (
              <AddSubject />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/assign/teacher"
          element={
            userData && userData.role === "ADMIN" ? (
              <AssignTeacher />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/attendance/:classId/subject/:subjectId"
          element={
            userData && userData.role === "TEACHER" ? (
              <TakeAttendance />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/students/:classId/subject/:subjectId"
          element={
            userData && userData.role === "TEACHER" ? (
              <ViewStudent />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/attendance/history/:classId/subject/:subjectId"
          element={
            userData &&
            (userData.role === "TEACHER" || userData.role === "ADMIN") ? (
              <AttendanceHistory />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/attendance/precentage/:classId/subject/:subjectId"
          element={
            userData &&
            (userData.role === "TEACHER" || userData.role === "ADMIN") ? (
              <AttendancePercentage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/submit-assignment/:assignmentId"
          element={
            userData && userData.role === "STUDENT" ? (
              <SubmitAssignment />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add/exam"
          element={
            userData && userData.role === "ADMIN" ? (
              <AddExam />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add/subject/to-exam"
          element={
            userData && userData.role === "ADMIN" ? (
              <AddExamSubject />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/create/assignment"
          element={
            userData && userData?.role === "TEACHER" ? (
              <CreateAssignment />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add/notice"
          element={
            userData === null ? (
              <div>Loading...</div>
            ) : userData &&
              (userData.role === "ADMIN" || userData.role === "TEACHER") ? (
              <AddNotice />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/view/details/:id"
          element={userData ? <ViewDetails /> : <Navigate to="/" />}
        />

        <Route
          path="/assignments/view/:assignmentId"
          element={userData ? <AssignmentView /> : <Navigate to="/" />}
        />

        <Route
          path="/add/fees"
          element={
            userData && userData.role === "ADMIN" ? (
              <AddFees />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add/timetable"
          element={
            userData && userData?.role === "ADMIN" ? (
              <AddTimetable />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/child/assignment/:classId/:studentId"
          element={
            userData && userData?.role === "PARENT" ? (
              <Assignment />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/child/attendance/:classId"
          element={
            userData && userData?.role === "PARENT" ? (
              <Attendance />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
