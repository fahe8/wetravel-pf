import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import Card from "../card/card";
import NavBar from "../navBar/NavBar";
import { getFavorites } from "../../redux/action";

const Favourites = () => {
  const [favorites, setFavorites] = useLocalStorage("fav", []);
    const dispath = useDispatch()
  console.log(favorites);
  const allFavorites = useSelector((state) => state.favorites);

    useEffect(()=>{
        dispath(getFavorites(favorites))
    },[])

  return (
    <div className="text-center ">
      <NavBar />
      <div className="min-h-[calc(100vh-80px)] pt-3">
        <h1 className=" text-xl font-bold">Favoritos</h1>

        {favorites.length ? (
          <div className="flex flex-wrap gap-20 justify-center pt-3">
            {allFavorites?.map((favorite, index) => {
              return (
                <Card
                  key={index}
                  id={favorite.id}
                  photos={favorite.photos}
                  stars={favorite.stars}
                  location={favorite.location}
                  city={favorite.city}
                  price={favorite.price}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  name={favorite.name}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col py-5 gap-5">
            <h2 className=" text-3xl font-bold">
              No se ha encontrado hoteles añadidos a favoritos
            </h2>
            <p className="text-xl font-normal">
              Regresa al home y agrega tus favoritos
            </p>
            <Link to={"/home"}>
              <button className="bg-[color:var(--second-bg-color)] py-3 px-3 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px]">
                Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
