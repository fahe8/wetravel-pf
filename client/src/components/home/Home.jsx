import React, {useEffect} from "react"
import NavBar from "../navBar/NavBar";
import AllCards from "../allCards/AllCards";
import Filters from "../filters/Filters";
import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserById, getUser } from "../../redux/action/index" 
import { useState} from "react";



function Home() {
  const dispatch = useDispatch()
  const {user} = useAuth0()
  const userDB = useSelector(state => state.userId)
  const { users } = useSelector( state => state)
  const [search,setSearch] = useState("")
  const [order,setOrder] = useState("")
  const [currentPage, setCurrentPage] = useState(0)

  const hotels = useSelector((state)=>state.hotels)
  
  function filteredHotels(){
    if(search.length===0){

    let filter = hotels.slice(currentPage,currentPage + 12)
    return filter
}
const filtered = hotels.filter(el=> el.name.includes(search))
return filtered.slice(currentPage,currentPage + 12)
}
const onSearch= ({target})=>{
    setCurrentPage(0)
    setSearch(target.value)
}
  useEffect(() => {
    if(user){
      dispatch(getUserById(user.email))
    }
    dispatch(getUser())
  }, [dispatch]);

    return (
      <>
      {user && users?.map( el => {
          if(el.baned === true && el.email === user.email ){
            window.location.href = "http://localhost:3000/baned"
          }
        })  
      } 
      <>
    
       <NavBar />
        <>
        <Filters></Filters>
        
        <AllCards/>
        </>
      

        </>
      </>
    );
  
  }

export default Home;


// {else{
//   <div className="bg-gray-100">
  
//    <div>
//      <Filters></Filters>
//      <AllCards/>
//    </div>
 
//  </div>
// }}