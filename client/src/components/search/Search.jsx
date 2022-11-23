import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchPanel from "../searchPanel/SearchPanel";

const Search = () => {
  let location = useLocation();

  const [state, setstate] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setstate(true);
    }
  }, []);

  

  if (state) {
    return (
      <div className=" w-full h-full bg-[color:var(--primary-bg-opacity-color)] rounded-full shadow-md border border-[color:var(--search-border-color)] cursor-pointer">
        <div className="h-full py-2 grid grid-cols-3 grid-rows-1">
          <div className=" h-full border-r border-black">
            {" "}
            <div>
              <span></span>{" "}
              <p className=" font-medium text-3xl">Destination place</p>
            </div>{" "}
            <p className=" text-2xl mt-4">bogota,Colombia</p>
          </div>

          <div className=" h-full border-r border-black">
            {" "}
            <div>
              <span></span>{" "}
              <p className=" font-medium text-3xl">Check-in/Check-out</p>
            </div>{" "}
            <p className=" text-2xl mt-4">28 nov- 3 dic</p>
          </div>

          <div>
            {" "}
            <div>
              <span></span> <p className=" font-medium text-3xl">Guests</p>
            </div>{" "}
            <p className=" text-2xl mt-4">1 adult, 2 children</p>
          </div>

          <span></span>
        </div>
        <SearchPanel></SearchPanel>
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
