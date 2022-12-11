import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/action";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { Footer } from "../footer/Footer";
import NavBar from "../navBar/NavBar";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginWithRedirect, logout, user } = useAuth0();


  const [userCondition, setUserCondition] = useLocalStorage('user', 'guest');


  function handleGuest(e) {
    e.preventDefault();
    setUserCondition("guest");
    history.push("/huesped")
  }
  function handleHost(e) {
    e.preventDefault();
    setUserCondition("host");
    history.push("/anfitrion")
  }

  useEffect(() => {
    if (user) {
      dispatch(
        postUser({
          name: user.name,
          email: user.email,
          email_verified: user.email_verified,
          status: userCondition,
        })
      );
    }
  }, [userCondition, dispatch, user]);

  ///////////////////////////////////////////
  if (!user) {
    return (
      <div className="rounded content-center">
        <div>
          <NavBar/>
        </div>
        <div className="m-8 text-3xl font-semibold ">
          <h1>Bienvenido usuario a We Travel</h1>
        </div>
        <hr/>
        <div className="m-6 font-medium text-base">
        <p>No se si has escuchado de nosotros?
          Pero hoy te hacemos la invitación para que seas socio de WeTravel.
          Nuestro equipo de desarrolladores Web se han encargado de crear este sitio Web 
          para que tu lo puedas disfrutar.
        </p>
        <p>En nustro sitio tu podrás encontrar hoteles o sitios para hospedarte al rededor del mundo con una gran diversidad
          de presupuestos y servicios. 
        </p>
        <p>Tamién podrás ser socio de wetravel, teniendo la posibilidad de postear tu hotel o sitio de hospedaje y dar visibilidad a tu lugar
          de descanso y servicios ofrecidos
          </p>
        </div>
        
        <div className="m-6 font-semibold text-lg">
          <h3>La decisión está a tan solo un click de distancia</h3>
        </div>


        <button
          className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
          onClick={() => {loginWithRedirect();  setUserCondition("guest");}}
        >
          Ser Huesped
        </button>
        <button
          className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
          onClick={() => {loginWithRedirect(); setUserCondition("host");}}
        >
          Ser Hospedador
        </button>
        <div>
          <Footer />
        </div>

      </div>
    );
  }
  ///////////////////////////////////////////////////////////
  else if (user && userCondition === 'guest') {
    return (

      <div>
        <div>
          <NavBar/>
        </div>

      <div>
          <div className="m-8 text-3xl font-semibold ">
          <h1>Bienvenido viajero!</h1>
          </div>
          <div className="grid grid-cols-2 mx-24 mt-20 shadow-md ">
            <div>
              <img className="m-auto w-60 h-60 rounded-3xl " src={user?.picture} alt={user?.name} />
            </div>
            <div className="shadow-md">
              <div className="m-4 text-xl">
                <p> <strong>Usuario: </strong> {user?.name}</p>
              </div>
              <hr/>
              <div className="m-4 text-xl">
                <p><strong>Correo electrónico: </strong>{user?.email}</p>
              </div>
              <hr />
               <div className="m-4 text-xl">
                <p><strong>Estado:</strong> Huesped/guest</p>
              </div>
              <hr />
              <div className="m-4 poitner font-medium">
                <button className=" rounded-xl w-40 hover:bg-slate-100 p-2" onClick={(e) => handleGuest(e)}> Ir a mi perfil como Huesped</button>
                <br/>
                <button className=" rounded-xl w-40 hover:bg-slate-100 p-2"  onClick={(e) => handleHost(e)} >Ir a mi perfil como Anfitrión</button>
              </div>
            </div>
          </div>
          <div className="m-4">
            <button
              className="bg-red-400 w-60 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              onClick={() => logout({ returnTo: window.location.origin })}>
              Log-out
            </button>
            </div>
        </div>
        <div>
          <Footer />
        </div>
        </div>
    );
  }
  //////////////////////////////////////////////////////////////////////
  else if (user && userCondition === 'host') {
    return ( 
      <div>
        <div>
          <NavBar/>
        </div>

      <div>
          <div className="m-8 text-3xl font-semibold ">
          <h1>Bienvenido anfitrión!</h1>
          </div>
          <div className="grid grid-cols-2 mx-24 mt-20 shadow-md ">
            <div>
              <img className="m-auto w-60 h-60 rounded-3xl " src={user?.picture} alt={user?.name} />
            </div>
            <div className="shadow-md">
              <div className="m-4 text-xl">
                <p> <strong>Usuario: </strong> {user?.name}</p>
              </div>
              <hr/>
              <div className="m-4 text-xl">
                <p><strong>Correo electrónico: </strong>{user?.email}</p>
              </div>
              <hr />
              <hr />
               <div className="m-4 text-xl">
                <p><strong>Estado:</strong> Anfitrión/host</p>
              </div>
              <hr />
              <div className="m-4 poitner font-medium">
                <button className=" rounded-xl w-40 hover:bg-slate-100 p-2" onClick={(e) => handleGuest(e)}> Ir a mi perfil como Huesped</button>
                <br/>
                <button className=" rounded-xl w-40 hover:bg-slate-100 p-2"  onClick={(e) => handleHost(e)} >Ir a mi perfil como Anfitrión</button>
              </div>
            </div>
          </div>
          <div className="m-4">
            <button
              className="bg-red-400 w-60 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              onClick={() => logout({ returnTo: window.location.origin })}>
              Log-out
            </button>
            </div>
        </div>
        <div>
          <Footer />
        </div>
        </div>
    );
  }
}

export default Login;
