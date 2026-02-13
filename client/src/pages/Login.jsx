import React, { useState } from "react";
import { LiaSchoolSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      toast.success("Welcome Back");
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-4">
        {/* LOGO */}
        <div className="flex items-center justify-center gap-2">
          <LiaSchoolSolid className="w-10 h-10 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Scholr</h1>
        </div>

        {/* HEADING */}
        <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-700">
          Welcome back to{" "}
          <span className="text-indigo-600 font-bold">Scholr</span>
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* EMAIL */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
            className="w-full h-11 px-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full h-11 px-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {password && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-sm font-medium text-indigo-600 cursor-pointer select-none"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center justify-center hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? <ClipLoader color="white" size={24} /> : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Not registered?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
