import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {getReserves,} from '../../redux/action/'
import ScriptMercadoPago from '../scriptMercadoPago/ScriptMercadoPago';
import { useAuth0 } from "@auth0/auth0-react";


const Cart = () => {
  const { user } = useAuth0();

    let dispatch = useDispatch()
    let productos = useSelector(state => state.reserve)
    const [datos, setDatos] = useState('')
    // const reserve = useSelector(state => state.reserve)
    console.log(datos)
    useEffect(() => {
        
            axios
            .get("http://localhost:3001/mercadopay/" + user.email)
            .then((data)=>{
              setDatos(data.data)
            })
            .catch(err => console.error(err)) 


        dispatch(getReserves(user.email))
    }, []);

    console.log(datos)
  return (
<div className="App">
  {/* {reserve?.map(e => <p>{e.}</p>)} */}
      { !datos
        ? <p>Aguarde un momento....</p> 
        : <ScriptMercadoPago productos={productos} data={datos}/> 

      }
    </div>
  )
}

export default Cart