import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postUser, updateUser } from "../../redux/action";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../navBar/useLocalStorage";

function Login(props) {
  let { id } = props.match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginWithRedirect, logout, user } = useAuth0();
  console.log("USER LOGIN:", user);
  
  // const initialState = {
  //   name: "",
  //   email: "",
  //   email_verified: false,
  //   status: "guest" ? "guest" : "host",
  //   photos: [],
  // };

  // const [input, setInput] = useState(initialState);

  // const [userCondition, setUserCondition] = useLocalStorage('user', 'guest');
  const [userCondition, setUserCondition] = useLocalStorage('user', 'host');
  console.log('ESTADO DEL USERS:',userCondition);

  function handleGuest(e) {
    e.preventDefault();
    setUserCondition("guest");

  }
  function handleHost(e) {
    e.preventDefault();
    setUserCondition("host");

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

  useEffect(() => {
    dispatch(updateUser(id));
  }, [dispatch, id]);

  if (!user) {
    return (
      <div className="rounded content-center">
        <div>
          <h1>Elige como quieres iniciar sesión: </h1>
        </div>
        <button
          className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
          onClick={() => loginWithRedirect()}
        >
          Ser Huesped
        </button>
        <button
          className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
          onClick={() => loginWithRedirect()}
        >
          Ser Hospedador
        </button>
      </div>
    );
  } else if (user && userCondition === 'guest') {
    return (
      <div>
          <h1>
            <strong>Has iniciado sesión como Huesped</strong>
          </h1>
          <img className="rounded" src={user?.picture} alt={user?.name} />
          <div>
            <p>
              <strong>Usuario: </strong>
              {user?.name}
            </p>
          </div>
          <br />
          <div>
            <p>
              <strong>Correo electrónico: </strong>
              {user?.email}
            </p>
          </div>
          <br />
          <div>
            <button onClick={(e) => handleGuest(e)}>
              Ir a mi perfil como Huesped
            </button>
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
    );
  } else if (user && userCondition === 'host') {
    return (
      <div>
          <h1>
            <strong>Has iniciado sesión como Anfitrión</strong>
          </h1>
          <img className="rounded" src={user?.picture} alt={user?.name} />
          <div>
            <p>
              <strong>Usuario: </strong>
              {user?.name}
            </p>
          </div>
          <br />
          <div>
            <p>
              <strong>Correo electrónico: </strong>
              {user?.email}
            </p>
          </div>
          <br />
          <div>
            <button onClick={(e) => handleGuest(e)} >Ir a mi perfil como Huesped</button>
            <br />
            <button onClick={(e) => handleHost(e)}>
              Ir a mi perfil como Anfitrión
            </button>
          </div>
          <button
            className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log-out
          </button>
        </div>
    );
  }
}

export default Login;
