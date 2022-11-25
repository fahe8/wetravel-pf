import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "../search/Search";
import logo from "../../assets/img/copia.png";
import {useAuth0} from "@auth0/auth0-react"


const NavBar = () => {
  let location = useLocation();
  const {user, loginWithRedirect} = useAuth0()
  const [state, setstate] = useState(false);


  useEffect(() => {
    if (location.pathname === "/") {
      setstate(true);
    }
  }, []);

  return (
    <header className=" h-20 bg-[color:var(--second-bg-color)] flex justify-between text-center shadow-lg sticky top-0 z-10">
      <Link to={"/home"}>
      <figure className=" w-20 h-20 bg-cyan-700">
        <img src={logo} alt="logo-wetravel" className="w-full h-full " />
      </figure>
      </Link>
      <div className=" w-[60%] h-20  bg-white py-3 px-20">
        {!state && <Search></Search>}
      </div>
      <nav className=" w-65 flex justify-between items-center text-xl gap-5">
        <p>About Us</p>
        <div className=" h-10 flex justify-between items-center gap-5  hover:bg-cyan-800 cursor-pointer p-7 rounded-full border-2 border-black">

        { user?
        <>
        <Link to='/login'> 
         <p>{user?.name}</p>
         </Link>
        </>
          : (<p onClick={() => loginWithRedirect() }>Iniciar sesion</p>  
          )
        }
        
        { user?
        <>
          <Link to='/login'> 
            <img src={user.picture} alt="icon" className="bg-center bg-cover bg-no-repeat w-10 h-10 rounded-full" />
          </Link>
        </>
         :(<span  className=" bg-[url('/src/assets/icons/user.svg')] bg-center bg-cover bg-no-repeat w-10 h-10"></span>)
        }
        </div>
      </nav>
  
    </header>
  );
};

export default NavBar;
