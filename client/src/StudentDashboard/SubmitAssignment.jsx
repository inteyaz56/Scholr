import React, { useState } from "react";
import { serverUrl } from "../main";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";

const SubmitAssignment = () => {
  let { assignmentId } = useParams();
  let [loading, setLoading] = useState(false);
  let [remarks, setRemarks] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/submissions/submit`,
        {
          assignmentId,
          remarks,
        },
        { withCredentials: true },
      );
      toast.success("Assignment submitted successfully!");
    
      navigate("/");
    } catch (error) {

      toast.error(
        error?.response?.data?.message || "Failed to submit assignment",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[100%] h-screen bg-gray-100  gap-4 flex flex-col items-center  ">
      <div className="w-[100%] relative h-[70px] flex items-center justify-center  shadow-lg  ">
        <FaArrowLeftLong
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-semibold ">Submit your assignment here</h1>
      </div>
      <div className="w-[100%] h-auto flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          className="w-[100%] max-w-[900px] h-auto flex flex-col gap-4 items-center justify-center px-4 "
        >
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter your answer"
            className="w-full h-64 p-4 
           border-gray-300 border-2  rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Submit Assignment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitAssignment;
