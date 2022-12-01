import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {getReserves,} from '../../redux/action/'
import ScriptMercadoPago from '../scriptMercadoPago/ScriptMercadoPago';


const Cart = () => {
  const rese = useSelector(state => state.reserve )
    let dispatch = useDispatch()
    let productos = useSelector(state => state.reserve)
    const [datos, setDatos] = useState('')
    useEffect(() => {
        
            axios
            .get("http://localhost:3001/mercadopay/1")
            .then((data)=>{
              setDatos(data.data)
              console.info('Contenido de data:', data)
            })
            .catch(err => console.error(err)) 


        // dispatch(getReserves(1))
    }, []);

    console.log(datos)
  return (
<div className="App">
      { !datos
        ? <p>Aguarde un momento....</p> 
        : <ScriptMercadoPago productos={productos} data={datos}/> 
      //  : ""
      }
    </div>
  )
}

export default Cart