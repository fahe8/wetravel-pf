import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import Stars from "../stars/Stars";
//import Carousel from '../carousel/Carousel';

function Card({
  // recibir los datos que se ven en la card por propiedades
  id,
  photos,
  stars,
  location,
  city,
  price,
  size,
  name,
}) {
  return (
    <div className="bg-white hover:bg-gray-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
      <div className="relative mt-2 mx-2">
        <Link to={`/home/${id}`}>
        <div className="h-56 rounded-2xl overflow-hidden">
          <img src={photos} alt={name} className="object-cover w-full h-full" />
        </div>
        <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
          <AiFillHeart />
        </div>
          <div>
            <Stars />
            <h3>
              {location}, {city}
            </h3>
            <h3>{price}</h3>
            <h3>{size}</h3>
            <br />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
