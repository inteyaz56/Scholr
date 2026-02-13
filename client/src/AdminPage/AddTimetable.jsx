import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassSubject } from "../hooks/allHooks";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../main";
import { setTimetables } from "../redux/timetableSlice";
import { useNavigate } from "react-router-dom";
import { setActive } from "../redux/userSlice";

const AddTimetable = () => {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let [classId, setClassId] = useState("");
  let [teacherId, setTeacherId] = useState("");
  let [startTime, setStartTime] = useState("");
  let [endTime, setEndTime] = useState("");
  let [subjectId, setSubjectId] = useState("");
  let [loading, setLoading] = useState(false);
  const [day, setDay] = useState("");
  let { classData } = useSelector((state) => state.class);
  let { teacherData } = useSelector((state) => state.teacher);

  getClassSubject(classId);
  let { classSubjects } = useSelector((state) => state.subject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubimt = async () => {
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/timetable/create`,
        {
          classId,
          subjectId,
          teacherId,
          startTime,
          endTime,
          day,
        },
        { withCredentials: true },
      );
      dispatch(setTimetables(result.data));
      toast.success("Slot alloted successfully ✅");
      dispatch(setActive("Dashboard"));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
   ;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-4">Create Timetable</h3>

        <div className="grid  md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="class">Select Class</label>
            <select
              onChange={(e) => {
                setClassId(e.target.value);
              }}
              className="border p-2 rounded"
            >
              <option value="">Select </option>
              {classData?.map((cls) => (
                <option value={cls._id}> {cls?.name} </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="subject">Select Subject</label>
            <select
              value={subjectId}
              onChange={(e) => {
                setSubjectId(e.target.value);
              }}
              className="border p-2 rounded"
            >
              <option value="">Select Subject</option>

              {classSubjects?.map((sub) => (
                <option value={sub?.subjectId?._id}>
                  {" "}
                  {sub?.subjectId?.name}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject">Select Teacher</label>
            <select
              value={teacherId}
              onChange={(e) => {
                setTeacherId(e.target.value);
              }}
              className="border p-2 rounded"
            >
              <option value="">Select Teacher</option>
              {teacherData?.map((tchr) => (
                <option value={tchr?._id}>{tchr?.name} </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Select Day</h1>
            <select
              value={day}
              onChange={(e) => {
                setDay(e.target.value);
              }}
              name="day"
              className="border p-2 rounded"
            >
              <option value="">Select Day</option>
              {days.map((day) => (
                <option value={day}> {day} </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Start Time</h1>
            <input
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
              name="startTime"
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1>End Time</h1>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
              name="startTime"
              className="border p-2 rounded"
            />
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleSubimt}
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded mt-4"
        >
          {loading ? "Adding..." : " Add Slot"}
        </button>
      </div>
    </div>
  );
};

export default AddTimetable;
