import { React, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import SearchPanel from "../searchPanel/SearchPanel";
import InputSearch from "../inputSearch/InputSearch";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { useDispatch } from "react-redux";
import { getSearchHotels } from "../../redux/action/index";

const Search = () => {
  let history = useHistory();

  let dispatch = useDispatch();
  let ref = useRef();
  const [inputText, setInputText] = useState({ text: "", from: "" });
  const [count, setCount] = useState(0);
  const [state, setstate] = useState(false);
  const [panelSelect, setPanelSelect] = useState({
    selected: "",
    active: false,
  });

  //Calendar State
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  let dataSearch = {
    location: inputText,
    date: range,
    guest: count,
  };

  useEffect(() => {
    if (history.location.pathname === "/") {
      setstate(true);
    }
  }, []);

  //Open and Close panel search
  const handleClick = (event) => {
    setPanelSelect({ selected: event.currentTarget.id, active: true });
  };

  const getSearch = () => {
    dispatch(
      getSearchHotels(
        inputText.text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase(),
        inputText.from
      )
    );
    history.push("/home");
  };

  //Close panel search click outside
  useEffect(() => {
    let closePanelSearch = (e) => {
      if (!ref.current.contains(e.target)) {
        setPanelSelect({ selected: null, active: false });
      }
    };
    document.addEventListener("mousedown", closePanelSearch);

    return () => {
      document.removeEventListener("mousedown", closePanelSearch);
    };
  }, []);

  if (state) {
    return (
      <div
        className={` w-[70%] absolute bottom-0 left-[50%] translate-x-[-50%] ${
          panelSelect.active && "translate-y-[0%]"
        }`}
        ref={ref}
      >
        <div
          className={`${
            panelSelect.active && "translate-y-[-150%]"
          }  mx-auto ease-in-out duration-300 transform w-[95%] h-[130px] grid grid-cols-new4 grid-rows-1 bg-[color:var(--primary-bg-opacity-color)] rounded-full shadow-md border border-[color:var(--search-border-color)] cursor-pointer `}
        >
          <button
            className={`${
              panelSelect.selected === "location" &&
              "bg-[color:var(--second-bg-color)]"
            } h-full border-r border-black py-2 rounded-l-full cursor-pointer hover:bg-[color:var(--second-bg-color)] relative z-10`}
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
                inputText={inputText}
                setInputText={setInputText}
              ></InputSearch>
            </div>
          </button>

          <button
            className={`${
              panelSelect.selected === "calendar" &&
              "bg-[color:var(--second-bg-color)] "
            } h-full border-r border-black py-2 hover:bg-[color:var(--second-bg-color)]`}
            id="calendar"
            onClick={handleClick}
          >
            {" "}
            <div className="flex justify-center gap-2">
              <span className=" bg-[url('/src/assets/icons/calendar.svg')] bg-center bg-cover bg-no-repeat w-10 h-10"></span>{" "}
              <p className=" font-medium text-3xl">Check-in/Check-out</p>
            </div>{" "}
            <input
              value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
                range[0].endDate,
                "MM/dd/yyyy"
              )}`}
              readOnly
              className=" outline-none w-[100%] text-center bg-transparent"
            />
          </button>

          <button
            className={`${
              panelSelect.selected === "guest" &&
              "bg-[color:var(--second-bg-color)]"
            } py-2  hover:bg-[color:var(--second-bg-color)] border-r border-black`}
            id="guest"
            onClick={handleClick}
          >
            {" "}
            <div className="flex justify-center gap-2">
              <span className=" bg-[url('/src/assets/icons/guest.svg')] bg-center bg-cover bg-no-repeat w-10 h-10"></span>{" "}
              <p className=" font-medium text-3xl">Guests</p>
            </div>{" "}
            <p className=" text-2xl mt-4">
              {count} {count > 1 ? "Huespedes" : "Huesped"}
            </p>
          </button>

          <button
            className="h-[100%] rounded-r-full hover:bg-[color:var(--second-bg-color)] flex items-center justify-center "
            onClick={getSearch}
          >
            <div className=" h-[40px] w-[50px] drop-shadow-md rounded-full flex justify-center items-center bg-red-400">
              <div className="h-[25px] w-[25px] bg-[url('/src/assets/icons/search.svg')] bg-center bg-cover bg-no-repeat">
                {" "}
              </div>
            </div>
          </button>
        </div>
        <div
          className={` absolute -z-10 w-[100%] mx-auto top-[90%] ease-in-out duration-300 ${
            panelSelect.active ? "h-[400px] translate-y-[-50%]" : "h-[0px]"
          }`}
        >
          {panelSelect.active && (
            <SearchPanel
              selected={panelSelect.selected}
              range={range}
              setRange={setRange}
              setInputText={setInputText}
              count={count}
              setCount={setCount}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" ref={ref}>
      <div
        className={` ease-in-out duration-300 transform w-full h-full grid grid-cols-new4 grid-rows-1 bg-[color:var(--primary-bg-opacity-color)] rounded-full shadow-md border border-[color:var(--search-border-color)] cursor-pointer `}
      >
        <button
          className={`${
            panelSelect.selected === "location" &&
            "bg-[color:var(--second-bg-color)]"
          } h-full border-r border-black py-2 rounded-l-full cursor-pointer hover:bg-[color:var(--second-bg-color)] `}
          id="location"
          onClick={handleClick}
        >
          {" "}
          <div className="flex justify-center gap-2">
            <span className=" bg-[url('/src/assets/icons/location.svg')] bg-center bg-cover bg-no-repeat  w-5 h-5"></span>{" "}
            <p className=" h-[20px] font-medium text-sm">Destination place</p>
          </div>{" "}
          <div className=" w-[70%] mx-auto">
            <InputSearch
              inputText={inputText}
              setInputText={setInputText}
            ></InputSearch>
          </div>
        </button>

        <button
          className={`${
            panelSelect.selected === "calendar" &&
            "bg-[color:var(--second-bg-color)] "
          } h-full border-r border-black py-2 hover:bg-[color:var(--second-bg-color)]`}
          id="calendar"
          onClick={handleClick}
        >
          {" "}
          <div className="flex justify-center gap-2">
            <span className=" bg-[url('/src/assets/icons/calendar.svg')] bg-center bg-cover bg-no-repeat w-5 h-5"></span>{" "}
            <p className="h-[20px] font-medium text-sm">Check-in/Check-out</p>
          </div>{" "}
          <input
            value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
              range[0].endDate,
              "MM/dd/yyyy"
            )}`}
            readOnly
            className=" outline-none w-[100%] text-center bg-transparent"
          />
        </button>

        <button
          className={`${
            panelSelect.selected === "guest" &&
            "bg-[color:var(--second-bg-color)]"
          } py-2  hover:bg-[color:var(--second-bg-color)] border-r border-black`}
          id="guest"
          onClick={handleClick}
        >
          {" "}
          <div className="flex justify-center gap-2">
            <span className=" bg-[url('/src/assets/icons/guest.svg')] bg-center bg-cover bg-no-repeat w-5 h-5"></span>{" "}
            <p className="h-[20px] font-medium text-sm">Guests</p>
          </div>{" "}
          <p className=" text-xs ">
            {count} {count > 1 ? "Huespedes" : "Huesped"}{" "}
          </p>
        </button>

        <button
          className="h-[100%] rounded-r-full hover:bg-[color:var(--second-bg-color)] flex items-center justify-center "
          onClick={getSearch}
        >
          <div className=" h-[40px] w-[50px] drop-shadow-md rounded-full flex justify-center items-center bg-red-400">
            <div className="h-[25px] w-[25px] bg-[url('/src/assets/icons/search.svg')] bg-center bg-cover bg-no-repeat">
              {" "}
            </div>
          </div>
        </button>
      </div>
      <div
        className={`-z-10 min-w-auto w-full ease-in-out duration-300 absolute top-[800%]${
          panelSelect.active ? " translate-y-[-100%]" : "h-[0px]"
        }`}
      >
        {panelSelect.active && (
          <SearchPanel
            selected={panelSelect.selected}
            range={range}
            setRange={setRange}
            setInputText={setInputText}
            count={count}
            setCount={setCount}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
