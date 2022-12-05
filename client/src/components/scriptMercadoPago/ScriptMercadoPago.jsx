import React, {useEffect} from 'react'

const ScriptMercadoPago = ({productos, data, deleteReserve }) => {

    useEffect(()=>{
        const script = document.createElement('script'); //Crea un elemento html script
        
        const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute
        attr_data_preference.value = data.id  //Le asigna como valor el id que devuelve MP
      
        //Agrega atributos al elemento script
        script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";  
        script.setAttributeNode(attr_data_preference)  
      
        console.log(data)
        
        //Agrega el script como nodo hijo del elemento form
        document.getElementById('form1').appendChild(script)
        return () =>{
          //Elimina el script como nodo hijo del elemento form
          document.getElementById('form1').removeChild(script);
        }
       },[data])
    
  return (
    
        <div>
      <form id='form1'>
        <div className="font-bold text-5xl pt-8">
          <h1> Hola Viajero, Bienvenido al Carrito de compras</h1>
        </div>
        <div className="bg-slate-100 p-6 m-10 rounded-3xl shadow-md" >  
        {productos.map((producto, i) => {
            return(
              <div className="grid grid-cols-4" key={i}>
                <div className='p-4'>
                  <h2>{producto.nameHotel}</h2>
                </div>
                
                <div className='p-4'>
                  <h2>{'$' + producto.price}</h2>
                </div>
                <div className='p-4'>
                  <h2>{producto.quantity}</h2>
                </div>
                <div className='p-4'>
                  <button
                    className="bg-red-400 text-white text-xl p-1 rounded-xl"
                    onClick={deleteReserve}>
                    Delete Reserve</button>
                </div>
                </div>   
          )
          
        })}
        </div>   
      </form>
     </div>
  )
}

export default ScriptMercadoPago