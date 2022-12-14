import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card";
import { getHotels } from "../../redux/action";
import { Footer } from "../footer/Footer";
import { useLocalStorage } from "../../localStorage/useLocalStorage";
// import { useAuth0 } from "@auth0/auth0-react";
// import InfiniteScroll from 'react-infinite-scroll-component';
import LoadHome from "../Loading/loadingHome/LoadHome";
import Paginado from "../Paginado/Paginado"

const AllCards = ({filteredHotels,search, setCurrentPage, currentPage}) => {
  //función que pide la información y la renderiza
 //state.hotels = hace referencia a uno de los estados de reducer
  // const hasMore = useSelector((state) => state.hasMore)
  const dispatch = useDispatch();

  const hotels = useSelector((state)=>state.hotels)
  


  const [favorites, setFavorites] = useLocalStorage("fav", []);

   useEffect(() => {
    dispatch(getHotels())
  }, []);


  console.log(filteredHotels);
  return (
    <div className=" h-full md:m-h-screen w-full">
      <div className="container mx-auto px-0 md:px-4 py-4">
      <div>
          <Paginado
            currentPage={currentPage}
            hotels ={hotels}
            setCurrentPage={setCurrentPage}
            search={search}
           />
       </div>
      <div className="flex justify-center flex-wrap gap-5">
      {
        filteredHotels().length !== 0? filteredHotels().map((el)=>
          <Card
          className="ml-3"
                  id={el.id}
                  
                  key={el.id}
                  photos={el.photos[0]}
                  stars={el.stars}
                  location={el.location}
                  city={el.city}
                  price={el.price}
                  name={el.name}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />  
        ): <LoadHome/>
      }
    </div>
                  
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AllCards;