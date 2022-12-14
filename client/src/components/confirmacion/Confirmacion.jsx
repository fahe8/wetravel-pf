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
          <h1>Felicidades por tu compra</h1>

          <div>
              <button onClick={sendInfo}>
                  Enviar información al correo
              </button>
      </div>
      <div>
        <ConfirmacionCards estadoReserva={estadoReserva} id={id}/>
      
      </div>

      <div>
        <Link to="/home">
        
          <button> To Home</button>
        </Link>
       
       
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Confirmacion