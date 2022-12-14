import React from 'react'

const ConfirmacionCard = ({ reserve }) => {
console.log(reserve);
    return (
        <div>
            <div>
                <h3> nombre del hotel { reserve.nameHotel}</h3>
            </div>
            <div>
                <h3>{ reserve.nameRoom}</h3>
            </div>
            <div>
                <h3> $ {reserve.price}</h3>
            </div>
            <div>
                <h3> Cantidad de noches { reserve.quantity}</h3>
            </div>
            <div>
                <h3> check in: {reserve.check_in}</h3>
            </div>
            <div>
                <h3> check Out: {reserve.check_out} </h3>
            </div>

            <div>
                <h3>Correo del usuario: {reserve.userReserve}</h3>
            </div>
      
        </div>
        
  )
}

export default ConfirmacionCard
