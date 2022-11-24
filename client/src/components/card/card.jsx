import React from 'react';
import {Link} from 'react-router-dom'
//import Carousel from '../carousel/Carousel';

function Card({ // recibir los datos que se ven en la card por propiedades
  id,
  photos,
  stars,
  location,
  city,
  price,
  size,
  name
}) {
  return (
    <div>
    <div>
    <img src={photos} alt={name}/>
    </div>
    <Link to ={`/home/${id}`}>
      <div>
      <h3>{stars}</h3>
      <h3>{location}, {city}</h3>        
      <h3>{price}</h3>
        <h3>{size}</h3>
        <h3>{id}</h3>
      </div>
    </Link>
  </div>
  )
}

export default Card;