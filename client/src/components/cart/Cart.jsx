import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  getReservesByCart, getReservesUser } from "../../redux/action/";
import ScriptMercadoPago from "../scriptMercadoPago/ScriptMercadoPago";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../navBar/NavBar";
import { Footer } from "../footer/Footer";
import { deleteReserve } from "../../redux/action/";
import { useHistory } from "react-router-dom";


const Cart = () => {
  const { user } = useAuth0();
let history = useHistory()
  let dispatch = useDispatch();
  let productos = useSelector((state) => state.reserveByCart);
  const [activePay, setActivePay] = React.useState(false);
  // let datos = useSelector((state) => state.idPay);
  const [datos, setDatos] = useState()

  console.log(useAuth0());

  const getPay = () => {
    setActivePay(true)
    axios
    .get("http://localhost:3001/mercadopay/" + user?.email)
    .then((data) => {
      setDatos(data.data);
    })
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    if(user?.email) {
      dispatch(getReservesByCart(user?.email));
      dispatch(getReservesUser(user.email))
    }
  }, [user]);

  return (
    <div>
      <div>
        <NavBar/>
      </div>

    <div className="App">
    <div className="font-bold text-5xl pt-8">
          <h1> Hola Viajero, Bienvenido al Carrito de compras</h1>
        </div>
        <div className="bg-slate-100 p-6 m-10 rounded-3xl shadow-md" >
          <div className="font-medium text-l grid grid-cols-6 font-medium p-4" >
            <div><h2>check in</h2></div>
            <div><h2>check out</h2></div>
            <div><h2>nombre del hotel</h2></div>
            <div><h2>precio</h2></div>
            <div><h2>cantidad de noches</h2></div>
          </div>
        </div>
        <div className="bg-slate-100 p-6 m-10 rounded-3xl shadow-md" >  
        {productos?.map((producto, i) => {
            return(
              <div className="grid grid-cols-6" key={i}>
                <div className='p-4'>
                  <h2>{producto?.check_in}</h2>
                </div>
                <div className='p-4'>
                  <h2>{producto?.check_out}</h2>
                </div>
                <div className='p-4'>
                  <h2>{producto?.nameHotel}</h2>
                </div>
                
                <div className='p-4'>
                  <h2>{'$' + producto?.price}</h2>
                </div>
                <div className='p-4'>
                  <h2>{producto?.quantity}</h2>
                </div>
                <div className='p-4'>
                  <button
                    className="bg-red-400 text-white text-xl p-1 rounded-xl"
                    onClick={() => {dispatch(deleteReserve(producto.id));} }
                    >
                    Delete Reserve</button>
                </div>
                </div>   
          )
          
        })}
        </div>   


      {(productos.length!==0 && !activePay) && <button  className="bg-blue-400 text-white text-xl p-1 rounded-xl" onClick={getPay}>PROCEDER</button>}
      {(activePay && datos) && <ScriptMercadoPago data={datos}/>}

      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
};

export default Cart;
