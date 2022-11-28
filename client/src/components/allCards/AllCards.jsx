import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Card from '../card/card'
import { getHotels } from '../../redux/action'
// import InfiniteScroll from "react-infinite-scroll-component";



const AllCards = () => { //función que pide la información y la renderiza
  let estadoHoteles = useSelector(state => state.hotels) //state.hotels = hace referencia a uno de los estados de reducer
  const dispatch = useDispatch() 
//console.log (estadoHoteles) //me muestra todos los hoteles por consola
//Simular algo antes, durante y después que se renderice --> dentro del useEffect despachar la acción que se necesite
  useEffect(() => {
    if (estadoHoteles.length === 0) {
      dispatch(getHotels());
    }
  }, [dispatch])
  
  return (
    <div className='bg-gray-100 h-full md:h-screen w-full'>
      <div className='container mx-auto px-0 md:px-4 py-4' >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4'>
        {estadoHoteles.length > 0 ? estadoHoteles.map((ht) => 
        //gracias al map, este se va parar en cada uno de los hoteles mapeados y lo va renderizar
          <Card
            id={ht.id}
            key={ht.id}
            photos={ht.photos}
            stars={ht.stars}
            location={ht.location}
            city={ht.city}
            price={ht.price}
            // size={ht.room.size== null?ht.room.size:"No Data"}
            name={ht.name}
          />
        ) : 
        <h1>Mensaje de alerta que no hay hoteles</h1>
          }
          </div>
      </div>
      
    </div>
  )
}

export default AllCards