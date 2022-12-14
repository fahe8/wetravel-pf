import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiTwotoneHome, AiOutlineHeart } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import Stars from "../stars/Stars";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, deleteHotel, updateHotel } from "../../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card({
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
  const dispatch = useDispatch();
  const userDb = useSelector((state) => state.userId);
  const [panel, setPanel] = useState(false);
  const refOne = useRef(null);
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


  let isfavorite = favorites.some((s) => s.name === name);
  const toastId = React.useRef(null);
  const customId = "custom-id-yes";
  const messageFavAdd = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast("💘 Lo añadiste a favoritos", {
        toastId: customId,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
    }
  };
  const messageFavRemove = () => {
    toast("💔 Lo eliminaste de favorito", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const messageHotelRemove = () => {
    toast("💔 Elminaste un hotel", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const messageHotelBan = () => {
    toast("💔 Bloqueaste un hotel", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const handleFav = () => {
    let copyFav = [...favorites];
    if (isfavorite) {
      const indexFav = copyFav.map((e) => e.name).indexOf(infoCard.name);
      copyFav.splice(indexFav, 1);
      messageFavRemove();
    } else {
      copyFav.push(infoCard);
      messageFavAdd();
    }
    setFavorites(copyFav);
    dispatch(getFavorites(copyFav));
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setPanel(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  return (
    <div className="bg-white hover:bg-gray-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out px-2">
      <div className="relative mt-2 mx-2 w-full">
        <div className="h-56 rounded-2xl overflow-hidden">
          <img src={photos} alt={name} className="object-cover w-full h-full" />
        </div>
        <div className=" flex justify-between relative">
          <div
            onClick={handleFav}
            className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500  rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            {isfavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </div>
          {userDb?.status === "admin" && (
            <div
              onClick={() => setPanel(!panel)}
              className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-black-500 text-black-500 rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <BsPencilSquare />
            </div>
          )}

          {panel && (
            <div
              className="absolute bg-white right-0 -top-16 w-[100px] flex flex-col 2 rounded border"
              ref={refOne}
            >
              <p
                className=" hover:bg-gray-200"
                onClick={() => {
                  dispatch(deleteHotel(id));
                  messageHotelRemove();
                }}
              >
                Eliminar
              </p>
              <p
                className=" hover:bg-gray-200"
                onClick={() => {
                  dispatch(updateHotel({ status: false }, id));
                  messageHotelBan();
                }}
              >
                Bloquear
              </p>
            </div>
          )}
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
      <ToastContainer />
    </div>
  );
}

export default Card;