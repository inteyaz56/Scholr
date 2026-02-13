import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeacherAssignment } from "../hooks/allHooks";
import { useNavigate } from "react-router-dom";

function Assignment() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { userData } = useSelector((state) => state.user);
  const { teacherAssignment } = useSelector((state) => state.assignment);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData?._id) return;

    getTeacherAssignment(userData._id, page, dispatch);
  }, [userData, page]);

  const assignments = teacherAssignment?.data || [];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto gap-3 flex flex-col bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between">
          <h2 className="text-xl  font-semibold mb-6">My Assignments</h2>

          <button
            onClick={() => {
              navigate("/create/assignment");
            }}
            className="bg-blue-600 hidden lg:block h-[40px] text-white text-md font-semibold cursor-pointer rounded-lg flex items-center justify-center px-3 "
          >
            {" "}
            + Create assignment
          </button>

          <button
            onClick={() => {
              navigate("/create/assignment");
            }}
            className="bg-blue-600 lg:hidden  h-[40px] text-white text-md font-semibold cursor-pointer rounded-lg flex items-center justify-center px-3 "
          >
            {" "}
            + Create
          </button>
        </div>
        {/* TABLE */}
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Subject</th>
              <th className="p-3 border">Due Date</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td className="p-3 border">{a.title}</td>
                <td className="p-3 border">{a.classId?.name}</td>
                <td className="p-3 border">{a.subjectId?.name}</td>
                <td className="p-3 border">
                  {new Date(a.dueDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded"
          >
            Previous
          </button>

          <span>
            Page {teacherAssignment?.currentPage} of{" "}
            {teacherAssignment?.totalPages}
          </span>

          <button
            disabled={page === teacherAssignment?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assignment;
