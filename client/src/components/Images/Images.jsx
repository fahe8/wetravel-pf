import React, { useEffect } from "react";
import NavBar from "../navBar/NavBar";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImage } from "../../redux/action";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export const Images = () => {
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getImage());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div className=" flex justify-start ml-5 mt-5">
        <Link to="/home">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <BsArrowLeft />
            <span class="sr-only">Icon description</span>
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-5 w-[100vw] h-[auto] mt-5">
        {images?.map((el, idx) => {
          return (
            <div className="w-[400px] h-[auto]" key={idx}>
              <p>Imagen subida por: {el.nameUser}</p>
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper h-[300px] "
              >
                {el.images.length > 0 ? (
                  el.images.map((el, index) => (
                    <div>
                      <SwiperSlide>
                        <div className="flex justify-center pt-2">
                          <img
                            src={el}
                            alt="imagenes"
                            className=" object-cover object-center  h-[300px] "
                          ></img>
                        </div>
                      </SwiperSlide>
                    </div>
                  ))
                ) : (
                  <h2>"hola"</h2>
                )}
              </Swiper>
            </div>
          );
        })}
      </div>
    </div>
  );
};
