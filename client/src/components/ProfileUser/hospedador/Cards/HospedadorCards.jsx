import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../../redux/action';
import HospedadorCard from './HospedadorCard';

const HospedadorCards = () => {

    let estadoUser = useSelector(state => state.users);
    const dispatch = useDispatch();
    console.log (estadoUser)

    useEffect(() => {
        if (estadoUser.length === 0) {
            dispatch(getUser())
        }
    }, [])

  return (
      <div>
           <div>
              {estadoUser.length > 0 ? estadoUser.map((us) => 
                  <HospedadorCard
                      name={us.name}
                      email={us.email}
                     
                  />
              ) : 
                  <div>
                      <h1> No tienes hoteles para mostrar</h1>
                  </div>
              }
          </div>
    </div>
  )
}

export default HospedadorCards
