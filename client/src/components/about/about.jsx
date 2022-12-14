import React from 'react'
import NavBar from '../navBar/NavBar';
import { Footer } from '../footer/Footer';
import { Link } from 'react-router-dom';
import Cards from './Cards';

function About() {
  return (
    <div >
      <NavBar />
      <div  >
        <div className='text-5xl text-left font-semibold bg-slate-50 p-7'>
          <h1>About us WeTravel</h1>
        </div>
        <hr/>

        <div>
          <p className='text-xl mx-3 mb-5 mt-1 '>WeTravel es la plataforma donde podes conseguir hospedaje y tambien ser hospedador, facilicitamos todo el entorno de busqueda ya que podes usar multiples filtros para conseguir un lugar a tu medida.</p>
        </div>

        <div className='grid grid-cols-3 m-4 p-2  shadow rounded-md'>
          <div className='col-span-2'>
            
            <div className='text-xl text-justify p-3 mr-4'>
              <p>En WeTravel nos encargamos de brindarte la mejor atencion para poder tener una estadia comoda y facilitada en el hotel donde necesites ir .WeTravel comienza como un proyecto pequeño entre 8 personas con el fin de brindar antencion a aquellas personas que necesitan una estadía.
                </p>
              <p>Nuestro sistema de resultados de hoteles varia segun la puntuacion de nuestros clientes y de nuestra comunidad.</p>
              <p> Desde WeTravel agradecemos enormemente la ayuda que nos proveen los comentarios.</p>
              <p>En WeTravel nos tomamos muy enserio la opinoin de nuestros clientes por eso te pedimos por favor que dejes tus comentarios o consultas en nuestra pagina para poder seguir mejorando.</p>
              </div>
          </div>

          <div>
            <img className='rounded' src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80"alt="iconWeTravel" />

          </div>
            
        </div>

            <div className='block'>
              <h2 className='text-5xl text-left font-semibold ml-4'>Nuestro Equipo</h2>
        </div>
        
        <br />
          
          <div>
            <p className='text-xl text-justify mx-4 mt-2'>En WeTravel nos encargamos de brindarte la mejor atencion para poder tener una estadia comoda y facilitada en el hotel donde necesites ir .WeTravel comienza como un proyecto pequeño entre 8 personas con el fin de brindar antencion a aquellas personas que necesitan una estadia,Nuestro sistema de resultados de hoteles varia segun la puntuacion de nuestros clientes y de nuestra comunidad, Desde WeTravel agradecemos enormemente la ayuda que nos proveen los comentarios .En WeTravel nos tomamos muy enserio la opinoin de nuestros clientes por eso te pedimos por favor que dejes tus comentarios o consultas en nuestra pagina para poder seguir mejorando.</p>
          </div>
          <br/>
       
        
        <br />
       
        <div className='m-3'>
          <Cards/>
        </div>

        <hr/>
           
      </div>
         <div >
              <p className='text-xl text-justify mx-8 mt-2'>Te invitamos a que te aventures en el mundo atraves de nuestros servicios y disfrutes de esta agradable experiencia. Esperamos desde WeTravel que encuentres una experiencia de usuario gratificante y contenedora al recorrer nuestra pagina. </p>
          </div>

          <div className='m-3'>
            <Link to="/home">
                <button className="bg-[color:var(--second-bg-color)] p-3 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] ">Comenzar</button>
              </Link>
        </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default About;