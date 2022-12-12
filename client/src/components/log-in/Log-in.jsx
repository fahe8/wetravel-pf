import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../redux/action";
import { useHistory } from "react-router-dom";
import { Footer } from "../footer/Footer";
import NavBar from "../navBar/NavBar";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginWithRedirect, logout, user } = useAuth0();
  const userDb = useSelector((state) => state.userId);

  useEffect(() => {
    if (user) {
      dispatch(getUserById(user.email));
    }
  }, [dispatch, user]);

  ///////////////////////////////////////////
  if (!user) {
    return (
      <div className="rounded content-center">
        <div>
          <NavBar />
        </div>
        <div className="m-8 text-3xl font-semibold ">
          <h1>Bienvenido usuario a We Travel</h1>
        </div>
        <hr />
        <div className="m-6 font-medium text-base">
          <p>
            No se si has escuchado de nosotros? Pero hoy te hacemos la
            invitación para que seas socio de WeTravel. Nuestro equipo de
            desarrolladores Web se han encargado de crear este sitio Web para
            que tu lo puedas disfrutar.
          </p>
          <p>
            En nustro sitio tu podrás encontrar hoteles o sitios para hospedarte
            al rededor del mundo con una gran diversidad de presupuestos y
            servicios.
          </p>
          <p>
            Tamién podrás ser socio de wetravel, teniendo la posibilidad de
            postear tu hotel o sitio de hospedaje y dar visibilidad a tu lugar
            de descanso y servicios ofrecidos
          </p>
        </div>

        <div className="m-6 font-semibold text-lg">
          <h3>La decisión está a tan solo un click de distancia</h3>
        </div>

        <button
          className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Log In
        </button>

        <div>
          <Footer />
        </div>
      </div>
    );
  }
  ///////////////////////////////////////////////////////////
  else if (user) {
    return (
      <div>
        <div>
          <NavBar />
        </div>

        <div>
          <div className="m-8 text-3xl font-semibold ">
            {userDb.status === "guest" && <p>Bienvenido viajero!</p>}
            {userDb.status === "host" && <p>Bienvenido host!</p>}
            {userDb.status === "admin" && <p>Bienvenido admin!</p>}
          </div>
          <div className="grid grid-cols-2 mx-24 mt-20 shadow-md ">
            <div>
              <img
                className="m-auto w-60 h-60 rounded-3xl "
                src={user?.picture}
                alt={user?.name}
              />
            </div>
            <div className="shadow-md">
              <div className="m-4 text-xl">
                <p>
                  <strong>Usuario: </strong> {user?.name}
                </p>
              </div>
              <hr />
              <div className="m-4 text-xl">
                <p>
                  <strong>Correo electrónico: </strong>
                  {user?.email}
                </p>
              </div>
              <hr />
              <div className="m-4 text-xl">
                {userDb.status === "guest" && (
                  <p>
                    <strong>Estado:</strong> Huesped/guest
                  </p>
                )}
                {userDb.status === "host" && (
                  <p>
                    <strong>Estado:</strong> Hospedador/host
                  </p>
                )}
                {userDb.status === "admin" && (
                  <p>
                    <strong>Estado:</strong> Admin/Admin
                  </p>
                )}
              </div>
              <hr />
              {userDb.status !== "admin" && (
                <div className="m-4 poitner font-medium">
                  <button
                    className=" rounded-xl w-40 hover:bg-slate-100 p-2"
                    onClick={() => {
                      dispatch(updateUser(user.email, { status: "guest" }));
                      history.push("/huesped");
                    }}
                  >
                    Ir a mi perfil como Huesped
                  </button>
                  <br />
                  <button
                    className=" rounded-xl w-40 hover:bg-slate-100 p-2"
                    onClick={() => {
                      dispatch(updateUser(user.email, { status: "host" }));
                      history.push("/anfitrion");
                    }}
                  >
                    Ir a mi perfil como Anfitrión
                  </button>
                  <br />
                </div>
              )}
            </div>
          </div>
          <div className="m-4">
            <button
              className="bg-red-400 w-60 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
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
