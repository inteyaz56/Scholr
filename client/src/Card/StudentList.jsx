import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const StudentList = ({
  students = [],
  page,
  totalPages,
  setPage,
  loading,
  limit,
  totalStudents,
}) => {
  const getVisiblePages = () => {
    let pages = [];
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 3);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="w-full bg-white border  border-gray-200 rounded-xl shadow-sm overflow-auto">
      {/* Header */}
      <div className="px-4 py-3 border-b  overflow-auto border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Students List</h2>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">
                Student Name
              </th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Class</th>
              <th className="px-4 py-3 text-left font-semibold">Roll</th>
              <th className="px-4 py-3 text-left font-semibold">Parent</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  Loading students...
                </td>
              </tr>
            ) : students?.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students?.map((stu, index) => (
                <tr
                  key={stu._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span className="font-semibold text-gray-900">
                        {stu?.userId?.name || "N/A"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Class: {stu?.classId?.name}-{stu?.classId?.section} |
                      Roll: {stu?.rollNumber || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Parent: {stu?.parentId?.userId?.name || "Not Linked"}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-blue-600 font-medium">
                    {stu?.userId?.email || "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    {stu?.classId?.name}-{stu?.classId?.section}
                  </td>

                  <td className="px-4 py-3">{stu?.rollNumber || "-"}</td>

                  <td className="px-4 py-3">
                    {stu?.parentId?.userId?.name || "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(stu._id)}
                        className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEdit(stu._id)}
                        className="px-3 py-1 rounded-md bg-green-600 text-white text-xs font-semibold hover:bg-green-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(stu._id)}
                        className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3 text-sm">
        <p className="text-gray-600">
          Showing page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span> (Total:{" "}
          <span className="font-semibold">{totalStudents}</span>)
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>

          {getVisiblePages().map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 border rounded-md ${
                p === page ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
