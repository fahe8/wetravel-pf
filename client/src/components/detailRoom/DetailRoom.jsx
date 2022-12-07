import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import { payReserve, postReserve, cartReserves } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ScriptMercadoPago from "../scriptMercadoPago/ScriptMercadoPago";

const DetailRoom = ({
  name,
  size,
  photos,
  description,
  properties,
  date,
  id,
  price,
  nameHotel,
  fullInfo,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalFilter, setModalFilter] = useState(false);
  const [item, setItem] = useState();
  const itemLoader = () => {
    setItem({
      id: id,
      title: nameHotel,
      unit_price: parseFloat(price.split("$")[1].split(".").join("")),
      quantity: 1 || date,
    });
    console.log(item);
  };

  const pressButtonFilter = () => {
    setModalFilter(true);
  };

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setModalFilter(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setModalFilter(false);
    }
  };

  return (
    <div className="h-[100%] my-2 px-1">
      <div className="h-full  flex justify-between items-center  ">
        <p>{name}</p>
        <button
          className="bg-[color:var(--second-bg-color)] py-2 px-3 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] flex align-middle"
          onClick={pressButtonFilter}
        >
          <p>Ver</p>
        </button>
        <button
          className="bg-[color:var(--second-bg-color)] py-2 px-3 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] flex align-middle"
          onClick={fullInfo}
        >
          <p>Reservar</p>
        </button>
        <div
          className={` w-screen h-screen  fixed  left-0 top-0 z-30   ease-in-out duration-300  ${
            modalFilter ? " bg-[color:var(--bg-opacity-modal)] z-20 backdrop-blur-[2px] " : "-z-10"
          }`}
        >
          <div
            className={` w-screen  fixed  left-0 z-30   ease-in-out duration-300 ${
              modalFilter
                ? "h-screen top-0 translate-y-[0%]"
                : "translate-y-[1000px]"
            }`}
          >
            {modalFilter && (
              <Modal
                refOne={refOne}
                setModalFilter={setModalFilter}
                modalFilter={modalFilter}
                name={name}
                description={description}
                size={size}
                photos={photos}
                properties={properties}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({
  refOne,
  setModalFilter,
  name,
  size,
  photos,
  description,
  properties,
}) => {
  return (
    <div className="  w-screen h-screen  fixed top-0 left-0 z-30 flex justify-center items-center">
      <div className="w-[600px] h-[600px] bg-white rounded-3xl " ref={refOne}>
        <div className="py-[10px] relative border-b text-center">
          <span
            className="absolute left-5 cursor-pointer px-2"
            onClick={() => setModalFilter(false)}
          >
            X
          </span>
          <h1>{name}</h1>
        </div>
        <div>
          <Carousel className="carousel mt-4 w-[400px] h-[250px] m-auto ">
            {photos &&
              photos?.map((elemento, index) => {
                return (
                  <Carousel.Item key={index}>
                    <div>
                      <img
                        className=" w-[400px] h-[250px]"
                        src={elemento}
                        alt="hotel"
                      />
                    </div>
                  </Carousel.Item>
                );
              })}
          </Carousel>
          <div>
            <h2>Descripción</h2>
            <p>{description}</p>
          </div>
          <div>
            <h2>Tamaño</h2>
            <p>{size}</p>
          </div>

          <div>
            <h2>Cuenta con:</h2>
            <div className="grid grid-cols-2">
              {properties?.map((p) => (
                <p>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailRoom;

// top-[50%]  ease-in-out duration-300
