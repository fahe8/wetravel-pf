import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSearchHotels } from "../../redux/action/index";
import { useHistory } from "react-router-dom";
import Search from "../search/Search";

const Filters = ({
  filteredHotels,
  onSearch,
  search,
  setSearch,
  setCurrentPage,
  currentPage,
}) => {
  // let parameterSearch = query.get('search')

  const dispatch = useDispatch();

  const [modalFilter, setModalFilter] = useState(false);

  const initialFilters = { stars: "", priceMin: 0, priceMax: 100000000 };

  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleStar = (e) => {
    setFilters({ ...filters, stars: e.target.id });
  };

  const restartFilters = () => {
    setFilters(initialFilters);
  };

  const DoFilters = () => {
    dispatch(getSearchHotels("", filters));
    setCurrentPage(0);
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
    <div className="bg-slate-50  mx-auto w-4/6 mt-5 rounded-3xl shadow-md grid grid-cols-3">
      <div className="p-10 col-span-2">
        <Search
          search={search}
          setSearch={setSearch}
          filteredHotels={filteredHotels}
          onSearch={onSearch}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <div className=" flex justify-center items-center pb-6">
        <button
          className="bg-[color:var(--second-bg-color)] py-3 px-3 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] flex align-middle"
          onClick={pressButtonFilter}
        >
          <span className="bg-[url('/src/assets/icons/filter.svg')] bg-center bg-cover bg-no-repeat  w-[24px] h-[24px]"></span>
          <p>Filters</p>
        </button>
        <div
          className={` w-screen h-screen  fixed  left-0 top-0 z-30 ease-in-out duration-300  ${
            modalFilter ? " bg-[color:var(--bg-opacity-modal)] z-20 " : "-z-10"
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
              <ModalFilter
                refOne={refOne}
                setModalFilter={setModalFilter}
                modalFilter={modalFilter}
                filters={filters}
                handleChange={handleChange}
                DoFilters={DoFilters}
                handleStar={handleStar}
                restartFilters={restartFilters}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalFilter = ({
  refOne,
  setModalFilter,
  handleStar,
  filters,
  handleChange,
  DoFilters,
  restartFilters,
}) => {
  return (
    <div className="  w-screen h-screen  fixed top-0 left-0 z-30 flex justify-center items-center">
      <div
        className="w-[600px] h-[auto] bg-white rounded-3xl relative"
        ref={refOne}
      >
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
                    type="number"
                    step="0.01"
                    className=" outline-none w-[100%]"
                    name={"priceMin"}
                    value={filters.priceMin}
                    onChange={handleChange}
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
                    type="number"
                    className=" outline-none w-[100%]"
                    name={"priceMax"}
                    value={filters.priceMax}
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className=" w-full pt-5">
          <h2>{"Calificación por estrellas"}</h2>
          <div className="flex justify-around items-center my-3 mb-5">
            <button
              className=" w-[70px] h-full rounded-3xl border hover:bg-[#feefd0]"
              id={""}
              onClick={handleStar}
            >
              {"Por defecto"}
            </button>
            <button
              className=" w-[50px] h-full rounded-3xl border hover:bg-[#feefd0]"
              id={"1"}
              onClick={handleStar}
            >
              {"1"}
            </button>
            <button
              className=" w-[50px] h-full rounded-3xl border hover:bg-[#feefd0]"
              id={"2"}
              onClick={handleStar}
            >
              {"2"}
            </button>
            <button
              className=" w-[50px] h-full rounded-3xl border hover:bg-[#feefd0]"
              id={"3"}
              onClick={handleStar}
            >
              {"3"}
            </button>
            <button
              className=" w-[50px] h-full rounded-3xl border hover:bg-[#feefd0]"
              id={"4"}
              onClick={handleStar}
            >
              {"4"}
            </button>
            <button
              className=" w-[50px] h-full rounded-3xl border hover:bg-[#feefd0]"
              id={"5"}
              onClick={handleStar}
            >
              {"5"}
            </button>
          </div>
        </div>

        <div className="w-full h-[60px] mb-3 relative">
          <p
            className="  w-[auto] h-auto  border-b-2 font-bold border-black rounded-3xl border hover:bg-[#feefd0]   cursor-pointer px-2 absolute top-[50%] ml-2"
            onClick={restartFilters}
          >
            {"Reiniciar filtros"}
          </p>
          <button
            className=" w-[100px] h-full rounded-3xl border hover:bg-[#feefd0]"
            onClick={DoFilters}
          >
            {"Filtrar"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Filters;

// top-[50%]  ease-in-out duration-300
