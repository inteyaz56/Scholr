import React, { useState } from "react";
import { TiThMenu, TiArrowLeft } from "react-icons/ti";
import MobileSideBar from "../AdminComponents/MobileSidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { setExamSubject } from "../redux/examSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getClassSubject } from "../hooks/allHooks";

const AddExamSubject = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  let { exams } = useSelector((state) => state.exam);
  let { subjects } = useSelector((state) => state.subject);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let [examId, setExamId] = useState("");
  let [classId, setClassId] = useState("");
  let [subjectId, setSubjectId] = useState("");
  let [examDate, setExamDate] = useState("");
  let [passingMarks, setPassingMarks] = useState("");
  let [maxMarks, setMaxMarks] = useState("");

  getClassSubject(classId);

  let { classSubjects } = useSelector((state) => state.subject);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/exam-subjects/add-subject`,
        {
          examId,
          subjectId,
          examDate,
          maxMarks: Number(maxMarks),
          passingMarks: Number(passingMarks),
        },
        { withCredentials: true },
      );

 
      dispatch(setExamSubject(result.data));
      toast.success("Subject added to exam successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Sidebar */}
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />

      {/* Top Bar */}
      <div className="w-full lg:px-12 px-4 h-[57px] bg-[#2f2faf] shadow-md flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <TiArrowLeft
            onClick={() => {
              navigate(-1);
            }}
            color="white"
            size={30}
            className="cursor-pointer "
          />

          <TiThMenu
            color="white"
            size={22}
            className="cursor-pointer blcok lg:hidden "
            onClick={() => setShowMenu(true)}
          />

          <h1 className="font-semibold text-xl text-white">
            Add subject to exam
          </h1>
        </div>
      </div>

      {/* Centered Form Section */}
      <div className="flex-1 w-full flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col gap-4 px-6 py-8 bg-white shadow-xl rounded-xl"
        >
          <div className="flex flex-col gap-2">
            <label>Select Exam</label>
            <select
              value={examId}
              onChange={(e) => {
                const selectedExamId = e.target.value;

                setExamId(selectedExamId);

                const selectedExam = exams.find(
                  (exm) => exm._id === selectedExamId,
                );

                if (selectedExam) {
                  setClassId(selectedExam?.classId?._id);
                }
              }}
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
            >
              <option value="">Select Exam</option>

              {exams?.map((exm) => (
                <option key={exm._id} value={exm._id}>
                  {exm.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label>Select Subject</label>
            <select
              value={subjectId}
              disabled={!classId}
              onChange={(e) => {
                setSubjectId(e.target.value);
              }}
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
            >
              <option disabled value="">
                Select Subject
              </option>
              {classSubjects?.map((sub) => (
                <option key={sub._id} value={sub?.subjectId._id}>
                  {sub?.subjectId?.name}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label>Maximum marks</label>
            <input
              placeholder="Enter maximum marks"
              value={maxMarks}
              onChange={(e) => {
                setMaxMarks(e.target.value);
              }}
              required
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Passing marks</label>
            <input
              placeholder="Enter maximum marks"
              value={passingMarks}
              onChange={(e) => {
                setPassingMarks(e.target.value);
              }}
              required
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 border-2 border-gray-300 outline-0 rounded-lg h-[40px]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full h-[45px] bg-blue-600 rounded-lg cursor-pointer text-white flex items-center justify-center font-semibold"
          >
            {loading ? "Adding..." : "Add subject"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExamSubject;
