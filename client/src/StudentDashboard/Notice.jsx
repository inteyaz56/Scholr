import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { getAllNotices } from "../hooks/allHooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Notice() {
  const navigate = useNavigate();
  getAllNotices();
  let { notices } = useSelector((state) => state.notice);

  return (
    <div className=" lg:px-4 px-2 h-screen overflow-auto py-3 pb-2">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold">Notice Board</h1>
        <p className="text-gray-500 text-sm">Latest updates from school</p>
      </div>

      {/* NOTICE GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices?.map((n) => (
          <div
            key={n._id}
            className="bg-white rounded-xl shadow p-5 flex flex-col justify-between"
          >
            <div>
              {/* TITLE + BADGE */}
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{n?.title}</h2>
              </div>

              {/* DESC */}
              <p className="text-gray-600 text-sm mt-3">
                {n?.description?.slice(0, 100)}...
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-5">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaCalendarAlt />
                {new Date(n.createdAt).toLocaleDateString()}
              </div>

              <button
                onClick={() => {
                  navigate(`/view/details/${n._id}`);
                }}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notice;
