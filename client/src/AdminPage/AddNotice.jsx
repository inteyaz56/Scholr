import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { toast } from "react-toastify";
import { setMyNotices } from "../redux/noticeSlice";

function AddNotice() {
  const navigate = useNavigate();

  const { classData } = useSelector((state) => state.class);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [targetType, setTargetType] = useState("ALL");
  let [expiryDate, setExpiryData] = useState("");
  let [classId, setClassId] = useState("");
  let [loading, setLoading] = useState(false);
  const dipatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/notice/create`,
        { title, description, targetType, classId, expiryDate },
        { withCredentials: true },
      );
      toast.success("Notic published ✅");
      dipatch(setMyNotices(result.data));
      navigate("/");
    } catch (error) {
     
      toast.error(error?.response?.data?.message || "Something went wrong !");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-white shadow px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FaArrowLeftLong size={20} />
        </button>

        <h2 className="text-lg font-semibold">Create Notice</h2>
      </div>

      {/* FORM */}
      <div className="flex justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-2xl rounded-xl shadow p-6 space-y-5"
        >
          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter notice title"
              className="w-full border h-11 px-3 rounded-lg mt-1"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter notice description"
              className="w-full border px-3 py-2 rounded-lg mt-1 h-28"
              required
            />
          </div>

          {/* TARGET */}
          <div>
            <label className="text-sm font-medium">Target Audience</label>
            <select
              name="targetType"
              value={targetType}
              onChange={(e) => {
                setTargetType(e.target.value);
              }}
              className="w-full border h-11 px-3 rounded-lg mt-1"
            >
              <option value="ALL">All Students</option>
              <option value="CLASS">Specific Class</option>
            </select>
          </div>

          {/* CLASS (Conditional) */}
          {targetType === "CLASS" && (
            <div>
              <label className="text-sm font-medium">Select Class</label>
              <select
                name="classId"
                value={classId}
                onChange={(e) => {
                  setClassId(e.target.value);
                }}
                className="w-full border h-11 px-3 rounded-lg mt-1"
                required
              >
                <option value="">Select Class</option>
                {classData?.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* EXPIRY DATE */}
          <div>
            <label className="text-sm font-medium">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={expiryDate}
              onChange={(e) => {
                setExpiryData(e.target.value);
              }}
              className="w-full border h-11 px-3 rounded-lg mt-1"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2 cursor-pointer border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg"
            >
              {loading ? "Publishing..." : "Publish Notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotice;
