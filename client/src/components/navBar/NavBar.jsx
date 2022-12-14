import { React, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import logo from "../../assets/img/copia2.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/action";
import "./NavBar.css";

const NavBar = () => {
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const userDb = useSelector((state) => state.userId);
  // console.log('USUARIO:', user)
  const [state, setstate] = useState(false);

  // const reserveByCart = useSelector((state) => state.reserveByCart);
  const { reserveByCart } = useSelector((state) => state);

  // const [userCondition, setUserCondition] = useLocalStorage("user", "host");

  useEffect(() => {
    if (user) {
      dispatch(getUserById(user.email));
    }
  }, [dispatch, user]);

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
    <header className=" h-20 flex justify-between text-center back z-10">
      <div className="cursor-pointer w-20 h-20 " onClick={handleReload}>
        <img src={logo} alt="logo-wetravel" className="w-full h-full " />
      </div>

      <nav className=" w-65 flex items-center text-xl gap-4 ">
        <Link to="/about" className=" p-2  hover:bg-[#FEF9EF] rounded link">
          <p className="px-2">About Us</p>
        </Link>
        <Link to="/images" className=" p-2  hover:bg-[#FEF9EF] rounded">
          <p className="px-2">Imagenes</p>
        </Link>
        <Link to="/favourites" className=" p-2  hover:bg-[#FEF9EF] rounded">
          <p className="px-2">Favorito</p>
        </Link>
        {user && userDb?.status === "guest" && (
          <Link to={"/cart"} className=" p-2  hover:bg-[#FEF9EF] rounded">
            <button className="flex relative text-black pr-2">
              <BsCart4 />
              <p className=" text-base absolute -right-1 -top-2">
                {reserveByCart.length}
              </p>
            </button>
          </Link>
        )}
        {user && userDb?.status === "host" && (
          <Link to={"/createhotel"} className=" p-2 border-black border-r-2 hover:bg-[#FEF9EF] rounded">
            <button>Create New Hotel</button>
          </Link>
        )}
        {user && userDb?.status === "admin" && (
          <Link to={"/Dashboard"} className=" p-2  hover:bg-[#FEF9EF] rounded">
            <button>Dashboard</button>
          </Link>
        )}
         <Link to="/login">
                  
        <div className=" btn  text-black bg-gradient-to-r  focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-black border cursor-pointer">
          {!user && (
            <div className=" w-65 flex justify-between items-center text-xl gap-5">
              <div>
               
                Iniciar sesion
              </div>
            </div>
          )}
          {user && (
            <div className=" w-65 flex justify-between items-center text-xl gap-5 ">
              <Link to="/login">
                <div className=" w-65 flex justify-between items-center text-xl gap-5">
                  <p>{user?.name}</p>
                  {
                    user?.email? <img
                    src={user?.picture}
                    alt="icon"
                    className="bg-center bg-cover bg-no-repeat w-10 h-10 rounded-full"
                  />: <img
                  src={"f"}
                  alt="icon"
                  className="bg-center bg-cover bg-no-repeat w-10 h-10 rounded-full"
                />
                  }
                  
                </div>
              </Link>
            </div>
          )}
         
        </div>
                  </Link>
      </nav>
    </header>
  );
};

export default NavBar;
