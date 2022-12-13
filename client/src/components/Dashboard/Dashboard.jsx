import React, { useEffect } from "react";

import Sidebar from "./sidebar";
import Navbar from "../navBar/NavBar";

const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="m-8 bg-zinc-300 text-3xl">
            <h1 className="">
              <strong>
                Bienvenido SuperAdmin al Control total de WeTravel
              </strong>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
