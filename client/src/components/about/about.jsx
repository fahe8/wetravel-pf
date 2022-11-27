import React from 'react'
import NavBar from '../navBar/NavBar';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className=''>
        <NavBar/>
        <div className='bg-[color:var(--about-color)] flex flex-row rounded-lg relative mt-5 mx-5' >
            <img className='rounded-lg' src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80"alt="iconWeTravel" width="800px" />
            <div className='block'>
              <h2 className='text-5xl mb-6 mt-4 text-left ml-5 '>Acerca de nosotros</h2>
              <p className='text-xl text-left ml-5 mr-2'>WeTrevel es una plataforma donde podes conseguir hospedaje y tambien ser hospedador, facilicitamos todo el entorno de busqueda ya que podes usar multiples filtros para conseguir un lugar a tu medida.</p>
              <br></br>
              <p className='text-xl text-left ml-5 mr-2'>En WeTravel nos encargamos de brindarte la mejor atencion para poder tener una estadia comoda y facilitada en el hotel donde necesites ir .WeTravel comienza como un proyecto pequeño entre 8 personas con el fin de brindar antencion a aquellas personas que necesitan una estadia,Nuestro sistema de resultados de hoteles varia segun la puntuacion de nuestros clientes y de nuestra comunidad, Desde WeTravel agradecemos enormemente la ayuda que nos proveen los comentarios .En WeTravel nos tomamos muy enserio la opinoin de nuestros clientes por eso te pedimos por favor que dejes tus comentarios o consultas en nuestra pagina para poder seguir mejorando.</p>
              <br></br>
              <p>Te invitamos a que te aventures en el mundo atraves de nuestros servicios y disfrutes de esta agradable experiencia. Esperamos desde WeTravel que encuentres una experiencia de usuario gratificante y contenedora al recorrer nuestra pagina. </p>
              <Link to="/home">
                <button className='bg-white border-2 p-2 rounded hover:bg-black hover:rounded hover:text-white mt-5 text-xl flex ml-5'>Comenzar</button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default About;