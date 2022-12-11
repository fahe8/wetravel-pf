import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview, getReview } from "../../redux/action";
import Header from "./Header";
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
        <Header />
        <div className="xl:col-span-5 p-8">
          <h1 className="bg-red-500 text-black text-xl p-1">
            <strong>ELIMINA LOS COMENTARIOS INAPROPIADOS</strong>
          </h1>
          <br />
          {review?.map((el) => {
            return (
              <div className="grid grid-cols-2 border border-primary rounded">
                <div className="p-2">
                  <h1>
                    El usuario <strong>{el.nameUser}</strong> realizó un
                    comentario sobre el Hotel <strong>{el.nameHotel}</strong>:{" "}
                  </h1>
                  <h1>
                    <strong>Comentario: </strong>
                    {el.comments[0]}
                  </h1>
                </div>
                <div className="p-2">
                  <button
                    className="bg-red-500 text-black text-xl p-1 rounded-l"
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
  );
};
