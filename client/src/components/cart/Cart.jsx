import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getReservesByCart } from "../../redux/action/";
import ScriptMercadoPago from "../scriptMercadoPago/ScriptMercadoPago";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
  const { user } = useAuth0();

  let dispatch = useDispatch();
  let productos = useSelector((state) => state.reserveByCart);
  // let datos = useSelector((state) => state.idPay);
  const [datos, setDatos] = useState()
  console.log(useAuth0());
  useEffect(() => {
    dispatch(getReservesByCart(user.email));

    axios
      .get("http://localhost:3001/mercadopay/" + user.email)
      .then((data) => {
        setDatos(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      {!datos ? (
        <p>Está vacio</p>
      ) : (
        <ScriptMercadoPago productos={productos} data={datos} />
      )}
    </div>
  );
};

export default Cart;
