import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReservesUser } from '../../../redux/action'
import ConfirmacionCard from './ConfirmacionCard'
import { useAuth0 } from '@auth0/auth0-react'

 const ConfirmacionCards = () => {

     let estadoReserva = useSelector((state) => state.reserve);
     const dispatch = useDispatch();
     const { user } = useAuth0()
    
     useEffect(() => {
         dispatch(getReservesUser(user?.email));
     }, [dispatch, user])

     console.log("console log de " + estadoReserva)
     console.log("console log de" + user?.email)
     console.log(getReservesUser);

    return (
        <div>
            <div>
                <div>
                    {estadoReserva?.reserves ? (
                        estadoReserva?.reserves?.map((reserv) => 
                            <ConfirmacionCard
                                nameHotel={reserv.nameHotel}
                                price={reserv.nameHotel} />)
                    ) : (
                            <h1>No hya compras hechas hasta el momento </h1>
                    )   }
                </div>
            </div>
      
    </div>
  )
}

 export default ConfirmacionCards
