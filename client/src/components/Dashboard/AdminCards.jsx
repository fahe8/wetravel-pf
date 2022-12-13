import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHotel, updateHotel } from "../../redux/action";
import NavBar from "../navBar/NavBar";
import Sidebar from "./sidebar";

export const AdminCards = () => {
  const dispatch = useDispatch();

  const { hotels } = useSelector((state) => state);

  const hotelCreated = hotels.filter((el) => el.status === false);

  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <NavBar />
        <div className="xl:col-span-5 p-8">
          {hotelCreated?.map((el) => {
            return (
              <div className="grid grid-cols-3 m-3 bg-sky-100 shadow-xl hover:shadow-none cursor-pointer rounded-3xl">
                <div className="p-5 col-span-2 text-lg ">
                  <div className="d-flex justify-content-center">
                    <img src={el.photos[0]} alt="img not found" />
                  </div>
                  <div>
                    <p>Hotel <strong>{el.name}</strong></p>
                  </div>
                  <div>
                    <p>
                      {el.location}, {el.city}
                    </p>
                  </div>
                  <div>
                    <p>
                      Precio por noche <strong>${el.price}</strong>
                    </p>
                  </div>
                  <div>
                    <p>
                      El usuario{" "}
                      <strong>
                        {el.users[0]?.name ? el.users[0]?.name : "Admin"}
                      </strong>{" "}
                      creó este Hotel
                    </p>
                  </div>
                </div>
                <div className="p-16 d-flex align-items-center flex-col space-y-4 my-40">
                  <button
                    className="bg-red-500 text-black text-xl p-1 rounded"
                    onClick={() => {
                      dispatch(deleteHotel(el.id));
                    }}
                  >
                    <strong>Eliminar Hotel</strong>
                  </button>
                  <button
                    className="bg-blue-500 text-black text-xl p-1 rounded"
                    onClick={() => {
                      dispatch(updateHotel({ status: true }, el.id));
                    }}
                  >
                    Desbloquear
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
