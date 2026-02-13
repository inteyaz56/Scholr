import React, { useState } from "react";
import { LiaSchoolSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Signup = () => {
  let [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);
  let [role, setRole] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/users/register`,
        { name, email, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setEmail("");
      setName("");
      setPassword("");
      setRole("");
      toast.success("Registered successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center p-2">
      <div className="w-full max-w-[350px] bg-white shadow-xl py-4 rounded-2xl flex flex-col gap-4">
        {/* LOGO */}
        <div className="w-full h-[50px] flex items-center justify-center gap-2">
          <LiaSchoolSolid className="w-[40px] h-[40px] text-indigo-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Scholr</h1>
        </div>

        {/* TITLE */}
        <div className="flex items-center justify-center">
          <h1 className="text-xl text-center font-semibold text-gray-700">
            Welcome to simplified home schooling{" "}
            <span className="text-indigo-600 font-bold">Scholr</span>
          </h1>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="w-full mt-2 px-2 flex flex-col gap-4"
        >
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[40px] border-gray-300 px-3 outline-0 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter name"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-[40px] border-gray-300 px-3 outline-0 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email"
          />

          {/* PASSWORD */}
          <div className="relative flex">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[40px] border-gray-300 px-3 outline-0 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
            />

            {password.trim() && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 font-medium text-indigo-600 cursor-pointer text-sm"
              >
                {showPassword ? "hide" : "show"}
              </span>
            )}
          </div>

          {/* ROLE */}
          <div>
            <p className="mb-1.5 font-semibold text-gray-700 text-sm">
              Register as
            </p>

            <div className="flex justify-between gap-3">
              {/* STUDENT */}
              <div
                onClick={() => setRole("STUDENT")}
                className={`cursor-pointer py-2.5 px-4 rounded-xl border-2 text-center transition-all
                  ${
                    role === "STUDENT"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
              >
                <div className="text-xl mb-0.5">🎓</div>
                <p className="font-medium text-xs">Student</p>
              </div>

              {/* PARENT */}
              <div
                onClick={() => setRole("PARENT")}
                className={`cursor-pointer py-2.5 px-4 rounded-xl border-2 text-center transition-all
                  ${
                    role === "PARENT"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
              >
                <div className="text-xl mb-0.5">👨‍👩‍👧</div>
                <p className="font-medium text-xs">Parent</p>
              </div>

              {/* TEACHER */}
              <div
                onClick={() => setRole("TEACHER")}
                className={`cursor-pointer py-2.5 px-4 rounded-xl border-2 text-center transition-all
                  ${
                    role === "TEACHER"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
              >
                <div className="text-xl mb-0.5">👩‍🏫</div>
                <p className="font-medium text-xs">Teacher</p>
              </div>
            </div>

            {name.trim() && password.trim() && !role && (
              <p className="text-[11px] text-red-500 mt-1">
                Please select a role
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-1 h-[45px] font-semibold text-white rounded-2xl cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center hover:opacity-90 transition"
          >
            {loading ? <ClipLoader color="white" size={30} /> : "Register"}
          </button>

          <p className="text-center text-sm">
            Already registered?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-indigo-600 font-medium hover:underline"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
