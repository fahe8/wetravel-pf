import { React, useState, useEffect, useRef } from "react";

const Filters = () => {
  const [modalFilter, setModalFilter] = useState(false);

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
    <div className="h-[80px] px-5 bg-white">
      <div className="h-full  flex justify-end items-center ">
        <button
          className="bg-[color:var(--second-bg-color)] py-3 px-3 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] flex align-middle"
          onClick={pressButtonFilter}
        >
          <span className="bg-[url('/src/assets/icons/filter.svg')] bg-center bg-cover bg-no-repeat  w-[24px] h-[24px]"></span>
          <p>Filters</p>
        </button>
        <div className={` w-screen h-screen  fixed  left-0 top-0 z-30   ease-in-out duration-300  ${
              modalFilter
                ? " bg-[color:var(--bg-opacity-modal)] z-20 "
                :  "-z-10"
            }`}>
          <div
            className={` w-screen  fixed  left-0 z-30   ease-in-out duration-300 ${
              modalFilter
                ? "h-screen top-0 translate-y-[0%]"
                : "translate-y-[1000px]"
            }`}
          >
            {modalFilter && (
              <ModalFilter
                refOne={refOne}
                setModalFilter={setModalFilter}
                modalFilter={modalFilter}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalFilter = ({ refOne, setModalFilter, modalFilter }) => {
  return (
    <div className="  w-screen h-screen  fixed top-0 left-0 z-30 flex justify-center items-center">
      <div className="w-[600px] h-[600px] bg-white rounded-3xl " ref={refOne}>
        <div className="py-[10px] relative border-b ">
          <span
            className="absolute left-5 cursor-pointer px-2"
            onClick={() => setModalFilter(false)}
          >
            X
          </span>
          <h1>{"Filtros"}</h1>
        </div>
        <div className=" w-full pt-5">
          <h2>{"Rangos de Precio:"}</h2>
          <div className=" flex justify-center items-center gap-10 w-full pt-3">
            <div className=" w-[200px] border border-[color:var(--border-color)] rounded-2xl p-1 text-left">
              <label className="w-full">
                <p className="pl-2 text-xs">{"Precio mínimo"}</p>
                <div className=" flex pl-2 gap-1">
                  <p>{"$"}</p>
                  <input
                    type="text"
                    className=" outline-none w-[100%]"
                    value={0}
                  />
                </div>
              </label>
            </div>
            <div className="w-[20px] h-0 border bg-black"></div>

            <div className=" w-[200px] border border-[color:var(--border-color)] rounded-2xl p-1 text-left">
              <label className="w-full">
                <p className="pl-2 text-xs">{"Precio máximo"}</p>
                <div className=" flex pl-2 gap-1">
                  <p>{"$"}</p>
                  <input
                    type="text"
                    className=" outline-none w-[100%]"
                    value={0}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className=" w-full pt-5">
          <h2>{"Calificación"}</h2>
          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filters;

// top-[50%]  ease-in-out duration-300
