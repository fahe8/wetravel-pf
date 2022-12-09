import React from "react";
import Sidebar from "./sidebar";
// import { Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "./home";

const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <Header />
        <div className="xl:col-span-5 p-8">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
