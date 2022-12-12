import React, { useEffect } from "react";

import Sidebar from "./sidebar";
// import { Outlet } from "react-router-dom";
import Header from "./Header";
import { RiTicketLine, RiMore2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  console.log(user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <Header />
        <div className="xl:col-span-5 p-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 nb-10">
          <div className="flex items-center justify-between bg-red-100 p-8 rounded-xl">
            <div>
              {/* <RiTicketLine className="  text-4xl bg-red-100/10 text-red-500 p-2 box-content rounded-xl" />
              <div className="flex items-center gap-x-2 hover:bg-red-900 p-2 rounded-lg transition  "> */}
              <h3 className="uppercase font-bold">Usuarios</h3>
              <br />
              {user ? user.map((el) => <p>{el.name}</p>) : "esta vacio"}

              {/* <RiMore2Line /> */}
              {/* <Link to={"/favourites"}> Usuarios</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Dashboard;
