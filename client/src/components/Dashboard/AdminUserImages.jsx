import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser } from "../../redux/action";
import NavBar from "../navBar/NavBar";
import Sidebar from "./sidebar";

export const AdminUserImages = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { users } = useSelector((state) => state);
  console.log("users:", users);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <NavBar />
        <div className="xl:col-span-5 p-8">
          <h1 className="bg-red-500 text-black text-xl p-1">
            <strong>ELIMINA LAS IMAGENES INAPROPIADAS QUE HAN SUBIDO LOS USUARIOS</strong>
          </h1>
          <br />
        </div>
      </div>
    </div>
  );
}
