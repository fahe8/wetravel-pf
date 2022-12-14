import React from 'react'
import ConfirmacionCards from './card/ConfirmacionCards'
import { Footer } from '../footer/Footer'
import NavBar from '../navBar/NavBar'
import { Link, useParams } from 'react-router-dom'
import { sendMail,getReservesByCart, getReservesUser } from '../../redux/action'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Link from 'react-router-dom'

const Confirmacion = () => {
  const { user } = useAuth0()
  let estadoReserva = useSelector((state) => state.reservesUser);
  const {id} = useParams() 
  const dispatch = useDispatch();
  useEffect(() => {
    if(user){

        dispatch(getReservesUser(user.email))
        
    }
 }, [dispatch, user])
 


 const sendInfo = () => {
  console.log(estadoReserva)
  console.log(estadoReserva.filter(f=> f.orderId === id))
  const info = {
    data: estadoReserva.filter(f=> f.orderId == id),
    email: user?.email
  }

  
  dispatch(sendMail(info))
}
  return (
    <div>
      <div>
        <NavBar/>
        
      </div>

      <div className='bg-slate-50 text-7xl font-semibold p-4'>
          <h1>FELICIDADES POR TU COMPRA</h1>
      </div>
      <div className='text-3xl font-medium'>
        <h2>
          Estos son los datos de tu ultima reservación:
        </h2>
      </div>

      <div className='bg-yellow-50 my-3 p-4 rounded-lg mx-80 shadow-lg'>
        <ConfirmacionCards estadoReserva={estadoReserva} id={id}/>
      
      </div>
          <div>
        <button
           className="w-[260px] h-[50px] pt-1 rounded shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#A3C7D6] to-[#00B4FF]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]"
          onClick={sendInfo}>
                  Enviar información al correo
              </button>
      </div>

      <div className='m-3' >
        <Link to="/home">
        
          <button
            className="bg-[color:var(--second-bg-color)] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] p-2 mx-2 "
          >Ver todos los hoteles</button>
        </Link>
       
       
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Confirmacion