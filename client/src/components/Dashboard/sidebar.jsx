import React from "react";
import { Link } from "react-router-dom";
// import { BsFillCalendarDateFill } from "react-icons/";
import { IconButton } from "@mui/material";
// import { CalendarMonth } from "@mui/material";
import {
  RiCalendarTodoLine,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiEarthLine,
} from "react-icons/ri";
import { shadows } from "@mui/system";

const Sidebar = () => {
  return (
    <div className="xl:h-[100vh] overFlow-y-scroll fixed xl:static w-full h-full -left-full top-0 bg-secondary-100 p-4 flex flex-col justify-between ">
      <div className="text-center text-2xl font-bold text-white">
        <h1>Admin.</h1>
        <ul>
          <li>
            <Link
              to={""}
              className="bg-Dark grayish blue flex items-center gap-4 py-2 px-4 roudend-lg hover:bg-white.900"
            >
              <IconButton>inicio</IconButton>
            </Link>
          </li>
          <li>
            <button className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-primary-900 transitions-colors">
              <span className="flex items-center gap-4">
                <RiEarthLine />
                Review
              </span>
              <RiArrowRightSLine />
            </button>
            <ul className="my-2 hidden"></ul>
            <Link
              to={""}
              className="bg-Dark grayish blue flex items-center gap-4 py-2 px-4 roudend-lg hover:bg-white.900"
            ></Link>
            <ul className="mt-4">
              <li>
                <Link
                  to={"/home"}
                  className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
                >
                  <h1>Hoteles</h1>
                </Link>
              </li>
              <li>
                <Link
                  to={"/createhotel"}
                  className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
                >
                  <h1>Crear Hoteles</h1>
                </Link>
              </li>
              <li>
                <Link
                  to={"/createhotel"}
                  className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
                >
                  <h1>Modificar Hoteles</h1>
                </Link>
              </li>
            </ul>
            <li>
              <Link
                to={"/home"}
                className=" bg-Dark grayish blue flex items-center gap-4 py-2 px-4 roudend-lg hover:bg-white.900 text-black"
              >
                <RiCalendarTodoLine className="">calendar</RiCalendarTodoLine>
              </Link>
            </li>
            <li>
              <Link
                to={"/login"}
                className="bg-Dark grayish blue flex items-center gap-4 py-2 px-4 roudend-lg hover:bg-white.900 text-black"
              >
                <RiLogoutCircleRLine className="text-black flex flex-col justify-between ">
                  cerrar secion
                </RiLogoutCircleRLine>
              </Link>
            </li>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
