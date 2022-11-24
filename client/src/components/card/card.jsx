import React from 'react';
//import Carousel from '../carousel/Carousel';

function Card({ // recibir los datos que se ven en la card por propiedades
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
      <h3>{stars}</h3>
      <h3>{location}, {city}</h3>
      <h3>{price}</h3>
      <h3>{size}</h3>
      
    </div>
  )
}

export default Card;