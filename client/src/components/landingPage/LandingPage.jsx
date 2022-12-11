import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import Search from "../search/Search";
import { getHotels } from "../../redux/action/index.js";
import "./Landing.css";
import { Footer } from "../footer/Footer";
import Card from "../card/card";
import { RxLapTimer } from "react-icons/rx";
import { RiSecurePaymentFill, RiHandHeartLine } from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useLocalStorage } from "../../localStorage/useLocalStorage";

function LandingPage() {
  let dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels);
  const hotelSlide = [];

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  console.log(hotels);
  if (hotels.length) {
    hotels.forEach((hotel) => {
      if (hotelSlide.length < 5) hotelSlide.push(hotel);
    });
  }
  const [favorites, setFavorites] = useLocalStorage("fav", []);
  return (
    <div className=" land ">
      <NavBar />
      <div>
        <p className="font-bold	text-3xl mt-3">
          Encontrá lugares para alojarte en Airbnb
        </p>
        <p className="text-xl">
          Descubrí alojamientos enteros y habitaciones privadas que se adaptan a
          todo tipo de viajes.
        </p>
      </div>
      <div className="relative p-24 m-8">
        <Search></Search>
      </div>
      <div className=" mb-14 ">
        <Link to="/home">
          {" "}
          <button className="w-[200px] h-[80px] rounded-[44px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#A3C7D6] to-[#00B4FF]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
            {"Have a look"}
          </button>
        </Link>
      </div>
      <div className="mt-24">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper justify-center items-center backdrop-blur "
        >
          {hotelSlide.length > 0 ? (
            hotelSlide.map((el) => (
              <SwiperSlide>
                <div className="flex justify-center pt-4">
                  <Card
                    className="justify-center items-center"
                    id={el.id}
                    key={el.id}
                    photos={el.photos[0]}
                    stars={el.stars}
                    location={el.location}
                    city={el.city}
                    price={el.price}
                    // size={ht.room.size== null?ht.room.size:"No Data"}
                    name={el.name}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                </div>
                <Link to={"/home"}>
                <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-4 ">Ver mas</button>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <h2>"hola"</h2>
          )}
        </Swiper>
      </div>
      <div className=" flex flex-wrap justify-center gap-4">
        <div className="backdrop-blur hover:bg-gray-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out px-2">
          <RxLapTimer className="w-40 h-40" />
          <div className="font-bold text-3xl	">Protección con WeCover</div>
          <p className="font-normal	 text-2xl		">
            La protección más completa en viajes. Siempre está incluida y
            siempre es gratuita.
          </p>
        </div>
        <div className="backdrop-blur hover:bg-gray-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out px-2">
          <RiSecurePaymentFill className="w-40 h-40" />
          <div className="font-bold text-3xl	">
            Opciones de cancelación flexible
          </div>
          <p className="font-normal	 text-2xl		">
            Gracias a las opciones de cancelación, te va a resultar más fácil
            hacer una reserva nueva si hay algún cambio de planes.
          </p>
        </div>
        <div className="backdrop-blur hover:bg-gray-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out px-2">
          <RiHandHeartLine className="w-40 h-40" />
          <div className="font-bold	text-3xl	">
            Servicio de ayuda las 24 horas, los 7 días de la semana
          </div>
          <p className="font-normal	 text-2xl		">
            Hablá con nuestro equipo de ayuda a cualquier hora, estés donde
            estés.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
