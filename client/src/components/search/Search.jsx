import { React, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchPanel from "../searchPanel/SearchPanel";
import format from 'date-fns/format'
import { addDays } from 'date-fns'


const Search = () => {
  let location = useLocation();
  let ref = useRef();
  const [state, setstate] = useState(false);
  const [panelSelect, setPanelSelect] = useState({
    selected: '',
    active: false,
  });

  //Calendar State
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  // open close

  useEffect(() => {
    if (location.pathname === "/") {
      setstate(true);
    }
  }, []);


  //Open and Close panel search
  const handleClick = (event) => {
    setPanelSelect({ selected: event.currentTarget.id, active: true });
    if (panelSelect.selected === event.currentTarget.id) {
      setPanelSelect({ selected: null, active:false});
    }
  };
  
  //Close panel search click outside
  useEffect(() => {
    let closePanelSearch = (e) => {
      console.log(ref.current);
      if(!ref.current.contains(e.target)){
        setPanelSelect({ selected: null, active: false });
      }
    }
    document.addEventListener("mousedown", closePanelSearch)

    return() => {
      document.removeEventListener("mousedown", closePanelSearch)
    }
  }, []);


  if (state) {
    return (
      <div className={ ` w-[70%] absolute bottom-0 left-[50%] translate-x-[-50%] ${panelSelect.active && "translate-y-[50%]"}`}  ref={ref} >
        <div
          className={`${panelSelect.active && "translate-y-[-150%]"} ease-in-out duration-300 transform w-full h-[130px] grid grid-cols-3 grid-rows-1 bg-[color:var(--primary-bg-opacity-color)] rounded-full shadow-md border border-[color:var(--search-border-color)] cursor-pointer`}
        >
          <button
            className={`${
              panelSelect.selected === "location" &&
              "bg-[color:var(--second-bg-color)]"
            } h-full border-r border-black py-2 rounded-l-full cursor-pointer hover:bg-[color:var(--second-bg-color)]`}
            id="location"
            onClick={handleClick}
          >
            {" "}
            <div className="flex justify-center gap-2">
              <span className=" bg-[url('/src/assets/icons/location.svg')] bg-center bg-cover bg-no-repeat w-10 h-10"></span>{" "}
              <p className=" font-medium text-3xl">Destination place</p>
            </div>{" "}
            {panelSelect.active && <p>Bogota,Colombia</p>}
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
            {panelSelect.active && (
                    <input
                    value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
                    readOnly
                    className="inputBox"
                    
                  />
            )}
          </button>

          <button
            className={`${
              panelSelect.selected === "guest" &&
              "bg-[color:var(--second-bg-color)]"
            } py-2  hover:bg-[color:var(--second-bg-color)] rounded-r-full`}
            id="guest"
            onClick={handleClick}
          >
            {" "}
            <div className="flex justify-center gap-2">
              <span className=" bg-[url('/src/assets/icons/guest.svg')] bg-center bg-cover bg-no-repeat w-10 h-10"></span>{" "}
              <p className=" font-medium text-3xl">Guests</p>
            </div>{" "}
            {panelSelect.active && (
              <p className=" text-2xl mt-4">1 adult, 2 children</p>
            )}
          </button>
        </div>
        <div className={` absolute w-[100%] mx-auto top-[90%] ease-in-out duration-300 ${panelSelect.active? "h-[400px] translate-y-[-50%]": "h-[0px]"}`}>
         {panelSelect.active && <SearchPanel selected = {panelSelect.selected} range={range} setRange={setRange}/>}
        </div>
      </div>
    );
  }


  return (
    <div className=" w-full h-full bg-[color:var(--primary-bg-opacity-color)] rounded-full shadow-md border border-[color:var(--search-border-color)] cursor-pointer">
      <div className="h-full py-1 grid grid-cols-3">
        <div className=" h-full border-r border-black">
          {" "}
          <div>
            <span></span> <p className=" font-medium">Destination place</p>
          </div>{" "}
          <p>bogota,Colombia</p>
        </div>

        <div className=" h-full border-r border-black">
          {" "}
          <div>
            <span></span>{" "}
            <p className=" text-[90%] font-medium">Check-in/Check-out</p>
          </div>{" "}
          <p>28 nov- 3 dic</p>
        </div>

        <div>
          {" "}
          <div>
            <span></span> <p className=" font-medium">Guests</p>
          </div>{" "}
          <p>1 adult, 2 children</p>
        </div>

        <span></span>
      </div>
    </div>
  );
};

export default Search;
