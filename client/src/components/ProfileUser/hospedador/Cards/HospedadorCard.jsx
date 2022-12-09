import React from 'react'
import {Link} from 'react-router-dom'


const HospedadorCard = ({
  hotel

}) => {


  return (
    <div className='bg-red-50'>

      <div>
        {hotel.name}

        {hotel.price}
        {hotel.continent}
        {hotel.location}
        {hotel.city}
        <button>Eliminar</button>
        <Link to={"/edithotel/"+ hotel.id}>
        <button>Editar</button>
        </Link>
      </div>
       
      
    </div>
  )
}

export default HospedadorCard
