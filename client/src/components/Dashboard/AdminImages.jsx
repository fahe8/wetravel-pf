import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteImages, getImage } from "../../redux/action";
import NavBar from "../navBar/NavBar";
import Sidebar from "./sidebar";

export const AdminImages = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { images } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getImage());
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <NavBar />
        <div className="xl:col-span-5 p-8">
          <h1 className="text-black text-3xl p-1 shadow-xl">
            <strong>ELIMINA LOS POSTEOS INADECUADOS</strong>
          </h1>
          <br />
          {!images.length ? (
            <div className="text-red-700 text-4xl">
              <h1>
                <strong>No hay imagenes disponibles</strong>
              </h1>
            </div>
          ) : (
            images?.map((el) => {
              return (
                <div className="shadow-xl rounded">
                  <div className=" text-2xl p-3 font-medium">
                    <h1>
                      El usuario <strong>{el.nameUser}</strong> realizó la
                      siguiente publicación:
                      <hr />
                    </h1>
                  </div>
                  <div className=" grid grid-cols-4">
                    {el.images?.map((el, index) => {
                      return (
                        <div
                          className="m-5 p-3 bg-slate-100 rounded shadow-xl"
                          key={index}
                        >
                          <img
                            src={el}
                            alt="img not found"
                            className="h-40 w-70"
                          />
                        </div>
                      );
                    })}
                    <br />
                    <div className="p-1 d-flex align-items-center">
                      <button
                        className="bg-red-400 text-white text-xl  rounded-xl"
                        onClick={() => {
                          dispatch(deleteImages(el.id));
                          history.go(0);
                        }}
                      >
                        Delete This post
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
