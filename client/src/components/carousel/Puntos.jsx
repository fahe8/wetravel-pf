import React from 'react'

const Puntos = ({activeIndex, onclick, sliderImage}) => {
  return (
      <div>
          {sliderImage.map((slide, index) => (
              <span
                  key={index}
                  onClick= {() => onclick(index)}
              ></span>
          ))}
    </div>
  )
}

export default Puntos
