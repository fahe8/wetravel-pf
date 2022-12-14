import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImages, getImage } from "../../../redux/action";
import NavBar from "../../navBar/NavBar";
import { Link, useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

export const UserImages = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { images } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getImage());
    dispatch(deleteImages());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <br />
      <div className="text-4xl transition-colors" >
        <Link to="/huesped">
          <button>Regresar a mi perfil</button>
        </Link>
      </div>
      <br />
      <div className="text-4xl" >
        <h1>
          <strong>Mis fotos</strong>
        </h1>
      </div>
      <br />
      <div>
        <br />
        <div className="flex flex-wrap d-flex justify-content-around">
          {images.length > 0 ? (
            images.map((el) => {
              return (
                <div key={el.id} className="w-[400px] h-[auto]">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper h-[300px] "
                  >
                    {
                      el.images.map((el) => (
                        <div>
                          <SwiperSlide>
                            <div className="flex justify-center pt-2">
                              <img
                                src={el}
                                alt="imagenes"
                                className=" object-cover object-center h-[300px] "
                              />
                            </div>
                          </SwiperSlide>
                        </div>
                      ))
                    }
                  </Swiper>
                  <br />
                  <div className="p-1 d-flex align-items-center">
                    <button
                      className="bg-red-400 text-white text-xl rounded-xl"
                      onClick={() => {
                        dispatch(deleteImages(el.id));
                        history.go(0);
                      }}
                    >
                      Delete This post
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-red-700 text-4xl" >
              <h1><strong>No has subido ninguna imagen</strong></h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
