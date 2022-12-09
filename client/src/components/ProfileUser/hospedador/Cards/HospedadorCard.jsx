import React from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { getDetail } from '../../../../redux/action'

const HospedadorCard = ({

  hotel

}) => {
  const dispatch = useDispatch()

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
        <button onClick={() => dispatch(getDetail(hotel.id))}>Editar</button>
        </Link>
      </div>
       
      
    </div>
  )
}

export default HospedadorCard
