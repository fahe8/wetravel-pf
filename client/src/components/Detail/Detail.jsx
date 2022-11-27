import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/action/index";
import { Loading } from "../Loading/Loading";
import NavBar from "../navBar/NavBar";
import Stars from "../stars/Stars";
import icon from "../../assets/icons/user.svg";
import Carousel from "react-bootstrap/Carousel";

const Detail = (props) => {
<<<<<<< HEAD
  const {
    match: {
      params: { id },
    },
  } = props;
  const dispatch = useDispatch();
  const selectedHotel = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);
  console.log("LOADING:", loading);
=======
    const { match: { params: { id } } } = props;
    const dispatch = useDispatch()
    const selectedHotel = useSelector((state) => state.detail)
    const loading = useSelector((state) => state.loading);
    //console.log("LOADING:", loading);
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(getDetail(""));
    };
  }, [dispatch, id]);

<<<<<<< HEAD
  console.log(selectedHotel);
=======
    //console.log(selectedHotel)
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57

  return (
    <div>
      <div>
        <NavBar />
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div>
<<<<<<< HEAD
              <Link to={"/home"}>
                <button>Volver</button>
              </Link>

              <div className="home-container">
                <div className="home-container row ">
                  <Carousel className="carousel mt-4 w-[500px] h-[500px] m-auto ">
                    {selectedHotel &&
                      selectedHotel.photos?.map((elemento, index) => {
                        return (
                          <Carousel.Item key={index}>
                            <div className="xd">
                              <img src={elemento} alt="hotel" />
                            </div>
                          </Carousel.Item>
                        );
                      })}
                  </Carousel>
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
                      {selectedHotel.stars}
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
                            {" "}
                            What does the place affter
                          </h2>
                          <div className="grid grid-cols-2">
                            {selectedHotel.services.map((service) => (
                              <p key={service} className="m-4 ">
                                {service}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <div className=" grid grid-rows-2 ">
                  <div className="row-span-1 bg-white shadow-xl  rounded-3xl m-11">
                    <div className=" text-4xl mt-8">
                      <h3>{selectedHotel.price} night</h3>
=======
                {loading ? (
                    <Loading />
                    ) : (
                    <div>
                        
                        <div>
                            <img src={selectedHotel.photos} alt="hotel" />
                            {/* Carrusel de imágenes */}
                        </div>
                            <div className='grid grid-cols-3 '>

                                <div className=' col-span-2'>
                                    <div className='grid grid-cols-2 text-4xl m-4'>
                                        <h2 className='text-left font-medium'>{selectedHotel.name}</h2>
                                        <h3 className='text-2xl text-center m-4' >
                                            <Stars stars={selectedHotel.stars} />
                                           
                                        </h3>
                                    </div>
                                    <div className=' text-xl text-left m-4'>
                                        <h3>{selectedHotel.location}, {selectedHotel.city}</h3>
                                        <h3>{selectedHotel.price}</h3>
                                    </div>
                                    <hr/>
                                    <div className=' text-left m-4'>
                                        <h2 className='font-medium text-2xl'>Description: </h2>
                                        <p className='text-xl text-justify m-3 '>{selectedHotel.description}</p>
                                    </div>
                                    <hr/>
                                    <div className=' text-xl text-left m-4'>
                                        {Array.isArray(selectedHotel.services) && selectedHotel.services[0] &&
                                            <div>
                                                <h2 className='font-medium'> What does the place affter</h2>
                                                <div className='grid grid-cols-2'>
                                                {selectedHotel.services.map(service =>
                                                    <p key={service} className='m-4 '>{service}</p>)}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div className=' grid grid-rows-2 '>
                                    <div className='row-span-1 bg-white shadow-xl  rounded-3xl m-11'>
                                            <div className=' text-4xl mt-8'>
                                                <h3>
                                                    {selectedHotel.price} night
                                                </h3>
                                            </div>
                                            
                                            <div className=' grid grid-cols-2 bg-[color:var(--primary-bg-opacity-color)] text-sm text-left mt-8 rounded-2xl mx-4 border border-black' >
                                                <div  className='border-r border-black pr-3 pb-4 pl-1'>
                                                    <h2>check in:</h2>
                                                </div>
                                                <div className='pr-3 pb-4 pl-1'>
                                                    <h2>check out:</h2>
                                                </div>
                                                <div className='col-span-2 border-t border-black pr-3 pb-4 pl-1'>
                                                    <h2>guest:</h2>
                                                </div>
                                        </div>
                                        
                                        <div className='m-8'>
                                            <button className='py-2.5 px-5 mr-2 mb-2 text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 '>
                                                Reserve
                                            </button>
                                        </div>
                                        
                                    </div>

                                    <div className=' bg-white  shadow-xl  rounded-3xl items-center m-11 '>
                                        
                                        <div>
                                            <img  className='px-16' src={icon} alt='user image'/>
                                        </div>
                                        <div className='py-4 text-3xl'>
                                            <h1>Name of user</h1>
                                        </div>

                                        <div className='text-xl py-5'>
                                            Join in month XXXX
                                        </div>
                                        <div>
                                            <button className='py-2.5 px-5 mr-2 mb-2 text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 '>
                                                Perfil
                                            </button>
                                        </div>
                                        
                                        
                                        
                                    </div>
                                    
                                    
                                    </div>
                            <div>
                                <p> {selectedHotel.comments}</p>
                            </div>
                            </div>
                            <hr/>
                            <div>
                                <div >
                                    <h1 className='font-medium text-2xl pt-5'>
                                        Reviews
                                    </h1>
                                </div>
                                <div className='pt-5 '>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, veniam ullam dolorem reiciendis labore tempora enim nam sit ipsa omnis maxime veritatis, asperiores autem. Ad aliquam sit iste maxime rerum.</p>
                                </div>
                            </div>
                            <hr/>
                            <div className='pt-5 '>
                                <Link to={'/home'} >
                                    <button className='mr-2 mb-2 text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 p-5'>All hotels</button>
                                </Link>
                            </div>
                            
                        
                            
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
                    </div>

                    <div className=" grid grid-cols-2 bg-[color:var(--primary-bg-opacity-color)] text-sm text-left mt-8 rounded-2xl mx-4 border border-black">
                      <div className="border-r border-black pr-3 pb-4 pl-1">
                        <h2>check in:</h2>
                      </div>
                      <div className="pr-3 pb-4 pl-1">
                        <h2>check out:</h2>
                      </div>
                      <div className="col-span-2 border-t border-black pr-3 pb-4 pl-1">
                        <h2>guest:</h2>
                      </div>
                    </div>

                    <div className="m-8">
                      <button className="py-2.5 px-5 mr-2 mb-2 text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 ">
                        Reserve
                      </button>
                    </div>
                  </div>

                  <div className=" bg-white  shadow-xl  rounded-3xl items-center m-11 ">
                    <div>
                      <img className="px-16" src={icon} alt="user image" />
                    </div>
                    <div className="py-4 text-3xl">
                      <h1>Name of user</h1>
                    </div>

                    <div className="text-xl py-5">Join in month XXXX</div>
                    <div>
                      <button className="py-2.5 px-5 mr-2 mb-2 text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 ">
                        Perfil
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <p> {selectedHotel.comments}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
