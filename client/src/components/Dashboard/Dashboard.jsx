import React from "react";
import Sidebar from "./sidebar";
// import { Outlet } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <Header />
        <div className="xl:col-span-5 p-8">
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
