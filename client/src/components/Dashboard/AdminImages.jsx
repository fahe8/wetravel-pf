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
  // console.log("images:", images);

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
            <strong>ELIMINA LAS IMAGENES INAPROPIADOS</strong>
          </h1>
          <br />
          {images?.map((el) => {
            return (
              <div className="shadow-xl rounded">
                <div>
                  <div className=" text-2xl p-3 font-medium">
                    <h1>
                      El usuario <strong>{el.nameUser}</strong> publicó la
                      siguiente imagen:
                      <hr />
                    </h1>
                  </div>
                  <div className=" grid grid-cols-4">
                    {el.images.length > 0 ? (
                      el.images?.map((el, index) => {
                        return (
                          <div
                            className="m-5 p-3 bg-slate-100 rounded shadow-xl"
                            key={index}
                          >
                            <img
                              src={el}
                              alt="img not found"
                              className="h-40 w-40"
                            />
                            <div className="p-1 d-flex align-items-center">
                              <button
                                className="bg-red-400 text-white text-xl  rounded-xl"
                                onClick={() => {
                                  dispatch(deleteImages(el.id));
                                  history.go(0);
                                }}
                              >
                                Delete This pic
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <h2>"hola"</h2>
                    )}

                    {/* {el.images?.map((el, index) => {
                    
                    return (
                      <div className="bg-red-400"
                        key={index} >
                        <img src={el} alt="img not found" />
                        <br />
                      </div>
                    );
                  })} */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
