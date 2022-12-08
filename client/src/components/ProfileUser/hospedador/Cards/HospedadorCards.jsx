import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../../../redux/action';
import HospedadorCard from './HospedadorCard';
import { useAuth0 } from "@auth0/auth0-react";

const HospedadorCards = () => {

    let estadoUser = useSelector(state => state.users);
    const dispatch = useDispatch();
  const { user } = useAuth0();

    console.log (estadoUser)

    useEffect(() => {
        if (estadoUser.length === 0) {
            dispatch(getUserById(user?.email))
        }
    }, [dispatch])

  return (
      <div>
           <div>
              {estadoUser.length > 0 ? estadoUser.map((us) => 
                  <HospedadorCard
                      name={us.name}
                      email={us.email}
                      hotels={us.hotels}
                     
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
