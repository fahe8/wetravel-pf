import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  getReservesByCart } from "../../redux/action/";
import ScriptMercadoPago from "../scriptMercadoPago/ScriptMercadoPago";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../navBar/NavBar";
import { Footer } from "../footer/Footer";
import { deleteReserve } from "../../redux/action/";
import { useHistory } from "react-router-dom";


const Cart = () => {
  const { user } = useAuth0();
  let dispatch = useDispatch();
  let productos = useSelector((state) => state.reserveByCart);
  const [activePay, setActivePay] = React.useState(false);

  const [datos, setDatos] = useState()
  const history = useHistory()

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

  dispatch(getReservesByCart( user?.email))

 }, [user,dispatch]);

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
                    onClick={() => {dispatch(deleteReserve(producto.id)); history.go(0) }}
                    >
                    Delete Reserve</button>
                </div>
                </div>   
          )
          
        })}
        </div>   
   

      {productos.length!==0 && <button onClick={getPay}>PROCEDER</button>}
      {(activePay && datos) && <ScriptMercadoPago data={datos}/>}

      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
};

export default Cart;
