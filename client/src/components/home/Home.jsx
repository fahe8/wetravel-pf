import React, { useState } from "react"
import NavBar from "../navBar/NavBar";
import AllCards from "../allCards/AllCards";
import Filters from "../filters/Filters";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";


function Home() {
  const allHotels = useSelector((state) => state.hotels)
  const [dataSource, setDataSource] = useState(allHotels)
  const [hasMore,sethasMore] =useState(true)

  const moreData = ()=> {
    const data = allHotels
    setTimeout(()=>{
      setDataSource(dataSource.concat(data))
    },500)
  }

  return (
    <div>
      <NavBar />
      <div>
        <Filters></Filters>
        <InfiniteScroll dataLength={dataSource.length} loader={<p>loading..</p>} next={moreData} hasMore={hasMore}>
        <AllCards/>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
