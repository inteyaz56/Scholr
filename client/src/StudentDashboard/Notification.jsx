import React, { useState } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";

function Notification() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { notifications, unReadCount } = useSelector(
    (state) => state.notification,
  );

  return (
    <div className="relative">
      {/* 🔔 Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
      >
        <FaRegBell size={24} />

        {unReadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
            {unReadCount}
          </span>
        )}
      </button>

      {/* 📦 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border z-50">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h3 className="font-semibold text-lg">Notifications</h3>

            <button className="text-blue-600 text-sm hover:underline">
              Mark all read
            </button>
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="text-center py-6 text-gray-500">No notifications</p>
            )}

            {notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => {
                  navigate(n.link);
                  setOpen(false);
                }}
                className="flex gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b"
              >
                {/* unread dot */}
                {!n.isRead && (
                  <span className="w-2 h-2 bg-blue-600 mt-2 rounded-full"></span>
                )}

                <div className="flex-1">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-gray-600 truncate">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-3 border-t">
            <button
              onClick={() => navigate("/notifications")}
              className="text-blue-600 font-medium hover:underline"
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
