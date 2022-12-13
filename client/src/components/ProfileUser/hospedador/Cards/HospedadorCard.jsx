import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getDetail, deleteHotel } from "../../../../redux/action";

const HospedadorCard = ({ hotel }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteHotel(hotel.id));
    alert("Hotel eliminado con éxito");
    history.push("/anfitrion");
  };

  return (
    <div className="bg-white shadow-xl cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out px-2">
      <div className="relative mt-2 mx-2 w-full">
        <div className="h-56 rounded-2xl overflow-hidden">
          <img
            src={hotel.photos[0]}
            alt={hotel.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3> {hotel.name}</h3>
        </div>
        <div>
          <h3>
            {hotel.location} , {hotel.city}
          </h3>
        </div>
        <div>
          <h3>$ {hotel.price} night </h3>
        </div>
        <div> {hotel.email}</div>
        <div onClick={handleDelete}>
          <button className="bg-red-400 w-60 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl">
            Eliminar
          </button>
        </div>
        <div>
          <Link to={"/edithotel/" + hotel.id}>
            <button onClick={() => dispatch(getDetail(hotel.id))}>
              Editar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospedadorCard;
