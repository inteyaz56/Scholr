import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { serverUrl } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

function AddFees() {
  const navigate = useNavigate();
  let { classData } = useSelector((state) => state.class);
  let [classId, setClassId] = useState("");
  let [academicYear, setAcademicYear] = useState("");
  let [examFee, setExamFee] = useState("");
  let [transportFee, setTransportFee] = useState("");
  let [otherFee, setOtherFee] = useState("");
  let [tuitionFee, setTuitionFee] = useState("");
  let [loading, setLoading] = useState(false);
  let [studentId, setStudentId] = useState("");
  let [email, setEmail] = useState("");
  let [method, setMethod] = useState("");
  let [amount, setAmount] = useState("");
  let { students } = useSelector((state) => state.student);

  const total =
    Number(tuitionFee || 0) +
    Number(transportFee || 0) +
    Number(otherFee || 0) +
    Number(examFee || 0);

  const handleStructureSubmit = async () => {
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/fees/structure`,
        {
          tuitionFee: Number(tuitionFee),
          examFee: Number(examFee),
          transportFee: Number(transportFee),
          otherFee: Number(otherFee),
          classId,
          totalFee: total,
          academicYear,
        },
        { withCredentials: true },
      );
      toast.success(result?.data?.message);

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/fees/assign/to-class`,
        { classId },
        { withCredentials: true },
      );
      toast.success("Fees assigned successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const searchStudent = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/students/by-email`, {
        params: { email },
        withCredentials: true,
      });

      toast.success("Student fount");
      setStudentId(result?.data?._id);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Not found !");
    }
  };

  const handlePayFee = async () => {
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/fees/pay`,
        { amount: Number(amount), method, studentId },
        { withCredentials: true },
      );

      toast.success("Fees paid successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-white shadow px-4 py-3 flex items-center gap-4">
        <FaArrowLeftLong
          className="cursor-pointer"
          size={20}
          onClick={() => navigate(-1)}
        />
        <h2 className="font-semibold text-lg">Fees Management</h2>
      </div>

      <div className="max-w-6xl  mx-auto p-4 space-y-6">
        <div className="bg-white  p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">Pay Fees</h3>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1>Student</h1>
              <div className="flex lg:flex-row flex-col gap-3 w-[100%] ">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="enter student email to find"
                  type="text"
                  className="border lg:w-[90%] w-[100%] h-11 px-3 rounded-lg"
                />

                <button
                  onClick={searchStudent}
                  className="lg:w-[10%] w-[100%] flex items-center h-11 rounded-lg bg-blue-600 cursor-pointer text-white font-semibold justify-center "
                >
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1>Amount</h1>
              <input
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                className="border h-11 px-3 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h1>Payment Mode</h1>
              <select
                className="border h-11 px-3 rounded-lg"
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                }}
              >
                <option>Select </option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              disabled={loading}
              onClick={handlePayFee}
              className="bg-blue-600 w-[200px] font-semibold cursor-pointer text-white px-5 py-2 rounded-lg"
            >
              {loading ? "Submiting..." : "Pay"}
            </button>
          </div>
        </div>

        {/* CREATE STRUCTURE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">Create Fee Structure</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="border h-11 px-3 rounded-lg"
              value={classId}
              onChange={(e) => {
                setClassId(e.target.value);
              }}
            >
              <option>Select Class</option>
              {classData?.map((cls) => (
                <option value={cls._id}> {cls?.name} </option>
              ))}
            </select>

            <select
              className="border h-11 px-3 rounded-lg"
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(e.target.value);
              }}
            >
              <option>2026</option>
              <option>2027</option>
              <option>2026</option>
              <option>2028</option>
            </select>

            <input
              placeholder="Tuition Fee"
              type="number"
              className="border h-11 px-3 rounded-lg"
              value={tuitionFee}
              onChange={(e) => {
                setTuitionFee(e.target.value);
              }}
            />

            <input
              placeholder="Exam Fee"
              type="number"
              className="border h-11 px-3 rounded-lg"
              value={examFee}
              onChange={(e) => {
                setExamFee(e.target.value);
              }}
            />

            <input
              placeholder="Transport Fee"
              type="number"
              value={transportFee}
              className="border h-11 px-3 rounded-lg"
              onChange={(e) => {
                setTransportFee(e.target.value);
              }}
            />

            <input
              placeholder="Other Fee"
              type="number"
              value={otherFee}
              onChange={(e) => {
                setOtherFee(e.target.value);
              }}
              className="border h-11 px-3 rounded-lg"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <h4 className="font-semibold">Total Fee: ₹{total}</h4>

            <button
              disabled={loading}
              onClick={handleStructureSubmit}
              className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-lg"
            >
              {loading ? "Saving..." : "   Save Structure"}
            </button>
          </div>
        </div>

        {/* ASSIGN FEES */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">Assign Fees to Class</h3>

          <div className="flex justify-end gap-4 flex-col mt-4">
            <select
              className="border h-11 px-3 rounded-lg"
              value={classId}
              onChange={(e) => {
                setClassId(e.target.value);
              }}
            >
              <option>Select Class</option>
              {classData?.map((cls) => (
                <option value={cls._id}> {cls?.name} </option>
              ))}
            </select>
            <button
              onClick={handleAssign}
              className="bg-blue-600 cursor-pointer font-semibold text-xl text-white px-5 py-2 rounded-lg"
            >
              Assign Fees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFees;
