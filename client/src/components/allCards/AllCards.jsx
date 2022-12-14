import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card";
import { getHotels } from "../../redux/action";
import { Footer } from "../footer/Footer";
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadHome from "../Loading/loadingHome/LoadHome";

const AllCards = () => {
  let estadoHoteles = useSelector((state) => state.hotels); 
  const hasMore = useSelector((state) => state.hasMore)
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
        setPage(prevState => prevState + 1)
        setTimeout(() => {
          if(hasMore){
            dispatch(getHotels(page))
          }
        }, 1000);
  };

  const [favorites, setFavorites] = useLocalStorage("fav", []);

  useEffect(() => {
    dispatch(getHotels(1))
    setPage(prevState=>prevState+1)
  }, [dispatch]);

  return (
    <div className=" h-full md:m-h-screen w-full">
      <div className="container mx-auto px-0 md:px-4 py-4">
          <InfiniteScroll dataLength={estadoHoteles.length} next={fetchMoreData} hasMore={hasMore} loader={<LoadHome/>} className="flex flex-wrap justify-center gap-4">
          {estadoHoteles.length > 0 ? (
            estadoHoteles
              .filter((h) => h.status !== false)
              .map((ht) => (
                <Card
                  id={ht.id}
                  key={ht.id}
                  photos={ht.photos[0]}
                  stars={ht.stars}
                  location={ht.location}
                  city={ht.city}
                  price={ht.price}
                  name={ht.name}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              ))
          ) : (
            <LoadHome/>
          )}
          </InfiniteScroll>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AllCards;