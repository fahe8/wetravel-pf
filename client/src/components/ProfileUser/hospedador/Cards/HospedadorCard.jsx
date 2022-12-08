import React from 'react'



const HospedadorCard = ({
  name, 
  email,
  hotels

}) => {



  return (
    <div className='bg-red-50'>

      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <h1>
        {email}|
        </h1>
        
      </div>
      <div>
        {hotels}
     </div>
      
    </div>
  )
}

export default HospedadorCard
