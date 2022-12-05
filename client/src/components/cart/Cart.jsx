import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  getReservesByCart } from "../../redux/action/";
import ScriptMercadoPago from "../scriptMercadoPago/ScriptMercadoPago";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../navBar/NavBar";
import { Footer } from "../footer/Footer";


const Cart = () => {
  const { user } = useAuth0();

  let dispatch = useDispatch();
  let productos = useSelector((state) => state.reserveByCart);
  // let datos = useSelector((state) => state.idPay);
  const [datos, setDatos] = useState()

  console.log(useAuth0());


  useEffect(() => {
    if(user?.email) {
      dispatch(getReservesByCart(user?.email));
  
    axios
      .get("http://localhost:3001/mercadopay/" + user?.email)
      .then((data) => {
        setDatos(data.data);
      })
      .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div>
      <div>
        <NavBar/>
      </div>

    <div className="App">
        {!datos ? (
          <div className="text-3xl">
            <h1>El carro está vacio</h1>
          </div>
          
          
        ) : (
          <ScriptMercadoPago productos={productos} data={datos} user={user}/>
          )}
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
};

export default Cart;
