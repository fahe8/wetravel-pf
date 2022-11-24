import React from 'react'

const Flechas = ({prevSlide, nextSlide}) => {
  return (
      <div>
          <span onClick={prevSlide}>
              👈
          </span>
          <span onClick={nextSlide}>
              👉
          </span>
    </div>
  )
}

export default Flechas
