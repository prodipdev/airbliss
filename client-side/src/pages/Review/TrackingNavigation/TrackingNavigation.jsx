import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const TrackingNavigation = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <div>
      <div className="">
        <div className="shadow-md rounded-xl overflow-hidden">
          <div className="px-5">
            <div className="flex items-center gap-1 mb-2 mt-4">
              <h5 className="font-semibold text-gray-600">DAC-CGP</h5>
            </div>
            <hr />
            <div className="text-end flex justify-end items-center -mt-12 h-10">
              <div>
                <button className="pt-1 pl-2 pr-2 pb-2 mr-12  bg-cyan-600 text-white rounded-md hover:bg-white hover:border-2 hover:border-cyan-600 hover:text-gray-500">
                  View Baggage
                </button>
              </div>
              <div>
                <button onClick={() => setIsCollapse(!isCollapse)}>
                  {isCollapse ? (
                    <MdKeyboardArrowUp className="text-2xl rounded-full bg-gray-300" />
                  ) : (
                    <MdKeyboardArrowDown className="text-2xl rounded-full bg-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`duration-500 ${
              isCollapse ? "max-h-[350px]" : "max-h-3"
            } transition-all ease-linear overflow-hidden`}
          >
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    className="h-12 w-12"
                    src="https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/BG.png"
                    alt=""
                  />
                  <div>
                    <p className="text-gray-400">
                      <small>Biman Bangladesh Airlines</small>
                    </p>
                    <h1 className="text-[14px]">
                      <b>BG | 135</b>
                    </h1>
                    <h3 className="text-[13px]">
                      <b>Aircraft : Boeing 777-300</b>
                    </h3>
                  </div>
                </div>

                <div>
                  <h1 className="text-[16px]">Economy Class</h1>
                </div>
              </div>

              <hr className="mb-3 mt-3" />
              <div className=" grid grid-cols-3 items-center gap-5 ">
                <div>
                  <h4 className="text-gray-400 text-[13px]">Depart</h4>
                  <h2 className="mt-2 text-[15px]">
                    <strong>7:45</strong>
                  </h2>
                  <p className="-mt-1 pr-2">
                    <small>Tue, 15 Aug 2023</small>
                  </p>
                  <h3 className="mt-2 text-[13px]">Dhaka, Bangladesh</h3>
                </div>

                <div align="center" className="space-y-1 pl-2 pr-2">
                  <p className="text-gray-400 text-[14px]">45min</p>
                  <img
                    style={{
                      WebkitFilter: "grayscale(100%)",
                      filter: "grayscale(100%)",
                    }}
                    src="https://flightexpert.com/assets/img/non-stop-shape.png"
                    alt=""
                  />
                  <p>
                    <small>Non Stop</small>
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-400 text-[13px]">Arrive</h4>
                  <h2 className="mt-2 text-[15px]">
                    <strong> 8:40</strong>
                  </h2>
                  <p className="-mt-1 pr-2">
                    <small>Tue, 15 Aug 2023</small>
                  </p>
                  <h3 className="mt-2 text-[13px]">Chittagong, Bangladesh</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingNavigation;