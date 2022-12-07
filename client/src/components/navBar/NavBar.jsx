import { React, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {BsCart4} from "react-icons/bs"
import Search from "../search/Search";
import logo from "../../assets/img/copia.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserById } from "../../redux/action";
import { useLocalStorage } from './useLocalStorage';

import './NavBar.css'

const NavBar = () => {
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const [state, setstate] = useState(false);

  const reserveByCart = useSelector((state) => state.reserveByCart);

  const [userCondition, setUserCondition] = useLocalStorage('user', 'host');

  function handleGuest(e) {
    e.preventDefault();
    setUserCondition("guest");
    history.push("/cart");
  }
  function handleHost(e) {
    e.preventDefault();
    setUserCondition("host");
    history.push("/createhotel");
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/") {
      setstate(true);
    }
  }, []);

  const handleReload = () => {
    history.push("/home");
    history.go(0);
  };

  return (
    
    <header className=" h-20 flex justify-between text-center back">
      <div className=" w-20 h-20 " onClick={handleReload}>

        <img src={logo} alt="logo-wetravel" className="w-full h-full " />
      </div>

    
      <nav className=" w-65 flex justify-between items-center text-xl gap-5">
        <Link to="/about">
          <p>About Us</p>
        </Link>
        <Link to="/favourites">
          <p>Favorito</p>
        </Link>
        <div className=" h-10 flex justify-between items-center gap-5  hover:bg-cyan-800 cursor-pointer p-7 rounded-full border-2 border-black">
          {!user && (
            <div>
              <Link to="/login">
                Iniciar sesion
              </Link>
            </div>
          )}
          {(user && userCondition === 'guest') && (
            <div className=" w-65 flex justify-between items-center text-xl gap-5">
            {<button onClick={handleGuest}><BsCart4/><p>{reserveByCart.length}</p></button> }
            <Link to="/login">
              <div className=" w-65 flex justify-between items-center text-xl gap-5">
                <p>{user?.name}</p>
                <img
                  src={user?.picture}
                  alt="icon"
                  className="bg-center bg-cover bg-no-repeat w-10 h-10 rounded-full"
                />
              </div>
            </Link>
          </div>
          )}
          {(user && userCondition === 'host') && (
            <div className=" w-65 flex justify-between items-center text-xl gap-5">
            <button onClick={handleHost}>Create New Hotel</button>
            <Link to="/login">
              <div className=" w-65 flex justify-between items-center text-xl gap-5">
                <p>{user?.name}</p>
                <img
                  src={user?.picture}
                  alt="icon"
                  className="bg-center bg-cover bg-no-repeat w-10 h-10 rounded-full"
                />
              </div>
            </Link>
          </div>
          )}
        </div>
      </nav>
      </header>
  
  );
};

export default NavBar;
