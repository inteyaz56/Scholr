import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../main";

function ViewDetails() {
  const navigate = useNavigate();

  let { assignmentId } = useParams();
  let [assignmentDetail, setAssignmentDetail] = useState(null);

  const fetchAssignmentDetails = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/assignments/view/${assignmentId}`,
        { withCredentials: true },
      );

      setAssignmentDetail(result.data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    fetchAssignmentDetails();
  }, [assignmentId]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer rounded-md hover:bg-gray-100"
        >
          <FaArrowLeftLong size={18} />
        </button>

        <h2 className="text-lg font-semibold">Assignment details</h2>
      </div>

      {/* CONTENT */}
      <div className="flex justify-center p-4 md:p-8">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow p-6">
          {/* TITLE + BADGE */}
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-semibold">
              {assignmentDetail?.title || "No text"}
            </h1>
          </div>

          {/* DATE */}
          <div className="flex items-center gap-2 text-gray-500 mt-3 text-sm border-b pb-4">
            Due Date :
            {new Date(assignmentDetail?.dueDate).toLocaleDateString() ||
              "No Date"}
          </div>

          {/* DESCRIPTION */}
          <div className="text-gray-700 mt-5 whitespace-pre-line leading-relaxed text-sm md:text-base">
            {assignmentDetail?.description || "No description"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
