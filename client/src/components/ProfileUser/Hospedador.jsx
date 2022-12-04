import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Hospedador = () => {
  const { loginWithRedirect, logout, user } = useAuth0();
  return (
    <div>
      <nav>
        <p>
          <strong>Bienvenidos a WeTravel</strong>
        </p>
      </nav>
      <br />
      <div>
        <h1>
          WeTravel es una plataforma, donde podras ofrecer hospedaje a las
          diferentes personas que deseen adquirir de tus servicios...
        </h1>
      </div>
      <br />
      <div>
        <Link to="/createhotel">
          <button>Click here to create hotel</button>
        </Link>
      </div>
      <Link to="/login">
        <button>Return to login</button>
      </Link>
      <br />
      <button
        className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log-out
      </button>
    </div>
  );
};

export default Hospedador;
