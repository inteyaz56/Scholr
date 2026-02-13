import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { getMyNotices } from "../hooks/allHooks";

import { useSelector } from "react-redux";

function Notices() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  getMyNotices();

  let { myNotice } = useSelector((state) => state.notice);

  return (
    <div className="w-[100%] flex flex-col gap-4">
      <div className="w-full lg:px-12 px-4 h-[57px] bg-[#2f2faf] shadow-md flex items-center justify-between">
        <div className="flex  gap-4 items-center">
          <TiThMenu
            color="white"
            size={30}
            className="cursor-pointer block lg:hidden "
            onClick={() => setShowMenu(true)}
          />
          <h1 className="font-semibold hidden lg:block text-xl text-white">
            Notice
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate("/add/notice/teacher");
            }}
            className="lg:w-[200px] w-[150px] h-[40px] bg-white rounded-lg shadow-lg text-black font-semibold cursor-pointer "
          >
            {" "}
            + Add Notice
          </button>
        </div>
      </div>

      {/* NOTICE GRID */}
      <div className="w-[100%] px-4 lg:flex-row flex flex-wrap justify-between flex-col gap-6">
        {!myNotice && <h1>Loading...</h1>}
        {myNotice?.map((notice) => (
          <div
            key={notice._id}
            className="bg-white rounded-xl shadow p-2 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{notice.title}</h2>

              <p className="text-gray-600 mt-2 text-sm">{notice.description}</p>

              <p className="text-sm mt-3">
                <span className="font-medium">Target:</span>{" "}
                {notice?.classId?.name
                  ? `Class: ${notice.classId.name}`
                  : "All"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(notice.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-1 border rounded text-sm hover:bg-gray-100">
                Edit
              </button>

              <button className="px-4 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notices;
