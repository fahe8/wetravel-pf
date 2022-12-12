import React from 'react'
import ConfirmacionCards from './card/ConfirmacionCards'
import { Footer } from '../footer/Footer'
import NavBar from '../navBar/NavBar'
import { Link } from 'react-router-dom'
import { sendMail,getReservesByCart } from '../../redux/action'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Link from 'react-router-dom'

const Confirmacion = () => {
  const { user } = useAuth0()
  let estadoReserva = useSelector((state) => state.reserveByCart);
  const dispatch = useDispatch();


  useEffect(() => {
    if(user){
        
        dispatch(getReservesByCart(user?.email));
    }
 }, [dispatch, user])
 

 const sendInfo = () => {
  const info = {
    data: estadoReserva,
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
        <ConfirmacionCards estadoReserva={estadoReserva}/>
      
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
