import React, { useState, useEffect } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import validate from "./validations";
import { postHotel, getDetail, updateHotel } from "../../redux/action";
import { AiFillHeart } from "react-icons/ai";
import Stars from "../stars/Stars";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "../Loading/Loading";
const EditCreate = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const { user } = useAuth0();
  const { id } = useParams();
  const history = useHistory();
  const { service } = useSelector((state) => state);
  const { detail } = useSelector((state) => state);

  const message = () => {
    toast("🏠 El hotel se modificó correctamente", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const messageError = () => {
    toast("Hay campos con errores o vacios", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const initialState = {
    name: "",
    description: "",
    stars: "",
    price: "$",
    services: [],
    photos: [],
    continent: "",
    location: "",
    city: "",
    review: "",
    comments: [],
    user: "",
    room: {
      name: "",
      properties: [""],
      size: "",
      description: "",
      photos: [],
    },
  };

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  useEffect(() => {
    if (Object.keys(detail).length !== 0) {
      setInput({
        ...input,
        name: detail?.name,
        description: detail?.description,
        stars: detail?.stars,
        price: detail?.price,
        services: detail?.services,
        photos: detail?.photos,
        continent: detail?.continent,
        location: detail?.location,
        city: detail?.city,
        user: user?.name,
        room: {
          name: detail?.room?.name,
          properties: detail?.room?.properties,
          size: detail?.room?.size,
          description: detail?.room?.description,
          photos: detail?.room?.photos,
        },
      });
      imagePreview(input.photos);
    }
  }, [detail]);

  const [errors, setErrors] = useState({

  });

  const [input, setInput] = useState(initialState);
  const [loading, setLoading] = useState("false");

  const submitImage = (files, name) => {
    const upLoader = files.map((file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "up-image");
      setLoading("true");
      return axios
        .post("https://api.cloudinary.com/v1_1/dll9vsr6c/image/upload", data)
        .then((res) => {
          let url = res.data.secure_url;
          if (name === "room") {
            let selectPhotos = input.room.photos;
            selectPhotos.push(url)
            setInput({
              ...input,
              room: { ...input.room, photos: selectPhotos },
            });

            setErrors(validate(
              {
                ...input,
                room: { ...input.room, photos: selectPhotos },
              }
            ))
          } else {
            let arrayImage = input.photos;
            arrayImage.push(url);
            const newObj = { ...input, arrayImage };
            setInput(newObj);
            setErrors(validate(newObj))
          }
        })
        .catch((error) => console.log("CLOUDINARY ERROR:", error));
    });
    axios.all(upLoader).then(() => {
      setLoading("false");
    });
  };

  const imagePreview = (value, name) => {
    if (loading === "true") {
      return <h3>Cargando Imagenes...</h3>;
    }
    if (loading === "false") {
      return (
        <div className="flex flex-wrap gap-5">
          {value?.map((image) => {
            return (
              <div className=" bg-slate-400  rounded-xl relative mt-2">
                <div
                  onClick={() => handleDeletePhotos(value, image, name)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py px-2 rounded cursor-pointer w-[fit-content] absolute right-0"
                >
                  X
                </div>
                <img
                  src={image}
                  alt="img not found"
                  className="w-[180px] h-[120px] "
                />
              </div>
            );
          })}
        </div>
      );
    }
  };

  const handleChange = (e) => {

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChangeRoom = (e, index) => {
    if (e.target.name === "properties") {
      let list = [...input.room.properties];
      list[index] = e.target.value;
      setInput({
        ...input,
        room: { ...input.room, [e.target.name]: list },
      });
      setErrors(
        validate({
          ...input,
          room: {
            ...input.room,
            [e.target.name]: [...input.room.properties, e.target.value],
          },
        })
      );
    } else {
      setInput({
        ...input,
        room: { ...input.room, [e.target.name]: e.target.value },
      });
      setErrors(
        validate({
          ...input,
          room: { ...input.room, [e.target.name]: e.target.value },
        })
      );
    }
  };


  const handleDelete = (e) => {
    setInput({
      ...input,
      services: input.services.filter((c) => c !== e.target.name),
    });

    setErrors(
      validate({
        ...input,
        services: input.services.filter((c) => c !== e.target.name),
      })
    );
  };

  const handleDeletePhotos = (inputP, image, name) => {

    console.log(name);
    let newArrPhotos= inputP.filter((c) => c !== image)
    if (name === "hotel") {
      console.log("dentro del if");


      setInput({
        ...input,
        photos: newArrPhotos,
      });
      setErrors(
        validate({
          ...input,
          photos: newArrPhotos
        })
      )
    } else {
      console.log('first')
      setInput({
        ...input,
        room: { ...input.room, photos: newArrPhotos },
      });
      setErrors(
        validate({
          ...input,
          room: { ...input.room, photos: newArrPhotos },
        })
      );
    }
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    if (!input.services.includes(value))
      if (input.services.length < 15) {
        // return alert("Ya ha seleccionado esos servicios");
        setInput({
          ...input,
          services: [...input.services, value],
        });
        setErrors(
          validate({
            ...input,
            services: [...input.services, value],
          })
        );
      } else alert("Has alcanzado la cantidad máxima de servicios");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      messageError();
    } else {
      e.preventDefault();
      dispatch(updateHotel(input, id));
      message();
      setTimeout(() => {
        setInput(initialState);
        history.push("/home");
        history.go(0);
      }, "3000");
    }
  };

  const handleAddServicesRoom = () => {
    setInput({
      ...input,
      room: { ...input.room, properties: [...input.room.properties, ""] },
    });
  };
  const handleRemoveServicesRoom = (index) => {
    const list = [...input?.room?.properties];
    list.splice(index, 1);
    setInput({
      ...input,
      room: { ...input.room, properties: list },
    });
  };


if(Object.keys(detail).length === 0 ) {
  return(
    <Loading/>
  )
}
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center pl-2.5 m-3.5">
        <div className="text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 p-2">
          <Link to="/home">
            <button>Go Home</button>
          </Link>
        </div>
      </div>
      <hr />
      <div className=" grid grid-cols-2">
        <div>
          <div>
            <div className="py-4 font-medium text-3xl mt-2">
              <h1>Agrega tu hotel</h1>
            </div>
            <hr />

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="p-6 grid grid-cols-3 mx-8 bg-slate-50 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-start"
            >
              <div className="col-span-3 ">
                <p className=" text-lg font-semibold ">{"Nombre del Hotel:"}</p>
                <input
                  className="w-full bg-transparent border-b border-gray"
                  id="name input"
                  type="text"
                  value={input.name}
                  name="name"
                  autoComplete="off"
                  placeholder="Hotel Name..."
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors.name && <p>{errors.name}</p>}
                </div>
              </div>

              <div className="p-2.5">
                <p className=" text-lg font-semibold">{"Precio noche:"}</p>
                <input
                  className="bg-transparent border-b border-gray w-11/12"
                  type="number"
                  value={input.price}
                  name="price"
                  autoComplete="off"
                  placeholder="$"
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors.price && <p>{errors.price}</p>}
                  {errors.negatives && <p>{errors.negatives}</p>}
                  {errors.nan && <p>{errors.nan} </p>}
                  {errors.zero && <p>{errors.zero} </p>}
                </div>
              </div>

              <div className="p-2.5 ">
              <p className=" text-lg font-semibold ">{"Estrellas del hotel:"}</p>
                <input
                  className="bg-transparent border-b border-gray w-11/12"
                  id="starsInput"
                  type="text"
                  value={input.stars}
                  name="stars"
                  autoComplete="off"
                  placeholder="Enter stars.."
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors.stars && <p>{errors.stars}</p>}
                  {errors.max && <p>{errors.max}</p>}
                  {errors.negatives && <p>{errors.negatives}</p>}
                  {errors.nan && <p>{errors.nan} </p>}
                  {errors.zero && <p>{errors.zero} </p>}
                </div>
              </div>
              <div className="p-2.5">
                <p className=" text-lg font-semibold">{"Continente:"}</p>
                <select
                  name="continent"
                  id=""
                  className=" bg-transparent border-b border-gray w-full"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" hidden>
                    Selecciona el continente
                  </option>
                  <option value="America">America</option>
                  <option value="Europa">Europa</option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                </select>
                <div className=" text-sm text-red-500">
                  {errors.continent && <p>{errors.continent}</p>}
                </div>
              </div>

              <div className="p-2.5">
                <p className=" text-lg font-semibold">{"Pais:"}</p>

                <input
                  className="bg-transparent border-b border-gray w-11/12"
                  type="text"
                  value={input.location}
                  name="location"
                  autoComplete="off"
                  placeholder="Enter location.."
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors.location && <p>{errors.location}</p>}
                </div>
              </div>

              <div className="p-2.5 ">
                <p className=" text-lg font-semibold">{"Ciudad:"}</p>

                <input
                  className="bg-transparent border-b border-gray w-11/12"
                  type="text"
                  value={input.city}
                  name="city"
                  autoComplete="off"
                  placeholder="Enter city.."
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors.city && <p>{errors.city}</p>}
                </div>
              </div>

              <div className=" col-span-3 p-2.5">
                <p className=" text-lg font-semibold">
                  {"Descripcion del Hotel:"}
                </p>

                <input
                  className="bg-transparent border-b border-gray w-full h-auto"
                  type="text"
                  value={input.description}
                  name="description"
                  autoComplete="off"
                  placeholder="Add description.."
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors.description && <p>{errors.description}</p>}
                </div>
              </div>

              <div className="col-span-3 p-2.5">
                <p className=" text-lg font-semibold">
                  {" "}
                  {"Servicios del Hotel:"}
                </p>

                <select
                  className="bg-transparent border-b border-gray w-full"
                  id="tempsInput"
                  autoComplete="off"
                  onChange={handleSelect}
                >
                  {!input.services.length ? (
                    <option>Select services</option>
                  ) : (
                    <option disabled={true}>Select Temperament</option>
                  )}
                  {service?.map((serv) => {
                    return (
                      <option key={serv} value={serv}>
                        {serv}
                      </option>
                    );
                  })}
                </select>
                <div className=" text-sm text-red-500">
                  {errors.services && <p>{errors.services}</p>}
                </div>
              </div>

              <div className="col-span-3 p-2.5">
                <p className=" text-lg font-semibold">
                  {"Imagenes del Hotel:"}
                </p>

                <Container id={input.photos}>
                  <Dropzone
                    onDrop={(e) => submitImage(e)}
                    value={input.photos}

                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps({ className: "dropzone" })}>
                          <div className=" flex justify-start items-center cursor-pointer">
                            <input {...getInputProps()} />
                            <BiImageAdd className=" w-[40px] h-[40px]" />
                            <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Ingresar imagen
                            </p>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  {imagePreview(input.photos, "hotel")}
                </Container>
                <div className=" text-sm text-red-500">
                  {errors.photos && <p>{errors.photos}</p>}
                </div>
              </div>
              <div className=" pt-3 col-span-3 p-2.5">
                <p className=" font-bold text-2xl">{"Agrega la habitacion"}</p>
              </div>
              <div className="col-span-3 p-2.5">
                <p className=" text-lg font-semibold">
                  {"Nombre de la habitacion:"}
                </p>

                <input
                  className="bg-transparent border-b border-gray w-11/12"
                  id="roomNameInput"
                  type="text"
                  value={input.room.name}
                  name="name"
                  autoComplete="off"
                  placeholder="Habitacion doble con camas grandes..."
                  onChange={(e) => handleChangeRoom(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors?.room?.name && <p>{errors?.room?.name}</p>}
                </div>
              </div>

              <div className="col-span-3 p-2.5">
                <p className=" text-lg font-semibold">
                  {"Imagenes de la Habitacion:"}
                </p>

                <Container>
                  <Dropzone
                    onDrop={(e) => submitImage(e, "room")}
                    onChange={(e) => setInput(e.target.files[0])}
                    value={input?.room?.photos}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps({ className: "dropzone" })}>
                          <div className=" flex justify-start items-center cursor-pointer">
                            <input {...getInputProps()} />
                            <BiImageAdd className=" w-[40px] h-[40px]" />
                            <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Ingresar imagen
                            </p>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  {imagePreview(input.room.photos, '')}
                </Container>
                <div className=" text-sm text-red-500">
                  {errors?.room?.photos && <p>{errors?.room?.photos}</p>}
                </div>
              </div>

              <div className="col-span-3 p-2.5">
                <p className=" text-lg font-semibold">
                  {"Descripcion de la habitación:"}
                </p>

                <input
                  className="bg-transparent border-b border-gray w-11/12"
                  id="roomDescriptionInput"
                  type="text"
                  value={input.room.description}
                  name="description"
                  autoComplete="off"
                  placeholder="Descripcion"
                  onChange={(e) => handleChangeRoom(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors?.room?.description && (
                    <p>{errors?.room?.description}</p>
                  )}
                </div>
              </div>

              <div className="col-span-3 p-2.5">
                <p className=" text-lg font-semibold">
                  {"Tamaño de la habitación:"}
                </p>

                <input
                  className="bg-transparent border-b border-gray w-11/12"
                  id="roomSizeInput"
                  type="text"
                  value={input.room.size}
                  name="size"
                  autoComplete="off"
                  placeholder="Tamaño habitacion Ej: 18 m²"
                  onChange={(e) => handleChangeRoom(e)}
                />
                <div className=" text-sm text-red-500">
                  {errors?.room?.size && <p>{errors?.room?.size}</p>}
                </div>
              </div>
              <div className="col-span-3 p-2.5">
                <p className=" text-lg font-semibold">
                  {"Ingresa las caracteristicas de la habitacion:"}
                </p>

                {input.room.properties.map((propertie, idx) => (
                  <div key={idx} className="flex flex-wrap mb-2">
                    <input
                      className="bg-transparent border-b border-gray w-[80%] "
                      id="Input"
                      type="text"
                      value={propertie}
                      name="properties"
                      autoComplete="off"
                      placeholder="Caracteristicas de la habitacion"
                      onChange={(e) => handleChangeRoom(e, idx)}
                    />
                    {input.room.properties.length > 1 && (
                      <div
                        onClick={() => handleRemoveServicesRoom(idx)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-[fit-content]"
                      >
                        REMOVER
                      </div>
                    )}
                    {input.room.properties.length - 1 === idx &&
                      input.room.properties.length < 5 && (
                        <div
                          onClick={handleAddServicesRoom}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        >
                          Agregar otra
                        </div>
                      )}
                  </div>
                ))}
                <div className=" text-sm text-red-500">
                  {errors?.room?.properties && (
                    <p>{errors?.room?.properties}</p>
                  )}
                </div>
              </div>

              <div
                className=" cursor-pointer text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 p-2"
                onClick={handleSubmit}
              >
                <button className=" w-full h-full" type="submit" form="form">
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div>
            <div className="py-4 font-medium text-3xl mt-2">
              <h1>Así se verá tu hotel en el home !</h1>
            </div>
            <hr />

            <div className=" m-auto bg-white hover:bg-gray-200 shadow-xl hover:shadow-none w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
              <div className="relative mt-2 mx-2">
                <div className="object-cover w-full h-full">
                  <img
                    className="rounded-2xl"
                    src={
                      input.photos.length
                        ? input.photos[0]
                        : "https://www.hmplayadelcarmen.com/wp-content/uploads/1739/1694/nggallery/home//02-HM-Playa-del-Carmen-mobile.jpg"
                    }
                    alt="Hotel"
                  />
                </div>

                <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                  <AiFillHeart />
                </div>

                <div>
                  {input.stars.length > 0 ? (
                    <h3>
                      {" "}
                      <Stars stars={input.stars} />
                    </h3>
                  ) : (
                    <h3 className="text-slate-300">0</h3>
                  )}
                </div>

                <hr />

                <div className="text-left">
                  {input.name.length > 4 ? (
                    <h1>{input.name}</h1>
                  ) : (
                    <h1 className="text-slate-300"> Hotel name</h1>
                  )}
                </div>

                <br />

                <div className="text-left">
                  {input.location.length > 3 ? (
                    <h3>
                      {input.location}, {input.city}
                    </h3>
                  ) : (
                    <h3 className="text-slate-300">location, city</h3>
                  )}
                </div>
                <div className="text-left">
                  {input.price.length > 2 ? (
                    <h3>${input.price} night</h3>
                  ) : (
                    <h3 className="text-slate-300"> price for night</h3>
                  )}
                </div>
                <div>
                  {input.services.map((services) => (
                    <div className=" flex items-center gap-4 mb-2 border-b-2">
                      <p className=" w-[90%]" key={services}>
                        {" "}
                        {services}{" "}
                      </p>
                      <button
                        name={services}
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py px-2 rounded cursor-pointer w-[fit-content]"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                <br />
              </div>
            </div>

            <div className=" bg-white shadow-xl mx-[20px] mt-5 ">
              <div className="  flex justify-center items-center ">
                <div className="w-[800px] h-auto bg-white  rounded-3xl ">
                  <div className="py-[10px] relative border-b text-center">
                    <span className="absolute left-5 cursor-pointer px-2">
                      X
                    </span>
                    <h1 className="font-semibold text-[16px]">
                      {input?.room?.name || "habitacion"}
                    </h1>
                  </div>
                  <div className="mt-7 flex flex-col text-[19px] font-light ml-3">
                    <div className="mb-20">
                      <Carousel className="carousel  w-[500px] h-[250px] m-auto ">
                        {input?.room?.photos &&
                          input?.room?.photos?.map((elemento, index) => {
                            return (
                              <Carousel.Item key={index}>
                                <div>
                                  <img
                                    className=" w-[500px] h-[300px]"
                                    src={elemento}
                                    alt="hotel"
                                  />
                                </div>
                              </Carousel.Item>
                            );
                          })}
                      </Carousel>
                    </div>
                    <div className="mb-3  mt-4 ">
                      <h2 className="font-semibold text-left ">Descripción</h2>
                      <p className=" overflow-x-hidden mmax-w-[600px]">
                        {input?.room?.description}
                      </p>
                    </div>
                    <div className="mb-3 flex flex-row">
                      <h2 className="mr-1 font-semibold ">Tamaño</h2>
                      <p>{input?.room?.size}</p>
                    </div>

                    <div className="mb-3">
                      <h2 className="font-semibold text-left">Cuenta con:</h2>
                      <div className="grid grid-cols-2 mb-3">
                        {input?.room?.properties?.map((p, idx) => (
                          <p
                            className="mb-3 flex flex-row items-center "
                            key={idx}
                          >
                            <i>
                              <FaCheck className="text-[13px]" />
                            </i>
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCreate;
