import React from 'react';
import { Link } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

const Hospedador = () => {
  // const { loginWithRedirect, logout, user } = useAuth0();
  return (
    <div>
      <nav>
        <p>Bienvenidos a WeTravel</p>
      </nav>
      <br />
      <div>
        <h1>WeTravel es una plataforma, donde podras ofrecer hospedaje a las diferentes personas que deseen adquirir de tus servicios...</h1>
      </div>
      <br />
      <div>
        <Link to='/createhotel' >
          <button>
            Click here to create hotel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hospedador;