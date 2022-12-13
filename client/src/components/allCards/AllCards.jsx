import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card";
import { getHotels } from "../../redux/action";
import { Footer } from "../footer/Footer";
// import InfiniteScroll from "react-infinite-scroll-component";
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadHome from "../Loading/loadingHome/LoadHome";

const AllCards = () => {
  //función que pide la información y la renderiza
  let estadoHoteles = useSelector((state) => state.hotels); //state.hotels = hace referencia a uno de los estados de reducer
  const hasMore = useSelector((state) => state.hasMore)
  const dispatch = useDispatch();
  //console.log (estadoHoteles) //me muestra todos los hoteles por consola
  //Simular algo antes, durante y después que se renderice --> dentro del useEffect despachar la acción que se necesite
  
  const [page, setPage] = useState(1);
  


  const fetchMoreData = () => {
        setPage(prevState => prevState + 1)
        setTimeout(() => {
          if(hasMore){
            dispatch(getHotels(page))
          }
        }, 1000);
  };

  useEffect(() => {
    dispatch(getHotels(1))
    setPage(prevState=>prevState+1)
    // if (estadoHoteles.length === 0) {
    //   dispatch(getHotels());
    // }
  }, [dispatch]);


  const [favorites, setFavorites] = useLocalStorage("fav", []);

  return (
    <div className=" h-full md:m-h-screen w-full">
      <div className="container mx-auto px-0 md:px-4 py-4">
        {/* <div className="flex flex-wrap justify-center gap-4"> */}
          <InfiniteScroll dataLength={estadoHoteles.length} next={fetchMoreData} hasMore={hasMore} loader={<LoadHome/>} className="flex flex-wrap justify-center gap-4">
          {estadoHoteles.length > 0 ? (
            estadoHoteles
              .filter((h) => h.status !== false)
              .map((ht) => (
                //gracias al map, este se va parar en cada uno de los hoteles mapeados y lo va renderizar
                <Card
                  id={ht.id}
                  key={ht.id}
                  photos={ht.photos[0]}
                  stars={ht.stars}
                  location={ht.location}
                  city={ht.city}
                  price={ht.price}
                  // size={ht.room.size== null?ht.room.size:"No Data"}
                  name={ht.name}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              ))
          ) : (
            <LoadHome/>
          )}
          </InfiniteScroll>
        {/* </div> */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AllCards;
