import React, {useEffect} from "react"
import NavBar from "../navBar/NavBar";
import AllCards from "../allCards/AllCards";
import Filters from "../filters/Filters";
import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserById } from "../../redux/action/index" 




function Home() {
  const dispatch = useDispatch()
  const {user} = useAuth0()
  const userDB = useSelector(state => state.userId)

  useEffect(() => {
    if(user){
      dispatch(getUserById(user.email))
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div>
        <Filters></Filters>
        <AllCards/>
      </div>
     
    </div>
  );
}

export default Home;
