import React from 'react'
import ConfirmacionCards from './card/ConfirmacionCards'
import { Footer } from '../footer/Footer'
import NavBar from '../navBar/NavBar'
import { Link } from 'react-router-dom'

// import Link from 'react-router-dom'

const Confirmacion = () => {
  return (
    <div>
      <div>
        <NavBar/>
        
      </div>
          <h1>Felicidades por tu compra</h1>

          <div>
              <button>
                  Enviar información al correo
              </button>
      </div>
      <div>
        <ConfirmacionCards/>
      
      </div>

      <div>
        <Link to="/home">
        
          <button> To Home</button>
        </Link>
       
       
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Confirmacion
