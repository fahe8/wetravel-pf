import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, getReview, postReview} from "../../redux/action/index";
import { Loading } from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Footer } from "../footer/Footer";
import { Navigation } from "swiper";
import NavBar from "../navBar/NavBar";
import Stars from "../stars/Stars";
import Reservation from "../reservation/Reservation";
import Review from "../review/Review";
import "swiper/css";
import "swiper/css/navigation";
import { FcApproval } from "react-icons/fc";

const Detail = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const dispatch = useDispatch();
  const selectedHotel = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);
  const { review } = useSelector((state) => state);

  useEffect(() => {
    let allComments = review.map(el => el.comments)
    if (allComments.length >= 1) {
      dispatch(postReview(review));
    }
    dispatch(getDetail(id));
    dispatch(getReview());
    return () => {
      dispatch(getDetail(""));
    };
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <NavBar />
        <div>
          {loading ? ( <Loading />
          ) : (
              <div>
                <div className="home-container">
                  <div className="home-container row ">
                    <Swiper
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper justify-center items-center backdrop-blurcarousel mt-4 w-100 h-[400px] m-auto "
                    >
                      {selectedHotel &&
                        selectedHotel.photos?.map((elemento, index) => {
                          return (
                            <SwiperSlide>
                              <div className=" w-100 h-[400px]">
                                <img
                                  className=" w-100 h-[400px]"
                                  src={elemento}
                                  alt="hotel"
                                />
                              </div>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </div>
                </div>
                <div className="grid grid-cols-3 ">
                  <div className=" col-span-2">
                    <div className="grid grid-cols-2 text-4xl m-4">
                      <h2 className="text-left font-medium">
                        {selectedHotel.name}
                      </h2>
                      <h3 className="text-2xl text-center m-4">
                        <Stars stars={selectedHotel.stars} />
                      </h3>
                    </div>
                    <div className=" text-xl text-left m-4">
                      <h3>
                        {selectedHotel.location}, {selectedHotel.city}
                      </h3>
                      <h3>{selectedHotel.price}</h3>
                    </div>
                    <hr />
                    <div className=" text-left m-4">
                      <h2 className="font-medium text-2xl">Description: </h2>
                      <p className="text-xl m-3 ">{selectedHotel.description}</p>
                    </div>
                    <hr />
                    <div className=" text-xl text-left m-4">
                      {Array.isArray(selectedHotel.services) &&
                        selectedHotel.services[0] && (
                        <div>
                          <h2 className="font-medium">
                            {" "} What does the place offer
                          </h2>
                          <div className="grid grid-cols-2">
                            {selectedHotel.services.map((service, idx) => (
                              <div key={idx} className=" flex items-center">
                                <span> <FcApproval/></span>
                                <p  className="m-4 ">
                                {service}
                              </p>
                              </div>
                            ))}
                          </div>
                          
                        </div>
                        )}
                    </div>
                  </div>
                  <Reservation selectedHotel={selectedHotel} />
                  <div>
                    <p> {selectedHotel.comments}</p>
                  </div>
                  <div className="text-2xl m-4 font-medium">
                    <Link to={"/home"}>
                      <button className="rounded-xl w-80 bg-slate-200 hover:bg-slate-300 p-2">
                        Listado de Hoteles
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
          )}
          <hr />
          
          <div>
            <Review name={selectedHotel.name} />
            <br />
            <hr/>
            <div>
              {review?.map(el => {
                return (
                  <div
                    className=" flex ml-6 items-center"
                    key={el.id} >
                    <div>
                      {(el.nameHotel === selectedHotel.name) && (
                        <div className=" m-2 p-3 bg-slate-200  w-5/5 rounded shadow" >
                          <p> <b>{!el.nameUser ? 'Anonymous' : el.nameUser} : </b> {el.comments[0]}  </p>
                        </div>
                      )
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Detail;