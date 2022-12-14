import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import SearchPanel from "../searchPanel/SearchPanel";
import InputSearch from "../inputSearch/InputSearch";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { useDispatch } from "react-redux";
import { getSearchHotels } from "../../redux/action/index";

const Search = ({
  filteredHotels,
  onSearch,
  setSearch,
  search,
  setCurrentPage,
  currentPage,
}) => {
  let ref = useRef();
  let ref2 = useRef();

  const [panelSelect, setPanelSelect] = useState({
    selected: "",
    active: false,
  });

  //Open panel search
  const handleClick = (event) => {
    setPanelSelect({ selected: event.currentTarget.id, active: true });
  };

  //Close panel search click outside
  useEffect(() => {
    let closePanelSearch = (e) => {
      if (!ref.current.contains(e.target) && !ref2.current.contains(e.target)) {
        setPanelSelect({ selected: null, active: false });
      }
    };
    document.addEventListener("mousedown", closePanelSearch);

    return () => {
      document.removeEventListener("mousedown", closePanelSearch);
    };
  }, []);

  return (
    <div
      className={` w-[95%] mx-auto relative"
        }`}
      ref={ref2}
    >
      <div
        className={`  mx-auto ease-in-out duration-300 transform w-[95%] h-[130px] flex bg-[color:var(--second-bg-color)] rounded-full shadow-md border border-[color:var(--search-border-color)] cursor-pointer `}
      >
        <button
          className={`${
            panelSelect.selected === "location" &&
            "bg-[color:var(--second-bg-color)]"
          } h-full border-r w-[90%] border-black py-2 rounded-l-full cursor-pointer hover:bg-[color:var(--second-bg-color-hover)] relative z-10`}
          id="location"
          onClick={handleClick}
        >
          {" "}
          <div className="flex justify-center gap-2">
            <span className=" bg-[url('/src/assets/icons/location.svg')] bg-center bg-cover bg-no-repeat w-10 h-10"></span>{" "}
            <p className=" font-medium text-3xl">Destination place</p>
          </div>{" "}
          <div className=" w-[70%] h-[25px] mx-auto ">
            <InputSearch
              search={search}
              filteredHotels={filteredHotels}
              onSearch={onSearch}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            ></InputSearch>
          </div>
        </button>

        <button className="h-[100%] rounded-r-full hover:bg-[color:var(--second-bg-color-hover)] flex items-center justify-center w-[10%]">
          <div className=" h-[40px] w-[50px] drop-shadow-md rounded-full flex justify-center items-center bg-red-400">
            <div className="h-[25px] w-[25px] bg-[url('/src/assets/icons/search.svg')] bg-center bg-cover bg-no-repeat">
              {" "}
            </div>
          </div>
        </button>
      </div>
      <div
        className={`ease-in-out duration-300 w-auto absolute z-10 left-[50%] translate-x-[-50%] ${
          panelSelect.active ? "translate-y-[0%]" : "translate-y-[100%]"
        }`}
        ref={ref}
      >
        {panelSelect.active && (
          <SearchPanel
            selected={panelSelect.selected}
            setInputText={setSearch}
            setCurrentPage={setCurrentPage}
            ref={ref}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
