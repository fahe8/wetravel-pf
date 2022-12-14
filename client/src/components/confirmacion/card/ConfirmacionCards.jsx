import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReservesByCart } from '../../../redux/action'
import ConfirmacionCard from './ConfirmacionCard'


 const ConfirmacionCards = ({estadoReserva}) => {
console.log(estadoReserva);

     



    return (
        <div>
            <div>
                <div>
                    {estadoReserva? (
                        estadoReserva?.map((reserv,idx) => 
                            <ConfirmacionCard
                                reserve={reserv}
                                key={idx}
                                />)
                    ) : (
                            <h1>No hya compras hechas hasta el momento </h1>
                    )   }
                </div>
            </div>
      
    </div>
  )
}

 export default ConfirmacionCards
