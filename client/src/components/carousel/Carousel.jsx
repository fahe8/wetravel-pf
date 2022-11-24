import React, { useEffect, useState } from 'react'
import CarouselContent from './CarouselContent'
import Puntos from './Puntos'
import Flechas from './Flechas'
import carouselImages from './carouselImages'

const len = carouselImages.length - 1;

const Carousel = (props) => {
    
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex])

  return (
      <div>
          <CarouselContent activeIndex={activeIndex} carouselImages={carouselImages} />
          <Flechas
              prevSlide={() => 
            setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
            }
              nextSlide={() => 
                  setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
            }
          />
          <Puntos
              activeIndex={activeIndex}
              carouselImages={carouselImages}
              onclick={(activeIndex) => setActiveIndex(activeIndex)}
          />
    </div>
  )
}

export default Carousel
