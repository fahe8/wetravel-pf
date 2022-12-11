import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteImages, getImage } from "../../redux/action";
import Header from "./Header";
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
        <Header />
        <div className="xl:col-span-5 p-8">
          <h1 className="bg-red-500 text-black text-xl p-1">
            <strong>ELIMINA LAS IMAGENES INAPROPIADOS</strong>
          </h1>
          <br />
          {images?.map((el) => {
            return (
              <div className="grid grid-cols-2 border border-primary rounded">
                <div className="p-1">
                  <p>
                    El usuario <strong>{el.nameUser}</strong> publicó la siguiente imagen:
                  </p>
                  {el.images?.map((el, index) => {
                    return (
                      <div key={index} >
                        <img src={el} alt="img not found" />
                        <br />
                      </div>
                    );
                  })}
                </div>
                <div className="p-1 d-flex align-items-center">
                  <button
                    className="bg-red-400 text-white text-xl p-1 rounded-xl"
                    onClick={() => {
                      dispatch(deleteImages(el.id));
                      history.go(0);
                    }}
                  >
                    Delete Reserve
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
