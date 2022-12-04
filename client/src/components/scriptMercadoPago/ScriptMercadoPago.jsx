import React, {useEffect} from 'react'

const ScriptMercadoPago = ({productos, data }) => {

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

        <h4>Carrito</h4>
        <div className={''} >  
        {productos.map((producto, i) => {
            return(
                <div className={''} key={i}>
                <ul className={''} >
                
                    <li>{producto.nameHotel}</li>
                    <li>{'$' + producto.price}</li> 
                  <li>{producto.quantity}</li> 
                  <hr/>
                  </ul>
                </div>   
            )
        })}
        </div>   
        
      </form>

     </div>
    
  )
}

export default ScriptMercadoPago