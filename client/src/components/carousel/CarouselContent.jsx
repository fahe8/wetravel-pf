import React from 'react'

const CarouselContent = ({activeIndex, sliderImage}) => {
    return (
    
        <section>
            {sliderImage.map((slide, index) => (
                <div
                key={index}
                >
                    <img src={slide.urls} alt="imageX"/>
                </div>
            ))}
        </section>
  )
}

export default CarouselContent
