import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const Stars = (props) => {
  
  return (
    <div className='inline-grid grid-cols-5 text-yellow-500'>
      {[...new Array(5)].map((star, index) => {
        return index < props.stars ? <AiFillStar key={index}/> : <AiOutlineStar key={index}/>
      })}     
    </div>
  )
}

export default Stars