import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";

import { useNavigate } from "react-router-dom";
import MobileSideBar from "../AdminComponents/MobileSidebar"; 
import { useSelector } from "react-redux";

import { getFeeSummary } from "../hooks/allHooks";

const Fees = () => {
  getFeeSummary();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  let { totalCollected, partialCollected, totalDue } = useSelector(
    (state) => state.fees,
  );
  return (
    <div className="w-[100%] flex flex-col h-screen overflow-auto ">
      <MobileSideBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="w-full lg:px-12 px-4  h-[57px] bg-[#2f2faf] shadow-md flex items-center justify-between">
        <div className="flex  gap-4 py-2 items-center">
          <TiThMenu
            color="white"
            size={30}
            className="cursor-pointer block lg:hidden "
            onClick={() => setShowMenu(true)}
          />
          <h1 className="font-semibold hidden lg:block text-xl text-white">
            Fees
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate("/add/fees");
            }}
            className="lg:w-[200px] w-[160px] h-[40px] bg-white rounded-lg shadow-lg text-black font-semibold cursor-pointer "
          >
            Create Fee Structure
          </button>
        </div>
      </div>

      <div className="w-[100%] lg:min-h-[50%] lg:max-h-[98%] lg:overflow-auto flex flex-col  p-4 ">
        <div className="flex flex-col w-[100%]  gap-4">
          <h1 className="text-black font-semibold lg:text-2xl text-xl ">
            Fees Dashboard
          </h1>
          <div className="flex lg:flex-row flex-col justify-between lg:justify-center lg:gap-18 gap-2">
            <div className="lg:w-[23%] w-[100%] items-center justify-center gap-2 bg-[#547154] h-[100px] p-3 flex flex-col rounded-lg shadow-lg  ">
              <h1 className="font-semibold  text-xl text-white ">
                Total Collected
              </h1>
              <h1 className="font-semibold  text-xl text-white ">
                {totalCollected ? "₹" + totalCollected : "0"}
              </h1>
            </div>

            <div className="lg:w-[23%] w-[100%] items-center justify-center gap-2 bg-[#948d4f] h-[100px] p-3 flex flex-col rounded-lg shadow-lg  ">
              <h1 className="font-semibold  text-xl text-white ">
                Partial Payments
              </h1>
              <h1 className="font-semibold  text-xl text-white ">
                {partialCollected ? "₹" + partialCollected : "0"}
              </h1>
            </div>
            <div className="lg:w-[23%] w-[100%] items-center justify-center gap-2 bg-[#f67251] h-[100px] p-3 flex flex-col rounded-lg shadow-lg  ">
              <h1 className="font-semibold  text-xl text-white ">Total Due</h1>
              <h1 className="font-semibold  text-xl text-white ">
                {totalDue ? "₹" + totalDue : "0"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;
