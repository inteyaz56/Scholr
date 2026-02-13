import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyResult } from "../hooks/allHooks";

const Result = () => {
  const navigate = useNavigate();

  const { myChild = [] } = useSelector((state) => state.parent);

  const [activeChild, setActiveChild] = useState(null);

  getMyResult(activeChild?._id);
  let { myResult } = useSelector((state) => state.result);

  useEffect(() => {
    if (myChild.length > 0) {
      setActiveChild(myChild[0]);
    }
  }, [myChild]);

  if (!activeChild) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-blue-600 text-white flex items-center gap-4 px-5 h-[60px] shadow">
        <FaArrowLeft
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-semibold">Results</h1>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* CHILD SELECTOR */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Select Child</h2>

          <div className="flex gap-3 flex-wrap">
            {myChild.map((c) => (
              <button
                key={c._id}
                onClick={() => {
                  setActiveChild(c);
                }}
                className={`px-4 py-2 cursor-pointer rounded-lg
                ${
                  activeChild._id === c._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {c.userId?.name}
              </button>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card
            label="Overall %"
            value={myResult?.map((r) => r?.percentage) || 0}
          />
          <Card
            label="Obtained Marks"
            value={myResult?.map((r) => r?.obtainedMarks) || 0}
          />
          <Card
            label="Max Marks"
            value={myResult?.map((r) => r?.totalMarks) || 0}
          />
        </div>

        {/* RESULT LIST */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            {activeChild.userId?.name}'s Results
          </h2>

          {myResult?.length === 0 && (
            <p className="text-gray-500">No results available</p>
          )}

          <div className="space-y-3">
            {myResult?.map((r, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{r.subject}</p>
                  <p className="text-sm text-gray-500">
                    {r.examId?.name} •{" "}
                    {new Date(r?.examId?.startDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                      },
                    )}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    {r?.obtainedMarks}/{r?.totalMarks}
                  </p>
                  <p className="text-sm text-gray-500">
                    {Math.round((r?.obtainedMarks / r?.totalMarks) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ label, value }) => (
  <div className="bg-white p-5 rounded-xl shadow text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

export default Result;
