import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/action";
import { useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginWithRedirect, logout, user } = useAuth0();
  console.log('USER LOGIN:', user)
  const [userCondition, setUserCondition] = useState("guest");

  function handleGuest(e) {
    e.preventDefault();
    setUserCondition("guest");
    history.push("/huesped");
  }
  function handleHost(e) {
    e.preventDefault();
    setUserCondition("host");
    history.push("/anfitrion");
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
  }, [userCondition, dispatch]);

  return (
    <div>
      {!user ? (
          <div className="rounded content-center">
            <div>
              <h1>Elige como quieres iniciar sesión: </h1>
            </div>
            <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              // onClick={(e) => handleGuest(e)}
              onClick={() => loginWithRedirect()}
            >
              Ser Huesped
            </button>
            <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              // onClick={(e) => handleHost(e)}
              onClick={() => loginWithRedirect()}
            >
              Ser Hospedador
            </button>
            {/* <button
              className="w-[100px] h-[40px] border border-black mx-auto bg-[#00B4FF] rounded"
              onClick={() => loginWithRedirect()}
            >
              Log-in
            </button> */}

            {/* <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log-out
            </button> */}
          </div>
      ) : (
        <div>
          <h1><strong>Has iniciado sesión como Huesped</strong></h1>
          <img className="rounded" src={user?.picture} alt={user?.name} />
          <div>
            <p><strong>Usuario: </strong>{user?.name}</p>
          </div>
          <br />
          <div>
            <p><strong>Correo electrónico: </strong>{user?.email}</p>
          </div>
          <br />
          <div>
            <button onClick={(e) => handleGuest(e)} >Ir a mi perfil como Huesped</button>
            <br />
            <button onClick={(e) => handleHost(e)} >Ir a mi perfil como Anfitrión</button>
          </div>
          <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log-out
          </button>
        </div>
        // <button
        //   className="w-[100px] h-[40px] border border-black mx-auto bg-[#00B4FF] rounded"
        //   onClick={() => loginWithRedirect()}
        // >
        //   Log-in
        // </button>
      )}
    </div>
  );
}

export default Login;
