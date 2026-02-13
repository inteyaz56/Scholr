import React, { useState, useEffect } from "react";
import SideBar from "../StudentComponents/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { IoIosMenu } from "react-icons/io";
import MobileSideBar from "../StudentComponents/MobileSideBar";
import Dashboard from "../StudentDashboard/Dashboard";
import Profile from "../StudentDashboard/Profile";
import Assignment from "../StudentDashboard/Assignment";
import Attendance from "../StudentDashboard/Attendance";
import Result from "../StudentDashboard/Result";
import Notice from "../StudentDashboard/Notice";
import { FaRegBell } from "react-icons/fa";
import { getAllNotification } from "../hooks/allHooks";
import { setActive } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { toast } from "react-toastify";
import { socket } from "../socket/socket";
import { addNotification } from "../redux/notificationSlice";
import Timetable from "../StudentComponents/Timetable";

const StudentDashBoard = () => {
  getAllNotification();

  const navigate = useNavigate();

  let { userData, active } = useSelector((state) => state.user);
  let { notifications, unReadCount } = useSelector(
    (state) => state.notification,
  );

  let [showMenu, setShowMenu] = useState(false);
  let [openDrop, setOpenDrop] = useState(false);

  let dispatch = useDispatch();

  const MarkAsRead = async (id) => {
    try {
      await axios.get(`${serverUrl}/api/notifications/read/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const markAllasRead = async () => {
    try {
      await axios.get(`${serverUrl}/api/notifications/all/read`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("newNotification", (data) => {
      console.log("New notification:", data);

      dispatch(addNotification(data));
    });

    return () => socket.off("newNotification");
  }, []);
  return (
    <div className="flex flex-col bg-gray-200 lg:flex-row">
      <SideBar />
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />

      <div className="w-[100%] lg:w-[80%] py-2 flex flex-col h-screen overflow-auto">
        {/* TOP BAR */}
        <div className="bg-gray-200 px-4 shadow-lg h-[52px] flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <IoIosMenu
              size={25}
              onClick={() => setShowMenu(true)}
              className="lg:hidden cursor-pointer text-gray-700"
            />

            <h1 className="hidden lg:block text-gray-700">Welcome,</h1>
            <h1 className="font-semibold">{userData?.name}</h1>
          </div>

          {/* 🔔 Bell Section */}
          <div className="relative">
            <button
              onClick={() => setOpenDrop(!openDrop)}
              className="cursor-pointer relative"
            >
              <FaRegBell size={24} />

              {unReadCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unReadCount}
                </span>
              )}
            </button>

            {/* 📦 Dropdown */}
            {openDrop && (
              <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border z-50">
                {/* Header */}
                <div className="flex justify-between px-4 py-3 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  {unReadCount > 0 && (
                    <button onClick={markAllasRead} className="cursor-pointer ">
                      Mark all as read{" "}
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications?.length === 0 && (
                    <p className="text-center py-6 text-gray-500">
                      No notifications
                    </p>
                  )}

                  {notifications?.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => {
                        MarkAsRead(n._id);
                        navigate(n.link);
                        setOpenDrop(false);
                      }}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b flex gap-2"
                    >
                      {!n.isRead && (
                        <span className="w-2 h-2 bg-blue-600 mt-2 rounded-full"></span>
                      )}

                      <div>
                        <p className="font-medium">{n.title}</p>
                        <p className="text-sm text-gray-600 truncate">
                          {n.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PAGES */}
        {active === "Dashboard" ? (
          <Dashboard />
        ) : active === "Profile" ? (
          <Profile />
        ) : active === "Assignment" ? (
          <Assignment />
        ) : active === "Attendance" ? (
          <Attendance />
        ) : active === "Notice" ? (
          <Notice />
        ) : active === "Result" ? (
          <Result />
        ) : active === "Timetable" ? (
          <Timetable />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
};

export default StudentDashBoard;
