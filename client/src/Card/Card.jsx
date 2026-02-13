import React from "react";

const Card = ({ name, code }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 hover:bg-gray-50 transition px-4 py-4">
      {/* ✅ Mobile Layout */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-900">
              {name || "Math"}
            </p>
            <p className="text-xs text-gray-500">{code || "MATH101"}</p>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition text-sm font-medium">
              ✏️
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition text-sm font-medium">
              🗑️
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Desktop Layout (Table Row Style) */}
      <div className="hidden sm:grid grid-cols-12 items-center">
        {/* Subject Name */}
        <div className="col-span-6">
          <p className="text-sm font-semibold text-gray-900">
            {name || "Math"}
          </p>
        </div>

        {/* Code */}
        <div className="col-span-3">
          <p className="text-sm text-gray-600">{code || "MATH101"}</p>
        </div>

        {/* Actions */}
        <div className="col-span-3 flex justify-end gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition text-sm font-medium">
            ✏️ Edit
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition text-sm font-medium">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
