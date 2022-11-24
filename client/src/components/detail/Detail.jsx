import React from 'react'
//import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../../redux/action'
import NavBar from '../navBar/NavBar'


const Detail = () => {
    let dispatch= useDispatch()

    
    let { id } = useParams();
    console.log(useParams())

    
    React.useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch,id])
   
    
    const selectedHotel = useSelector((state) => state.detail)
    console.log (selectedHotel)

  return (
      <div>
          <NavBar />
          <div>
             
                  <div>
                      <div>
                          <img src={selectedHotel.photos} alt="hotel" />
                          {/* Carrusel de imágenes */}
                      </div>
                      <div>
                          <h2>{selectedHotel.name}</h2>
                          <h3>{selectedHotel.stars}</h3>
                          <h3>{selectedHotel.location}, {selectedHotel.city}</h3>|
                          <h3>{selectedHotel.size}</h3>
                          <h3>{selectedHotel.price}</h3>
                          <br />
                          <div>
                              <h2>Description: </h2>
                              <hr/>
                              <p>{selectedHotel.description}</p>
                          </div>        
                          <br />
                          <div>
                              <h2>What does the place affter</h2>
                              <hr/>
                              <h3>{selectedHotel.room.properties}</h3>
                          </div>
                          <div>
                              <p> {selectedHotel.comments}</p>
                          </div>
                          
                      </div>
                  </div>
             
          </div>
      
    </div>
  )
}

export default Detail
