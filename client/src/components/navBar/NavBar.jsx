import { React, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Search from "../search/Search";
import logo from "../../assets/img/copia.png";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = ({ handleGuest, handleHost }) => {
  let location = useLocation();
  let history = useHistory();
  const { user, loginWithRedirect } = useAuth0();
  console.log("USER:", user);
  const [state, setstate] = useState(false);

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
    <header className=" h-20 bg-[color:var(--second-bg-color)] flex justify-between text-center shadow-lg sticky top-0 z-10">
      <figure className=" w-20 h-20 bg-cyan-700" onClick={handleReload}>
        <img src={logo} alt="logo-wetravel" className="w-full h-full " />
      </figure>

      <div className=" w-[60%] h-20  bg-white py-3 px-20">
        {!state && <Search></Search>}
      </div>
      <nav className=" w-65 flex justify-between items-center text-xl gap-5">
        <Link to="/about">
          <p>About Us</p>
        </Link>

        <div className=" h-10 flex justify-between items-center gap-5  hover:bg-cyan-800 cursor-pointer p-7 rounded-full border-2 border-black">
          {!user ? (
            <div>
              <Link to="/login">
                <button onClick={() => loginWithRedirect()}>
                  Iniciar sesion
                </button>
                {/* <span className=" bg-[url('/src/assets/icons/user.svg')] bg-center bg-cover bg-no-repeat w-10 h-10"></span> */}
              </Link>
            </div>
          ) : user === "guest" ? (
            <div className=" w-65 flex justify-between items-center text-xl gap-5">
              <Link to="/carrito">
                <button>Carrito</button>
              </Link>
              <Link to="/login">
                <div className=" w-65 flex justify-between items-center text-xl gap-5">
                  <p>{user.name}</p>
                  <img
                    src={user.picture}
                    alt="icon"
                    className="bg-center bg-cover bg-no-repeat w-10 h-10 rounded-full"
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className=" w-65 flex justify-between items-center text-xl gap-5">
              <Link to="/createhotel">
                <button onChange={(e) => handleHost(e)}>
                  Create New Hotel
                </button>
              </Link>
              <Link to="/login">
                <div className=" w-65 flex justify-between items-center text-xl gap-5">
                  <p>{user.name}</p>
                  <img
                    src={user.picture}
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
