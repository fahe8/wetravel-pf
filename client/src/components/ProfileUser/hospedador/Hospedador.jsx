import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../navBar/NavBar";
import { Footer } from "../../footer/Footer";


const Hospedador = () => {
  const { logout, user } = useAuth0();
  return (
    <div>
      <div>
        <NavBar />
      </div>
      
        <div className="font-bold text-5xl pt-8">
        <h1>
          Hola {user?.name} , estás en modo Anfitrion u hospedador
        </h1>
      </div>
      <br/>
      
      <hr />

      <div className="m-10 text-xl text-center font-medium">
        <p>
          Para nosotros es de gran importancia que tú {user?.name} esté interesado
          en ser socio de WeTravel; 
        </p>
        <p>
          Nuestro equipo se encargará de darte visibilidad en el mundo de la hotelería
          y turismo con nuestra plataforma web.
        </p>
        <p>Allí podrás postear tu sitio de descanso, hotel, u hospedaje para que viajeros
          alrededor del mundo te puedan contactar y brindar tu servicio.
        </p>
        <p> Al momento de agregar tu hotel a nuestra plataforma tendrás que agregar
          una serie de datos relevantes con las principales características de tu sitio
          a ofrecer.
          Eso sí recomendamos que las fotografías que vayas a usar para agregar tu sitio
          deben de ser lo más reales posibles
        </p>

        <p>Debajo de este texto de bienvenida hay un botón que dice "Agrega tu hotel!",
          en el podrás tener acceso para registrar tu hotel con WeTravel
        </p>
      </div>
      <hr/>
      <br />
      <div className="text-2xl m-4 font-medium">
        <Link to="/createhotel">
          <button className="rounded-xl w-80 bg-slate-200 hover:bg-slate-300 p-2"
          >Agrega tu Hotel!</button>
        </Link>
      </div>
      <div className="text-2xl m-4 font-medium">
      <Link to="/login">
          <button
            className="rounded-xl w-80 bg-slate-150 hover:bg-slate-200 p-2"
          >Return to login</button>
        </Link>
        </div>
      <br />

     <div className="text-2xl m-4 font-medium">
      <Link to="/anfitrion/hotels">
          <button
            className="rounded-xl w-80 bg-slate-150 hover:bg-slate-200 p-2"
          >Ver mis hoteles</button>
        </Link>
        </div>
      <button
        className="bg-red-400 w-60 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log-out
      </button>
      
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Hospedador;
