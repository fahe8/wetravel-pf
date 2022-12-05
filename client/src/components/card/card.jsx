import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiTwotoneHome, AiOutlineHeart } from "react-icons/ai";
import Stars from "../stars/Stars";
import { useDispatch } from "react-redux";
import { getFavorites } from "../../redux/action";

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
  favorites,
  setFavorites,
}) {
  let dispatch = useDispatch();

  const infoCard = {
    id: id,
    photos: photos,
    stars: stars,
    location: location,
    city: city,
    price: price,
    size: size,
    name: name,
  };


  // *!FALTA HACERLO CON LOS USUARIO CREANDO UN MODELO EN EL BACK

  let isfavorite = favorites.some((s) => s.name === name);
  const handleFav = () => {
    let copyFav = [...favorites];
    if (isfavorite) {
      const indexFav = copyFav.map((e) => e.name).indexOf(infoCard.name);
      copyFav.splice(indexFav, 1);
    } else {
      copyFav.push(infoCard);
    }
    setFavorites(copyFav);
    dispatch(getFavorites(copyFav));
  };

  return (
    <div className="bg-white hover:bg-gray-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out px-2">
      <div className="relative mt-2 mx-2 w-full">
        <div className="h-56 rounded-2xl overflow-hidden">
          <img src={photos} alt={name} className="object-cover w-full h-full" />
        </div>
        <div
          onClick={handleFav}
          className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
        >
          {isfavorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
        <div>
          <div>
            <Stars stars={stars} />
          </div>
          <hr />
          <Link to={`/home/${id}`}>
            <div className="text-left">
              <h3>{name}</h3>
              <br />
              <h3>
                {location}, {city}
              </h3>
              <h3>${price} night</h3>
              <br />
              <div>
                <h3>
                  <AiTwotoneHome /> {size}
                </h3>
              </div>
              <br />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
