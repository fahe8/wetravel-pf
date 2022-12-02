import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {getReserves,} from '../../redux/action/'
import ScriptMercadoPago from '../scriptMercadoPago/ScriptMercadoPago';


const Cart = () => {
    let dispatch = useDispatch()
    let productos = useSelector(state => state.reserve)
    const [datos, setDatos] = useState('')
    // const reserve = useSelector(state => state.reserve)
    console.log(datos)
    useEffect(() => {
        
            axios
            .get("http://localhost:3001/mercadopay/1")
            .then((data)=>{
              setDatos(data.data)
            })
            .catch(err => console.error(err)) 


        dispatch(getReserves(1))
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