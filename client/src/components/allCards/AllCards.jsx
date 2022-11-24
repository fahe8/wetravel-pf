import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Card from '../card/card'
import { getHotels } from '../../redux/action'



const AllCards = () => { //función que pide la información y la renderiza
  let estadoHoteles = useSelector(state => state.hotels) //state.hotels = hace referencia a uno de los estados de reducer
  const dispatch = useDispatch() 
console.log (estadoHoteles) //me muestra todos los hoteles por consola
//Simular algo antes, durante y después que se renderice --> dentro del useEffect despachar la acción que se necesite
  useEffect(() => {
    dispatch(getHotels())
  }, [dispatch])
  
  return (
    <div>
      <div>
        {estadoHoteles.length > 0 ? estadoHoteles.map(ht => 
        //gracias al map, este se va parar en cada uno de los hoteles mapeados y lo va renderizar
          <Card
            key={ht.id}
            photos={ht.photos}
            stars={ht.stars}
            location={ht.location}
            city={ht.city}
            price={ht.price}
            size={ht.size}
            name={ht.name}
          />
        ) : 
        <h1>Mensaje de alerta que no hay hoteles</h1>
        }
      </div>
      
    </div>
  )
}

export default AllCards
