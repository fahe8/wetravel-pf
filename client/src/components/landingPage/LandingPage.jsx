import {React, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import Search from "../search/Search";
import {getHotels} from "../../redux/action/index.js"
import './Landing.css'
import { Footer } from "../footer/Footer";



function LandingPage() {
  let dispatch = useDispatch()
  useEffect(() => {
   dispatch(getHotels())
  }, []);
  return (
    <div className="overflow-hidden grid land">
      <NavBar />
      <div className="relative p-24 m-8">
        <Search></Search>
      </div>
      <div className=" mb-14 ">
        <Link to="/home">
          {" "}
          <button className="w-[200px] h-[80px] rounded-[44px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#A3C7D6] to-[#00B4FF]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
            {"Have a look"}
          </button>
        </Link>
      </div>
      <Footer/>
      </div>
      
  );
}

export default LandingPage;
