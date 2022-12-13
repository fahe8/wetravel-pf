import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview, getReview } from "../../redux/action";
import NavBar from "../navBar/NavBar";
import Sidebar from "./sidebar";

export const AdminReviews = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { review } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getReview());
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <NavBar />
        <div className="xl:col-span-5 p-8">
          <h1 className= "text-black text-3xl p-1 shadow-xl" >
            <strong>ELIMINA LOS COMENTARIOS INAPROPIADOS</strong>
          </h1>
          <br />
          <div >
          {review?.map((el) => {
            return (
              <div className="grid grid-cols-3 m-3 bg-slate-100 shadow-xl hover:shadow-none cursor-pointer rounded-3xl">
                
                <div className="p-2 col-span-2 text-lg ">
                  <h1>
                    El usuario <strong>{el.nameUser}</strong>
                    </h1>
                  <h1>
                    Realizó un comentario sobre el Hotel <strong>{el.nameHotel}</strong>:{" "}
                  </h1>
                  <h1>
                    <strong>Comentario: </strong> 
                    <div className="underline">
                      {el.comments[0]}
                    </div>
                  </h1>
                </div>
                <div className="p-2">
                  <button
                    className="bg-red-500 text-black text-xl mt-2 p-1 rounded-l"
                    onClick={() => {
                      dispatch(deleteReview(el.id));
                      history.go(0);
                    }}
                  >
                    <strong>Eliminar Comentario</strong>
                  </button>
                </div>
                
              </div>
              
              
            );
          })}
            
            </div>
        </div>
      </div>
    </div>
  );
};
