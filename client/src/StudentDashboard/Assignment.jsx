import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Assignment() {
  let { userData } = useSelector((state) => state.user);
  let [pending, setPending] = useState(false);
  let [completed, setCompleted] = useState(false);
  let [assignments, setAssignments] = useState([]);
  let [all, setAll] = useState(true);
  let [studentData, setStudentData] = useState(null);
  let [pendingAssignments, setPendingAssignments] = useState([]);
  let [completedAssignments, setCompletedAssignments] = useState([]);
  let [studentAssignments, setStudentAssignments] = useState([]);
  let [tab, setTab] = useState("all");
  const navigate = useNavigate();

  const getStudent = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/students/get/student/${userData?._id}`,
        { withCredentials: true },
      );
      setStudentData(result.data);
    } catch (error) {
      return;
    }
  };

  const getAssignments = async () => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/assignments/getByClass`,
        { classId: studentData?.classId._id },
        { withCredentials: true },
      );

      setAssignments(result.data);
    } catch (error) {
      return;
    }
  };

  const getStudentAssignments = async () => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/submissions/get-student-submissions`,
        {},
        { withCredentials: true },
      );

      setStudentAssignments(result.data);
      setPendingAssignments(result.data.pending);
      setCompletedAssignments(result.data.completed);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getStudent();
  }, []);
  useEffect(() => {
    getAssignments();
  }, [studentData]);

  useEffect(() => {
    getStudentAssignments();
  }, []);

  return (
    <div className="  h-screen overflow-auto p-5 ">
      <div className="max-w-5xl mx-auto">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-6">Assignments</h1>

        {/* SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow flex justify-between">
            <span>Total</span>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg font-semibold">
              {pendingAssignments?.length + completedAssignments?.length || 0}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl shadow flex justify-between">
            <span>Pending</span>
            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-lg font-semibold">
              {pendingAssignments?.length || 0}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl shadow flex justify-between">
            <span>Completed</span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg font-semibold">
              {completedAssignments?.length || 0}
            </span>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              setAll(true);
              setTab("all");
              setCompleted(false);
              setPending(false);
            }}
            className={` text-black cursor-pointer  px-5 py-2 rounded-lg shadow ${
              tab === "all" ? "bg-blue-600 text-white" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setPending(true);
              setTab("pending");
              setAll(false);
              setCompleted(false);
            }}
            className={` cursor-pointer px-5 py-2 rounded-lg shadow ${
              tab === "pending" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => {
              setCompleted(true);
              setAll(false);
              setTab("completed");
              setPending(false);
            }}
            className={` cursor-pointer px-5 py-2 rounded-lg shadow ${
              tab === "completed" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Completed
          </button>
        </div>

        {/* ASSIGNMENT LIST */}
        {all && !pending && !completed && (
          <div className="space-y-4">
            {[
              ...(studentAssignments?.pending || []),
              ...(studentAssignments?.completed || []),
            ].map((a) => {
              const isCompleted = studentAssignments?.completed?.some(
                (c) => c._id === a._id,
              );

              return (
                <div
                  key={a._id}
                  className="bg-white p-4 md:p-6 rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                >
                  {/* LEFT */}
                  <div>
                    <h3 className="font-semibold text-lg">{a.title || "Hi"}</h3>

                    <p className="text-gray-500 text-sm">
                      {a.subjectId?.name || "No Subject"}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-sm">
                      {isCompleted ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                      <span className="text-gray-500">
                        Due Date: {""}
                        {new Date(a.dueDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col md:items-end gap-2">
                    {isCompleted ? (
                      <button className="bg-green-500  text-white px-5 py-2 rounded-lg cursor-default">
                        Submitted
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          navigate(`/submit-assignment/${a._id}`);
                          console.log(a._id);
                        }}
                        className="bg-teal-500 cursor-pointer hover:bg-teal-600 text-white px-5 py-2 rounded-lg"
                      >
                        Submit Assignment
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {pending && !all && !completed && (
          <div className="space-y-4">
            {pendingAssignments?.map((a) => (
              <div
                key={a.id}
                className="bg-white p-4 md:p-6 rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4"
              >
                {/* LEFT */}
                <div>
                  <h3 className="font-semibold text-lg">{a.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {a.subjectId?.name || "No Subject"}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex  flex-col md:items-end gap-2">
                  <button
                    onClick={() => navigate(`/submit-assignment/${a._id}`)}
                    className="bg-teal-500 cursor-pointer hover:bg-teal-600 text-white px-5 py-2 rounded-lg"
                  >
                    Submit Assignment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {completed && !all && !pending && (
          <div className="space-y-4">
            {completedAssignments?.map((a) => (
              <div
                key={a.id}
                className="bg-white p-4 md:p-6 rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4"
              >
                {/* LEFT */}
                <div>
                  <h3 className="font-semibold text-lg">{a.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {a.subjectId?.name || "No Subject"}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col md:items-end gap-2">
                  <button className="bg-green-500 text-white px-5 py-2 rounded-lg cursor-default">
                    Submitted
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignment;
