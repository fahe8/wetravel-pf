import React from 'react'

const ConfirmacionCard = ({ reserve }) => {
console.log(reserve);
    return (
        <div className='text-xl'>
            <div className='m-1'>
                <h3>  <b>Nombre del hotel : </b> { reserve.nameHotel}</h3>
            </div>
            <div className='m-1'>
                <h3>{ reserve.nameRoom}</h3>
            </div>
            <div className='m-1'>
                <h3> <b>Precio: </b> $ {reserve.price}</h3>
            </div>
            <div className='m-1'>
                <h3> <b> Cantidad de noches: </b> { reserve.quantity}</h3>
            </div>
            <div className='m-1'>
                <h3> <b> check in:   </b>{reserve.check_in}</h3>
            </div>
            <div className='m-1'>
                <h3> <b> check Out: </b>  {reserve.check_out} </h3>
            </div>

            <div className='m-1 '>
                <h3> <b> Correo del usuario:  </b> {reserve.userReserve}</h3>
            </div>
            <hr/>
      
        </div>
        
  )
}

export default ConfirmacionCard
