import React from 'react'
import NavBar from '../../../navBar/NavBar'
import { useAuth0 } from "@auth0/auth0-react";
import { Footer } from '../../../footer/Footer'
import HospedadorCards from '../Cards/HospedadorCards';

export const HotelsHos = () => {
    const {user} = useAuth0
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
          <hr />
          
          <div>
              <HospedadorCards/>
              
          </div>

          <div>
              <Footer/>
          </div>


          
          </div>
         
  )
}
