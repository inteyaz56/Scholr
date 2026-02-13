import { LuLayoutDashboard } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GiProgression } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { setUserData, setActive } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../main";

const SideBar = () => {
  let { active, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(
      `${serverUrl}/api/users/logout`,
      {},
      { withCredentials: true },
    );
    dispatch(setActive("Dashboard"));
    dispatch(setUserData(null));
  };
  return (
    <div className="w-[20%] hidden lg:flex flex-col h-[100vh] bg-gray-200 shadow-2xl gap-4 ">
      <div className="flex flex-col px-4 shadow-lg  gap-1">
        <h1 className="text-gray-800 text-xl font-semibold">Parent</h1>
        <h1 className="text-gray-800 text-lg font-semibold">
          {userData?.name}
        </h1>
      </div>

      <div className="w-[100%] flex flex-col gap-2 ">
        <div
          onClick={() => {
            dispatch(setActive("Dashboard"));
          }}
          className={`flex gap-2 w-full py-2 px-4 cursor-pointer ${
            active === "Dashboard" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <LuLayoutDashboard size={18} />
          <h1 className="font-semibold text-black text-lg">Dashboard</h1>
        </div>

        <div
          onClick={() => {
            dispatch(setActive("Result"));
          }}
          className={`flex gap-2 w-[100%] py-2 px-4 cursor-pointer ${
            active === "Result" ? "bg-white shadow-lg" : "hover:bg-white "
          }  items-center`}
        >
          <GiProgression size={18} />
          <h1 className="font-semibold text-black text-lg">Result</h1>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="absolute bottom-8 cursor-pointer  flex gap-2 items-center justify-center left-4"
      >
        <IoLogOutOutline size={20} />
        <h1 className="font-semibold text-black text-lg">Logout</h1>
      </button>
    </div>
  );
};

export default SideBar;
