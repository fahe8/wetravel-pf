import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card";
import { getHotels } from "../../redux/action";
import { Footer } from "../footer/Footer";
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadHome from "../Loading/loadingHome/LoadHome";
import Paginado from "../Paginado/Paginado"

const AllCards = () => {
  let estadoHoteles = useSelector((state) => state.hotels); 
  const hasMore = useSelector((state) => state.hasMore)
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search,setSearch] = useState("")
  const [order,setOrder] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const hotels = useSelector((state)=>state.hotels)
  
  function filteredHotels(){
    if(search.length===0){

    let filter = hotels.slice(currentPage,currentPage + 12)
   
    return filter
}
const filtered = hotels.filter(el=> el.name.toLowerCase().includes(search.toLowerCase()))
return filtered.slice(currentPage,currentPage + 12)
}

  // const fetchMoreData = () => {
  //       setPage(prevState => prevState + 1)
  //       setTimeout(() => {
  //         if(hasMore){
  //           dispatch(getHotels(page))
  //         }
  //       }, 1000);
  // };

  const [favorites, setFavorites] = useLocalStorage("fav", []);

  // useEffect(() => {
  //   dispatch(getHotels(1))
  //   setPage(prevState=>prevState+1)
  // }, [dispatch]);
  const onSearch= ({target})=>{
    setCurrentPage(0)
    setSearch(target.value.toLowerCase())
}
   useEffect(() => {
    dispatch(getHotels())
  }, []);

  return (
    <div className=" h-full md:m-h-screen w-full">
      <div className="container mx-auto px-0 md:px-4 py-4">
      <div>
            <input
                type="text"
                placeholder="Busca tu Hotel"
                value={search}
                onChange={onSearch}
                >
              </input>
         </div>
      <div>
          <Paginado
            currentPage={currentPage}
            hotels ={hotels}
            setCurrentPage={setCurrentPage}
            search={search}
           />
       </div>
      <div className="flex flex-wrap">
      {
        filteredHotels && filteredHotels().map((el)=>
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
        )
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